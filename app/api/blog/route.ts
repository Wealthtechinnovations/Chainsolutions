import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const publishedOnly = searchParams.get('published') !== 'false';
    
    const session = await getServerSession(authOptions);
    const where = (!session || publishedOnly) ? { status: 'published' } : {};

    const posts = await prisma.blogEntry.findMany({
      where,
      orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(posts);
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });

  try {
    const body = await req.json();
    
    // Validation
    if (body.type === 'news' && (!body.title || !body.content)) {
      return NextResponse.json({ error: 'Titre et contenu requis pour une news' }, { status: 400 });
    }
    if (body.type === 'external' && !body.url) {
      return NextResponse.json({ error: 'URL requise pour un lien externe' }, { status: 400 });
    }

    const post = await prisma.blogEntry.create({
      data: {
        type: body.type,
        title: body.title || null,
        excerpt: body.excerpt || null,
        content: body.content || null,
        url: body.url || null,
        coverImageUrl: body.coverImageUrl || null,
        tags: body.tags || null,
        status: body.status || 'draft',
        publishedAt: body.status === 'published' ? new Date() : null
      }
    });
    return NextResponse.json(post, { status: 201 });
  } catch (error) {
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
