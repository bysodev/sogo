'use client'
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { CardChallengesCategoryProps, EnumCategory } from "@/lib/types/challenge";
import { CircularProgress, Tooltip } from "@mui/material";
import { useState } from "react";
import { FaQuestionCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import useSWR from 'swr';

// Definir el fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ChallengesPage() {
  const { data: challenge, error } = useSWR<CardChallengesCategoryProps>('/api/auth/challenge', fetcher, { revalidateOnFocus: false });

  const [showDialog, setShowDialog] = useState(true);

  const handleOpen = () => setShowDialog(true);
  const handleClose = () => setShowDialog(false);

  return (
    <div className="lg:p-4 w-full">
      <h1 className="lg:rounded-xl border-2 p-1 font-bold text-xl text-center text-gray-500">Retos</h1>
      {!showDialog && (
        <button className="flex gap-4 items-center ms-auto mt-3" onClick={handleOpen}><span>Volver a mostrar</span> <Tooltip title={'Volver a mostrar las indicaciones de la sección de retos'} placement="top" arrow>
          <div>
            <FaQuestionCircle />
          </div>
        </Tooltip>
        </button>
      )}
      {showDialog && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden p-4 lg:p-0">
          <div className="md:flex">
            <div className="p-4 lg:p-8">
              <div className="tracking-wide text-sm text-indigo-500 font-semibold flex justify-between">
                <span className="text-gray-900 dark:text-white font-extrabold text-xl">
                  ¿Cómo funciona?
                </span>
                <button className="text-gray-700" onClick={handleClose}><IoClose size={20} /></button>
              </div>
              <p className="mt-2 text-gray-500">
                Los desafíos siguientes están clasificados por categorías, tanto de números como letras. Las cada cateogría contiene diferentes retos con la finalidad de poner en práctica todo lo aprendido, desafiando tu conocimiento para resolver operaciones matemáticas basica, deletreo de palabras simples hasta complejas  y realizar las señas resultantes.
              </p>
              <div className="flex justify-around my-4 gap-2 flex-col lg:flex-row">
                <div className="w-full bg-gray-100 rounded-2xl p-4 flex flex-col justify-center gap-2">
                  <span className="text-center font-mono font-bold">Tipos de retos</span>
                  <div className="grid grid-cols-2 gap-3">
                    <span className="inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 bg-emerald-100 text-emerald-700">
                      <p className="whitespace-nowrap text-sm">Deletreo</p>
                    </span>
                    <span className="inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 bg-violet-200 text-violet-700">
                      <p className="whitespace-nowrap text-sm">Autocompletado</p>
                    </span>
                    <span className="inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 bg-rose-100 text-rose-700">
                      <p className="whitespace-nowrap text-sm">Selección</p>
                    </span>
                    <span className="inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 bg-yellow-100 text-yellow-700">
                      <p className="whitespace-nowrap text-sm">Un intento</p>
                    </span>
                    <span className="inline-flex font-semibold items-center justify-center rounded-full px-2.5 py-0.5 bg-red-100 text-red-700">
                      <p className="whitespace-nowrap text-sm">Operaciones</p>
                    </span>
                  </div>
                </div>
                <div className="bg-blue-100 rounded-2xl p-4 flex flex-col justify-center gap-2">
                  <span className="text-center font-mono font-bold">Dificultades</span>
                  <div className="grid grid-cols-1 gap-3 font-medium">
                    <div className="flex justify-around">
                      <FacilIcon />
                      <span>Facil</span>
                    </div>
                    <div className="flex justify-around">
                      <MedioIcon />
                      <span>Medio</span>
                    </div>
                    <div className="flex justify-around">
                      <DificilIcon />
                      <span>Dificil</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="grid gap-4 lg:py-4">
        {error ? (
          <p>Error al cargar los datos</p>
        ) : !challenge ? (
          <div className="m-auto p-10"><CircularProgress /></div>
        ) : (
          Object.entries(challenge).map(([category, details]) => (
            <ChallengeCard key={category} category={category as EnumCategory} details={details} title={category.toUpperCase()} />
          ))
        )}
      </div>
    </div>
  )
}

const FacilIcon = () => {
  return <> 🎉 </>
}

const MedioIcon = () => {
  return <> 🎯 </>
}

const DificilIcon = () => {
  return <> ⚔ </>
}