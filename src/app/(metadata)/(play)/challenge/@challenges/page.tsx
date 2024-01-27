'use client'
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { getChallengesByCategory } from "@/lib/actions/challenges";
import { CardChallengesCategoryProps, EnumCategory } from "@/lib/types/challenge";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function ChallengesPage() {

  const { data: session } = useSession();
  const [challenge, setChallenge] = useState<CardChallengesCategoryProps>();


  useEffect(() => {
    if (session?.accessToken !== undefined) {
      (
        async () => {
          // console.log(`Este es el token: ${session?.accessToken}`)
          const respuesta: CardChallengesCategoryProps | null = await getChallengesByCategory(session?.accessToken)
          if (respuesta)
            setChallenge(respuesta)
        }
      )()
    }

  }, [session?.accessToken])
  return <>
    <div className="flex flex-wrap w-3/5 tems-center justify-center h-screen space-x-4">
      {challenge && <ChallengeCard key={EnumCategory.PALABRAS} category={EnumCategory.PALABRAS} details={challenge[EnumCategory.PALABRAS]} title={'PALABRAS'} />}
      {challenge && <ChallengeCard key={EnumCategory.NUMEROS} category={EnumCategory.NUMEROS} details={challenge[EnumCategory.NUMEROS]} title={'NUMEROS'} />}
    </div>
  </>
}