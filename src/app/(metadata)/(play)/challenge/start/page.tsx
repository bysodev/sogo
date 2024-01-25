"use client";
// import { Enunciados } from "@/components/cards/Enunciados";
// import { GeneralCard } from "@/components/cards/GeneralCard";
import { SignImageData } from "@/components/DiccionaryLesson";
import DrawerBotton from "@/components/DrawerBotton";
import Camara from '@/components/camara/Camara';
import CompleteLesson from "@/components/progress/CompleteLesson";
import { FooterLesson } from "@/components/progress/FooterLesson";
import { Progressbar } from "@/components/progress/Progressbar";
import { Verification } from "@/lib/actions/lessons";
import { ChallengeCategoryByUser } from "@/lib/types/challenge";
import { Progress, Times, TransitionProps, WebVideoElementWithScreenshot } from '@/lib/types/lessons';
import { zustandStore } from "@/store/user";
import { Alert, Slide, Stack, ToggleButton, ToggleButtonGroup } from "@mui/material";
import Snackbar from '@mui/material/Snackbar';
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
function TransitionDown(props: TransitionProps) {
  return <Slide {...props} direction="down" />;
}
const defaultImage = "/lesson/vocals/letra_A.jpg";
// const vocales = ["A", "E", "I", "O", "U"];

const considerar: {[key: string]: number} = {
  A: 0, 
  E: 0, 
  I: 0, 
  O: 0, 
  U: 0
};

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
  const [startime, setTime] = useState<Times>({inicio: new Date(), final: new Date()});
  const [errors, setErrors] = useState<{[key: string]: number}>({A: 0})
  const [vocales, setVocales] = useState<string[]>(['']);
  const challenge: ChallengeCategoryByUser = zustandStore((state) => state.challenge);
  const [progres, setprogress] = useState<Progress>({
    preguntas: 0,
    porcentaje: 0,
    asiertos: 0,
    tipo: "vocales",
    continue: false,
    vocal: '',
  });


  useEffect(() => {
    let temporal = challenge?.content;
    const elementoAleatorio = temporal[Math.floor(Math.random() * temporal.length)];
    let important = elementoAleatorio.split('');
    setVocales( temporal )
    const nuevosValores: { [key: string]: number } = {};
    important.map((value) => {
      nuevosValores[value] = 0;
    })
    setprogress({
      preguntas: important?.length,
      porcentaje: 0,
      asiertos: 0,
      tipo: "vocales",
      continue: false,
      vocal: important[0],
    })
    setVocales( important )
    setErrors( () => ({...nuevosValores}) )
  }, [challenge])

  
  console.log(progres)
  console.log(errors)

  const handleToogleTime = ( event: React.MouseEvent<HTMLElement>, newTime: string) => {
    setToogleTime(newTime)
  }

  const handleClose = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

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

  const foto = () => {
    var captura = webcamRef?.current?.getScreenshot();
    setImagen(captura);
  };

  const setFoto = () => {
    setImagen("")
    setCounter( parseInt(toggleTime) )
  }

  const handleVerification = async () => {    
    setSubmit(false);
    if (progres.porcentaje != 100) {
      if (typeof imagen === "string") {
        Verification(imagen, progres.vocal, session?.accessToken || "").then(async (response) => {
          if (!response.ok) {
            console.log('Ni siquiera la reconocio')
            setErrors( (obj) => ({
              ...obj,
              [progres.vocal]: obj[progres.vocal] + 1
            }))
            setOpen(true)
            setFoto()
            return;
          }
          // La respuesta fue exitosa, maneja los datos de la respuesta
          const data = await (response as Response).json();
          console.log(data);
          if (data.result === progres.vocal){
            if( (((progres.asiertos + 1) / progres.preguntas) * 100) == 100 ){
              setTime( (tim) => ({
                ...tim,
                final: new Date()
              }))
              console.log(startime)
              console.log(errors)
            }
            setprogress((pro) => ({
              ...pro,
              asiertos: pro.asiertos + 1,
              porcentaje: ((pro.asiertos + 1) / pro.preguntas) * 100,
              vocal: vocales[pro.asiertos + 1],
              continue: true,
            }));
          }else{
            console.log('No es la vocal indicada')
            setErrors( (obj) => ({
              ...obj,
              [progres.vocal]: obj[progres.vocal] + 1
            }))
            setOpen(true)
            setFoto()
          }
        }).catch(() => {
          console.log('Error en el verificar')
          setErrors( (obj) => ({
            ...obj,
            [progres.vocal]: obj[progres.vocal] + 1
          }))
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
        <CompleteLesson startime={startime} errors={errors}/>
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
              anchorOrigin={{vertical: 'bottom', horizontal: 'center'}}
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