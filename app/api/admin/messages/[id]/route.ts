import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const message = await prisma.contactMessage.findUnique({ where: { id } })
  if (!message) return NextResponse.json({ error: 'Introuvable' }, { status: 404 })

  if (message.status === 'UNREAD') {
    await prisma.contactMessage.update({
      where: { id },
      data: { status: 'READ' },
    })
  }
  return NextResponse.json(message)
}

export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  const body = await req.json()
  const message = await prisma.contactMessage.update({
    where: { id },
    data: { status: body.status },
  })
  return NextResponse.json(message)
}

export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'Non autorisé' }, { status: 401 })

  const { id } = await params
  await prisma.contactMessage.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
