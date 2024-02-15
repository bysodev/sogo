import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sogo Sign | Retos',
}

export default function ChallengeLayout({
  children,
  challenges,
}: {
  children: React.ReactNode;
  challenges: any; // Reemplaza TipoDeChallenges con el tipo correcto
}) {
  return (
    <>
      {children}
    </>
  );
}
