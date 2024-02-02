

import { getServerSession } from "next-auth/next";
import { config } from "../[...nextauth]/route";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function POST(request: Request) {
    const session = await getServerSession(config)
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)

    const requestBody = await request.json();
    const { ...dataChall } = requestBody;
    const raw = JSON.stringify(
        dataChall
    )
    try {
        const response = await fetch(`${url}/reach_challenge/register`, {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            credentials: 'include',
            redirect: 'follow',
        })
        const dic_data = await response.json()
            
        if (response.status === 201) {
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