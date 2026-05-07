import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '10')
  const skip = (page - 1) * limit

  const [posts, total] = await Promise.all([
    prisma.blogEntry.findMany({
      orderBy: { createdAt: 'desc' },
      skip,
      take: limit,
      select: {
        id: true, title: true, slug: true, status: true,
        publishedAt: true, category: true, createdAt: true, excerpt: true,
        type: true,
      },
    }),
    prisma.blogEntry.count(),
  ])

  return NextResponse.json({
    posts,
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
  })
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const body = await req.json()
  const { title, slug, excerpt, content, coverImageUrl, metaDescription, tags, category, status, type } = body

  if (!title || !content) {
    return NextResponse.json({ error: 'Titre et contenu requis' }, { status: 400 })
  }

  const post = await prisma.blogEntry.create({
    data: {
      type: type || 'news',
      title,
      slug: slug || null,
      excerpt: excerpt || '',
      content,
      coverImageUrl: coverImageUrl || null,
      metaDescription: metaDescription || '',
      tags: tags || '',
      category: category || 'Actualités',
      status: status || 'draft',
      publishedAt: status === 'published' ? new Date() : null,
    },
  })

  return NextResponse.json(post, { status: 201 })
}
