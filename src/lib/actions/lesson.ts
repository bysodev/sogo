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
    const res = await fetch(`http://127.0.0.1:8000/user/lesson/predict`, {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      credentials: 'include',
      redirect: 'follow',
    });
    return res;
  } catch (error) {
    console.log(error);
    return { ok: false };
  }
}
