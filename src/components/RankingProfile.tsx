import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { DetailsRankingProfile } from "@/lib/types/rankings";
import { Alert, CircularProgress, List, Tooltip } from "@mui/material";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import useSWR from "swr";
import NavRanking from "./cards/NavRanking";

type defaultInterface = {
  EnumDifficulty: DetailsRankingProfile
}
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RankingProfile() {
  const { data: rankPalabras, error: errorPalabras } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/user/ranking?category=${EnumCategory.PALABRAS}`, fetcher);
  const { data: rankNumeros, error: errorNumeros } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/user/ranking?category=${EnumCategory.NUMEROS}`, fetcher);
  const [palabras, setPalabras] = useState(EnumDifficulty.FACIL);
  const [numeros, setNumeros] = useState(EnumDifficulty.FACIL);

  const renderComponent = (difficulty: any, rank: any) => {
    switch (difficulty) {
      case EnumDifficulty.FACIL:
        return <ContenidoRanking rank={rank.FACIL} />;
      case EnumDifficulty.MEDIO:
        return <ContenidoRanking rank={rank.MEDIO} />;
      case EnumDifficulty.DIFICIL:
        return <ContenidoRanking rank={rank.DIFICIL} />;
      default:
        return null;
    }
  };

  return (
    <section className="w-full dark:bg-gray-900 duration-300 pt-5">
      <h1 className="lg:rounded-xl border-2 p-1 font-bold text-xl text-center text-gray-500 mb-3">Puntuación Personal</h1>
      <div className="border-2 mt-3 p-4 rounded-lg text-center">
        <h4><strong>Categoría:</strong> Palabras</h4>
        <NavRanking value={palabras} setValue={setPalabras} key='PALABRAS' />
        {errorPalabras ? (
          <p>Error al cargar los datos</p>
        ) : !rankPalabras ? (
          <CircularProgress />
        ) : (
          renderComponent(palabras, rankPalabras)
        )}
      </div>
      <br />
      <div className="border-2 p-4 rounded-lg">
        <h4><strong>Categoría:</strong> Números</h4>
        <NavRanking value={numeros} setValue={setNumeros} key='Números' />
        {errorNumeros ? (
          <p>Error al cargar los datos</p>
        ) : !rankNumeros ? (
          <CircularProgress />
        ) : (
          renderComponent(numeros, rankNumeros)
        )}
      </div>
    </section>
  )
}

export const ContenidoRanking = ({ rank }: { rank: DetailsRankingProfile }) => {
  return (
    <div className="text-center flex gap-4 justify-center items-center">
      {rank['puntos'] === 0 ? (
        <List dense={true}>
          <Alert variant="outlined" severity="info">
            Aún no tienes un puntaje registrado. Animate a intentarlo.
          </Alert>
        </List>
      ) : (
        <>
{/*           <h1 className="text-3xl text-gray-400 font-bold">#{rank['ranking']}</h1> */}
          <h2 className="text-xl text-gray-600">{rank['puntos']} pts </h2>
          <Tooltip title={`Lecciones: ${rank['lecciones']} | Retos: ${rank['retos']}`} placement="top" arrow>
            <div className="text-purple-500">
              <FaQuestionCircle />
            </div>
          </Tooltip>
        </>
      )}
    </div>
  )
}
