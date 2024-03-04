import { sendEmail } from '@/helpers/nodemailer';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { username, email, token } = await request.json();
  const link = `${process.env.NEXT_PUBLIC_ROUTE_APP}/auth/verify?token=${token}`;
  try {
    await sendEmail(
      'validate-email',
      username,
      email,
      'Verifica tu cuenta en SoGo Sign',
      link,
      ''
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
