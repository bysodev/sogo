'use client'

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

type Times = {
    inicio: Date,
    final: Date
}

function obtenerURLImagen( name: string) {
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
        return palabra.split('');
      }
    } 

    if( supplement == true ){
      let indiceAleatorio = Math.floor(Math.random() * palabra.length);
      letrasSaltandoUna.push(palabra[indiceAleatorio]);
    }
  
    return letrasSaltandoUna;
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
    const webcamRef = useRef<WebVideoElementWithScreenshot>(null);
    const webcamCanva = useRef<WebVideoElementWithScreenshot>(null);
    const [open, setOpen] = useState(true);
    const [toggleTime, setToogleTime] = useState("3");
    const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
    const [drawer, setDrawer] = useState(false);
    const [currentImage, setCurrentImage] = useState('');
    const [img, setImagen] = useState<string>('Esto es temporal');
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
      setImagen(`${captura}`);
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
        let content: string = challenge.content[ Math.floor(Math.random() * challenge.content.length ) ];
        let arreglo = content.split('');
        let objetivos: string[] = tomarElementosEnOrden(content, challenge.spelled, challenge.supplement, challenge.operation);
        let objetivo = objetivos[0];
        let intentos = challenge.fails_max;
        let distancia = objetivos.length;
        const img_principal = obtenerURLImagen(objetivo );
        setCurrentImage( img_principal )
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
        image: 'data:image/jpeg;base64,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 ',

        // image: img,
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

        if (predict.data === progres.objetivo) {
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
              ) : (<div>Esperemos un momento, se esta registrando</div>)
          : (
            <>
              <div className="flex flex-col gap-4 h-full">
                <ProgressbarChallenge porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={progres.intentos} />
                <StackContent content={progres.arreglo} objetivos={progres.objetivos} objetivo={progres.objetivo} operacion={['']} />

                <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
                      {
                        (challenge.supplement == false) &&
                        <Image
                            className="shadow-lg border rounded-xl m-auto aspect-video object-contain"
                            src={currentImage}
                            loader={imageLoader}
                            height={480}
                            width={480}
                            alt="Defalt"
                        />
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
                          imagen={img}
                          counter={counter}
                          setFoto={setFoto}
                        />
                      </div>
                    </div>
                    {drawer && <DrawerBottonChall drawer={drawer} setDrawer={setDrawer} />}
              </div>
              
              {
                progres.intentos == 0 ? (
                  <FooterEndChallenge categoria="palabras" dificultad={dificultad} />
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