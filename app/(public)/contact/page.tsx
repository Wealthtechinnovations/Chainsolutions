import { Metadata } from 'next';
import { ContactForm } from '@/components/forms/ContactForm';
import { Mail, MapPin, Phone } from 'lucide-react';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Contactez ChainSolutions | FinTech Afrique",
  description: "Prenez contact avec les experts de ChainSolutions pour découvrir nos solutions FinTech adaptées aux marchés de l'UEMOA.",
  url: "https://chainsolutions.fr/contact"
});

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-serif">
            Contactez <span className="text-accent">ChainSolutions</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Notre équipe d&apos;experts est à votre disposition pour vous accompagner dans la transformation digitale de vos activités financières en Afrique.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h3 className="text-xl font-bold text-primary mb-6 font-serif">Nos Coordonnées</h3>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <MapPin className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Siège Social</h4>
                    <p className="text-text-secondary mt-1">Côte d&apos;Ivoire / France</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                    <Mail className="w-6 h-6 text-accent" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-primary">Email</h4>
                    <a href="mailto:contact@chainsolutions.fr" className="text-text-secondary mt-1 hover:text-accent transition-colors">
                      contact@chainsolutions.fr
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-primary text-white p-8 rounded-2xl shadow-xl relative overflow-hidden">
              <div className="absolute top-[-20%] right-[-20%] w-[60%] h-[60%] rounded-full bg-accent/20 blur-[60px]" />
              <h3 className="text-xl font-bold mb-4 font-serif relative z-10">Support Technique</h3>
              <p className="text-white/80 mb-6 relative z-10">
                Vous êtes déjà client et avez besoin d&apos;assistance sur l&apos;une de nos plateformes ?
              </p>
              <a href="mailto:support@chainsolutions.fr" className="inline-flex items-center gap-2 text-accent font-semibold hover:text-white transition-colors relative z-10">
                Contacter le support <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </div>
  );
}
