import type { Metadata } from 'next';
export const metadata: Metadata = {
  title: 'Sogo Sign | Iniciar Sesión',
  description: 'Plataforma de aprendizaje de Lengua de Señas Ecuatoriana'
}

export default function LoginLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>
}
