import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail } from '@/lib/email';
import * as z from 'zod';

const contactSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  company: z.string().min(2),
  phone: z.string().optional(),
  subject: z.string().min(1),
  message: z.string().min(20).max(2000),
  rgpd: z.boolean().refine(val => val === true),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const validatedData = contactSchema.parse(body);

    const ipAddress = req.headers.get('x-forwarded-for') || req.headers.get('remote-addr');

    // Save to database
    const message = await prisma.contactMessage.create({
      data: {
        firstName: validatedData.firstName,
        lastName: validatedData.lastName,
        email: validatedData.email,
        company: validatedData.company,
        phone: validatedData.phone,
        subject: validatedData.subject,
        message: validatedData.message,
        ipAddress: ipAddress,
      },
    });

    // Send email to admin
    const adminEmail = process.env.ADMIN_EMAIL;
    if (adminEmail) {
      await sendEmail({
        to: adminEmail,
        subject: `Nouveau message de contact : ${validatedData.subject}`,
        html: `
          <h2>Nouveau message depuis le site ChainSolutions</h2>
          <p><strong>De :</strong> ${validatedData.firstName} ${validatedData.lastName} (${validatedData.email})</p>
          <p><strong>Société :</strong> ${validatedData.company}</p>
          <p><strong>Téléphone :</strong> ${validatedData.phone || 'Non renseigné'}</p>
          <p><strong>Objet :</strong> ${validatedData.subject}</p>
          <hr />
          <p><strong>Message :</strong></p>
          <p>${validatedData.message.replace(/\n/g, '<br />')}</p>
        `,
      });
    }

    // Send confirmation email to user
    await sendEmail({
      to: validatedData.email,
      subject: `Confirmation de réception - ChainSolutions`,
      html: `
        <h2>Bonjour ${validatedData.firstName},</h2>
        <p>Nous avons bien reçu votre message concernant "${validatedData.subject}".</p>
        <p>Notre équipe d'experts prendra contact avec vous dans les plus brefs délais.</p>
        <br />
        <p>Cordialement,</p>
        <p><strong>L'équipe ChainSolutions</strong></p>
      `,
    });

    return NextResponse.json(
      { message: 'Message envoyé avec succès', id: message.id },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Données invalides', details: (error as any).errors }, { status: 400 });
    }
    console.error('Contact API Error:', error);
    return NextResponse.json({ error: 'Erreur serveur interne' }, { status: 500 });
  }
}
