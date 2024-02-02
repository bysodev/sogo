import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sogo Sign | Lecciones',
}

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>
}
