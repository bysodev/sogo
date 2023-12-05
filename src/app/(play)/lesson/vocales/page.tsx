"use client";
// import { Enunciados } from "@/components/cards/Enunciados";
// import { GeneralCard } from "@/components/cards/GeneralCard";
import { SignImageData } from "@/components/DiccionaryLesson";
import DrawerBotton from "@/components/DrawerBotton";
import Camara from '@/components/camara/Camara';
import CompleteLesson from "@/components/progress/CompleteLesson";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { Progressbar } from "@/components/progress/Progressbar";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const defaultImage = "/lesson/vocals/letra_A.jpg";
// const vocales = ["A", "E", "I", "O", "U"];
const vocales = ["A"];

interface WebVideoElementWithScreenshot extends HTMLVideoElement {
  getScreenshot(): Promise<string>;
}

async function Verification(img64: string, vocal: string, token: string) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  // myHeaders.append("Authorization", `Bearer ${user?.user?.accessToken}`);
  myHeaders.append("Authorization", `Bearer ${token}`);

  var raw = JSON.stringify({
    learn: "vocales",
    imagen: img64,
    extension: "jpeg",
    tipo: "byte64",
    vocal: vocal,
  });

  console.log(raw)

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
    console.log(error)
    return { ok: false };
  }
}

export default function LessonVocales() {
  const { data: session } = useSession();
  const webcamRef= useRef<WebVideoElementWithScreenshot>(null);
  const [submit, setSubmit] = useState(true);
  const [imagen, setImagen] = useState<any>("");
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [drawer, setDrawer ] = useState( false );
  const [toggleTime, setToogleTime] = useState("3");
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(false);
  
  const handleToogleTime = ( event: React.MouseEvent<HTMLElement>, newTime: string) => {
    setToogleTime(newTime)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  const [progres, setprogress] = useState({
    preguntas: vocales.length,
    porcentaje: 0,
    asiertos: 0,
    tipo: "vocales",
    continue: false,
    vocal: vocales[0],
  });

  useEffect(() => {
    if( counter <= 0 ){
      foto()
      return;
    } 
    const timeout = setTimeout(() => {
      setCounter(count => count - 1)
    }, 1000);

    return () => clearTimeout(timeout)
  }, [counter])

  const foto = () => {
    var captura = webcamRef?.current?.getScreenshot();
    setImagen(captura);
  };

  const setFoto = () => {
    setImagen("")
    setCounter( parseInt(toggleTime) )
  }
  
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

  const cambio = async () => {
    setSubmit(false);
    if (progres.porcentaje != 100) {
      if (typeof imagen === "string") {
        Verification(imagen, progres.vocal, session?.accessToken || "").then(async (response) => {
          if (!response.ok) {
            // Si la respuesta no es exitosa, lanza una excepción
            // console.log(await response.json());
            setOpen(true)
            setFoto()
            return;
          }
          // La respuesta fue exitosa, maneja los datos de la respuesta
          const data = await (response as Response).json();
          console.log(data);
          if (data.result === progres.vocal){
            setprogress((pro) => ({
              ...pro,
              asiertos: pro.asiertos + 1,
              porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
              vocal: vocales[pro.asiertos + 1],
              continue: true,
            }));
          }else{
            setOpen(true)
            setFoto()
          }
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
    setFoto()
  };

  return (
    <>
      {progres.porcentaje === 100 ? (
        <CompleteLesson />
        // <CompleteLesson isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-auto flex items-center">
            <Progressbar porcentaje={progres.porcentaje} setDrawer={setDrawer} />
            {/* <button
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
            </button> */}
          </div>
          <div className="flex-auto flex place-content-center">
            <div className="flex w-4/5 justify-center items-center">
              <div className="w-2/5 mx-auto">
                <Image
                  className="rounded-xl shadow-md"
                  src={currentImage}
                  height={300}
                  width={300}
                  alt="Letra A"
                /> 
              </div>
              <div className="w-2/5 h-full content-center mx-auto">
                <ToggleButtonGroup
                  color="primary"
                  value={toggleTime}
                  exclusive
                  onChange={handleToogleTime}
                  aria-label="Platform"
                >
                  <ToggleButton value="3">3 Sec</ToggleButton>
                  <ToggleButton value="5">5 Sec</ToggleButton>
                  <ToggleButton value="7">7 Sec</ToggleButton>
                </ToggleButtonGroup>
                <div className="">
                  <Camara
                    webcamRef={webcamRef}
                    imagen={imagen}
                    counter={counter}
                    setFoto={setFoto}
                  />
                </div>
              </div>
            </div>  
          </div>
          <div className="flex-auto sm:pb-10">
            <DrawerBotton drawer={drawer} setDrawer={setDrawer} />
            <FooterLesson
              submit={submit}
              comprobation={cambio}
              continuar={progres.continue}
              changeContinue={changeContinue}
            /> 
          </div>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              message="Vuelve a intentarlo"
            />
          </div>
      </div>
      )}
    </>
  );
}