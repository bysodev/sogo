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
    if (session?.user.accessToken !== undefined) {
      (
        async () => {
          const respuesta: CardChallengesCategoryProps | null = await getChallengesByCategory(session?.user.accessToken)
          if (respuesta)
            setChallenge(respuesta)
        }
      )()
    }
  }, [session?.user.accessToken])

  return <>
    <div className="flex flex-wrap gap-10 tems-center justify-center h-screen">
      {challenge && <ChallengeCard index={0} key={EnumCategory.PALABRAS} category={EnumCategory.PALABRAS} details={challenge[EnumCategory.PALABRAS]} title={'PALABRAS'} />}
      {challenge && <ChallengeCard index={0} key={EnumCategory.NUMEROS} category={EnumCategory.NUMEROS} details={challenge[EnumCategory.NUMEROS]} title={'NUMEROS'} />}
    </div>
  </>
}