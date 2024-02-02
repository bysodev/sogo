import { CardChallengesCategoryProps } from '../types/challenge';

const url = process.env.NEXT_PUBLIC_API_BACKEND;

export async function getChallengesByCategory(
  token: string
): Promise<CardChallengesCategoryProps | null> {
  const myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Authorization', `Bearer ${token}`);

  const response = await fetch(`${url}/challenge/search/me?category=PALABRAS`, {
    method: 'GET',
    headers: myHeaders,
    credentials: 'include',
    redirect: 'follow',
  });

  if (response.status === 200) {
    const challenge = await response.json();
    return challenge;
  } else {
    return null;
  }
}
