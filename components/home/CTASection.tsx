'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '../ui/Button';

export function CTASection() {
  return (
    <section className="py-24 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://picsum.photos/seed/finance/1920/1080')] bg-cover bg-center opacity-10 mix-blend-overlay" />
      <div className="absolute inset-0 bg-gradient-to-t from-primary via-primary/90 to-transparent" />
      
      <div className="container mx-auto px-4 md:px-6 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto bg-white/5 backdrop-blur-md border border-white/10 p-10 md:p-16 rounded-3xl shadow-2xl"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 font-serif">
            Prêt à transformer votre approche de l&apos;investissement ?
          </h2>
          <p className="text-lg text-white/80 mb-10 leading-relaxed">
            Rejoignez les milliers d&apos;investisseurs et d&apos;institutions qui font confiance à ChainSolutions pour optimiser leurs performances sur les marchés africains.
          </p>
          <Button size="lg" variant="accent" asChild className="text-lg px-8 py-6 rounded-xl shadow-[0_0_30px_rgba(212,160,23,0.3)] hover:shadow-[0_0_40px_rgba(212,160,23,0.5)] transition-shadow">
            <Link href="/contact">Contactez nos experts</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
