// 'use client'
// import CompleteChallenge from "@/components/progress/CompleteChallenge";
// import { startChallengesRandom } from "@/lib/actions/challenges";
// import { ContentChallenge, EnumCategory, EnumDifficulty, ErrorChallenge, Progress } from "@/lib/types/challenge";
// import { WebVideoElementWithScreenshot } from "@/lib/types/lessons";
// import { useSession } from "next-auth/react";
// import { useEffect, useRef, useState } from "react";

// function isValidCategory(value: string): value is EnumCategory {
//   return Object.values(EnumCategory).includes(value.toUpperCase() as EnumCategory);
// }

// function isValidDifficulty(value: string): value is EnumDifficulty {
//   return Object.values(EnumDifficulty).includes(value.toUpperCase() as EnumDifficulty);
// }

// export default function Page({ params }: { params: { categoria: EnumCategory, dificultad: EnumDifficulty } }) {

//   const { data: session } = useSession();
//   const [challenge, setChallange] = useState<ContentChallenge>();
//   // const webcamRef = useRef<WebVideoElementWithScreenshot>(null);
//   // const [imagen, setImagen] = useState<any>("");
//   // const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });


//   // const [submit, setSubmit] = useState(true);
//   // // const [currentImage, setCurrentImage] = useState(defaultImage);
//   // const [drawer, setDrawer] = useState(false);

//   // const [toggleTime, setToogleTime] = useState("3");
//   // const [counter, setCounter] = useState(0);

//   // const [charResults, setCharResults] = useState<{ [key: string]: number }>({});
//   // const [errors, setErrors] = useState(charResults)
//   // const [check, setCheck] = useState<boolean | null>(null);
//   // const [errosArrow, setErrosArrow] = useState(3)
//   // const [totalTry, setTotalTry] = useState(3)
//   // const [messageLesson, setMessageLesson] = useState("")
//   // const [score, setScore] = useState(0)

//   const [progres, setprogress] = useState<Progress>({
//     preguntas: 0,
//     porcentaje: 0,
//     asiertos: 0,
//     etapa: 1,
//     tipo: '',
//     continue: false,
//     char: '',
//   });

//   useEffect(() => {
//     console.log(`Este es el token: ${session?.accessToken}`)
//     if( session?.accessToken !== undefined ){
//       if( isValidCategory(params.categoria) && isValidDifficulty(params.dificultad)){
//         (
//           async () => {
//             const respuesta: ContentChallenge | ErrorChallenge = await startChallengesRandom( params.categoria, params.dificultad, session?.accessToken )
//             if('origen' in respuesta){
//               console.log('Se trata de problemas')
//             }else{
//               setChallange(respuesta)
//             }
//           }
//         )()
//       }
//     }

//   }, [session?.accessToken, params])


//   if( !isValidCategory(params.categoria) ){
//     return <>Al parecer esta categoria no existe en nuestro repertorio</>
//   }

//   if( !isValidDifficulty(params.dificultad) ){
//     return <>Al parecer esta dificultad no existe en nuestro repertorio</>
//   }

//   console.log('Este es mi parametro: ' + params)
//   return (
//     <>
//         <div className="2xl:container mx-auto w-full h-full">

// {progres.porcentaje === 100 || totalTry === 0 ? (
//   <CompleteChallenge messageLesson={messageLesson} startime={startime} errors={errors} score={score} />
//   // <CompleteLesson isOpen={isOpen} setIsOpen={setIsOpen} />
// ) : (
//     <div className="flex flex-col gap-4 h-full">
//       <Progressbar porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={totalTry} />
//       <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
//         {
//           isLoading ? (
//             <div>Loading...</div>
//           ) : (
//             <Image
//               className="shadow-lg border rounded-xl m-auto aspect-video object-contain"
//               src={currentImage}
//               height={480}
//               width={480}
//               alt="Letra A"
//             />
//           )
//         }
//         <div className="relative mx-auto grid place-content-center">
//           <Stack className="bg-white/70 w-full absolute z-10" spacing={2} alignItems="center">
//             <ToggleButtonGroup
//               className="self-start"
//               // orientation="vertical"
//               size="medium"
//               color="primary"
//               value={toggleTime}
//               exclusive
//               onChange={handleToogleTime}
//               aria-label="Platform"
//             >
//               <ToggleButton selected className="border-none text-bold px-4" color="secondary" value="3">3 Sec</ToggleButton>
//               <ToggleButton className="border-none text-bold px-4" color="secondary" value="5">5 Sec</ToggleButton>
//               <ToggleButton className="border-none text-bold px-4" color="secondary" value="7">7 Sec</ToggleButton>
//             </ToggleButtonGroup>
//           </Stack>
//           <Camara
//             webcamRef={webcamRef}
//             imagen={imagen}
//             counter={counter}
//             setFoto={setFoto}
//           />
//         </div>
//       </div>
//       {drawer && <DrawerBotton drawer={drawer} setDrawer={setDrawer} />}
//     </div>
//   )}
//   </div>
//     </>
//   );
// }
 