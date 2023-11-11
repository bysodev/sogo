"use client";
import { Enunciados } from "@/components/cards/Enunciados";
import { GeneralCard } from "@/components/cards/GeneralCard";
import Camara from "@/components/camara/Camara";
import Image from "next/image";
import A from "@/public/lesson/vocals/letra_A.jpg";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { useState } from "react";
import { Progressbar } from "@/components/progress/Progressbar";

const vocales = ["A", "E", "I", "O", "U"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

export default function LessonNumeros() {
  const [progres, setprogress] = useState({
    preguntas: 10,
    porcentaje: 0,
    asiertos: 0,
    tipo: "numeros",
    continue: false,
  });

  const cambio = () => {
    setprogress((pro) => ({
      ...pro,
      asiertos: pro.asiertos + 1,
      porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
    }));
  };
  return (
    <>
      <div className="flex flex-row flex-wrap justify-center w-full">
        <Progressbar porcentaje={progres.porcentaje} />
        <button onClick={cambio}>CLICK</button>
        <div className="flex w-4/5 justify-between">
          <div className="w-2/5 m-2">
            <div className="flex flex-col justify-center rounded-xl shadow-md">
              <Image src={A} alt="Letra A" />
              <div className="text-center">
                <h4 className="mb-2 block font-sans text-2xl font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased">
                  Natalie Paisley
                </h4>
                <p className="block bg-gradient-to-tr from-pink-600 to-pink-400 bg-clip-text font-sans text-base font-medium leading-relaxed text-transparent antialiased">
                  CEO / Co-Founder
                </p>
              </div>
            </div>
          </div>
          <div className="w-2/5">
            {/* <Camara webcamRef={webcamRef} imagen={imagen} setImagen={setImagen}  /> */}
          </div>
        </div>
        {/* <FooterLesson /> */}
      </div>
    </>
  );
}
