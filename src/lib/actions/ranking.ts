import { CompleteRankingProps } from "../types/rankings";
const url = process.env.NEXT_PUBLIC_API_BACKEND

export async function getRankingByCategory( category: string ): Promise<CompleteRankingProps | null> {

    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
    const response = await fetch(`${url}/challenge/ranking?category=${ category }`, {
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
    