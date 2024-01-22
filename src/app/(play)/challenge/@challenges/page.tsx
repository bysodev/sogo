'use client'
import { getChallengesByCategory } from "@/lib/actions/challenges";
import { CardChallengesCategoryProps } from "@/lib/types/challenge";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ChallengesPage() {
  const { data: session } = useSession();
  const [challenge, setChallenge] = useState<CardChallengesCategoryProps[] | []>([]);
  
  useEffect(() => {
    if( session?.accessToken !== undefined ){
      (
        async () => {
          console.log(`Este es el token: ${session?.accessToken}`)
          const respuesta: CardChallengesCategoryProps[] = await getChallengesByCategory( session?.accessToken )
          if (respuesta !== null)
            setChallenge(respuesta)
        }
      )()
    }

  }, [session?.accessToken])
  return <>
    <div className="flex flex-wrap w-3/4 items-center justify-center h-screen space-x-4">
    { challenge.map((chall, index) => (
          <ChallengeCard key={index} {...chall} />
        ))  }
    </div>
  </>
}