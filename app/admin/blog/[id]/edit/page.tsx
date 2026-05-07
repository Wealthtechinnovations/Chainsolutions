'use client';

import { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { BlogEditor } from '@/components/admin/BlogEditor';
import { ArrowLeft, RefreshCw } from 'lucide-react';
import Link from 'next/link';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

export default function EditBlogPost({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [type, setType] = useState<'news' | 'external'>('news');
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    url: '',
    coverImageUrl: '',
    tags: '',
    status: 'draft'
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFetchingMeta, setIsFetchingMeta] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`/api/blog/${id}`);
        if (res.ok) {
          const data = await res.json();
          setType(data.type);
          setFormData({
            title: data.title || '',
            excerpt: data.excerpt || '',
            content: data.content || '',
            url: data.url || '',
            coverImageUrl: data.coverImageUrl || '',
            tags: data.tags || '',
            status: data.status || 'draft'
          });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const fetchMetadata = async () => {
    if (!formData.url) {
      alert('Veuillez entrer une URL valide');
      return;
    }
    
    setIsFetchingMeta(true);
    try {
      const res = await fetch('/api/admin/fetch-metadata', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: formData.url })
      });
      
      if (res.ok) {
        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          title: data.title || prev.title,
          excerpt: data.description || prev.excerpt,
          coverImageUrl: data.image || prev.coverImageUrl
        }));
      } else {
        alert('Impossible de récupérer les métadonnées. Veuillez remplir les champs manuellement.');
      }
    } catch (error) {
      console.error(error);
      alert('Erreur lors de la récupération des métadonnées');
    } finally {
      setIsFetchingMeta(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (type === 'news' && (!formData.title || !formData.content)) {
      alert('Le titre et le contenu sont requis pour une news');
      return;
    }
    
    if (type === 'external' && !formData.url) {
      alert('L\'URL est requise pour un lien externe');
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type,
          ...formData
        })
      });

      if (res.ok) {
        router.push('/admin/blog');
        router.refresh();
      } else {
        const data = await res.json();
        alert(data.error || 'Erreur lors de la modification');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><LoadingSpinner className="w-8 h-8 text-primary" /></div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/blog" className="text-gray-500 hover:text-primary">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h2 className="text-2xl font-bold text-gray-800">Éditer l&apos;article</h2>
      </div>

      <form className="space-y-6 bg-white p-6 rounded-xl shadow-sm border border-gray-100">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Type d&apos;entrée</label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                value="news" 
                checked={type === 'news'} 
                onChange={() => setType('news')}
                className="text-accent focus:ring-accent"
              />
              <span>News interne</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input 
                type="radio" 
                name="type" 
                value="external" 
                checked={type === 'external'} 
                onChange={() => setType('external')}
                className="text-accent focus:ring-accent"
              />
              <span>Lien externe (ex: Medium)</span>
            </label>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            {type === 'external' && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">URL de l&apos;article *</label>
                <div className="flex gap-2">
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                    placeholder="https://medium.com/..."
                    required={type === 'external'}
                  />
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={fetchMetadata}
                    disabled={isFetchingMeta || !formData.url}
                    className="shrink-0"
                    title="Récupérer les métadonnées (titre, image, extrait)"
                  >
                    {isFetchingMeta ? <LoadingSpinner className="w-4 h-4" /> : <RefreshCw className="w-4 h-4" />}
                  </Button>
                </div>
              </div>
            )}
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Titre {type === 'news' && '*'}
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                required={type === 'news'}
                placeholder={type === 'external' ? "Laisser vide pour utiliser le domaine" : ""}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tags (séparés par des virgules)</label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="BRVM, Investissement, IA..."
              />
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image de couverture (URL)</label>
              <input
                type="url"
                value={formData.coverImageUrl}
                onChange={(e) => setFormData({ ...formData, coverImageUrl: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none"
                placeholder="https://..."
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Extrait / Description</label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent outline-none resize-none"
              />
            </div>
          </div>
        </div>

        {type === 'news' && (
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Contenu *</label>
            <BlogEditor 
              content={formData.content} 
              onChange={(content) => setFormData({ ...formData, content })} 
            />
          </div>
        )}

        <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
          <Button 
            type="button" 
            variant="outline" 
            onClick={(e) => handleSubmit(e)}
            disabled={isSubmitting}
          >
            Enregistrer les modifications
          </Button>
        </div>
      </form>
    </div>
  );
}
