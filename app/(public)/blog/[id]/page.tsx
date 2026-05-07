import { Metadata } from 'next';
import { constructMetadata } from '@/lib/seo';
import { prisma } from '@/lib/prisma';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import DOMPurify from 'isomorphic-dompurify';
import Image from 'next/image';
import { JsonLd } from '@/components/seo/JsonLd';

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const post = await prisma.blogEntry.findUnique({ where: { id } });
  
  if (!post) return {};

  return constructMetadata({
    title: `${post.title || 'Article'} | Blog ChainSolutions`,
    description: post.excerpt || "Article du blog ChainSolutions",
    url: `https://chainsolutions.fr/blog/${id}`,
    image: post.coverImageUrl || undefined
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const post = await prisma.blogEntry.findUnique({ where: { id } });

  if (!post || post.status !== 'published') {
    notFound();
  }

  const cleanHtml = post.content ? DOMPurify.sanitize(post.content) : '';
  const tags = post.tags ? post.tags.split(',').map(t => t.trim()).filter(Boolean) : [];

  const blogSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "image": post.coverImageUrl ? [post.coverImageUrl] : [],
    "datePublished": post.publishedAt ? new Date(post.publishedAt).toISOString() : new Date(post.createdAt).toISOString(),
    "dateModified": new Date(post.updatedAt).toISOString(),
    "author": [{
      "@type": "Organization",
      "name": "ChainSolutions",
      "url": "https://chainsolutions.fr"
    }],
    "description": post.excerpt
  };

  return (
    <div className="min-h-screen bg-surface pt-32 pb-24">
      <JsonLd data={blogSchema} />
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-primary transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Retour au blog
          </Link>

          <div className="mb-10">
            <div className="flex items-center gap-4 mb-6">
              <Badge variant="secondary" className="bg-accent/10 text-accent">
                {post.type === 'external' ? 'Lien Externe' : 'News'}
              </Badge>
              <span className="text-sm text-gray-500">
                Publié le {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold text-primary font-serif leading-tight mb-6">
              {post.title}
            </h1>
            {post.excerpt && (
              <p className="text-xl text-text-secondary leading-relaxed">
                {post.excerpt}
              </p>
            )}
          </div>

          {post.coverImageUrl && (
            <div className="w-full h-[400px] rounded-2xl overflow-hidden mb-12 shadow-md relative">
              <Image src={post.coverImageUrl} alt={post.title || 'Image de couverture'} fill className="object-cover" referrerPolicy="no-referrer" />
            </div>
          )}

          {post.type === 'news' && post.content && (
            <div 
              className="prose prose-lg prose-blue max-w-none prose-headings:font-serif prose-headings:text-primary prose-p:text-gray-700 prose-a:text-accent hover:prose-a:text-primary prose-img:rounded-xl"
              dangerouslySetInnerHTML={{ __html: cleanHtml }}
            />
          )}

          {post.type === 'external' && post.url && (
            <div className="mt-8 p-6 bg-gray-50 rounded-xl border border-gray-100 text-center">
              <p className="text-gray-600 mb-4">Cet article est hébergé sur une plateforme externe.</p>
              <a 
                href={post.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-md transition-colors"
              >
                Lire l&apos;article complet
              </a>
            </div>
          )}

          {tags.length > 0 && (
            <div className="mt-12 pt-8 border-t border-gray-200">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-4">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-gray-600 border-gray-300">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
