'use client'

import DrawerBotton from "@/components/DrawerBotton";
import IconLogo from "@/components/icons/logo";
import { isValidResult } from "@/lib/actions/globales";
import { ContentChallenge, EnumCategory } from "@/lib/types/challenge";
import { WebVideoElementWithScreenshot } from "@/lib/types/lessons";
import { Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti';
import Camara from "../camara/Camara";
import CompleteChallenge from "../progress/CompleteChallenge";
import { FooterChallenge, FooterEndChallenge } from "../progress/FooterChallenge";
import ModalDetallesChallenge from "../progress/ModalDetallesChallenge";
import { ProgressbarChallenge } from "./ProgressbarChallenge";
import { StackContent } from "./StackContent";

type Times = {
  inicio: Date,
  final: Date
}
const default_numero = `/lesson/numbers/numero_0.jpg`;

function obtenerURLImagen(name: string | number) {
  return `/lesson/numbers/numero_${name}.jpg`;
}

function getMinutesAndSeconds(totalMilliseconds: number) {
  // Calcular los minutos
  const totalSeconds = Math.abs(totalMilliseconds) / 1000;
  const minutes = Math.floor(totalSeconds / 60);

  // Calcular los segundos restantes
  const seconds = Math.floor(totalSeconds % 60);
  console.log( minutes, seconds )
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

type Operador = '+' | '-' | '*' | '/';

const calc_operaciones = (operador: Operador, num1: number, num2: number): number | null => {
  const operaciones: Record<Operador, (a: number, b: number) => number | null> = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => (b !== 0 ? a / b : null),
  };

  if (!(operador in operaciones)) {
    // Manejar el caso en que el operador no está definido
    console.error(`ERRORES`);
    return 0.00;
  }

  return operaciones[operador](num1, num2);
}

type ElementOperation = {
  operacion: any[],
  indices: number[],
  resultado: string[],
  calculo: number
}

function tomarElementosEnOrden(content: string, spelled: boolean, supplement: boolean, operation: boolean): [string[], number[]] | ElementOperation {
  const num1: number = Math.floor(Math.random() * 10);
  const num2: number = Math.floor(Math.random() * 10);
  const numeros_salteados = []
  const indices_salteados = []
  const prime_arr = content.split('');

  if (spelled == true) {
    if (operation == true) {
      const operator = content[Math.floor(Math.random() * content.length)];
      let cal = calc_operaciones(operator as Operador, num1, num2);
      if (!cal) {
        return tomarElementosEnOrden(content, spelled, supplement, operation)
      }
      if (cal) {
        let calculo = cal.toFixed(2)
        let tempo = String(calculo).split('')
        let indices = tempo.map((numt, index) => index);
        if (!(parseFloat(calculo) % 1 !== 0)) {
          tempo = String(parseInt(calculo)).split('')
          indices = tempo.map((numt, index) => index);
        }
        return { operacion: [num1, operator, num2], resultado: tempo, indices, calculo: parseFloat(calculo) }
      }
    }
    if (supplement == true) {
      for (let i = 1; i < content.length; i += 2) {
        if (content[i]) {
          numeros_salteados.push(content[i]);
          indices_salteados.push(i);
        }
      }
      return [numeros_salteados, indices_salteados];
    }
    return [prime_arr, prime_arr.map((letra, index) => index)];
  }
  return [prime_arr, prime_arr.map((letra, index) => index)];

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
    if (!response.ok) {
      throw new Error(`Error al obtener la lección: ${response.status}`);
    } else {
      const data = await response.json()
      return data;
    }
  } catch (error) {
    console.error('Error al obtener la lección', error);
  }
};

