const url = process.env.NEXT_PUBLIC_API_BACKEND

export default async function fetchLoginUser (
  username: string | undefined,
  password: string | undefined
): Promise<any> {
  if (!username || !password) {
    return false
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
      return user
    }
    return null
  } catch (error) {
    return null
  }
}
