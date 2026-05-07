import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    const existingAdmin = await prisma.user.findUnique({
      where: { email: 'admin@chainsolutions.fr' }
    });

    if (existingAdmin) {
      return NextResponse.json({ message: 'L\'administrateur existe déjà.' });
    }

    const initialPassword = process.env.INITIAL_ADMIN_PASSWORD || 'ChangeMeImmediately2026!';
    const hashedPassword = await bcrypt.hash(initialPassword, 10);

    const admin = await prisma.user.create({
      data: {
        email: 'admin@chainsolutions.fr',
        password: hashedPassword,
        name: 'Super Admin',
        role: 'SUPERADMIN',
      }
    });

    return NextResponse.json({ 
      message: 'Administrateur créé avec succès ! Veuillez changer le mot de passe immédiatement.', 
      email: admin.email
    });
  } catch (error) {
    console.error('Setup error:', error);
    return NextResponse.json({ error: 'Erreur lors de la création de l\'administrateur' }, { status: 500 });
  }
}
