import { getServerSession } from "next-auth/next";
import { config } from "../[...nextauth]/route";
const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function POST(request: Request) {
  const {category, image, char } = await request.json()
  
  if (!category || !image || !char) {
    return new Response('No se logro la petición, faltan campos', {
      status: 401,
    })
  }
  const session = await getServerSession(config)
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${session?.user.accessToken}`)

  var raw = JSON.stringify({
    category: category,
    image: image,
    extension: 'jpeg',
    type: 'byte64',
    char: char,
  });

  try {
    const response = await fetch(`${url}/user/lesson/predict`, {
      method: 'POST',
      body: raw,
      credentials: 'include',
      headers: myHeaders,
      redirect: 'follow'
    })
    return response;
  } catch (error) {
    return new Response('Problemas con el servidor', {
      status: 501,
    })
  }
}