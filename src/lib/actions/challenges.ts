import { CardChallengesCategoryProps, ChallengeCategoryByUser, EnumCategory, EnumDifficulty } from "../types/challenge";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function startChallengesRandom( category: EnumCategory, difficulty: EnumDifficulty, token: string): Promise<CardChallengesCategoryProps[] | []> {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${url}/challenge/start/me?category=${category}&difficulty=${difficulty}`, {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
    redirect: "follow",
  });

  if (response.status === 200) {
    const challenge = await response.json()
    console.log(challenge)
    return challenge
  }else{
    return []
  }
}
  

export async function getChallengesByCategory( token: string): Promise<CardChallengesCategoryProps | null> {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${url}/challenge/search/me?category=PALABRAS`, {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
    redirect: "follow",
  });

  if (response.status === 200) {
    const challenge = await response.json()
    console.log(challenge)
    return challenge
  }else{
    return null
  }
}
  

export async function getChallenges(category: string, token: string): Promise<ChallengeCategoryByUser[] | []> {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  const response = await fetch(`${url}/challenge/search/me?category=${category}`, {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
    redirect: "follow",
  });

  if (response.status === 200) {
    const challenge = await response.json()
    console.log(challenge)
    return challenge
  }else{
    return []
  }
}
  