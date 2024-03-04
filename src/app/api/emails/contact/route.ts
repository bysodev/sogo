import { sendEmail } from '@/helpers/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, email, subject, message } = await request.json();
  try {
    await sendEmail(
      'contact-form',
      username,
      email,
      `Nuevo mensaje de contacto: ${subject}`,
      '',
      message
    );
    return NextResponse.json({
      ok: true,
      message: 'Información enviada correctamente',
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error al procesar la solicitud',
    });
  }
}
