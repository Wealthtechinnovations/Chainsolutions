'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { TrendingUp, UserCheck, Calculator, GraduationCap, BarChart3, ArrowRight, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/Card';
import { Badge } from '../ui/Badge';

const solutions = [
  {
    id: 'brvm-research-pro',
    title: 'BRVM Research PRO',
    icon: TrendingUp,
    description: "Plateforme d'intelligence artificielle dédiée à l'analyse de la Bourse Régionale des Valeurs Mobilières (BRVM). Accédez à des analyses quantitatives avancées, des alertes en temps réel et des recommandations algorithmiques sur l'ensemble des titres cotés en zone UEMOA.",
    tags: ["IA", "BRVM", "Analyse", "Temps réel"],
    appUrl: "https://brvm.chainsolutions.fr/",
    pageUrl: "/solutions/brvm-research-pro",
    color: "#1E90FF"
  },
  {
    id: 'profil-investisseur-uemoa',
    title: 'Profil Investisseur UEMOA',
    icon: UserCheck,
    description: "Outil de profilage financier intelligent qui analyse votre situation patrimoniale, votre tolérance au risque et vos objectifs pour vous proposer une stratégie d'allocation d'actifs personnalisée adaptée aux marchés UEMOA.",
    tags: ["Profilage", "UEMOA", "Personnalisé", "KYC"],
    appUrl: "https://profil.chainsolutions.fr/",
    pageUrl: "/solutions/profil-investisseur-uemoa",
    color: "#8B5CF6"
  },
  {
    id: 'simulateur-epargne',
    title: 'Simulateur Épargne',
    icon: Calculator,
    description: "Projetez la croissance de votre épargne avec précision. Notre simulateur financier interactif vous permet de modéliser différents scénarios d'investissement, de comparer les rendements et d'optimiser vos versements sur l'ensemble des véhicules d'épargne disponibles en zone UEMOA.",
    tags: ["Simulation", "Épargne", "Projection", "Rendement"],
    appUrl: "https://simulateur.chainsolutions.fr/",
    pageUrl: "/solutions/simulateur-epargne",
    color: "#10B981"
  },
  {
    id: 'edufinance',
    title: 'EduFinance — Parcours Épargnant',
    icon: GraduationCap,
    description: "Parcours pédagogiques progressifs pour démocratiser la culture financière en Afrique de l'Ouest. Maîtrisez les fondamentaux de l'épargne, des marchés financiers, des OPCVM et de l'investissement responsable à travers des modules interactifs adaptés au contexte UEMOA.",
    tags: ["Formation", "UEMOA", "Pédagogie", "Finance"],
    appUrl: "https://edufinance.chainsolutions.fr/",
    pageUrl: "/solutions/edufinance-parcours-epargnant",
    color: "#F59E0B"
  },
  {
    id: 'fundafrique',
    title: 'FundAfrique — OPCVM Afrique',
    icon: BarChart3,
    description: "Plateforme complète de référence pour les OPCVM africains. Compare, analyse et distribue les fonds d'investissement collectifs avec l'appui d'un Robo-Advisor IA, un module KYC digitalisé et un service de conseil institutionnel dédié aux sociétés de gestion et aux investisseurs institutionnels.",
    tags: ["OPCVM", "Robo-Advisor", "Institutionnel", "KYC"],
    appUrl: "https://funds.chainsolutions.fr/",
    pageUrl: "/solutions/fundafrique-opcvm-afrique",
    color: "#D4A017"
  }
];

export function SolutionsGrid() {
  return (
    <section className="py-24 bg-surface">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-primary mb-6">Notre Écosystème de Solutions</h2>
          <p className="text-lg text-text-secondary">
            Une suite complète d&apos;applications conçues pour répondre aux défis spécifiques des marchés financiers africains.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="h-full"
            >
              <Card className="h-full flex flex-col border-gray-200 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden group">
                <div className="h-2 w-full" style={{ backgroundColor: solution.color }} />
                <CardHeader>
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-4" style={{ backgroundColor: `${solution.color}15`, color: solution.color }}>
                    <solution.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl text-primary">{solution.title}</CardTitle>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {solution.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-200 font-medium">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <CardDescription className="text-base leading-relaxed text-text-secondary line-clamp-4">
                    {solution.description}
                  </CardDescription>
                </CardContent>
                <CardFooter className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-100">
                  <Link 
                    href={solution.pageUrl}
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium text-primary hover:text-accent transition-colors"
                  >
                    En savoir plus <ArrowRight className="w-4 h-4" />
                  </Link>
                  <a 
                    href={solution.appUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-2 text-sm font-medium bg-primary text-white rounded-md hover:bg-secondary transition-colors"
                  >
                    Accéder <ExternalLink className="w-4 h-4" />
                  </a>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
