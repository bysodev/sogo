import { EnumCategory } from "@/lib/types/challenge";
import { DetailsRankingProfile } from "@/lib/types/rankings";
import { CircularProgress, Tooltip, Typography } from "@mui/material";
import { FaQuestionCircle } from "react-icons/fa";
import useSWR from "swr";

type impro = {
  EnumDifficulty: DetailsRankingProfile
}

const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function RankingProfile() {
  const { data: rankPalabras, error: errorPalabras } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/user/ranking?category=${EnumCategory.PALABRAS}`, fetcher);
  const { data: rankNumeros, error: errorNumeros } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/user/ranking?category=${EnumCategory.NUMEROS}`, fetcher);

  return (
    <section className="w-full dark:bg-gray-900 duration-300 pt-5">
      <h1 className="lg:rounded-xl border-2 p-1 font-bold text-xl text-center text-gray-500 mb-3">Puntuación Personal</h1>
      <hr />
      <div className="border-2 mt-3 p-4 rounded-lg">
        <h4>CATEGORIA: PALABRAS</h4>
        <br />
        <div className="grid sm:grid-cols-3 justify-center gap-2">
          {errorPalabras ? (
            <p>Error al cargar los datos</p>
          ) : !rankPalabras? (
            <CircularProgress />
          ) : (
            <>
              <CampoFacil rank={rankPalabras.FACIL} />
              <CampoMedio rank={rankPalabras.MEDIO} />
              <CampoDificil rank={rankPalabras.DIFICIL} />
            </>
          )}
        </div>
      </div>
      <br />
      <div className="border-2 p-4 rounded-lg">
        <h4>CATEGORIA: NUMEROS</h4>
        <br />
        <div className="grid sm:grid-cols-3 justify-center gap-2">
          {errorNumeros ? (
            <p>Error al cargar los datos</p>
          ) : !rankNumeros ? (
            <CircularProgress />
          ) : (
            <>
              <CampoFacil rank={rankNumeros.FACIL} />
              <CampoMedio rank={rankNumeros.MEDIO} />
              <CampoDificil rank={rankNumeros.DIFICIL} />
            </>
          )}
        </div>
      </div>
    </section>
  )
}


export const CampoFacil = ({ rank }: { rank: DetailsRankingProfile }) => {
  return (
    <div className="border w-auto border-green-400 text-green-400 rounded-lg text-center font-bold">
          <div className="bg-green-400 p-2">
              <h2 className="text-white ">🎈 Facil  </h2>
          </div>
          <div className="p-6">
            <Typography fontSize={10} fontWeight={600} textAlign={"center"} className={"rounded-lg bg-purple-100 border-2 border-purple-500 text-purple-600 w-min !mx-auto whitespace-nowrap p-1 px-4 flex gap-2 flex-nowrap items-center"}>
              {rank['puntos']} pts <Tooltip title={`Lecciones: ${rank['lecciones']} | Retos: ${rank['retos']}`} placement="top" arrow>
                <div>
                  <FaQuestionCircle />
                </div>
              </Tooltip>
            </Typography>
          </div>
      </div>
  )
}

export const CampoMedio = ({ rank }: { rank: DetailsRankingProfile }) => {
  return (
    <div className="border w-auto border-violet-400 text-violet-400 rounded-lg text-center font-bold">
          <div className="bg-violet-400 p-2">
              <h2 className="text-white ">🏹 Medio</h2>
          </div>
          <div className="p-6">
            <Typography fontSize={10} fontWeight={600} textAlign={"center"} className={"rounded-lg bg-purple-100 border-2 border-purple-500 text-purple-600 w-min !mx-auto whitespace-nowrap p-1 px-4 flex gap-2 flex-nowrap items-center"}>
              {rank['puntos']} pts <Tooltip title={`Lecciones: ${rank['lecciones']} | Retos: ${rank['retos']}`} placement="top" arrow>
                <div>
                  <FaQuestionCircle />
                </div>
              </Tooltip>
            </Typography>
          </div>
      </div>
  )
}

export const CampoDificil = ({ rank }: { rank: DetailsRankingProfile }) => {
  return (
    <div className="border w-auto border-red-400 text-red-400 rounded-lg text-center font-bold">
          <div className="bg-red-400 p-2">
              <h2 className="text-white ">🎃 Dificil</h2>
          </div>
          <div className="p-6">
            <Typography fontSize={10} fontWeight={600} textAlign={"center"} className={"rounded-lg bg-purple-100 border-2 border-purple-500 text-purple-600 w-min !mx-auto whitespace-nowrap p-1 px-4 flex gap-2 flex-nowrap items-center"}>
              {rank['puntos']} pts <Tooltip title={`Lecciones: ${rank['lecciones']} | Retos: ${rank['retos']}`} placement="top" arrow>
                <div>
                  <FaQuestionCircle />
                </div>
              </Tooltip>
            </Typography>
          </div>
      </div>
  )
}