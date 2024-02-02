'use client'
import ProNumeros from "@/components/challenge/ProNumeros";
import ProPalabras from "@/components/challenge/ProPalabras";
import IconLogo from "@/components/icons/logo";
import { ContentChallenge, EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { Fetcher } from "@/lib/types/lessons";
import Link from "next/link";
import useSWR from "swr";

export default function Page({ params }: { params: { categoria: EnumCategory, dificultad: EnumDifficulty } }) {
  const { categoria, dificultad } = params;
  const { data: challenge, isLoading, error } = useSWR<ContentChallenge | null>(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/challenge/user/start?category=${categoria}&difficulty=${dificultad}`, Fetcher, {revalidateOnFocus: false })

  if(error){
    return <div className="w-full h-full grid place-content-center">
        <Link href={'/challenge'}>
          <IconLogo height={80} width={80} className="mx-auto mb-6" />
        </Link>
        <span className="font-mono text-2xl text-s" >Errores con los retos...</span>
    </div>
  }

  if( isLoading ){
    return <div className="w-full h-full grid place-content-center">
        <IconLogo height={80} width={80} className="mx-auto mb-6" />
        <span className="font-mono text-2xl text-s" >Espere...</span>
    </div> 
    // return <p>Seguimos cargando los datos</p>
  }


  return (
    <>
      {
        challenge && categoria.toUpperCase() == EnumCategory.PALABRAS && <ProPalabras challenge={challenge} dificultad={dificultad} />
      }
      {
        challenge && categoria.toUpperCase() == EnumCategory.NUMEROS && <ProNumeros challenge={challenge} dificultad={dificultad}/>
      }
    </>
  );
}