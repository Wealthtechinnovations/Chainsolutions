import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { JsonLd } from '@/components/seo/JsonLd';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "ChainSolutions",
    "url": "https://chainsolutions.fr",
    "logo": "https://chainsolutions.fr/logo.png",
    "description": "ChainSolutions développe des outils FinTech de pointe pour les marchés financiers africains (BRVM, OPCVM UEMOA).",
    "sameAs": [
      "https://www.linkedin.com/company/chainsolutions"
    ]
  };

  return (
    <>
      <JsonLd data={orgSchema} />
      <Header />
      <main className="flex-1 flex flex-col">{children}</main>
      <Footer />
    </>
  );
}
