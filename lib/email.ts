import { Resend } from 'resend';

let resend: Resend | null = null;

export async function sendEmail({ to, subject, html }: { to: string; subject: string; html: string }) {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY is not set. Email not sent:', { to, subject });
    return;
  }

  if (!resend) {
    resend = new Resend(process.env.RESEND_API_KEY);
  }
  
  try {
    const data = await resend.emails.send({
      from: 'ChainSolutions <noreply@chainsolutions.fr>',
      to,
      subject,
      html,
    });
    return data;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
