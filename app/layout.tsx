import type { Metadata } from 'next';
import { Inter, Playfair_Display, JetBrains_Mono } from 'next/font/google';
import './globals.css';
import { constructMetadata } from '@/lib/seo';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = constructMetadata({
  title: "ChainSolutions — Intelligence Financière pour l'Afrique | FinTech UEMOA",
  description: "ChainSolutions développe des outils FinTech de pointe pour les marchés financiers africains : analyse BRVM, OPCVM, simulateur épargne, éducation financière et profilage investisseur en zone UEMOA.",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable} ${jetbrains.variable}`}>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
