export async function Verification(
  img64: string,
  vocal: string,
  token: string
) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);
  myHeaders.append('Authorization', `Bearer ${token}`);

  var raw = JSON.stringify({
    learn: 'vocales',
    imagen: img64,
    extension: 'jpeg',
    tipo: 'byte64',
    vocal: vocal,
  });

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BACKEND}/user/lesson/vocales`,
      {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        credentials: 'include',
        redirect: 'follow',
      }
    );
    return res;
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
