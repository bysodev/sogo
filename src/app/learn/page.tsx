"use client";

import { GeneralCard } from "@/components/general-card";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

const vocales = ["A", "E", "I", "O", "U"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function Learn() {
  const router = useRouter();

  return (
    <div className="grid place-content-center place-items-center mt-12">
      <div className=" w-9/12 bg-sky-600 grid grid-flow-col rounded-lg bg-opacity-90">
        <div className="p-2">
          <div className="w-fit m-2 p-1 bg-white text-sky-600 text-center rounded-md  ">
            <h5>VOCABULARIO</h5>
          </div>
          <div className="text-white m-2 mt-6">
            <h6>Estas viendo las todas la vocales en lenguaje de señas!!</h6>
          </div>
        </div>
        <div className=" grid place-content-center m-3">
          <button
            type="button"
            className="rounded-md shadow-md relative -top-1 -left-1 bg-cyan-900 py-2.5 px-5 font-medium uppercase text-white transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:border-2  before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0"
          >
            <Link href={`learn/vocales`} rel="preload">
              COMENZAR
            </Link>
          </button>
        </div>
      </div>
      <div className=" w-9/12 m-4 flex flex-wrap justify-center ">
        {vocales.map((value) => (
          <GeneralCard url="" key={value} />
        ))}
      </div>
      <div className=" w-9/12 bg-sky-600 grid grid-flow-col rounded-lg bg-opacity-90">
        <div className="p-2">
          <div className="w-fit m-2 p-1 bg-white text-sky-600 text-center rounded-md  ">
            <h5>NUMEROS</h5>
          </div>
          <div className="text-white m-2 mt-6">
            <h6>Estas viendo los numeros del 1 al 10!!</h6>
          </div>
        </div>
        <div className=" grid place-content-center m-3">
          <button
            onClick={() => router.push("learn/numeros")}
            type="button"
            className="rounded-md shadow-md relative -top-1 -left-1 bg-cyan-900 py-2.5 px-5 font-medium uppercase text-white transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:border-2  before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0"
          >
            {/* <Link href='learn/numeros' rel="preload">COMENZAR</Link>  */}
            COMENZAR
          </button>
        </div>
      </div>

      <div className=" w-9/12 m-4 flex flex-wrap justify-center ">
        {numeros.map((value) => (
          <GeneralCard url="" key={value} />
        ))}
      </div>
    </div>
  );
}
