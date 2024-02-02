const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const token = searchParams.get('token');

  if (!token) {
    return new Response(JSON.stringify({ message: 'Error al verificar los parámetros requeridos' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }
  const myHeaders = new Headers({
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  });

  try {
    const response = await fetch(`${url}/user/verified?token=${token}`, {
      credentials: 'include',
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    });

    const data = await response.json();

    return new Response(JSON.stringify({ ok: response.status, message: data.detail }), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: 'Algo falló con el sistema' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}