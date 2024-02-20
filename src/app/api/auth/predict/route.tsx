const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function POST(request: Request) {
  const { username, password, email, category, image, char, token } = await request.json()
  
  if (!username || !password || !email || !category || !image || !char || !token) {
    return new Response('No se logro la petición, faltan campos', {
      status: 401,
    })
  }
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  })
  myHeaders.append('Authorization', `Bearer ${token}`)
  try {
    const response = await fetch(`${url}/user/lesson/predict`, {
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
