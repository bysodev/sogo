"use client";
import React, { useMemo, useState } from "react";
import { AiFillPlayCircle } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { Canvas } from "@react-three/fiber";
import NavBar from "@/components/Navbar";
import { Experience } from "@/components/Experience";
import bgHand from "@/public/src/bgShapeHand.svg";
import IconScroll from "@/components/icons/IconScroll";
import dynamic from "next/dynamic";

const Hand = dynamic(() => import("@/components/Hand"), { ssr: false });

export default function Home() {
  const [currentColor, setCurrentColor] = useState(0xe7a183);

  const updateColor = (color: number) => {
    setCurrentColor(color);
  };

  const colorButtons = [
    { label: "White", color: 0xe7a183 },
    { label: "Brown", color: 0x8a5d34 },
    { label: "Yellow", color: 0xffd721 },
  ];

  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const memoizedDarkMode = useMemo(() => darkMode, [darkMode]);

  console.log({ darkMode, memoizedDarkMode });

  return (
    <div className={darkMode ? "dark" : ""}>
      <div className="bg-gradient-to-br from-[#f4f6ff] via-[#dadfff] to-[#c3d3ff] dark:from-gray-900 dark:via-gray-950 dark:to-black">
        <div className="min-h-screen w-full xl:max-w-fit m-auto">
          <main className="grid place-items-center gap-y-10 md:gap-y-20 lg:gap-y-20 xl:gap-y-0 mx-10 md:mx-14 lg:mx-20 xl:mx-32 py-5">
            <NavBar toggleDarkMode={toggleDarkMode} />
            <SectionHand
              bgHand={bgHand}
              currentColor={currentColor}
              colorButtons={colorButtons}
              updateColor={updateColor}
            />
            <section id="features" className="w-full h-screen">
              <h5 className="font-bold text-4xl text-center md:text-start sm:text-6xl xl:text-7xl 2xl:text-8xl text-gray-950 dark:text-white">
                Características
              </h5>
            </section>
            <footer></footer>
          </main>
        </div>
      </div>
    </div>
  );
}

function SectionHand({ bgHand, currentColor, colorButtons, updateColor }: any) {
  return (
    <>
      <section className="lg:h-screen grid place-items-center gap-20 lg:gap-0">
        <div className="block md:flex gap-20 md:gap-10">
          <main className="grid space-y-4 md:space-y-8 w-full md:w-3/5">
            <h5 className="font-bold text-5xl text-center md:text-start sm:text-6xl xl:text-7xl 2xl:text-8xl text-gray-950 dark:text-white">
              Aprendizaje de Lengua de Señas
            </h5>
            <p className="text-base md:text-xl text-center md:text-start 2xl:text-2xl text-gray-700 dark:text-gray-300">
              La mejor plataforma de aprendizaje de Lengua de Señas Ecuatoriana
              (LSE).
            </p>
            <p className="italic text-xs md:text-sm text-center md:text-start 2xl:text-base text-gray-700 dark:text-gray-300">
              Aprender LSE no solo te permitirá comunicarte de manera efectiva
              con personas sordas, sino que también te abrirá las puertas para
              comprender su cultura y perspectivas únicas
            </p>
            <div className="grid md:flex gap-4 m-auto md:m-0 font-bold">
              <Link
                href={`/learn`}
                className="md:1/2 p-2 px-7 bg-gray-900 hover:bg-gray-950 rounded-full text-white dark:bg-white dark:text-gray-900"
              >
                Empezar Ahora
              </Link>
              <div className="flex justify-center items-center gap-x-2 font-medium text md:1/2 dark:text-white">
                <AiFillPlayCircle size={25} color={"currentColor"} />
                <span>Ver Video</span>
              </div>
            </div>
          </main>
          <aside className="m-auto md:m-0 md:w-2/5 relative grid place-items-center">
            <Image
              src={bgHand}
              alt="Forma del fondo para el modelo de la mano"
            />
            <div className="absolute h-full w-full">
              <Canvas
                camera={{
                  fov: 60,
                  position: [0, 10, 0.8],
                }}
              >
                <Experience />
                <Hand color={currentColor} />
              </Canvas>
            </div>
            <div className="absolute top-0 left-0 grid gap-2  m-auto hand-color">
              {colorButtons.map((button: any) => (
                <button
                  key={button.label}
                  className={`h-12 w-12 border-4 rounded-full type-${button.label.toLowerCase()}`}
                  onClick={() => updateColor(button.color)}
                  type="button"
                ></button>
              ))}
            </div>
          </aside>
        </div>
        <footer className="grid place-items-center text-gray-950 dark:text-white">
          <IconScroll />
        </footer>
      </section>
    </>
  );
}
