"use client";
// import { Enunciados } from "@/components/cards/Enunciados";
import DrawerBotton from "@/components/DrawerBotton";
import Camara from '@/components/camara/Camara';
import useScreenshot from "@/components/camara/useScreenshot";
import CompleteLesson from "@/components/progress/CompleteLesson";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { Progressbar } from "@/components/progress/Progressbar";
import { isValidResult } from "@/lib/actions/globales";
import { Fetcher, Progress, Times, WebVideoElementWithScreenshot } from '@/lib/types/lessons';
import { CircularProgress, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from "react";
import Confetti from 'react-confetti';
import useSWR from "swr";
const handlePostLesson = async (token: string, id_lesson: number, points_reached: number, state_id: number, fails: number, detail_fails: number[]) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/lesson`, {
      method: 'POST',
      body: JSON.stringify({
        token,
        id_lesson,
        points_reached,
        state_id,
        fails,
        detail_fails,
      }),
    });
    if (!response.ok) {
      throw new Error(`Error al obtener la lección: ${response.status}`);
    }
  } catch (error) {
    console.error('Error al obtener la lección', error);
  }
};

async function PredictSign(
  category: string,
  image: string,
  char: string,
) {
  var myHeaders = new Headers();
  myHeaders.append('Content-Type', 'application/json');

  var raw = JSON.stringify({
    category: category,
    image: image,
    extension: 'jpeg',
    type: 'byte64',
    char: char,
  });

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/predict/`, {
      credentials: 'include',
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    });
    return res;
  } catch (error) {
    return { ok: false };
  }
}

const handlePutLesson = async (token: string, id_lesson: number, points_reached: number, state_id: number, fails: number, detail_fails: number[]) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/lesson`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token,
        id_lesson,
        points_reached,
        state_id,
        fails,
        detail_fails,
      }),
    });
    return response
  } catch (error) {
    console.error('Error al obtener la lección', error);
  }
};

const fetchStatusLesson = async (token: string, id_lesson: number) => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/user_lesson?id_lesson=${id_lesson}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error al obtener el estado de la lección: ${response.status}`);
  }
  return await response.json();
};

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

  // Calcular el estado
  const status = roundedScore >= maxScore * 0.7 ? 4 : 3;
  return { score: roundedScore, status };
}

const defaultImage = "/lesson/letters/letra_A.jpg";

