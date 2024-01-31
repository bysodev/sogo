'use client'
import { ChallengeCard } from "@/components/cards/ChallengeCard";
import { CardChallengesCategoryProps, EnumCategory } from "@/lib/types/challenge";
import useSWR from 'swr';

// Definir el fetcher
const fetcher = (url: string) => fetch(url).then(res => res.json());

export default function ChallengesPage() {
  const { data: challenge, error } = useSWR<CardChallengesCategoryProps>('/api/auth/challenge', fetcher, { revalidateOnFocus: false });

  if (!challenge) return <div>Loading...</div>
  if (error) return <div>Failed to load</div>

  return (
    <div className="grid gap-10 w-full lg:py-10 px-6">
      {Object.entries(challenge).map(([category, details]) => (
        <ChallengeCard key={category} category={category as EnumCategory} details={details} title={category.toUpperCase()} />
      ))}
    </div>
  )
}