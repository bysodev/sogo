import { type NextRequest } from "next/server";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const username = searchParams.get('username');
  const password = searchParams.get('password');
  console.log({username, password})
  if (!username || !password) {
    return false
  }

  const myHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })

  const urlencoded = new URLSearchParams()
  urlencoded.append('username', username)
  urlencoded.append('password', password)

  try {
    const response = await fetch(`${url}/user/login`, {
      method: 'POST',
      body: urlencoded,
      headers: myHeaders,
      credentials: 'include',
      redirect: 'follow'
    })

    if (response.status === 200) {
      const user = await response.json()
      return new Response( JSON.stringify(user) , {
        status: 200,
      })
    }
    return new Response('No se logro la petición', {
      status: response.status,
    })

  } catch (error) {
    return new Response('No se logro la petición', {
      status: 401,
    })
  }
}
