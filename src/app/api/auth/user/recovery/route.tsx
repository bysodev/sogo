import { sendEmail } from '@/helpers/nodemailer';
const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function POST(request: Request) {
    const { email } = await request.json()

    if (!email) {
        return new Response(JSON.stringify({ message: 'Error al verificar los parámetros requeridos' }), {
            status: 401,
        })
    }
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    })

    try {
        const response = await fetch(`${url}/user/recovery`, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        })
        const body = await response.json()
        if (response.status === 200) {
            const { username, recovery } = body
            const link = `${process.env.NEXT_PUBLIC_ROUTE_APP}/auth/recovery?token=${recovery}`;
            await sendEmail(
                'recovery-password',
                username,
                email,
                'Reestablece tu cuenta de SoGo Sign',
                link,
                "",
            );
        }
        return new Response(JSON.stringify({ detail: body.detail }), { status: response.status, headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'No se logro la petición' }), {
            status: 501,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const token = searchParams.get('token');

    if (!token) {
        return new Response(JSON.stringify({ message: 'Error al verificar los parámetros requeridos' }), {
            status: 401,
        })
    }
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    try {
        const response = await fetch(`${url}/user/recovery?token=${token}`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        })
        const body = await response.json()
        return new Response(JSON.stringify({ detail: body.detail }), { status: response.status, headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'No se logro la petición' }), {
            status: 501,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}

export async function PUT(request: Request) {
    const { password, token } = await request.json()

    if (!token || !password) {
        return new Response(JSON.stringify({ message: 'Error al verificar los parámetros requeridos' }), {
            status: 401,
        })
    }
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    })

    try {
        const response = await fetch(`${url}/user/recovery?token=${token}`, {
            method: 'PUT',
            body: JSON.stringify({ password }),
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        })
        const body = await response.json()
        return new Response(JSON.stringify({ detail: body.detail }), { status: response.status, headers: { 'Content-Type': 'application/json' } })
    } catch (error) {
        return new Response(JSON.stringify({ message: 'No se logro la petición' }), {
            status: 501,
            headers: { 'Content-Type': 'application/json' },
        })
    }
}