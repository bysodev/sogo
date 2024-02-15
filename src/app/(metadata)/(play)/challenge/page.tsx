'use client'
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { CardChallengesCategoryProps, EnumCategory } from "@/lib/types/challenge";
import { CircularProgress } from "@mui/material";
import useSWR from 'swr';

// Definir el fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ChallengesPage() {
  const { data: challenge, error } = useSWR<CardChallengesCategoryProps>('/api/auth/challenge', fetcher, { revalidateOnFocus: false });

  return (
    <div className="grid gap-4 w-full lg:py-4 px-4">
      <h1 className="rounded-xl border-2 p-1 font-bold text-2xl text-center text-gray-500">Retos</h1>
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
  )
}