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
    detail_fails: string[];
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


// export async function POST(request: Request) {
//     console.log(request)
//     const { searchParams } = new URL(request.url)
//     const category = searchParams.get('category');
//     const image = searchParams.get('image');
//     const char = searchParams.get('char');
//     const token = searchParams.get('token');

//     if (!category || !image || !char || !token) {
//         return new Response('Error en los atributos requeridos', {
//             status: 401,
//         })
//     }
//     // export async function POST(category: string, img64: string, char: string, token: string) {
//     var myHeaders = new Headers();
//     myHeaders.append("Content-Type", "application/json");
//     // myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);
//     myHeaders.append("Authorization", `Bearer ${token}`);

//     var raw = JSON.stringify({
//         category: category,
//         image: image,
//         extension: "jpeg",
//         type: "byte64",
//         char: char,
//     });

//     try {
//         const response = await fetch(`${url}/user/lesson/predict`, {
//             method: "POST",
//             headers: myHeaders,
//             body: raw,
//             credentials: "include",
//             redirect: "follow",
//         });
//         return response;
//     } catch (error) {
//         console.log(error)
//         return { ok: false };
//     }
// }