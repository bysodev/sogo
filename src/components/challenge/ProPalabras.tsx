'use client'

import IconLogo from "@/components/icons/logo";
import { ContentChallenge } from "@/lib/types/challenge";
import { WebVideoElementWithScreenshot } from "@/lib/types/lessons";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Camara from "../camara/Camara";
import CompleteChallenge from "../progress/CompleteChallenge";
import { FooterChallenge, FooterEndChallenge } from "../progress/FooterChallenge";
import ModalDetallesChallenge from "../progress/ModalDetallesChallenge";
import DrawerBottonChall from "./DrawerBottonChall";
import { ProgressbarChallenge } from "./ProgressbarChallenge";
import { StackContent } from "./StackContent";

const not_pass = ['E', 'J', 'Ñ', 'Z'];

type Times = {
    inicio: Date,
    final: Date
}

function obtenerURLImagen( name: string) {
  console.log('Entramos a ver la vocal')
  return  `/lesson/vocals/letra_${name}.jpg`; 
}

// function obtenerURLImagen(category: string, name: string) {
//     if( category.toUpperCase() == EnumCategory.NUMEROS ){
//       return  `/lesson/numbers/numero_${name}.jpg`;
//     }
  
//     if( category.toUpperCase() == EnumCategory.PALABRAS ){
//       return  `/lesson/vocals/letra_${name}.jpg`; 
//     }
  
//     return  `/lesson/default.jpg`; 
// }

function getMinutesAndSeconds(totalMilliseconds: number) {
  console.log(totalMilliseconds)
  // Calcular los minutos
  const totalSeconds = Math.abs(totalMilliseconds) / 1000;
  const minutes = Math.floor(totalSeconds / 60);

  // Calcular los segundos restantes
  const seconds = Math.floor(totalSeconds % 60);

  return { minutes, seconds };
}

const imageLoader = () => {
    return `/lesson/default.jpg`
}

type res_challenge = {
  bonus: number
  end_points: number
  fails: number
  id_challenge: number
  id_user: number
  minutes: number
  points: number
  seconds: number
  streak: number
  state: string
}
  
function tomarElementosEnOrden(palabra: string, spelled: boolean, supplement: boolean, operation: boolean): string[] {
    const letrasSaltandoUna: string[] = [];
  
    if( spelled == true ){
      if( operation == true ){
        for (let i = 1; i < palabra.length; i += 2) {
          if( palabra[i] )
            letrasSaltandoUna.push(palabra[i]);
        }
      }else{
        const prime_arr = palabra.split('');
        return prime_arr.filter(letra => !not_pass.includes(letra));
      }
    } 

    if( supplement == true ){
      let indiceAleatorio = Math.floor(Math.random() * palabra.length);
      letrasSaltandoUna.push(palabra[indiceAleatorio]);
    }
  
    return letrasSaltandoUna.filter(letra => !not_pass.includes(letra));
}

function calculateScore(maxScore: number, totalErrors: number, maxErrors: number, time: number, maxTime: number) {
  // Calcular la penalización por errores
  const errorPenalty = (totalErrors / maxErrors) * maxScore;
  // Calcular la penalización por tiempo
  let timePenalty = 0;
  if (time <= maxTime / 2) {
    timePenalty = 0;
  } else {
    timePenalty = ((time - maxTime / 2) / (maxTime / 2)) * maxScore;
  }
  // Calcular el puntaje total
  const totalScore = maxScore - errorPenalty - timePenalty;
  // Asegurarse de que el puntaje total no sea menor que 0
  const score = Math.max(totalScore, 0);

  // Redondear el puntaje a un número entero
  const roundedScore = Math.round(score);

  return roundedScore;
}

