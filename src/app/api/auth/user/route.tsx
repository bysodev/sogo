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
