import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)

  const [totalMessages, unreadMessages, recentMessages, totalPosts, publishedPosts] =
    await Promise.all([
      prisma.contactMessage.count(),
      prisma.contactMessage.count({ where: { status: 'UNREAD' } }),
      prisma.contactMessage.count({ where: { createdAt: { gte: sevenDaysAgo } } }),
      prisma.blogEntry.count(),
      prisma.blogEntry.count({ where: { status: 'published' } }),
    ])

  return NextResponse.json({
    messages: { total: totalMessages, unread: unreadMessages, recent: recentMessages },
    blog: { total: totalPosts, published: publishedPosts, drafts: totalPosts - publishedPosts },
  })
}
