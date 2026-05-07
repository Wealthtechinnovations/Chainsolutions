'use client';

import { motion, useInView } from 'motion/react';
import { useRef, useState, useEffect } from 'react';
import { LayoutGrid, Users, Globe2, Cpu } from 'lucide-react';

interface StatProps {
  icon: React.ElementType;
  value: number;
  suffix?: string;
  label: string;
  delay: number;
}

function StatCard({ icon: Icon, value, suffix = '', label, delay }: StatProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const duration = 2000;
      const increment = value / (duration / 16);
      
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setCount(value);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="flex flex-col items-center text-center p-6 glass-card rounded-2xl"
    >
      <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mb-6">
        <Icon className="w-8 h-8 text-accent" />
      </div>
      <div className="text-4xl md:text-5xl font-bold text-white mb-2 font-mono">
        {count.toLocaleString('fr-FR')}{suffix}
      </div>
      <div className="text-white/70 font-medium">{label}</div>
    </motion.div>
  );
}

export function StatsSection() {
  return (
    <section className="py-24 bg-dark relative z-20 -mt-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <StatCard icon={LayoutGrid} value={5} label="Solutions déployées" delay={0.1} />
          <StatCard icon={Globe2} value={8} label="Pays UEMOA couverts" delay={0.2} />
          <StatCard icon={Cpu} value={100} suffix="%" label="Analyse IA temps réel" delay={0.3} />
        </div>
      </div>
    </section>
  );
}
