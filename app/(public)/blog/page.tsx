import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { ArrowRight, ExternalLink } from 'lucide-react';
import Image from 'next/image';

export const metadata: Metadata = constructMetadata({
  title: "Blog & Actualités | ChainSolutions",
  description: "Découvrez nos derniers articles, analyses et actualités sur la FinTech et les marchés financiers en Afrique.",
  url: "https://chainsolutions.fr/blog"
});

export const dynamic = 'force-dynamic';

export default async function BlogPage() {
  const posts = await prisma.blogEntry.findMany({
    where: { status: 'published' },
    orderBy: { publishedAt: 'desc' }
  });

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-primary mb-6 font-serif">
            Blog & <span className="text-accent">Actualités</span>
          </h1>
          <p className="text-lg text-text-secondary">
            Analyses de marché, actualités FinTech et conseils pour optimiser vos investissements en zone UEMOA.
          </p>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            Aucune actualité pour le moment.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {posts.map(post => {
              const isExternal = post.type === 'external';
              const linkHref = isExternal && post.url ? post.url : `/blog/${post.id}`;
              const linkTarget = isExternal ? "_blank" : "_self";
              const linkRel = isExternal ? "noopener noreferrer" : "";
              const displayTitle = post.title || (isExternal && post.url ? new URL(post.url).hostname : 'Article');

              return (
                <Card key={post.id} className="h-full flex flex-col hover:shadow-lg transition-shadow border-gray-100">
                  {post.coverImageUrl && (
                    <div className="h-48 w-full bg-gray-200 relative overflow-hidden rounded-t-xl">
                      <Image src={post.coverImageUrl} alt={displayTitle} fill className="object-cover" referrerPolicy="no-referrer" />
                    </div>
                  )}
                  <CardHeader>
                    <div className="flex items-center justify-between mb-3">
                      <Badge variant="secondary" className="bg-accent/10 text-accent hover:bg-accent/20">
                        {isExternal ? 'Lien Externe' : 'News'}
                      </Badge>
                      <span className="text-xs text-gray-400">
                        {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR') : ''}
                      </span>
                    </div>
                    <CardTitle className="text-xl text-primary line-clamp-2 leading-snug">
                      <Link href={linkHref} target={linkTarget} rel={linkRel} className="hover:text-accent transition-colors">
                        {displayTitle}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-base text-text-secondary line-clamp-3">
                      {post.excerpt}
                    </CardDescription>
                  </CardContent>
                  <div className="p-6 pt-0 mt-auto">
                    <Link href={linkHref} target={linkTarget} rel={linkRel} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent transition-colors">
                      {isExternal ? 'Lire l\'article' : 'Lire'} {isExternal ? <ExternalLink className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
