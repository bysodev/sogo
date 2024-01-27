
const url = process.env.NEXT_PUBLIC_API_BACKEND
export async function PredictSign(
  category: string,
  image: string,
  char: string,
  token: string
) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  // myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);
  myHeaders.append('Authorization', `Bearer ${token}`);

  var raw = JSON.stringify({
    category: category,
    image: image,
    extension: 'jpeg',
    type: 'byte64',
    char: char,
  });

  try {
    const res = await fetch(`${url}/user/lesson/predict`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
    return res;
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
