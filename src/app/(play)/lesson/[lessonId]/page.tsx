"use client";
// import { Enunciados } from "@/components/cards/Enunciados";
// import { GeneralCard } from "@/components/cards/GeneralCard";
import { SignImageData } from "@/components/DiccionaryLesson";
import DrawerBotton from "@/components/DrawerBotton";
import Camara from '@/components/camara/Camara';
import CompleteLesson from "@/components/progress/CompleteLesson";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { Progressbar } from "@/components/progress/Progressbar";
import { PredictSign } from "@/lib/actions/lesson";
import { Progress, Times, TransitionProps, WebVideoElementWithScreenshot } from '@/lib/types/lessons';
import { Alert, Slide, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from "react";

function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}
const defaultImage = "/lesson/vocals/letra_A.jpg";
const fetchLessonById = async (lessonNumber: string | null) => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/lesson?lesson_id=${lessonNumber}`, {
      method: 'GET',
    });
    if (!response.ok) {
      throw new Error(`Error al obtener la lección: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener la lección', error);
    return [];
  }
};

const handleLessonCompletion = async (token: string, id_lesson: number, points_reached: number, state_id: number, fails: number, detail_fails: string[]) => {
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

// const PredictSign = async (category: string, image: string, char: string, accessToken: string) => {
//   try {
//     var raw = JSON.stringify({
//       category: category,
//       image: image,
//       extension: "jpeg",
//       type: "byte64",
//       char: char,
//   });

//     const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/lesson`, {
//       method: 'POST',
//       body: raw,
//     });
//     if (!response.ok) {
//       throw new Error(`No se ha detectado una seña válida: ${response.status}`);
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error al procesar la solicitud', error);
//     return [];
//   }
// };

export default function LessonVocales() {
  const searchParams = useSearchParams()
  const lesson_id = searchParams.get('id')
  const [lesson, setLesson] = useState<any | null>();

  const { data: session } = useSession();
  const webcamRef = useRef<WebVideoElementWithScreenshot>(null);
  const [submit, setSubmit] = useState(true);
  const [imagen, setImagen] = useState<any>("");
  const [currentImage, setCurrentImage] = useState(defaultImage);
  const [drawer, setDrawer] = useState(false);
  const [toggleTime, setToogleTime] = useState("3");
  const [counter, setCounter] = useState(3);
  const [open, setOpen] = useState(false);
  const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
  const [charResults, setCharResults] = useState<{ [key: string]: number }>({});
  const [errors, setErrors] = useState(charResults)
  const [progres, setprogress] = useState<Progress>({
    preguntas: 0,
    porcentaje: 0,
    asiertos: 0,
    tipo: '',
    continue: false,
    char: '',
  });

  useEffect(() => {
    if (!lesson_id) {
      return;
    }

    fetchLessonById(lesson_id).then((lessonData) => {
      setLesson(lessonData);
      const content = lessonData?.content || [];
      const category = lessonData?.category_name || [];
      const initialResults: { [key: string]: number } = {};
      content.forEach((char: string) => {
        initialResults[char] = 0;
      });
      const contentRandom = lessonData?.random ? shuffleArray(content) : content;
      setCharResults(initialResults);
      setErrors(initialResults);

      setprogress((prevProgress) => ({
        ...prevProgress,
        preguntas: contentRandom.length,
        tipo: category,
        char: contentRandom[0],
      }));
    });
  }, [lesson_id]);

  // Function to shuffle an array using the Fisher-Yates algorithm
  const shuffleArray = (array: any[]) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  const handleToogleTime = (event: React.MouseEvent<HTMLElement>, newTime: string) => {
    setToogleTime(newTime)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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
    const updateImage = () => {
      const letter = progres.char;
      const imagen = SignImageData.find((imagen) => imagen.name === letter);
      if (imagen) {
        setCurrentImage(imagen.url);
      }
    };
    updateImage();
  }, [progres.char]); // Actualiza la imagen cuando progres.char cambia

  const foto = () => {
    var captura = webcamRef?.current?.getScreenshot();
    setImagen(captura);
  };

  const setFoto = () => {
    setImagen("")
    setCounter(parseInt(toggleTime))
  }

  const handleVerification = async () => {
    setSubmit(false);
    if (progres.porcentaje != 100) {
      if (typeof imagen === "string") {
        PredictSign(lesson.category_name, imagen, progres.char, session?.accessToken || "").then(async (response) => {
          if (!response.ok) {
            setErrors((obj) => ({
              ...obj,
              [progres.char]: obj[progres.char] + 1
            }))
            setOpen(true)
            setFoto()
            return;
          }
          // La respuesta fue exitosa, maneja los datos de la respuesta
          const data = await (response as Response).json();
          if (data.result == progres.char) {
            if ((((progres.asiertos + 1) / progres.preguntas) * 100) == 100) {
              setTime((tim) => ({
                ...tim,
                final: new Date()
              }))
            }
            setprogress((pro) => ({
              ...pro,
              asiertos: pro.asiertos + 1,
              porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
              char: lesson.content[pro.asiertos + 1],
              continue: true,
            }));
          } else {
            setErrors((obj) => ({
              ...obj,
              [progres.char]: obj[progres.char] + 1
            }))
            setOpen(true)
            setFoto()
          }
        }).catch(() => {
          setErrors((obj) => ({
            ...obj,
            [progres.char]: obj[progres.char] + 1
          }))
        });

      }
    } else {
      if (lesson_id !== null) {
        // Convierte lesson_id a un entero
        const lessonIdInt = parseInt(lesson_id, 10);
        // Llama a la función handleLessonCompletion con el lessonIdInt
        handleLessonCompletion(session?.accessToken || "", lessonIdInt, 50, 3, 0, Object.keys(errors)).catch((error) => {
          console.error('Error al guardar la lección', error);
        });
      } else {
        console.error('lesson_id es null');
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
        <CompleteLesson startime={startime} errors={errors} />
        // <CompleteLesson isOpen={isOpen} setIsOpen={setIsOpen} />
      ) : (
        <div className="flex flex-col min-h-screen">
          <div className="flex-auto flex items-center">
            <Progressbar porcentaje={progres.porcentaje} setDrawer={setDrawer} />
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
              <div className="w-2/5 h-full mx-auto grid place-content-center">
                <Stack spacing={2} alignItems="center">
                  <ToggleButtonGroup
                    // orientation="vertical"
                    size="small"
                    color="primary"
                    value={toggleTime}
                    exclusive
                    onChange={handleToogleTime}
                    aria-label="Platform"
                  >
                    <ToggleButton color="secondary" value="3">3 Sec</ToggleButton>
                    <ToggleButton color="secondary" value="5">5 Sec</ToggleButton>
                    <ToggleButton color="secondary" value="7">7 Sec</ToggleButton>
                  </ToggleButtonGroup>
                </Stack>

                <div className="mt-3 shadow-md shadow-indigo-700 rounded-xl">
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
              comprobation={handleVerification}
              continuar={progres.continue}
              changeContinue={changeContinue}
            />
          </div>
          <div>
            <Snackbar
              open={open}
              autoHideDuration={2000}
              onClose={handleClose}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
              // message="Vuelve a intentarlo"
              TransitionComponent={TransitionDown}
            >
              <Alert severity="error">Vuelve a intentarlo!!</Alert>
            </Snackbar>
          </div>
        </div>
      )}
    </>
  );
}