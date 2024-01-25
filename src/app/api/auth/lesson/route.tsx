const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const lesson_id = searchParams.get('lesson_id');
    if (!lesson_id) {
        return new Response('Error en el atributo requerido', {
            status: 401,
        })
    }
    const urlencoded = new URLSearchParams()
    urlencoded.append('number', lesson_id)
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    try {
        const response = await fetch(`${url}/lesson/get/lessonCategory/by/number?${urlencoded.toString()}`, {
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
interface LessonRequestBody {
    token: string;
    id_lesson: number;
    points_reached: number;
    state_id: number;
    fails: number;
    detail_fails: number[];
}


export async function POST(request: Request) {
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    })
    try {
        // Accede a los campos del cuerpo de la solicitud
        const requestBody: LessonRequestBody = await request.json();
        const { token, ...dataWithoutToken } = requestBody;

        myHeaders.append('Authorization', `Bearer ${token}`);
        const response = await fetch(`${url}/user/register/user_lesson`, {
            method: 'POST',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
            body: JSON.stringify(
                dataWithoutToken
            ),
        })
        if (!response.ok) {
            // Manejar cualquier error que pueda ocurrir al enviar la solicitud a la otra API
            return new Response('Error al guardar la lección', {
                status: 500,
            });
        }
        // Si la solicitud a la otra API fue exitosa, puedes retornar una respuesta exitosa
        return new Response('Lección guardada exitosamente', {
            status: 201,
        });
    } catch (error) {
        return new Response('Error al procesar la solicitud', {
            status: 500,
        });
    }
}

export async function PUT(request: Request) {
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/json',
    })
    try {
        // Accede a los campos del cuerpo de la solicitud
        const requestBody: LessonRequestBody = await request.json();
        const { token, ...dataWithoutToken } = requestBody;

        myHeaders.append('Authorization', `Bearer ${token}`);
        const response = await fetch(`${url}/user/update/user_lesson`, {
            method: 'PUT',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
            body: JSON.stringify(
                dataWithoutToken
            ),
        })
        return response
    } catch (error) {
        return new Response('Error al procesar la solicitud', {
            status: 500,
        });
    }
}