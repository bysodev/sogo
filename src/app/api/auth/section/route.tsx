
const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET() {
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })

    try {
        const response = await fetch(`${url}/section/get/levelstage`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
            cache: 'no-store'
        })
        const lesson_response = await response.json()
        if (response.status === 200) {
            return new Response(JSON.stringify(lesson_response), {
                status: 200,
            })
        }
        return new Response(lesson_response.detail, { status: response.status })
    } catch (error) {
        return new Response('No se logro la petición', {
            status: 501,
        })
    }
}