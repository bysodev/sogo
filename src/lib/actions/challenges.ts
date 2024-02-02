import { CardChallengesCategoryProps, ChallengeCategoryByUser, ContentChallenge, EnumCategory, EnumDifficulty, ErrorChallenge, ErrorOrigen } from "../types/challenge";

const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function startChallengesRandom( category: EnumCategory, difficulty: EnumDifficulty, token: string): Promise<ContentChallenge | ErrorChallenge> {

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${token}`);

  try{
    const response = await fetch(`${url}/challenge/start/me?category=${category}&difficulty=${difficulty}`, {
      method: "GET",
      headers: myHeaders,
      credentials: "include",
      redirect: "follow",
    });
  
    if (response.status === 200) {
      const challenge = await response.json()
      return challenge
    }
    if( response.status === 404 ){
      console.log('Error del cliente')
      return{
        status: response.status,
        mensaje: 'Los parametros que esta enviando son incorrectos',
        origen: ErrorOrigen.CLIENTE
      }
    }
    return {
      status: response.status,
      mensaje: 'Al parecer se trata de un error de servidor',
      origen: ErrorOrigen.SERVER
    }  
  }catch(e){
    return {
      status: 500,
      mensaje: 'Al parecer se trata de un error de servidor',
      origen: ErrorOrigen.SERVER
    }  
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
