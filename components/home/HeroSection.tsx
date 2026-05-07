'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { ParticlesBackground } from '../ui/ParticlesBackground';
import { Badge } from '../ui/Badge';

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-primary pt-20">
      <ParticlesBackground />
      
      {/* Overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/90 to-dark z-10" />

      <div className="container relative z-20 mx-auto px-4 md:px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <Badge variant="accent" className="px-4 py-1.5 text-sm">
            Technologie financière africaine de référence
          </Badge>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-white max-w-5xl leading-tight tracking-tight mb-8"
        >
          L&apos;Intelligence Financière au Service de l&apos;<span className="gradient-text">Afrique</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-lg md:text-xl text-white/80 max-w-3xl mb-12 leading-relaxed"
        >
          ChainSolutions développe des outils FinTech de pointe pour les investisseurs, 
          les épargnants et les sociétés de gestion de la zone UEMOA et d&apos;Afrique subsaharienne.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
        >
          <Button size="lg" variant="accent" asChild className="w-full sm:w-auto">
            <Link href="/solutions">Découvrir nos solutions</Link>
          </Button>
          <Button size="lg" variant="outline" asChild className="w-full sm:w-auto text-white border-white/20 hover:bg-white/10">
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
