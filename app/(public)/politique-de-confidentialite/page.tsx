import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';

export const metadata: Metadata = constructMetadata({
  title: "Politique de confidentialité | ChainSolutions",
  description: "Politique de confidentialité et de protection des données personnelles de ChainSolutions.",
  url: "https://chainsolutions.fr/politique-de-confidentialite"
});

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6 max-w-4xl">
        <h1 className="text-4xl font-bold text-primary mb-8 font-serif">Politique de Confidentialité</h1>
        <div className="prose prose-lg text-text-secondary">
          <p>Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}</p>
          <h2>1. Collecte des données</h2>
          <p>Nous collectons les informations que vous nous fournissez directement via nos formulaires de contact ou lors de l&apos;utilisation de nos applications.</p>
          <h2>2. Utilisation des données</h2>
          <p>Vos données sont utilisées exclusivement pour vous fournir nos services, répondre à vos demandes et améliorer votre expérience utilisateur.</p>
          <h2>3. Protection des données</h2>
          <p>Nous mettons en œuvre des mesures de sécurité techniques et organisationnelles appropriées pour protéger vos données personnelles contre toute destruction, perte, altération ou accès non autorisé.</p>
          <h2>4. Vos droits</h2>
          <p>Conformément à la réglementation en vigueur, vous disposez d&apos;un droit d&apos;accès, de rectification, d&apos;effacement et d&apos;opposition au traitement de vos données. Pour exercer ces droits, contactez-nous à privacy@chainsolutions.fr.</p>
        </div>
      </div>
    </div>
  );
}
