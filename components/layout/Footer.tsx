import Link from 'next/link';
import { Facebook, Twitter, Linkedin, Instagram, Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-primary text-white pt-16 pb-8 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl font-serif font-bold text-white tracking-tight">
                Chain<span className="text-accent">Solutions</span>
              </span>
            </Link>
            <p className="text-white/70 text-sm leading-relaxed">
              L&apos;écosystème FinTech de référence pour les marchés financiers de la zone UEMOA et d&apos;Afrique subsaharienne.
            </p>
            <div className="flex items-center gap-4 mt-2">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif font-semibold text-lg">Nos Solutions</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li><Link href="/solutions/brvm-research-pro" className="hover:text-accent transition-colors">BRVM Research PRO</Link></li>
              <li><Link href="/solutions/profil-investisseur-uemoa" className="hover:text-accent transition-colors">Profil Investisseur UEMOA</Link></li>
              <li><Link href="/solutions/simulateur-epargne" className="hover:text-accent transition-colors">Simulateur Épargne</Link></li>
              <li><Link href="/solutions/edufinance-parcours-epargnant" className="hover:text-accent transition-colors">EduFinance</Link></li>
              <li><Link href="/solutions/fundafrique-opcvm-afrique" className="hover:text-accent transition-colors">FundAfrique</Link></li>
            </ul>
          </div>

          {/* Entreprise */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif font-semibold text-lg">Entreprise</h4>
            <ul className="flex flex-col gap-3 text-sm text-white/70">
              <li><Link href="/a-propos" className="hover:text-accent transition-colors">À propos</Link></li>
              <li><Link href="/blog" className="hover:text-accent transition-colors">Blog & Actualités</Link></li>
              <li><Link href="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
              <li><Link href="/politique-de-confidentialite" className="hover:text-accent transition-colors">Politique de confidentialité</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-serif font-semibold text-lg">Contact</h4>
            <ul className="flex flex-col gap-4 text-sm text-white/70">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span>Côte d&apos;Ivoire / France</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <a href="mailto:contact@chainsolutions.fr" className="hover:text-accent transition-colors">contact@chainsolutions.fr</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-white/50">
          <p>&copy; {new Date().getFullYear()} ChainSolutions. Tous droits réservés.</p>
          <div className="flex items-center gap-4">
            <p>Technologie financière africaine de référence.</p>
            <Link href="/admin/login" className="hover:text-accent transition-colors">Connexion Admin</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
