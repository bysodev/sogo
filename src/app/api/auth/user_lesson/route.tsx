const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
    const authHeader = request.headers.get('authorization');
    const token = authHeader && authHeader.split(' ')[1];
    const { searchParams } = new URL(request.url)
    const id_lesson = searchParams.get('id_lesson');
    if (!id_lesson) {
        return new Response('Error en el atributo requerido', {
            status: 401,
        })
    }
    const urlencoded = new URLSearchParams()
    urlencoded.append('id_lesson', id_lesson)

    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    myHeaders.append('Authorization', `Bearer ${token}`);
    try {
        const response = await fetch(`${url}/lesson/get/by/user_lesson?${urlencoded.toString()}`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow'
        })
        const response_dict = await response.json()
        if (response.status === 200) {
            return new Response(JSON.stringify(response_dict), {
                status: 200,
            })
        }
        return new Response(response_dict.detail, { status: response.status })
    } catch (error) {
        return new Response('No se logro la petición', {
            status: 501,
        })
    }
}