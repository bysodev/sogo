
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Sogo Sign | Retos',
}


export default function ChallengeLayout({
  children,
}: {
  children: React.ReactNode;
}) {


  return (
    <>
      {children}
    </>
  );
}
