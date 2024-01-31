const url = process.env.NEXT_PUBLIC_API_BACKEND

// LOGIN OR REGISTER PROVIDER
export async function POST(request: Request) {
    const { username, password, email, image, provider } = await request.json()

    if (!username || !password || !email || !image) {
        return new Response('No se logro la petición, faltan campos', {
            status: 401,
        })
    }
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json'
    })
    try {
        const response = await fetch(`${url}/user/loginProvider`, {
            method: 'POST',
            body: JSON.stringify({
                username,
                password,
                email,
                image,
                provider_name: provider
            }),
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        })
        const userData = await response.json()
        if (response.status === 201) {
            return new Response(JSON.stringify(userData), {
                status: 201,
            })
        }
        return new Response(userData.detail, { status: response.status })
    } catch (error) {
        return new Response('Error al procesar la solicitud', {
            status: 501,
        })
    }
}