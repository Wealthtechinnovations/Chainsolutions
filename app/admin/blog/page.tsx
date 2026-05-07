'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from 'lucide-react';

export default function AdminBlog() {
  const [posts, setPosts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/blog');
      if (res.ok) {
        const data = await res.json();
        setPosts(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const deletePost = async (id: string) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cet article ?')) return;
    try {
      await fetch(`/api/blog/${id}`, { method: 'DELETE' });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  const togglePublish = async (id: string, currentStatus: string) => {
    try {
      await fetch(`/api/blog/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: currentStatus === 'published' ? 'draft' : 'published' })
      });
      fetchPosts();
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) return <div className="flex justify-center p-12"><LoadingSpinner className="w-8 h-8 text-primary" /></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-800">Articles du Blog</h2>
        <Button asChild>
          <Link href="/admin/blog/new" className="flex items-center gap-2">
            <Plus className="w-4 h-4" /> Nouvel article
          </Link>
        </Button>
      </div>

      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">
              <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b">
                <tr>
                  <th className="px-6 py-4 font-medium">Titre</th>
                  <th className="px-6 py-4 font-medium">Type</th>
                  <th className="px-6 py-4 font-medium">Statut</th>
                  <th className="px-6 py-4 font-medium">Date</th>
                  <th className="px-6 py-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <tr key={post.id} className="border-b hover:bg-gray-50/50">
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900 line-clamp-1">{post.title || (post.type === 'external' ? new URL(post.url).hostname : 'Sans titre')}</div>
                      {post.type === 'external' && post.url && (
                        <div className="text-xs text-gray-400 mt-1 flex items-center gap-1">
                          <ExternalLink className="w-3 h-3" /> {post.url}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      <Badge variant="outline">{post.type === 'external' ? 'Lien Externe' : 'News'}</Badge>
                    </td>
                    <td className="px-6 py-4">
                      <Badge variant="secondary" className={post.status === 'published' ? 'bg-success/10 text-success' : 'bg-gray-100 text-gray-600'}>
                        {post.status === 'published' ? 'Publié' : 'Brouillon'}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <Button variant="ghost" size="sm" onClick={() => togglePublish(post.id, post.status)} title={post.status === 'published' ? "Dépublier" : "Publier"}>
                        {post.status === 'published' ? <EyeOff className="w-4 h-4 text-gray-500" /> : <Eye className="w-4 h-4 text-gray-500" />}
                      </Button>
                      <Button variant="ghost" size="sm" asChild title="Éditer">
                        <Link href={`/admin/blog/${post.id}/edit`}>
                          <Edit className="w-4 h-4 text-blue-500" />
                        </Link>
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deletePost(post.id)} title="Supprimer">
                        <Trash2 className="w-4 h-4 text-error" />
                      </Button>
                    </td>
                  </tr>
                ))}
                {posts.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-8 text-center text-gray-500">
                      Aucun article trouvé.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
