const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return new Response(JSON.stringify({ message: 'Error al verificar los parámetros requeridos' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
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
    const user = await response.json()
    if (response.status === 200) {
      return new Response(JSON.stringify(user), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      })
    }
    return new Response(JSON.stringify({ detail: user.detail }), { status: response.status, headers: { 'Content-Type': 'application/json' } })
  } catch (error) {
    return new Response(JSON.stringify({ message: 'No se logro la petición' }), {
      status: 501,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}

export async function POST(request: Request) {
  const { username, password, email } = await request.json()

  if (!username || !password || !email) {
    return new Response('No se logro la petición, faltan campos', {
      status: 401,
    })
  }
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  try {
    const response = await fetch(`${url}/user/register`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email,
        image: username,
      }),
      credentials: 'include',
      headers: myHeaders,
      redirect: 'follow'
    })
    const data = await response.json();
    if (response.status === 201) {
      return Response.json(data, {
        status: response.status
      })
    }
    return new Response(data.detail, { status: response.status })
  } catch (error) {
    return new Response('Problemas con el servidor', {
      status: 501,
    })
  }
}