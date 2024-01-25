// 'use client'
// import { ChallengeCard } from "@/components/cards/ChallengeCard";
// import { getChallengesByCategory } from "@/lib/actions/challenges";
// import { ChallengeCategoryByUser } from "@/lib/types/challenge";
// import { useSession } from "next-auth/react";
// import { useEffect, useState } from "react";

// export default function Page() {
//   const { data: session } = useSession();
//   const [challenge, setChallenge] = useState<ChallengeCategoryByUser[] | []>([]);
  
//   useEffect(() => {
//     if( session?.accessToken !== undefined ){
//       (
//         async () => {
//           console.log(`Este es el token: ${session?.accessToken}`)
//           const respuesta: ChallengeCategoryByUser[] = await getChallengesByCategory( 'WORDS', session?.accessToken )
//           if (respuesta !== null)
//             setChallenge(respuesta)
//         }
//       )()
//     }

//   }, [session?.accessToken])
//   return <>
//       <main className="flex items-center justify-center flex-wrap h-screen relative space-x-4">
//         { challenge.map((chall, index) => (
//           <ChallengeCard key={index} {...chall} />
//         ))  }
//       </main>
//   </>
// }
