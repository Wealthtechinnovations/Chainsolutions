'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Button } from '../ui/Button';

const solutions = [
  { name: 'BRVM Research PRO', href: '/solutions/brvm-research-pro' },
  { name: 'Profil Investisseur UEMOA', href: '/solutions/profil-investisseur-uemoa' },
  { name: 'Simulateur Épargne', href: '/solutions/simulateur-epargne' },
  { name: 'EduFinance', href: '/solutions/edufinance-parcours-epargnant' },
  { name: 'FundAfrique', href: '/solutions/fundafrique-opcvm-afrique' },
];

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSolutionsOpen, setIsSolutionsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-primary/95 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 z-50">
          <span className="text-2xl font-serif font-bold text-white tracking-tight">
            Chain<span className="text-accent">Solutions</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <Link href="/" className={`text-sm font-medium transition-colors ${pathname === '/' ? 'text-accent' : 'text-white hover:text-accent'}`}>
            Accueil
          </Link>
          <Link href="/a-propos" className={`text-sm font-medium transition-colors ${pathname === '/a-propos' ? 'text-accent' : 'text-white hover:text-accent'}`}>
            À propos
          </Link>
          
          <div className="relative group" onMouseEnter={() => setIsSolutionsOpen(true)} onMouseLeave={() => setIsSolutionsOpen(false)}>
            <button className={`flex items-center gap-1 text-sm font-medium transition-colors ${pathname.startsWith('/solutions') ? 'text-accent' : 'text-white hover:text-accent'}`}>
              Solutions <ChevronDown className="w-4 h-4" />
            </button>
            
            <AnimatePresence>
              {isSolutionsOpen && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute top-full left-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-gray-100 overflow-hidden"
                >
                  <div className="p-2 flex flex-col">
                    {solutions.map((solution) => (
                      <Link 
                        key={solution.href} 
                        href={solution.href}
                        className="px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 hover:text-primary rounded-lg transition-colors"
                      >
                        {solution.name}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link href="/blog" className={`text-sm font-medium transition-colors ${pathname === '/blog' ? 'text-accent' : 'text-white hover:text-accent'}`}>
            Blog
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Button variant="accent" asChild>
            <Link href="/contact">Nous contacter</Link>
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className="md:hidden text-white z-50 p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, x: '100%' }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: '100%' }}
              className="fixed inset-0 bg-primary z-40 flex flex-col pt-24 px-6"
            >
              <nav className="flex flex-col gap-6 text-lg">
                <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-medium">Accueil</Link>
                <Link href="/a-propos" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-medium">À propos</Link>
                <div className="flex flex-col gap-4">
                  <span className="text-white/50 text-sm uppercase tracking-wider font-bold">Solutions</span>
                  {solutions.map(s => (
                    <Link key={s.href} href={s.href} onClick={() => setIsMobileMenuOpen(false)} className="text-white pl-4 border-l-2 border-accent/30">
                      {s.name}
                    </Link>
                  ))}
                </div>
                <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-white font-medium">Blog</Link>
                <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-accent font-medium mt-4">Nous contacter</Link>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
