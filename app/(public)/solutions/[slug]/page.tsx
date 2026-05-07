import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { notFound } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import { ArrowRight, CheckCircle2, ExternalLink, Target, Zap, Shield, Users, Lightbulb, BarChart3, LayoutDashboard, ArrowUpRight } from 'lucide-react';
import { JsonLd } from '@/components/seo/JsonLd';

const solutionsData = {
  'brvm-research-pro': {
    title: 'BRVM Research PRO',
    heroTitle: 'BRVM Research PRO — L’intelligence financière augmentée pour analyser la BRVM',
    subtitle: 'Une solution d’analyse boursière conçue pour transformer les données financières des sociétés cotées en informations lisibles, structurées et actionnables, grâce à une interface moderne et à une logique d’assistance intelligente.',
    description: 'BRVM Research PRO est une application pensée pour démocratiser l’analyse financière sur la Bourse Régionale des Valeurs Mobilières. Elle permet de réduire la distance entre la publication brute d’une société cotée et sa compréhension réelle par l’utilisateur. L’objectif est simple : rendre l’analyse plus rapide, plus claire et plus exploitable, aussi bien pour les investisseurs particuliers que pour les professionnels qui ont besoin d’un premier niveau de lecture structuré avant approfondissement.',
    problem: {
      title: 'Pourquoi cette solution',
      content: 'Sur de nombreux marchés, l’accès à l’information ne suffit pas : encore faut-il pouvoir l’interpréter rapidement. BRVM Research PRO répond à ce besoin en proposant une lecture assistée des résultats financiers, en mettant en avant les éléments essentiels, les tendances de performance, les signaux à surveiller et les premiers points d’attention. L’utilisateur gagne du temps, réduit le risque de passer à côté d’une information importante et bénéficie d’une expérience d’analyse plus pédagogique.'
    },
    features: [
      'Analyse structurée des sociétés cotées de la BRVM',
      'Lecture accélérée des publications financières',
      'Mise en avant des indicateurs clés de performance',
      'Aide à l’identification des tendances, signaux et points d’attention',
      'Interface conçue pour rendre l’analyse plus compréhensible et plus accessible',
      'Expérience pensée pour rapprocher les particuliers des standards d’analyse professionnels'
    ],
    benefits: [
      'Pour l’investisseur particulier, la plateforme facilite l’entrée dans l’analyse boursière en rendant les documents financiers moins intimidants.',
      'Pour le professionnel, elle agit comme une couche de pré-analyse qui permet de gagner en efficacité sur le traitement initial de l’information.',
      'Pour l’écosystème, elle contribue à renforcer la culture financière, la transparence perçue et la capacité des épargnants à prendre des décisions plus éclairées.'
    ],
    target: [
      'Investisseurs particuliers souhaitant mieux comprendre la BRVM',
      'Investisseurs intermédiaires qui veulent structurer leur analyse',
      'Conseillers, analystes juniors, commerciaux financiers',
      'Étudiants, apprenants et publics en phase d’éducation financière',
      'Structures souhaitant diffuser une culture d’investissement plus accessible'
    ],
    differentiation: {
      title: 'Promesse de marque',
      content: 'BRVM Research PRO ne remplace pas le jugement humain. La plateforme aide à mieux lire, mieux organiser et mieux comprendre l’information financière, afin de permettre des décisions plus rigoureuses et plus confiantes.'
    },
    ctas: [
      'Explorer l’analyse BRVM',
      'Tester l’assistant d’analyse',
      'Découvrir les sociétés cotées',
      'Commencer une lecture assistée'
    ],
    seoDescription: 'BRVM Research PRO transforme l’analyse boursière en une expérience plus intelligente, plus rapide et plus accessible. En structurant les publications des sociétés cotées et en mettant en évidence les informations essentielles, la plateforme aide chaque utilisateur à passer de la donnée brute à une lecture utile, claire et exploitable.',
    appUrl: 'https://brvm.chainsolutions.fr/',
    color: '#1E90FF',
    icon: BarChart3
  },
  'profil-investisseur-uemoa': {
    title: 'Profil Investisseur UEMOA',
    heroTitle: 'Profil Investisseur UEMOA — Identifiez votre profil de risque avant d’investir',
    subtitle: 'Un outil de profilage intelligent conçu pour aider chaque investisseur à mieux comprendre sa tolérance au risque, ses objectifs et l’horizon de placement le plus cohérent avec sa situation.',
    description: 'Profil Investisseur UEMOA est une solution de diagnostic qui place l’adéquation investisseur-produit au cœur du parcours. Avant d’investir, il est essentiel de savoir si l’on est prudent, équilibré, dynamique ou orienté performance long terme. Cette application automatise ce travail de qualification afin d’orienter l’utilisateur vers des décisions plus cohérentes avec ses objectifs réels et sa capacité à supporter la volatilité.',
    problem: {
      title: 'Pourquoi cette solution',
      content: 'Beaucoup d’investisseurs choisissent des produits sans avoir formalisé leur profil. Cela crée un décalage entre attentes, comportement face au risque et allocation effectivement retenue. Profil Investisseur UEMOA a été conçu pour corriger ce point critique : il structure le questionnement, qualifie la posture de l’utilisateur et fournit une base rationnelle pour choisir des solutions d’investissement mieux adaptées.'
    },
    features: [
      'Collecte et structure les informations essentielles sur l’utilisateur',
      'Évalue la tolérance au risque',
      'Prend en compte les objectifs patrimoniaux et financiers',
      'Intègre la logique d’horizon de placement',
      'Aide à distinguer prudence, équilibre, dynamique et recherche de performance',
      'Produit un profil exploitable pour orienter les solutions proposées'
    ],
    benefits: [
      'L’utilisateur obtient une vision plus claire de sa propre posture d’investisseur.',
      'Il comprend mieux pourquoi certains produits sont adaptés et d’autres non.',
      'Il gagne en confiance dans ses décisions, parce que celles-ci reposent sur une logique de cohérence et non sur une simple intuition ou un effet de mode.'
    ],
    target: [
      'Nouveaux investisseurs',
      'Épargnants souhaitant formaliser leur profil',
      'Réseaux commerciaux et conseillers',
      'Plateformes de distribution de produits d’investissement',
      'Structures éducatives ou institutionnelles souhaitant sensibiliser les utilisateurs aux bonnes pratiques d’investissement'
    ],
    differentiation: {
      title: 'Valeur pédagogique',
      content: 'Au-delà du simple profilage, la plateforme constitue un outil d’éducation financière : elle oblige l’utilisateur à réfléchir à son rapport au risque, à ses contraintes, à son horizon et à ses priorités. Elle transforme un questionnaire en outil de prise de conscience.'
    },
    ctas: [
      'Découvrir mon profil',
      'Évaluer ma tolérance au risque',
      'Commencer le diagnostic',
      'Obtenir une orientation adaptée'
    ],
    seoDescription: 'Profil Investisseur UEMOA a été conçu pour sécuriser la première étape de toute démarche d’investissement : la compréhension de soi. En automatisant le profilage de l’utilisateur, la solution aide à aligner objectifs, tolérance au risque et choix d’investissement dans une logique d’adéquation, de pédagogie et de discipline.',
    appUrl: 'https://profil.chainsolutions.fr/',
    color: '#8B5CF6',
    icon: Shield
  },
  'simulateur-epargne': {
    title: 'Simulateur Épargne',
    heroTitle: 'Simulateur Épargne — Visualisez l’impact concret de votre effort d’épargne',
    subtitle: 'Une application de projection simple et pédagogique pour transformer une intention d’épargner en trajectoire chiffrée, mesurable et compréhensible.',
    description: 'Le Simulateur Épargne permet de donner une forme concrète à un projet financier. En renseignant des hypothèses simples — effort d’épargne, durée, rythme, objectifs — l’utilisateur peut visualiser l’évolution potentielle de son capital dans le temps. L’application fait passer l’épargne du stade d’idée abstraite à celui de projet structuré.',
    problem: {
      title: 'Pourquoi cette solution',
      content: 'Beaucoup de personnes souhaitent épargner, mais peu mesurent réellement l’effet du temps, de la régularité et de la discipline sur le résultat final. Le Simulateur Épargne a été pensé pour rendre ce mécanisme visible. En quelques interactions, l’utilisateur comprend comment un versement régulier peut devenir un projet de long terme, avec une lecture claire de l’effort nécessaire et des résultats envisageables.'
    },
    features: [
      'Permet de projeter une épargne régulière dans le temps',
      'Aide à visualiser l’évolution potentielle du capital',
      'Rend plus concret l’impact de la discipline d’épargne',
      'Facilite la comparaison de scénarios',
      'Aide à relier effort mensuel, horizon de temps et objectif financier',
      'Transforme une intention en plan financier lisible'
    ],
    benefits: [
      'L’utilisateur comprend plus vite les effets cumulés de ses versements.',
      'Il peut ajuster ses ambitions selon ses capacités.',
      'Il visualise les compromis entre montant, durée et résultat.',
      'Il s’approprie la logique de construction progressive d’un patrimoine.'
    ],
    target: [
      'Particuliers débutant dans la gestion de leur épargne',
      'Jeunes actifs',
      'Familles souhaitant planifier un projet',
      'Réseaux de distribution et structures pédagogiques',
      'Utilisateurs ayant besoin d’une première estimation simple et visuelle'
    ],
    differentiation: {
      title: 'Cas d’usage',
      content: 'Préparer un projet de moyen ou long terme. Évaluer la faisabilité d’un objectif d’épargne. Comparer plusieurs niveaux d’effort. Sensibiliser un public débutant aux mécanismes de capitalisation. Servir de point d’entrée dans un parcours d’éducation financière.'
    },
    ctas: [
      'Lancer ma simulation',
      'Construire mon objectif d’épargne',
      'Comparer mes scénarios',
      'Visualiser mon capital futur'
    ],
    seoDescription: 'Le Simulateur Épargne aide l’utilisateur à se projeter. En montrant de manière claire l’effet d’un effort régulier dans le temps, il transforme une idée d’épargne en trajectoire compréhensible, motivante et actionnable.',
    appUrl: 'https://simulateur.chainsolutions.fr/',
    color: '#10B981',
    icon: Zap
  },
  'edufinance-parcours-epargnant': {
    title: 'Parcours Épargnant UEMOA',
    heroTitle: 'Parcours Épargnant UEMOA — L’éducation financière interactive au service de la décision',
    subtitle: 'Une expérience pédagogique conçue pour aider l’utilisateur à comprendre les mécanismes de l’épargne, du rendement, du risque et de l’investissement dans l’environnement UEMOA.',
    description: 'Parcours Épargnant UEMOA est une solution éducative pensée pour rendre les notions financières plus intuitives, plus concrètes et plus engageantes. L’application propose un cheminement progressif dans lequel l’utilisateur n’est plus simple lecteur d’informations financières, mais acteur de sa compréhension. Elle fait le lien entre théorie financière, logique patrimoniale et prise de décision.',
    problem: {
      title: 'Pourquoi cette solution',
      content: 'L’un des principaux freins à l’investissement est la peur de l’inconnu : vocabulaire technique, concepts abstraits, manque de repères, impression que la finance est réservée aux initiés. Parcours Épargnant UEMOA a précisément vocation à lever cette barrière. En rendant les notions plus digestes, plus illustrées et plus structurées, la plateforme permet à l’utilisateur d’apprendre sans intimidation.'
    },
    features: [
      'Propose une immersion interactive dans les notions d’épargne et d’investissement',
      'Explique les concepts de rendement, risque et arbitrage',
      'Aide l’utilisateur à comprendre les bases avant de choisir une solution',
      'Crée un pont entre théorie financière et décision réelle',
      'Favorise la montée en compétence progressive',
      'Contribue à réduire la peur liée à la complexité des marchés'
    ],
    benefits: [
      'L’utilisateur apprend à son rythme.',
      'Il comprend les fondamentaux avant d’agir.',
      'Il gagne en autonomie intellectuelle et en confiance.',
      'Il développe une base utile avant de passer à des outils plus avancés comme le profilage ou l’analyse financière.'
    ],
    target: [
      'Débutants complets',
      'Jeunes épargnants',
      'Utilisateurs souhaitant comprendre avant d’investir',
      'Structures d’éducation financière',
      'Institutions ou plateformes souhaitant diffuser des contenus pédagogiques modernes'
    ],
    differentiation: {
      title: 'Rôle dans l’écosystème',
      content: 'Cette application joue un rôle central dans une stratégie d’inclusion financière : elle rend le langage de la finance plus accessible et participe à faire émerger des investisseurs mieux formés, plus confiants et plus aptes à prendre des décisions responsables.'
    },
    ctas: [
      'Commencer mon parcours',
      'Découvrir les bases de l’investissement',
      'Comprendre rendement et risque',
      'Apprendre avant d’investir'
    ],
    seoDescription: 'Parcours Épargnant UEMOA transforme l’éducation financière en expérience interactive. En rendant les concepts d’investissement plus accessibles, la solution aide l’utilisateur à passer de la simple curiosité à une compréhension structurée, puis de la compréhension à une décision plus sereine.',
    appUrl: 'https://edufinance.chainsolutions.fr/',
    color: '#F59E0B',
    icon: Lightbulb
  },
  'fundafrique-opcvm-afrique': {
    title: 'Fundafrique',
    heroTitle: 'Fundafrique — La plateforme de référence pour découvrir, comparer et valoriser les OPCVM africains',
    subtitle: 'Une plateforme dédiée aux fonds africains qui combine analyse, conseil, technologie financière, conformité et visibilité internationale pour les investisseurs, les sociétés de gestion et les partenaires institutionnels.',
    description: 'Fundafrique est une plateforme construite autour d’une ambition forte : rendre l’univers des OPCVM africains plus visible, plus intelligible et plus accessible. Elle associe expertise locale, conseil institutionnel et innovation technologique pour proposer un environnement orienté à la fois vers l’analyse des fonds, l’accompagnement des investisseurs et la modernisation de la distribution financière.',
    problem: {
      title: 'Pourquoi cette solution',
      content: 'Le marché des fonds africains souffre souvent d’un déficit de visibilité, de comparabilité et de standardisation digitale. Fundafrique répond à ce besoin en créant une interface qui permet d’ordonner l’offre, de mieux expliquer les fonds, d’améliorer l’expérience investisseur et de soutenir les acteurs du marché avec des outils plus modernes.'
    },
    features: [
      'Analyse et comparaison de fonds africains',
      'Conseil institutionnel et optimisation de portefeuille',
      'Mise en concurrence et sélection de gérants',
      'Accès à des stratégies diversifiées',
      'Présentation d’OPCVM, ETF et immobilier',
      'Robot advisor pour conseil financier automatisé',
      'KYC digitalisé pour moderniser l’onboarding',
      'Distribution internationale et visibilité transfrontalière',
      'Positionnement explicite sur conformité et collaboration avec les régulateurs'
    ],
    benefits: [
      'Pour les investisseurs : accès à une plateforme plus structurée pour comprendre les fonds, comparer les approches de gestion et bénéficier d’un environnement qui combine pédagogie, orientation et technologie.',
      'Pour les sociétés de gestion : vitrine, canal de visibilité, support de distribution, outil de mise en avant des stratégies et passerelle vers un écosystème plus digitalisé.',
      'Pour les institutionnels : conseil institutionnel, analyse de portefeuille, due diligence, sélection de fonds et diversification.'
    ],
    target: [
      'Investisseurs particuliers souhaitant découvrir les OPCVM africains',
      'Institutionnels recherchant un cadre de comparaison ou de conseil',
      'Sociétés de gestion cherchant visibilité et distribution',
      'Partenaires fintech et acteurs de l’innovation financière',
      'Écosystème réglementaire et parties prenantes du marché financier'
    ],
    differentiation: {
      title: 'Piliers de différenciation',
      content: '1. Expertise marché africain : Une connaissance du contexte local et régional, appliquée aux véhicules collectifs. 2. Technologie appliquée à la finance : L’utilisation d’outils digitaux pour améliorer comparaison, conseil, onboarding et distribution. 3. Orientation conformité : Un positionnement explicite sur KYC, sécurité, transparence et dialogue avec les régulateurs. 4. Vision transfrontalière : Une volonté claire de renforcer la visibilité des fonds au-delà de leur marché domestique.'
    },
    ctas: [
      'Découvrir les fonds africains',
      'Comparer les OPCVM',
      'Explorer les sociétés de gestion',
      'Accéder aux outils d’analyse',
      'Demander une présentation institutionnelle'
    ],
    seoDescription: 'Fundafrique est une plateforme conçue pour structurer l’accès aux OPCVM africains dans une logique de transparence, de comparabilité et d’innovation. En réunissant analyse de fonds, conseil institutionnel, robot advisor, KYC digitalisé et ambition de distribution internationale, elle se positionne comme une infrastructure digitale au service de l’investissement collectif en Afrique.',
    appUrl: 'https://funds.chainsolutions.fr/',
    color: '#D4A017',
    icon: Target
  }
};

