import { HeroSection } from '@/components/home/HeroSection';
import { StatsSection } from '@/components/home/StatsSection';
import { SolutionsGrid } from '@/components/home/SolutionsGrid';
import { AboutSection } from '@/components/home/AboutSection';
import { CTASection } from '@/components/home/CTASection';
import { JsonLd } from '@/components/seo/JsonLd';

export default function Home() {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "ChainSolutions - FinTech Afrique",
    "url": "https://chainsolutions.fr",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://chainsolutions.fr/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <JsonLd data={websiteSchema} />
      <HeroSection />
      <StatsSection />
      <SolutionsGrid />
      <AboutSection />
      <CTASection />
    </>
  );
}
