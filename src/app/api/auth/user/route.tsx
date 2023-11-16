const url = process.env.NEXT_PUBLIC_API_BACKEND
// const url_app = process.env.NEXTAUTH_URL

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

export async function POST(request: Request) {
  const {username, password, email} = await request.json()
  
  if (!username || !password || !email) {
    return new Response('No se logro la petición, faltan campos', {
      status: 401,
    })
  } 
  console.log({username, password, email})
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  try {
    const possible = await fetch(`${url}/user/register`, {
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
    const data = await possible.json();
    if (possible.status === 201) {
      return Response.json(data, {
        status: possible.status
      })
    }
    if (possible.status){
      return new Response('Se detectaron problemas', {
        status: possible.status,
      })
    }
  } catch (error) {
    return new Response('Problemas con el servidor', {
      status: 501,
    })
  }
}
