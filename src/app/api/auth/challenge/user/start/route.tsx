

import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { getServerSession } from "next-auth/next";
import { config } from "../../../[...nextauth]/route";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const difficulty = searchParams.get('difficulty');
    const category = searchParams.get('category');

    if (!category || !difficulty) {
        return new Response('Error en los atributos requeridos', {
            status: 401,
        })
    }

    if(!isValidCategory(category) || !isValidDifficulty(difficulty)){
        // return NextResponse.json({ error: 'Internal Server Error', status: 401 })
        return new Response(JSON.stringify({message: 'El valor de los atributos no corresponde'}), {
            status: 401,
        })
    }

    const session = await getServerSession(config)
    const myHeaders = new Headers({
        Accept: 'application/json', 
        'Content-Type': 'application/x-www-form-urlencoded'
    })
    myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)

    try {
        const response = await fetch(`${url}/challenge/start/me?category=${category.toUpperCase()}&difficulty=${difficulty.toUpperCase()}`, {
            method: 'GET',
            headers: myHeaders,
            credentials: 'include',
            redirect: 'follow',
        })
        const challenge = await response.json()

        if (response.status === 200) {
            return new Response(JSON.stringify(challenge), {
                status: 200,
            })
        }
        if( response.status === 404 ){
            return new Response('Los parametros que esta enviando son incorrectos', {
                status: 404,
            })
          }
        return new Response(challenge, { status: response.status })
    } catch (error) {
        return new Response('No se logro la petición', {
            status: 501,
        })
    }
}

function isValidCategory(value: string): value is EnumCategory {
    return Object.values(EnumCategory).includes(value.toUpperCase() as EnumCategory);
  }
  
  function isValidDifficulty(value: string): value is EnumDifficulty {
    return Object.values(EnumDifficulty).includes(value.toUpperCase() as EnumDifficulty);
  }
  