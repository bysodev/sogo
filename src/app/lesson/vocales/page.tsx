"use client";
import { Enunciados } from "@/components/cards/Enunciados";
import { GeneralCard } from "@/components/cards/GeneralCard";
import Camara from "@/components/camara/Camara";
import Image from "next/image";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { ModalLesson } from "@/components/progress/ModalLesson";
import { useEffect, useRef, useState } from "react";
import { Progressbar } from "@/components/progress/Progressbar";
import defaultImage from "@/public/lesson/vocals/letra_A.jpg";
import { SignImageData } from "@/components/DiccionaryLesson";
import { getSession } from "next-auth/react";
import { DefaultSession } from "next-auth";

const vocales = ["A", "E", "I", "O", "U"];

async function verification(img64: string, vocal: string) {
  const user = await getSession();
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);

  var raw = JSON.stringify({
    learn: "numeros",
    imagen: img64,
    extension: "jpeg",
    tipo: "byte64",
    vocal: vocal,
  });

  try {
    const res = await fetch(`http://127.0.0.1:8000/user/lesson/vocales`, {
      method: "POST",
      headers: myHeaders,
      body: raw,
      credentials: "include",
      redirect: "follow",
    });
    return res;
  } catch (error) {
    // console.log(error)
    return { ok: false };
  }
}

const getLesson = async () => {
  const user = await getSession();

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);

  const res = await fetch(`http://127.0.0.1:8000/user/lesson/vocales`, {
    method: "GET",
    headers: myHeaders,
    credentials: "include",
    redirect: "follow",
  });
  return res.json();
};

export default function LessonVocales() {
  const timeLocal = new Date();
  const webcamRef = useRef(null);
  const [submit, setSubmit] = useState(true);
  const [imagen, setImagen] = useState("");
  let [isOpen, setIsOpen] = useState(true);
  const [progres, setprogress] = useState({
    preguntas: 5,
    porcentaje: 0,
    asiertos: 0,
    tipo: "vocales",
    continue: false,
    vocal: vocales[0],
  });

  // Almacena la imagen actual en el estado del componente
  const [currentImage, setCurrentImage] = useState(defaultImage);

  useEffect(() => {
    const updateImage = () => {
      const letter = progres.vocal;
      const imagen = SignImageData.find((imagen) => imagen.name === letter);
      if (imagen) {
        setCurrentImage(imagen.url);
      }
    };
    updateImage();
  }, [progres.vocal]); // Actualiza la imagen cuando progres.vocal cambia

  const [time, settime] = useState(timeLocal);

  useEffect(() => {
    let startTime = new Date();
    settime(startTime);
  }, []);

  const guardar = () => {
    const newTime = new Date();
    const diference = newTime.getTime() - time.getTime();

    const hours = Math.floor(diference / 3600000); // 1 hora = 3600000 milisegundos
    const minutes = Math.floor((diference % 3600000) / 60000); // 1 minuto = 60000 milisegundos
    const seconds = Math.floor((diference % 60000) / 1000); // 1 segundo = 1000 milisegundos

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    console.log(`${formattedHours}:${formattedMinutes}:${formattedSeconds}`);
  };

  const cambio = async () => {
    setSubmit(false);
    if (progres.porcentaje != 100) {
      if (typeof imagen === "string") {
        verification(imagen, progres.vocal).then(async (response) => {
          if (!response.ok) {
            // Si la respuesta no es exitosa, lanza una excepción
            // console.log(await response.json());
            return;
          }
          // La respuesta fue exitosa, maneja los datos de la respuesta
          const data = await (response as Response).json();
          console.log(data);
          if (data.result === progres.vocal)
            setprogress((pro) => ({
              ...pro,
              asiertos: pro.asiertos + 1,
              porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
              vocal: vocales[pro.asiertos + 1],
              continue: true,
            }));
        });
      }
    }
    setSubmit(true);
  };
  const changeContinue = () => {
    setprogress((pro) => ({
      ...pro,
      continue: false,
    }));
  };

  return (
    <>
      {progres.porcentaje === 100 ? (
        <ModalLesson isOpen={isOpen} setIsOpen={setIsOpen} guardar={guardar} />
      ) : (
        ""
      )}

      <div className="flex flex-row flex-wrap justify-center w-full">
        <Progressbar porcentaje={progres.porcentaje} />
        <button
          onClick={() => {
            setprogress((pro) => ({
              ...pro,
              asiertos: pro.asiertos + 1,
              porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
              continue: true,
            }));
          }}
        >
          CLICK
        </button>
        <div className="flex w-4/5 justify-between">
          <div className="w-2/5 mx-auto">
            <Image
              className="rounded-xl shadow-md"
              src={currentImage}
              height={300}
              width={300}
              alt="Letra A"
            />
          </div>
          <div className="w-2/5">
            <Camara
              webcamRef={webcamRef}
              imagen={imagen}
              setImagen={setImagen}
            />
          </div>
        </div>
        <FooterLesson
          imagen={imagen}
          submit={submit}
          setSubmit={setSubmit}
          comprobation={cambio}
          continuar={progres.continue}
          changeContinue={changeContinue}
        />
      </div>
    </>
  );
}
