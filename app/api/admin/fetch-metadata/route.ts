import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const { url } = await req.json();
    if (!url) {
      return NextResponse.json({ error: 'URL requise' }, { status: 400 });
    }

    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; ChainSolutionsBot/1.0; +https://chainsolutions.fr)'
      }
    });

    if (!response.ok) {
      return NextResponse.json({ error: 'Impossible de récupérer l\'URL' }, { status: 400 });
    }

    const html = await response.text();
    
    // Simple regex-based extraction for OG tags
    const getMetaTag = (property: string) => {
      const regex = new RegExp(`<meta[^>]*property=["']${property}["'][^>]*content=["']([^"']*)["'][^>]*>`, 'i');
      const match = html.match(regex);
      if (match) return match[1];
      
      const regex2 = new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*property=["']${property}["'][^>]*>`, 'i');
      const match2 = html.match(regex2);
      if (match2) return match2[1];
      
      return null;
    };

    const getTitle = () => {
      const ogTitle = getMetaTag('og:title');
      if (ogTitle) return ogTitle;
      
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
      if (titleMatch) return titleMatch[1];
      
      return null;
    };

    const getDescription = () => {
      const ogDesc = getMetaTag('og:description');
      if (ogDesc) return ogDesc;
      
      const metaDescMatch = html.match(/<meta[^>]*name=["']description["'][^>]*content=["']([^"']*)["'][^>]*>/i);
      if (metaDescMatch) return metaDescMatch[1];
      
      return null;
    };

    const title = getTitle();
    const description = getDescription();
    const image = getMetaTag('og:image');

    return NextResponse.json({
      title: title ? decodeHTMLEntities(title) : null,
      description: description ? decodeHTMLEntities(description) : null,
      image: image ? decodeHTMLEntities(image) : null
    });
  } catch (error) {
    console.error('Error fetching metadata:', error);
    return NextResponse.json({ error: 'Erreur lors de la récupération des métadonnées' }, { status: 500 });
  }
}

function decodeHTMLEntities(text: string) {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'")
    .replace(/&nbsp;/g, ' ');
}
