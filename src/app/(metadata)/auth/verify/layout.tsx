import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sogo Sign | Verificación de Cuenta",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  return (
    <div>{children}</div>
  )
}