const handlePostChallenge = async (id: number, points: number, minutes: number, seconds: number, fails: number) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/reach_challenge`, {
      method: 'POST',
      body: JSON.stringify({
        id_challenge: id,
        points,
        minutes,
        seconds,
        fails, 
        streak: 0, 
        state: "COMPLETADO"
      }),
    });
    console.log(response)
    if (!response.ok) {
      throw new Error(`Error al obtener la lección: ${response.status}`);
    }else{
      const data = await response.json()
      console.log(data)
      return data;
    }
  } catch (error) {
    console.error('Error al obtener la lección', error);
  }
};

export default function ProPalabras({ challenge, dificultad }: { challenge: ContentChallenge, dificultad: string }) {
    const webcamRef = useRef<WebVideoElementWithScreenshot | null>(null);
    const webcamCanva = useRef<WebVideoElementWithScreenshot>(null);
    const [open, setOpen] = useState(true);
    const [toggleTime, setToogleTime] = useState("3");
    const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
    const [drawer, setDrawer] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [imagen, setImagen] = useState<any>("");
    const [counter, setCounter] = useState(0);
    
    const [messageLesson, setMessageLesson] = useState("")
    const [submit, setSubmit] = useState(true);
    const [check, setCheck] = useState<boolean | null>(null);
    const [totalTry, setTotalTry] = useState(challenge.fails_max)
    const [completed, setCompleted] = useState(false);
    const [data, setData] = useState<res_challenge>();
  
    const [progres, setprogress] = useState({
      distancia: 0,
      arreglo: [''],
      content: '',
      porcentaje: 0,
      asiertos: 0,
      etapa: 0,
      continue: false,
      intentos: 0,
      objetivos: [''],
      objetivo: '',
    });
  
    const handleToogleTime = (event: React.MouseEvent<HTMLElement>, newTime: string) => {
      setToogleTime(newTime)
    }
    const foto = () => {
      var captura = webcamRef?.current?.getScreenshot();
      setImagen(captura);
    };
  
    const setFoto = () => {
      setImagen("")
      setCounter(parseInt(toggleTime))
    }
    const handleModal = (): void => {
      setOpen( false )
    }
    useEffect(() => {
      setTime((tim) => ({
        ...tim,
        inicio: new Date()
      }));
    }, [open])

    useEffect(() => {
      if (counter <= 0) {
        foto()
        return;
      }
      const timeout = setTimeout(() => {
        setCounter(count => count - 1)
      }, 1000);
  
      return () => clearTimeout(timeout)
    }, [counter])
  
    useEffect(() => {
      if( challenge ){
        console.log(currentImage)
        let content: string = challenge.content[ Math.floor(Math.random() * challenge.content.length ) ];
        let arreglo = content.split('');
        let objetivos: string[] = tomarElementosEnOrden(content, challenge.spelled, challenge.supplement, challenge.operation);
        let objetivo = objetivos[0];
        let intentos = challenge.fails_max;
        let distancia = objetivos.length;
        // const img_principal = obtenerURLImagen(objetivo);
        const img_principal = `/lesson/vocals/letra_${objetivo}.jpg`; 
        setCurrentImage(img_principal)
        setprogress((prev) => ({
          ...prev,
          distancia,
          content,
          objetivos,
          objetivo,
          intentos,
          arreglo
        }))
  
      }
    }, [challenge])

    const handleVerification = async () => {
      setSubmit(false);
      const raw = JSON.stringify({
        category: 'palabras',
        image: imagen,
        extension: 'jpeg',
        type: 'byte64',
        char: progres.objetivo,
      })

      const respuesta = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/challenge/`, {
        method: 'POST',
        body: raw
      })

      if( respuesta.ok ){
        const predict = await (respuesta as Response).json();

        if (predict.data.result === progres.objetivo) {
          console.log(`Predicción: ${predict.data}, objetivo: ${progres.objetivo} y objetivos: ${progres.objetivos}`)
          setCheck(true);
          setprogress((pro) => ({
            ...pro,
            asiertos: pro.asiertos + 1,
            porcentaje: ((pro.asiertos + 1) / pro.distancia) * 100,
            objetivos: pro.objetivos.filter((obj) => obj !== progres.objetivo),
            objetivo: pro.objetivos.find((obj) => obj !== progres.objetivo) as string,
            continue: true
          }));
          const img_principal = `/lesson/vocals/letra_${progres.objetivos[1]}.jpg`; 
          setCurrentImage(img_principal)
        }else{
          setprogress((prev) => ({
            ...prev,
            intentos: prev.intentos - 1
          }));
          setCheck(false);
          setFoto();
        }
        console.log(predict ) 
      }

      if( respuesta.status == 500 ){
        console.log('Error')
      }

      console.log('SUBMIT')
      setSubmit(true);
    };

    const changeContinue = () => {
      setprogress((pro) => ({
        ...pro,
        continue: false,
      }));
      setCheck(null)
      setFoto()
    };


    const handleSubmit = () => {
      const totalTime = (startime.final.getTime() - startime.inicio.getTime());
      const {minutes, seconds} = getMinutesAndSeconds(totalTime);
      // Ingualar a milisegundos (mm:ss)
      const segundos = (challenge.minutes_max * 60) + challenge.seconds_max;
      const milisegundos = segundos * 1000;
      const fails = challenge.fails_max - progres.intentos
      const score = calculateScore( challenge.points, fails, challenge.fails_max, totalTime, milisegundos )
      handlePostChallenge( challenge.id, score, minutes, seconds, fails ).then((response) =>{
        console.log(response)
        setCompleted(true)
        setData({
          ...response?.data,

        })
      }).catch((err: any) => {
        console.error('Error al registrar el reto', err);
      })
    }

    useEffect

    useEffect(() => {
      if (progres.porcentaje === 100) {
        handleSubmit()
      }
    }, [progres.porcentaje])

    console.log(progres)
  

    return (
      <>
        <ModalDetallesChallenge open={open} setOpen={handleModal} number={challenge.number} name={challenge.name} descripction={challenge.description} />
        {progres.porcentaje === 100 || totalTry === 0 ? (completed && data) ? (
                <CompleteChallenge {...data} />
              ) : (
                <div className="w-full h-full grid place-content-center">
                  <IconLogo height={80} width={80} className="mx-auto mb-6" />
                  <span className="font-mono text-2xl text-s" >Espere...</span>
                </div> 
              )
          : (
            <>
              <div className="flex flex-col gap-4 h-full">
                <ProgressbarChallenge porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={progres.intentos} />
                <StackContent content={progres.arreglo} objetivos={progres.objetivos} objetivo={progres.objetivo} operacion={['']} />

                <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
                      {
                        (challenge.supplement == false) && (
                          <Image
                          // priority={true}
                          className="shadow-lg border rounded-xl m-auto aspect-video object-contain"
                          src={currentImage}
                          height={480}
                          width={480}
                          alt="Defalt"
                          />
                        )
                       
                      }
                      <div className="relative mx-auto grid place-content-center">
                        <Stack className="bg-white/70 w-full absolute z-10" spacing={2} alignItems="center">
                          <ToggleButtonGroup
                            className="self-start"
                            // orientation="vertical"
                            size="medium"
                            color="primary"
                            value={toggleTime}
                            exclusive
                            onChange={handleToogleTime}
                            aria-label="Platform"
                          >
                            <ToggleButton className="border-none text-bold px-4" color="secondary" value="3">3 Sec</ToggleButton>
                            <ToggleButton className="border-none text-bold px-4" color="secondary" value="5">5 Sec</ToggleButton>
                            <ToggleButton className="border-none text-bold px-4" color="secondary" value="7">7 Sec</ToggleButton>
                          </ToggleButtonGroup>
                        </Stack>
                        <Camara
                          webcamRef={webcamRef}
                          hiddenCanvasRef={webcamCanva}
                          imagen={imagen}
                          counter={counter}
                          setFoto={setFoto}
                        />
                      </div>
                    </div>
                    {drawer && <DrawerBottonChall drawer={drawer} setDrawer={setDrawer} />}
              </div>
              
              {
                progres.intentos == 0 ? (
                  <FooterEndChallenge />
                ) : (
                  <FooterChallenge
                    description={challenge.description}
                    submit={submit}
                    comprobation={handleVerification}
                    continuar={progres.continue}
                    changeContinue={changeContinue}
                    check={check}
                    endLesson={(progres.intentos === 0 || progres.porcentaje === 100) && true}
                    minutes={challenge.minutes_max}
                    seconds={challenge.seconds_max}
                    start={startime.inicio}
                  />
                )
              }
            </>
          )
        }
      </>
    );
}