export default function ProNumeros({ challenge, dificultad }: { challenge: ContentChallenge, dificultad: string }) {
  const webcamRef = useRef<WebVideoElementWithScreenshot>(null);
  const webcamCanva = useRef<WebVideoElementWithScreenshot>(null);
  const [open, setOpen] = useState(true);
  const [toggleTime, setToogleTime] = useState("3");
  const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
  const [drawer, setDrawer] = useState(false);
  const [currentImage, setCurrentImage] = useState('');
  const [img, setImagen] = useState<any>();
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
    operacion: [''],
    indices: [0],
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
    setOpen(false)
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
    if (challenge) {
      let content = challenge.content[Math.floor(Math.random() * challenge.content.length)];
      let arreglo = content.split('');

      let objetivo_temporal: [string[], number[]] | ElementOperation = tomarElementosEnOrden(content, challenge.spelled, challenge.supplement, challenge.operation);
      let objetivos = [''];
      let indices = [0];
      let operacion = [''];
      if (challenge.operation == true && objetivo_temporal) {
        // let datos = objetivo_temporal as ElementOperation
        objetivo_temporal = objetivo_temporal as ElementOperation
        operacion = objetivo_temporal?.operacion;
        arreglo = objetivo_temporal?.resultado;
        indices = objetivo_temporal?.indices;
        objetivos = objetivo_temporal?.resultado.filter((res) => !isNaN(Number(res)));
      } else {
        const [objetiv, indic] = objetivo_temporal as [string[], number[]]
        objetivos = objetiv;
        indices = indic;
      }
      let objetivo = objetivos[0];
      let intentos = challenge.fails_max;
      let distancia = objetivos.length;

      const img_principal = `/lesson/numbers/numero_${objetivo}.jpg`;
      setCurrentImage(img_principal)
      setprogress((prev) => ({
        ...prev,
        operacion,
        distancia,
        content,
        indices,
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
      category: EnumCategory.NUMEROS,
      image: img,
      extension: 'jpeg',
      type: 'byte64',
      char: progres.objetivo,
    })

    const respuesta = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/predict/`, {
      method: 'POST',
      body: raw
    })

    if (respuesta.ok) {
      const predict = await (respuesta as Response).json();

      if (isValidResult(predict.data.result, progres.objetivo)) {
        setCheck(true);
        new Audio('/audio/sound-effect-current-win.wav').play();
        setprogress((pro) => ({
          ...pro,
          asiertos: pro.asiertos + 1,
          continue: true
        }));
      } else {
        setprogress((prev) => ({
          ...prev,
          intentos: prev.intentos - 1
        }));
        setCheck(false);
        new Audio('/audio/sound-effect-current-lose.wav').play();
        setFoto();
      }
    }

    if (respuesta.status == 500) {
      console.error('Error en el servidor')
    }

    setSubmit(true);
  };

  const changeContinue = () => {
    let index_trash = progres.objetivos.indexOf(progres.objetivo);
    setprogress((pro) => ({
      ...pro,
      porcentaje: ((pro.asiertos) / pro.distancia) * 100,
      objetivos: pro.objetivos.filter((obj, index) => index !== index_trash),
      indices: pro.indices.filter((obj, index) => index !== index_trash),
      objetivo: pro.objetivos.find((obj, index) => index !== index_trash) as string,
      continue: false,
    }));
    const img_principal = `/lesson/numbers/numero_${progres.objetivos[1]}.jpg`;
    setCurrentImage(img_principal || default_numero)
    setCheck(null)
    setFoto()
  };

  const handleSubmit = () => {
    const tiempo_finzalizacion = new Date();
    const totalTime = (tiempo_finzalizacion.getTime() - startime.inicio.getTime());
    // const totalTime = (startime.final.getTime() - startime.inicio.getTime());new Date()
    const { minutes, seconds } = getMinutesAndSeconds(totalTime);
    // Ingualar a milisegundos (mm:ss)
    const segundos = (challenge.minutes_max * 60) + challenge.seconds_max;
    const milisegundos = segundos * 1000;
    const fails = challenge.fails_max - progres.intentos
    console.log( {totalTime, milisegundos} )
    const score = calculateScore(challenge.points, fails, challenge.fails_max, totalTime, milisegundos)
    handlePostChallenge(challenge.id, score, minutes, seconds, fails).then((response) => {
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

  useEffect(() => {
    if (progres.intentos === 0 && progres.content !== '') {
      new Audio('/audio/sound-effect-global-lose.wav').play();
    }
  }, [progres.intentos]);

  return (
    <>
      <ModalDetallesChallenge open={open} setOpen={handleModal} number={challenge.number} name={challenge.name} descripction={challenge.description} />
      {progres.porcentaje === 100 || totalTry === 0 ? (completed && data) ? (
        <CompleteChallenge {...data} />
      ) : (
        <div className="w-screen h-screen grid place-content-center">
          <IconLogo height={60} width={60} className="mx-auto mb-6" />
          <span className="font-mono text-2xl text-s" >Espere...</span>
        </div>
      )
        : (
          <>
            {check && <Confetti className="!z-50 !h-full !w-full" />}
            <div className="flex flex-col gap-2 h-full">
              <ProgressbarChallenge porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={progres.intentos} />
              <StackContent content={progres.arreglo} indices={progres.indices} objetivos={progres.objetivos} objetivo={progres.objetivo} operacion={progres.operacion} />

              <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
                {
                  currentImage &&
                  <Image
                    className="shadow-lg border rounded-xl m-auto aspect-[12/9] object-contain"
                    src={currentImage || default_numero}
                    // loader={imageLoader}
                    height={480}
                    width={480}
                    alt="Defalt"
                    priority
                  />
                }
                <div className="relative mx-auto grid place-content-center">
                  <Stack className="bg-white/70 w-full absolute z-10" spacing={2} alignItems="center">
                    <ToggleButtonGroup
                      className="self-start"
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
              {drawer && <DrawerBotton drawer={drawer} setDrawer={setDrawer} />}
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
