import { NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/nodemailer'

export async function GET (request: Request) {
  return NextResponse.json({ message: 'Fue bien' })
}

export async function POST (request: Request) {
  const { username, email, token } = await request.json()
  const link = `http://localhost:3000/auth/verify?token=${token}`

  try {
    await sendEmail('validate-email', username, link, email, 'Verifica tu cuenta en SoGo Sign')
    return NextResponse.json({ ok: true, message: 'Confirme su correo electronico' })
  } catch (e) {
    return NextResponse.json({ ok: false, message: 'Por favor hable con el administrador' })
  }
}
