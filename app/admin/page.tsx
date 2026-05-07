import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Mail, MailOpen, FileText, BookOpen, Clock, CheckCircle } from 'lucide-react'

export default async function AdminDashboard() {
  const session = await getServerSession(authOptions)
  if (!session) redirect('/admin/login')

  // eslint-disable-next-line react-hooks/purity
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [
    totalMessages, unreadMessages, recentMessages,
    totalPosts, publishedPosts,
    latestMessages, latestPosts,
  ] = await Promise.all([
    prisma.contactMessage.count(),
    prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
    prisma.contactMessage.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
    prisma.blogEntry.count(),
    prisma.blogEntry.count({ where: { status: 'published' } }),
    prisma.contactMessage.findMany({
      where: { status: 'UNREAD' },
      orderBy: { createdAt: 'desc' },
      take: 5,
    }),
    prisma.blogEntry.findMany({
      orderBy: { createdAt: 'desc' },
      take: 4,
      select: { id: true, title: true, status: true, createdAt: true, category: true },
    }),
  ])

  const stats = [
    { label: 'Non lus', value: unreadMessages, icon: Mail, color: 'text-red-500', bg: 'bg-red-50', href: '/admin/messages?status=UNREAD' },
    { label: 'Messages 7j', value: recentMessages, icon: Clock, color: 'text-blue-500', bg: 'bg-blue-50', href: '/admin/messages' },
    { label: 'Total messages', value: totalMessages, icon: MailOpen, color: 'text-gray-500', bg: 'bg-gray-100', href: '/admin/messages' },
    { label: 'Publiés', value: publishedPosts, icon: CheckCircle, color: 'text-green-500', bg: 'bg-green-50', href: '/admin/blog' },
    { label: 'Brouillons', value: totalPosts - publishedPosts, icon: FileText, color: 'text-yellow-500', bg: 'bg-yellow-50', href: '/admin/blog' },
    { label: 'Total articles', value: totalPosts, icon: BookOpen, color: 'text-purple-500', bg: 'bg-purple-50', href: '/admin/blog' },
  ]

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[#0A1628]">Tableau de bord</h1>
          <p className="text-gray-500 text-sm mt-1">Bienvenue, {session.user?.name}</p>
        </div>
        <Link href="/admin/blog/new"
          className="bg-[#D4A017] text-[#0A1628] font-bold px-4 py-2 rounded-lg text-sm hover:opacity-90 transition-opacity">
          + Nouvel article
        </Link>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-6 gap-4">
        {stats.map((s) => (
          <Link key={s.label} href={s.href}
            className="bg-white rounded-xl p-4 border border-gray-100 hover:shadow-md transition-shadow group">
            <div className={`w-10 h-10 ${s.bg} rounded-lg flex items-center justify-center mb-3`}>
              <s.icon className={`w-5 h-5 ${s.color}`} />
            </div>
            <p className="text-2xl font-bold text-[#0A1628] group-hover:text-[#D4A017] transition-colors">
              {s.value}
            </p>
            <p className="text-gray-500 text-xs mt-1">{s.label}</p>
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0A1628]">Messages non lus</h2>
            <Link href="/admin/messages" className="text-[#D4A017] text-sm hover:underline">Voir tout</Link>
          </div>
          {latestMessages.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Aucun message non lu ✓</p>
          ) : (
            <div className="space-y-2">
              {latestMessages.map((msg) => (
                <Link key={msg.id} href="/admin/messages"
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[#0A1628] truncate group-hover:text-[#D4A017]">
                      {msg.firstName} {msg.lastName}
                    </p>
                    <p className="text-gray-500 text-xs truncate">{msg.subject}</p>
                    <p className="text-gray-400 text-xs">{msg.company}</p>
                  </div>
                  <span className="text-gray-400 text-xs flex-shrink-0">
                    {new Date(msg.createdAt).toLocaleDateString('fr-FR')}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-[#0A1628]">Articles récents</h2>
            <Link href="/admin/blog" className="text-[#D4A017] text-sm hover:underline">Gérer</Link>
          </div>
          {latestPosts.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-6">Aucun article pour l&apos;instant</p>
          ) : (
            <div className="space-y-2">
              {latestPosts.map((post) => (
                <Link key={post.id} href={`/admin/blog/${post.id}/edit`}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group">
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-[#0A1628] truncate group-hover:text-[#D4A017]">
                      {post.title}
                    </p>
                    <p className="text-gray-400 text-xs">{post.category}</p>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium flex-shrink-0 ${
                    post.status === 'published' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {post.status === 'published' ? 'Publié' : 'Brouillon'}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
