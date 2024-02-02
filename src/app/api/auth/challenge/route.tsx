const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function POST(request: Request) {
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    const requestBody = await request.json();
    const { ...dataWithoutToken } = requestBody;

    const raw = JSON.stringify(
        dataWithoutToken
    )
    try {
        const response = await fetch(`${url}/challenge/predict`, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow',
        })

        const dic_data = await response.json()
        if (response.status === 200) {
            return new Response(JSON.stringify(dic_data), {
                status: 200,
            })
        }
        return new Response(dic_data.detail, { status: response.status })
    } catch (error) {
        return new Response('No se logro la petición', {
            status: 501,
        })
    }
}