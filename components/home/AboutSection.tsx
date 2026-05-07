'use client';

import { motion } from 'motion/react';
import { Globe, ShieldCheck, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';

const reasons = [
  {
    title: "Expertise Africaine",
    description: "Connaissance approfondie des marchés UEMOA et des régulateurs locaux pour des solutions parfaitement adaptées au contexte régional.",
    icon: Globe,
    color: "text-accent"
  },
  {
    title: "Technologie de Pointe",
    description: "Intégration de l'Intelligence Artificielle, de la Blockchain, du KYC digitalisé et de Robo-Advisors pour une expérience utilisateur optimale.",
    icon: Zap,
    color: "text-blue-500"
  },
  {
    title: "Conformité & Sécurité",
    description: "Respect strict des normes du CREPMF et des réglementations financières africaines pour garantir la sécurité de vos opérations.",
    icon: ShieldCheck,
    color: "text-success"
  }
];

export function AboutSection() {
  return (
    <section className="py-24 bg-dark text-white relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-500/5 blur-[120px]" />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-bold mb-6"
          >
            Pourquoi choisir <span className="text-accent">ChainSolutions</span> ?
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/70"
          >
            Nous combinons innovation technologique et expertise financière locale pour transformer l&apos;investissement en Afrique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="bg-white/5 border-white/10 backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
                <CardHeader>
                  <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center mb-4 ${reason.color}`}>
                    <reason.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl text-white">{reason.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-white/70 leading-relaxed">
                    {reason.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
