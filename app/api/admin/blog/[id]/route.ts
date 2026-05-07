import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const post = await prisma.blogEntry.findUnique({ where: { id } })
  if (!post) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })
  return NextResponse.json(post)
}

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const existing = await prisma.blogEntry.findUnique({ where: { id } })

  const post = await prisma.blogEntry.update({
    where: { id },
    data: {
      ...body,
      publishedAt:
        body.status === 'published' && existing?.status !== 'published'
          ? new Date()
          : body.status !== 'published'
          ? null
          : undefined,
    },
  })
  return NextResponse.json(post)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  await prisma.blogEntry.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
