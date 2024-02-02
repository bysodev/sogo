

import { getServerSession } from "next-auth/next"
import { config } from "./../[...nextauth]/route"

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET() {
    const session = await getServerSession(config)
    const myHeaders = new Headers({
        Accept: 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)
    try {
        const response = await fetch(`${url}/section/get/levelstage`, {
            method: 'GET',
            headers: myHeaders,
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