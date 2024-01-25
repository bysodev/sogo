import { sendEmail } from '@/helpers/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, email, token } = await request.json();
  const link = `${process.env.NEXT_PUBLIC_URL}}/auth/verify?token=${token}`;

  try {
    await sendEmail(
      'validate-email',
      username,
      link,
      email,
      'Verifica tu cuenta en SoGo Sign'
    );
    return NextResponse.json({
      ok: true,
      message:
        'Confirma tu correo electronico para continuar con el proceso de verficación',
    });
  } catch (e) {
    return NextResponse.json({
      ok: false,
      message: 'Error al procesar la solicitud',
    });
  }
}
