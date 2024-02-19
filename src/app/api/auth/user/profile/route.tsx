import { getServerSession } from "next-auth/next";
import { config } from "./../../[...nextauth]/route";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET() {
  const session = await getServerSession(config)
  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)

  try {
    const response = await fetch(`${url}/user/users/me`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    });
    const response_dict = await response.json()
    if (response.status === 200) {
      return new Response(JSON.stringify(response_dict), {
        status: 200,
      })
    }
    return new Response(response_dict.detail, { status: response.status })
  } catch (error) {
    return new Response('No se logro la petición', {
      status: 501,
    })
  }
}

export async function PUT(request: Request) {
  const body = await request.json();
  const session = await getServerSession(config)
  const myHeaders = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  })
  myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)

  try {
    const response = await fetch(`${url}/user/profile`, {
      method: "PUT",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
      body: JSON.stringify(body),
    });
    const status = await response.json()
    // Return a new Response with status as the body
    return new Response(JSON.stringify(status), {
      status: response.status,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    return new Response('No se logro la petición', {
      status: 501,
    })
  }
}