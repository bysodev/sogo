const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const username = searchParams.get('username');
  const password = searchParams.get('password');

  if (!username || !password) {
    return new Response('No se logro la petición', {
      status: 401,
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
      })
    }
    return new Response(user.detail, { status: response.status })
  } catch (error) {
    return new Response('No se logro la petición', {
      status: 501,
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
        email
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

// LOGIN OR REGISTER PROVIDER
export async function PUT(request: Request) {
  const { username, password, email } = await request.json()

  if (!username || !password || !email) {
    return new Response('No se logro la petición, faltan campos', {
      status: 401,
    })
  }
  console.log(JSON.stringify({
    username,
    password,
    email
  }))
  const myHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
  try {
    const response = await fetch(`${url}/user/loginProvider`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        email
      }),
      headers: myHeaders,
      credentials: 'include',
      redirect: 'follow'
    })
    const userData = await response.json()
    if (response.status === 200) {
      return new Response(JSON.stringify(userData), {
        status: 200,
      })
    }
    return new Response(userData.detail, { status: response.status })
  } catch (error) {
    return new Response('Error al procesar la solicitud', {
      status: 501,
    })
  }
}