export default function LessonVocales() {
  const { data: session } = useSession();
  const searchParams = useSearchParams()
  const lesson_id = useMemo(() => searchParams.get('id'), [searchParams]);
  const { data: lesson, isLoading, error: isError } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/lesson?lesson_id=${lesson_id}`, Fetcher, { revalidateOnFocus: false });
  const webcamRef = useRef<WebVideoElementWithScreenshot | null>(null);
  const [submit, setSubmit] = useState(true);
  const [imagen, setImagen] = useState<any>("");
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [drawer, setDrawer] = useState(false);
  const [toggleTime, setToggleTime] = useState("5");
  const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
  const [charResults, setCharResults] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState(charResults)
  const [check, setCheck] = useState<boolean | null>(null);
  const [errosArrow, setErrosArrow] = useState(3)
  const [totalTry, setTotalTry] = useState(3)
  const [messageLesson, setMessageLesson] = useState("")
  const [counter, setCounter] = useState(0);
  type StatusLessonType = {
    score: number;
    status: number;
    prevStatus: number
  };

  const [statusLesson, setStatusLesson] = useState<StatusLessonType>({ score: 0, status: 0, prevStatus: 1 });

  useEffect(() => {
    if (counter <= 0) {
      foto();
      return;
    }

    const timeout = setTimeout(() => {
      setCounter(count => count - 1);
    }, 1000);

    return () => clearTimeout(timeout);
  }, [counter]);

  const [progres, setprogress] = useState<Progress>({
    preguntas: 0,
    porcentaje: 0,
    asiertos: 0,
    etapa: 1,
    tipo: '',
    continue: false,
    char: '',
  });
  const hiddenCanvasRef = useRef<HTMLCanvasElement | null>(null); // Nuevo canvas oculto
  const { screenshotUrl, captureScreenshot } = useScreenshot(webcamRef, hiddenCanvasRef);

  useEffect(() => {
    if (!lesson_id) {
      return;
    }
    const content = lesson?.data.content || [];
    const category = lesson?.data.category_name || [];
    const initialResults: { [key: string]: number } = {};
    content.forEach((char: string) => {
      initialResults[char] = 0;
    });
    const contentRandom = lesson?.data.random ? shuffleArray(content) : content;
    setCharResults(initialResults);
    setErrors(initialResults);
    setStatusLesson(prevState => ({ ...prevState, prevStatus: lesson?.data.state_id }));
    const sectionMap: { [key: number]: string } = {
      1: "NUMEROS",
      2: "VOCALES",
      3: "PALABRAS"
    };
    const tipo = sectionMap[lesson?.data.section_id] || "";
    setprogress((prevProgress) => ({
      ...prevProgress,
      preguntas: contentRandom.length,
      tipo: tipo,
      char: contentRandom[0],
    }));
  }, [lesson_id, lesson]);


  // Function to shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleToggleTime = (event: React.MouseEvent<HTMLElement>, newTime: string) => {
    if (newTime !== null) {
      setToggleTime(newTime);
    }
  }

  useEffect(() => {
    const updateImage = () => {
      const URL_BASE = progres.tipo === "NUMEROS" ? `/lesson/numbers/numero_${progres.char}.jpg` : `/lesson/letters/letra_${progres.char}.jpg`;
      setCurrentImage(URL_BASE || defaultImage)
    };
    updateImage();
  }, [progres.char]);

  const foto = () => {
    var captura = webcamRef?.current?.getScreenshot();
    captureScreenshot();
    setImagen(captura);
  };

  const setFoto = () => {
    setImagen("")
    setCounter(parseInt(toggleTime))
  }
  const handleSubmit = async () => {
    setTime((tim) => ({
      ...tim,
      final: new Date()
    }));
    if (lesson_id !== null) {
      // Convierte lesson_id a un entero
      const lessonIdInt = parseInt(lesson_id, 10);
      const totalFails = Object.values(errors).reduce((sum, value) => {
        return sum + value;
      }, 0);
      const totalTime = (startime.final.getTime() - startime.inicio.getTime());
      const { score, status } = calculateScore(lesson?.data.points, totalFails, 15, totalTime, lesson.data.max_time);
      setStatusLesson(prevState => ({ ...prevState, score, status }));
      // Llama a la función handlePostLesson con el lessonIdInt
      fetchStatusLesson(session?.user?.accessToken || "", lessonIdInt).then((response) => {
        // get data of response from reposne.data
        const status_id = response.data;
        if (status_id === 2) {
          handlePostLesson(session?.user.accessToken || "", lessonIdInt, score, status, totalFails, Object.values(errors)).catch((error: any) => {
            console.error('Error al guardar la lección', error);
          });
        } else if (status_id === 3) {
          handlePutLesson(session?.user.accessToken || "", lessonIdInt, score, status, totalFails, Object.values(errors)).then((response) => {
            if (response) {
              if (!response.ok) {
                setMessageLesson("El puntaje alcanzado es menor al almacenado");
              }
            }
          }).catch((error: any) => {
            console.error('Error al actualizar la lección', error);
          });
        } else {
          return
        }
      }).catch((error: any) => {
        console.error('Error al obtener el estado de la lección', error);
      });
    } else {
      console.error('lesson_id es null');
    }
  }
  useEffect(() => {
    if (progres.porcentaje === 100) {
      handleSubmit()
    }
  }, [progres.porcentaje])

  useEffect(() => {
    if (totalTry === 0) {
      setTime((tim) => ({
        ...tim,
        final: new Date()
      }));
      setErrors((obj) => {
        const newErrors = { ...obj };
        let found = false;

        for (const key in newErrors) {
          if (found) {
            newErrors[key] = 3;
          }
          if (key === progres.char) {
            found = true;
          }
        }
        return newErrors;
      });
      setMessageLesson("Sin vidas restantes")
      // logica para llenar el array de errores (valor máximo 3)
    }
  }, [totalTry, progres.char])

  const handleVerification = async () => {
    setSubmit(false);
    if (progres.porcentaje != 100) {
      if (typeof screenshotUrl === "string") {
        PredictSign(progres.tipo, screenshotUrl, progres.char).then(async (response) => {
          if (!response.ok) {
            return
          } else {
            // La respuesta fue exitosa, maneja los datos de la respuesta
            const predict = await (response as Response).json();
            if (isValidResult(progres.char, predict.data.result)) {
              setCheck(true);
              new Audio('/audio/sound-effect-current-win.wav').play();
              setprogress((pro) => ({
                ...pro,
                asiertos: pro.asiertos + 1,
                continue: true,
              }));
            } else {
              //logical to  handdle error predic with setErrrosArrow equals 3
              setCheck(false);
              new Audio('/audio/sound-effect-current-lose.wav').play();
              setErrosArrow(errosArrow - 1)
              if (errosArrow === 1) {
                setTotalTry(totalTry - 1)
                setprogress((pro) => ({
                  ...pro,
                  continue: true,
                }));
              }
              setErrors((obj) => ({
                ...obj,
                [progres.char]: obj[progres.char] + 1
              }))
              if (errosArrow !== 1) {
                setFoto();
              }
            }
          }
        }).catch(() => {
          console.error('Error al procesar la solicitud');
        });

      }
    }
    setSubmit(true);
  };

  const changeContinue = () => {
    setprogress((pro) => ({
      ...pro,
      etapa: pro.etapa + 1,
      porcentaje: ((pro.etapa) / pro.preguntas) * 100,
      char: lesson?.data.content[pro.etapa],
      continue: pro.etapa === 5,
    }));
    setErrosArrow(3)
    setCheck(null)
    setFoto()
  };

  if (isError) {
    return <div>Error al cargar los datos</div>;
  }

  return (
    <>
      <div className="2xl:container mx-auto w-full h-full relative">
        {check && <Confetti className="!z-50 !h-full !w-full" />}
        {progres.porcentaje === 100 || totalTry === 0 ? (
          <CompleteLesson messageLesson={messageLesson} startime={startime} errors={errors} statusLesson={statusLesson} />
        ) : (
          <div className="flex flex-col gap-4 h-full">
            <Progressbar porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={totalTry} />
            {
              isLoading ? (
                <div className="m-auto text-center"><CircularProgress /></div>
              ) : (
                <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full max-xl:gap-10 px-4">
                  <Image
                    className="shadow-lg border rounded-xl m-auto aspect-[12/9] object-contain"
                    src={currentImage}
                    height={500}
                    width={500}
                    alt="Letra A"
                    priority
                  />
                  <div className="relative mx-auto grid place-content-center">
                    <Stack className="bg-white/90 w-full absolute z-30" spacing={2} alignItems="start">
                      <ToggleButtonGroup
                        // orientation="vertical"
                        size="medium"
                        color="primary"
                        value={toggleTime}
                        exclusive
                        onChange={handleToggleTime}
                        aria-label="Platform"
                      >
                        <ToggleButton className="border-none text-bold px-4" color="secondary" value="3">3 Sec</ToggleButton>
                        <ToggleButton className="border-none text-bold px-4" color="secondary" value="5">5 Sec</ToggleButton>
                        <ToggleButton className="border-none text-bold px-4" color="secondary" value="7">7 Sec</ToggleButton>
                      </ToggleButtonGroup>
                    </Stack>
                    <Camara
                      webcamRef={webcamRef}
                      imagen={imagen}
                      counter={counter}
                      setFoto={setFoto}
                      hiddenCanvasRef={hiddenCanvasRef}
                    />
                  </div>
                </div>
              )
            }
            {drawer && <DrawerBotton drawer={drawer} setDrawer={setDrawer} />}
          </div>
        )}
      </div>
      <FooterLesson
        messageLesson={messageLesson}
        description={lesson?.data.description}
        submit={submit}
        comprobation={handleVerification}
        continuar={progres.continue}
        changeContinue={changeContinue}
        check={check}
        nroAttempts={errosArrow}
        endLesson={(totalTry === 0 || progres.porcentaje === 100) && true}
      />
    </>
  )
}
