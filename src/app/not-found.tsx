import Link from "next/link";

export default function NotFound() {
  return (
    <main className="tracking-widest text-gray-500 uppercase grid place-items-center h-screen px-4 bg-white place-content-center gap-4">
      <h1>404 | Pagina No Encontrada</h1>
      <section className="w-full">
        <Link className="border m-auto p-2 px-6 rounded-full" href={"/"}>
          Inicio
        </Link>
      </section>
    </main>
  );
}
