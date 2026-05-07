import { Metadata } from 'next';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string[];
  image?: string;
  url?: string;
}

export function constructMetadata({
  title,
  description,
  keywords = [
    'FinTech Afrique', 'FinTech UEMOA', 'BRVM', 'analyse financière BRVM', 
    'résultats financiers BRVM', 'marchés financiers Afrique de l\'Ouest', 
    'WealthTech innovations', 'OPCVM Afrique', 'OPCVM UEMOA', 'FundAfrique', 
    'investissement Afrique de l\'Ouest', 'analyse boursière Afrique', 
    'ChainSolutions', 'technologie financière Afrique', 'intelligence financière UEMOA',
    'transformation digitale finance', 'éducation financière', 'simulateur épargne',
    'profil investisseur', 'Bourse Régionale des Valeurs Mobilières'
  ],
  image = 'https://chainsolutions.fr/og-image.jpg',
  url = 'https://chainsolutions.fr',
}: SEOProps): Metadata {
  return {
    metadataBase: new URL('https://chainsolutions.fr'),
    title,
    description,
    keywords,
    openGraph: {
      title,
      description,
      url,
      siteName: 'ChainSolutions',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
      locale: 'fr_FR',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
    alternates: {
      canonical: url,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 },
    },
  };
}
