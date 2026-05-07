import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { ShieldCheck, Target, Users, Globe } from 'lucide-react';

export const metadata: Metadata = constructMetadata({
  title: "À propos de ChainSolutions | FinTech UEMOA",
  description: "Découvrez ChainSolutions, l'entreprise technologique financière qui transforme l'investissement en Afrique grâce à l'IA et l'innovation.",
  url: "https://chainsolutions.fr/a-propos"
});

import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-serif">
            Notre Mission : <span className="text-accent">Démocratiser la Finance</span> en Afrique
          </h1>
          <p className="text-lg text-text-secondary leading-relaxed">
            ChainSolutions est née d&apos;une conviction forte : les marchés financiers africains, et particulièrement la zone UEMOA, regorgent d&apos;opportunités qui nécessitent des outils technologiques de pointe pour être pleinement exploitées.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-24">
          <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-xl">
            <div className="absolute inset-0 bg-primary/20 mix-blend-overlay z-10" />
            <Image src="https://picsum.photos/seed/abidjan/800/600" alt="Équipe ChainSolutions" fill className="object-cover" referrerPolicy="no-referrer" />
          </div>
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-primary font-serif">Une Expertise Locale, des Standards Internationaux</h2>
            <p className="text-text-secondary leading-relaxed">
              Basée à Abidjan, cœur financier de l&apos;Afrique de l&apos;Ouest, notre équipe rassemble des experts en ingénierie logicielle, en intelligence artificielle et en finance de marché. 
            </p>
            <p className="text-text-secondary leading-relaxed">
              Nous concevons des plateformes robustes, sécurisées et conformes aux exigences du CREPMF, permettant aux investisseurs particuliers et institutionnels de prendre des décisions éclairées.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Target, title: "Innovation", desc: "IA et algorithmes prédictifs au service de vos rendements." },
            { icon: ShieldCheck, title: "Sécurité", desc: "Infrastructures cloud hautement sécurisées et conformes." },
            { icon: Globe, title: "Ancrage Local", desc: "Solutions pensées spécifiquement pour la BRVM et l'UEMOA." },
            { icon: Users, title: "Inclusion", desc: "Rendre les marchés accessibles à tous les profils d'investisseurs." }
          ].map((val, i) => (
            <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 text-center">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4 text-accent">
                <val.icon className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-primary mb-2">{val.title}</h3>
              <p className="text-text-secondary text-sm">{val.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