export function generateStaticParams() {
  return Object.keys(solutionsData).map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const solution = solutionsData[slug as keyof typeof solutionsData];
  
  if (!solution) return {};

  return constructMetadata({
    title: `${solution.title} | ChainSolutions FinTech UEMOA`,
    description: solution.seoDescription,
    url: `https://chainsolutions.fr/solutions/${slug}`
  });
}

export default async function SolutionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const solution = solutionsData[slug as keyof typeof solutionsData];

  if (!solution) {
    notFound();
  }

  const Icon = solution.icon;
  const titleParts = solution.heroTitle.split('—');
  const mainTitle = titleParts[0]?.trim() || solution.title;
  const subTitle = titleParts[1]?.trim() || '';

  const softwareSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": solution.title,
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "Web",
    "description": solution.seoDescription,
    "url": `https://chainsolutions.fr/solutions/${slug}`,
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "EUR"
    }
  };

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <JsonLd data={softwareSchema} />
      {/* 1. Hero Section */}
      <section className="container mx-auto px-4 md:px-6 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 text-sm font-semibold shadow-sm" style={{ color: solution.color }}>
              <Icon className="w-4 h-4" />
              Solution FinTech
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary font-serif leading-tight">
              {mainTitle}
              {subTitle && (
                <>
                  <br />
                  <span className="text-2xl md:text-3xl lg:text-4xl font-sans font-medium text-text-secondary mt-4 block">
                    {subTitle}
                  </span>
                </>
              )}
            </h1>
            <p className="text-xl text-text-secondary leading-relaxed">
              {solution.subtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button size="lg" asChild style={{ backgroundColor: solution.color, color: 'white' }} className="hover:opacity-90 shadow-lg hover:shadow-xl transition-all">
                <a href={solution.appUrl} target="_blank" rel="noopener noreferrer">
                  {solution.ctas[0]} <ExternalLink className="w-5 h-5 ml-2" />
                </a>
              </Button>
              <Button size="lg" variant="outline" asChild className="bg-white">
                <Link href="/contact">Demander une démo</Link>
              </Button>
            </div>
          </div>
          <div className="relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-2xl border border-white/20 bg-gradient-to-br from-white/5 to-white/20 backdrop-blur-sm flex items-center justify-center">
            <div className="absolute inset-0 bg-primary/5 mix-blend-overlay" />
            <div className="relative z-10 text-center p-8">
              <LayoutDashboard className="w-24 h-24 mx-auto mb-6 opacity-50" style={{ color: solution.color }} />
              <p className="text-lg font-medium text-primary/60">Interface {solution.title}</p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section Problème Marché */}
      <section className="bg-white py-24 border-y border-gray-100">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-primary font-serif">
              {solution.problem.title}
            </h2>
            <p className="text-xl text-text-secondary leading-relaxed">
              {solution.description}
            </p>
            <div className="p-8 rounded-2xl bg-surface border border-gray-100 text-left mt-8">
              <p className="text-lg text-gray-700 leading-relaxed">
                {solution.problem.content}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Section Fonctionnalités */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-6 font-serif">Ce que fait la plateforme</h2>
          <p className="text-lg text-text-secondary">
            Une suite d&apos;outils conçue pour répondre aux besoins spécifiques de notre écosystème.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {solution.features.map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6" style={{ backgroundColor: `${solution.color}15`, color: solution.color }}>
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <p className="text-gray-800 font-medium leading-relaxed">{feature}</p>
            </div>
          ))}
        </div>
      </section>

      {/* 4 & 5. Cas d'usage et Bénéfices */}
      <section className="bg-primary text-white py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">Bénéfices utilisateurs</h2>
                <div className="space-y-6">
                  {solution.benefits.map((benefit, i) => (
                    <div key={i} className="flex gap-4">
                      <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 mt-1">
                        <ArrowRight className="w-4 h-4 text-accent" />
                      </div>
                      <p className="text-white/80 text-lg leading-relaxed">{benefit}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="space-y-10">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-6 font-serif">À qui s&apos;adresse la solution ?</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {solution.target.map((t, i) => (
                    <div key={i} className="bg-white/5 border border-white/10 p-4 rounded-xl flex items-center gap-3">
                      <Users className="w-5 h-5 text-accent shrink-0" />
                      <span className="text-white/90 font-medium">{t}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. Différenciation */}
      <section className="py-24 container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto bg-white p-10 md:p-16 rounded-3xl shadow-xl border border-gray-100 text-center">
          <div className="w-16 h-16 mx-auto bg-surface rounded-2xl flex items-center justify-center mb-8">
            <Shield className="w-8 h-8" style={{ color: solution.color }} />
          </div>
          <h2 className="text-3xl font-bold text-primary mb-6 font-serif">{solution.differentiation.title}</h2>
          <p className="text-xl text-text-secondary leading-relaxed">
            {solution.differentiation.content}
          </p>
        </div>
      </section>

      {/* 7. CTA Final */}
      <section className="container mx-auto px-4 md:px-6 pb-12">
        <div className="bg-surface rounded-3xl p-10 md:p-16 text-center border border-gray-200">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-8 font-serif">Prêt à passer à l&apos;action ?</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {solution.ctas.map((cta, i) => (
              <Button key={i} size="lg" variant={i === 0 ? 'default' : 'outline'} asChild className={i === 0 ? 'shadow-lg' : 'bg-white'} style={i === 0 ? { backgroundColor: solution.color, color: 'white' } : {}}>
                {i === 0 ? (
                  <a href={solution.appUrl} target="_blank" rel="noopener noreferrer">
                    {cta} <ArrowUpRight className="w-5 h-5 ml-2" />
                  </a>
                ) : (
                  <Link href="/contact">{cta}</Link>
                )}
              </Button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
