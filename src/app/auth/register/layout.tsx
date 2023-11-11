// import './globals.css'
import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Sogo Sign | Crear Cuenta",
  description: "Plataforma de aprendizaje de Lengua de Señas Ecuatoriana",
};

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
