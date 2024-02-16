'use client'
import TooltipMessage from "@/components/TooltipMessage";
import Camara from "@/components/camara/Camara";
import DrawerBottonChall from "@/components/challenge/DrawerBottonChall";
import { ProgressbarChallenge } from "@/components/challenge/ProgressbarChallenge";
import { StackContent } from "@/components/challenge/StackContent";
import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import CompleteChallenge from "@/components/progress/CompleteChallenge";
import { FooterChallenge, FooterEndChallenge } from "@/components/progress/FooterChallenge";
import ModalDetallesChallenge, { ModalNotParameters, ModalOutsideTime } from "@/components/progress/ModalDetallesChallenge";
import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { WebVideoElementWithScreenshot } from "@/lib/types/lessons";
import { Alert, Stack, ToggleButton, ToggleButtonGroup, Tooltip, toggleButtonGroupClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { FaQuestionCircle } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const not_pass = ['E', 'J', 'Ñ', 'Z'];

const defect_palabra = `/lesson/vocals/letra_A.jpg`;
const defect_numero = `/lesson/numbers/numero_0.jpg`;

type ElementOperation = {
    operacion: any[], 
    resultado: string[],
    calculo: number
}

type Times = {
    inicio: Date,
    final: Date
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

function getMinutesAndSeconds(totalMilliseconds: number, allowedTime: number) {
    let outside = false;
    console.log(totalMilliseconds)
    // Calcular los minutos
    const totalSeconds = Math.abs(totalMilliseconds) / 1000;
    const minutes = Math.floor(totalSeconds / 60);
  
    // Calcular los segundos restantes
    const seconds = Math.floor(totalSeconds % 60);
    console.log({totalMilliseconds, allowedTime})
    if ( Math.abs(totalMilliseconds) > (allowedTime*1) + 1) {
        outside = true;
    }
  
    return { minutes, seconds, outside };
  }

function ordenamientoContent(category: string, content: string, supplement: boolean, operation: boolean): string[] | ElementOperation {
    const letrasSaltandoUna: string[] = [];
    
    if( category == EnumCategory.PALABRAS ){
        if( operation == true ){
            for (let i = 1; i < content.length; i += 2) {
                if( content[i] )
                    letrasSaltandoUna.push(content[i]);
            }
        }else{
            const prime_arr = content.split('');
            return prime_arr.filter(letra => !not_pass.includes(letra));
        }
      
        if( supplement == true ){
            let indiceAleatorio = Math.floor(Math.random() * content.length);
            letrasSaltandoUna.push(content[indiceAleatorio]);
        }
        return letrasSaltandoUna.filter(letra => !not_pass.includes(letra));
    }

    if( category == EnumCategory.NUMEROS ){
        const num1: number = Math.floor( Math.random() * 10 );
        const num2: number = Math.floor( Math.random() * 10 );
        const numeros_salteados = []
        
        if( operation == true ){
            console.log(content)
            const operator = content[ Math.floor(Math.random() * content.length ) ]; 
            console.log(`Este es el operador: ${operator}`)
            let cal = calc_operaciones( operator as Operador, num1, num2 ); 
            if( !cal ){ 
                return ordenamientoContent( category, content, supplement, operation )
            }
            if( cal ){ 
                let calculo = cal.toFixed(2)
                let tempo = String(calculo).split('')
                if (!(parseFloat(calculo) % 1 !== 0)){
                    tempo = String(parseInt(calculo)).split('')
                }
                return { operacion: [num1, operator, num2], resultado: tempo, calculo: parseFloat(calculo) }
            }
        }
        if(supplement == true){
            for (let i = 1; i < content.length; i += 2) {
            if( content[i] )
                numeros_salteados.push(content[i]);
            }
            return numeros_salteados;
        }
      return content.split('');
    }

    return content.split('');
}

function isValidCategory(value: string): value is EnumCategory {
    return Object.values(EnumCategory).includes(value.toUpperCase() as EnumCategory);
}

function isValidDifficulty(value: string): value is EnumDifficulty {
    return Object.values(EnumDifficulty).includes(value.toUpperCase() as EnumDifficulty);
}

const StyledToggleButtonGroup = styled(ToggleButtonGroup)(({ theme }) => ({
    [`& .${toggleButtonGroupClasses.grouped}`]: {
      margin: theme.spacing(0.5),
      border: 0,
      borderRadius: theme.shape.borderRadius,
      [`&.${toggleButtonGroupClasses.disabled}`]: {
        border: 0,
      },
    },
    [`& .${toggleButtonGroupClasses.middleButton},& .${toggleButtonGroupClasses.lastButton}`]:
      {
        marginLeft: -1,
        borderLeft: '1px solid transparent',
      },
}))
  
const handlePostChallenge = async (category: string, difficulty: string, minutes_max: number, seconds_max: number, minutes: number, seconds: number, lives: number, fails: number) => {
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/customized_challenge`, {
        method: 'POST',
        body: JSON.stringify({
          category,
          difficulty,
          minutes_max,
          seconds_max,
          minutes,
          seconds,
          lives,
          fails, 
        }),
      });
      console.log(response)
      if (!response.ok) {
        throw new Error(`Error al registrar el reto: ${response.status}`);
      }else{
        const data = await response.json()
        console.log(data)
        return data;
      }
    } catch (error) {
      console.error('Error con el registro del reto', error);
    }
};

export default function ChallengesPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const [prime, setPrimeData] = useState(true);
    const [detail, setDetailsModal] = useState(true);
    const [outside, setOutside] = useState(false);

    const [category, setCategory] = useState<EnumCategory>();
    const [difficulty, setDifficulty] = useState<EnumDifficulty>();
    const [procced, setProcced] = useState(false);
    const [completed, setCompleted] = useState(false);
    const [drawer, setDrawer] = useState(false);
    const [toggleTime, setToogleTime] = useState("3");
    const [img, setImagen] = useState<string>('');
    const [counter, setCounter] = useState(0);
    const [startime, setTime] = useState<Times>({ inicio: new Date(), final: new Date() });
    const [submit, setSubmit] = useState(true);
    const [check, setCheck] = useState<boolean | null>(null);
    const [reto, setReto] = useState<res_challenge>();
    
    // IMAGENES
    const webcamRef = useRef<WebVideoElementWithScreenshot>(null);
    const webcamCanva = useRef<WebVideoElementWithScreenshot>(null);
    const [currentImage, setCurrentImage] = useState('');

    // TEMAS DE MODALES
    const handleDetailsModal = () => setDetailsModal(false);
    const handleRouter = () => router.back();
    const [showDialog, setShowDialog] = useState(true);

    const handleOpen = () => setShowDialog(true);
    const handleClose = () => setShowDialog(false);
    // PARA EL FORMULARIO
    const [isLoading, setIsLoading] = useState(false);
    const [operaciones, setOperation] = useState(() => ['+']);
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
        objetivos: [''],
        objetivo: '',
        operation: false,
        supplement: false,
        minutes: 0,
        seconds: 0,
        fails_max: 0
    });
      
    interface UseFormInputs {
        content?: string;
        operators?: string
        supplement: boolean;
        operation: boolean;
        intentos: number;
        minutes: number;
        seconds: number;
    }

    
    // FUNCIONES PARA LA CAMARA
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
  
    useEffect(() => {
        if( searchParams.has('category') && searchParams.has('difficulty') ){
            const categoria = searchParams.get('category') as string;
            const dificultad = searchParams.get('difficulty') as string;
            if( isValidCategory(categoria) && isValidDifficulty(dificultad) ){
                setCategory(categoria.toUpperCase() as EnumCategory)
                setDifficulty(dificultad.toUpperCase() as EnumDifficulty)
                setProcced(true)
                console.log('Hacen falta los parametros para esta pagina, no tocar nada de la URL')
            }
        }
    }, [searchParams])

    useEffect(() => {
        setTime((tim) => ({
            ...tim,
            inicio: new Date()
        }));
    }, [detail])

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

    
    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm<UseFormInputs>({ mode: "onChange" });

    async function onSubmit(data: UseFormInputs) {
        const { operation, supplement, intentos, minutes, seconds } = {...data};
        let content = data.content?.toUpperCase() as string;
        if( category == EnumCategory.NUMEROS && operation )
            content = operaciones[ Math.floor(Math.random() * operaciones.length )];
        let arreglo = content.split('');
        let objetivo_temporal: string[] | ElementOperation = ordenamientoContent(category as string, content, supplement, operation);
        let objetivos = objetivo_temporal as string[];
        let operacion = [''];
        console.log(`Estos son los datos que tenemos: ${ JSON.stringify( objetivo_temporal )}`)
        
        if (category==EnumCategory.NUMEROS && operation == true && objetivo_temporal ){
          // let datos = objetivo_temporal as ElementOperation
          objetivo_temporal = objetivo_temporal as ElementOperation
          console.log(objetivo_temporal)
          operacion = objetivo_temporal?.operacion;
          arreglo = objetivo_temporal?.resultado;
          objetivos = objetivo_temporal?.resultado.filter((res) => !isNaN(Number(res)));
        }
        let objetivo = objetivos[0];
        let setObjetivos = new Set(objetivos);
        let distancia = setObjetivos.size;
        // let distancia = objetivos.length;

        // console.log({...data, signo: operation});
        setIsLoading(true);
        const urlPalabraImg = `/lesson/vocals/letra_${objetivo}.jpg`;
        const urlNumeroImg = `/lesson/numbers/numero_${objetivo}.jpg`;
        const urlImg = category === EnumCategory.PALABRAS ? urlPalabraImg : ( category === EnumCategory.NUMEROS ? urlNumeroImg : '/lesson/default.jpg' )
        setCurrentImage( urlImg )

        // VALIDACIONES
        if( operation == true ){
            if( operaciones.length == 0 ){
                console.log('Esto no procede')
            }else{
                setprogress((prev) => ({
                    ...prev,
                    distancia,
                    content,
                    objetivos,
                    objetivo,
                    intentos,
                    arreglo, 
                    operacion,
                    operation,
                    supplement,
                    minutes, 
                    seconds,
                    fails_max: intentos

                }))
                setIsLoading(false);
                setPrimeData(false);
                reset();
            }
        }else{
            // setprogress({...data})
            setprogress((prev) => ({
                ...prev,
                distancia,
                content,
                objetivos,
                objetivo,
                intentos,
                arreglo, 
                operacion,
                operation,
                supplement,
                minutes, 
                seconds,
                fails_max: intentos
            }))
            setIsLoading(false);
            setPrimeData(false);
            reset();
        }
    }

    const handleDevices = (
        event: React.MouseEvent<HTMLElement>,
        newDevices: string[],
      ) => {
        if (newDevices.length) {
          setOperation(newDevices);
        }
    };

    const handleVerification = async () => {
        setSubmit(false);
        const raw = JSON.stringify({
          category: 'palabras',
          image: img,
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
  
          console.log({predict: predict.data, objetivo: progres.objetivo});
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
            const urlPalabraImg = `/lesson/vocals/letra_${progres.objetivos[1]}.jpg`;
            const urlNumeroImg = `/lesson/numbers/numero_${progres.objetivos[1]}.jpg`;
            const urlImg = category === EnumCategory.PALABRAS ? (urlPalabraImg || defect_palabra) : ( category === EnumCategory.NUMEROS ? (urlNumeroImg || defect_numero) : '/lesson/default.jpg' )
            setCurrentImage( urlImg )
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

    const handleSubmitChall = () => {
        console.log( { final: startime.final.getTime(), inicio: startime.inicio.getTime() } )
        const totalTime = (startime.final.getTime() - startime.inicio.getTime());
        const maxTime = ((progres.minutes * 60) + progres.seconds) * 1000;
        const {minutes, seconds, outside} = getMinutesAndSeconds(totalTime, maxTime);
        console.log({minutes, seconds, outside})

        if( outside ){
            setOutside(true);
        }else{
            const fails = progres.fails_max - progres.intentos
            handlePostChallenge( category as string, difficulty as string, progres.minutes, progres.seconds, minutes, seconds, progres.fails_max, fails ).then((response) =>{
                console.log(response)
                setCompleted(true)
                setReto({
                ...response?.data,

                })
            }).catch((err: any) => {
                console.error('Error al registrar el reto', err);
            })
        }
    }
    useEffect(() => {
        if (progres.porcentaje === 100) {
            handleSubmitChall()
        }
    }, [progres.porcentaje])

    if( !procced ){
        return <ModalNotParameters open={true} setRouter={handleRouter} />
    }

    const patterms = {
        PALABRAS: /[A-Z]+/,
        NUMEROS: /^[0-9]+$/
    }

    const description = {
        PALABRAS: "Solo se permiten letras y que esten en mayúsculas",
        NUMEROS: "Solo se permiten numeros"
    }

    if( prime ){ 
        return <>
        <div className="h-screen w-full max-h-screen grid justify-center content-around">
            <div className="grid gap-4 lg:py-4 px-4">
                <h1 className="rounded-xl border-2 p-1 font-bold text-2xl text-center text-gray-500">Retos Personalizados</h1>
                {!showDialog && (
                    <button className="flex gap-4 items-center justify-end" onClick={handleOpen}><span>Volver a mostrar</span> <Tooltip title={'Volver a mostrar las indicaciones de la sección de retos'} placement="top" arrow>
                    <div>
                        <FaQuestionCircle />
                    </div>
                    </Tooltip>
                    </button>
                )}
                {showDialog && (
                    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
                        <div className="md:flex">
                            <div className="p-2">
                                <div className="tracking-wide text-sm text-indigo-500 font-semibold flex justify-between">
                                    <span className="text-gray-900 dark:text-white font-extrabold text-xl">
                                        ¿Cómo funciona?
                                    </span>
                                    <button className="text-gray-700" onClick={handleClose}><IoClose size={20} /></button>
                                </div>
                                <p className="mt-2 text-gray-500">
                                    En el formulario de abajo puede seleccionar el contenido que quiera predecir por su cuenta, <br /> como es la mismo logica de los retos usted podra personalizar todos los parametros
                                </p>
                            </div>
                        </div>
                    </div>
                )}
            </div>
            <div className="p-4 lg:p-0">
                <div className="p-2 sm:p-8 sm:py-2 xl:px-6">
                    <form
                    autoComplete="off"
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit(onSubmit)(e);
                    }}
                    >
                    <div className="grid gap-4">
                        <div className="flex flex-wrap justify-between gap-2">
                            <label htmlFor="content" className="font-mono font-bold text-2xl">Contenido:</label>
                            <div
                            className={`relative w-3/4 flex flex-wrap gap-2 text-sm ${errors.content
                                ? "text-red-600 border-red-400"
                                : "text-gray-600 border-gray-400 dark:text-gray-400"
                                } container-fluid`}
                            >
                                <input
                                    disabled={isLoading}
                                    autoComplete="hola"
                                    className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                                    type="text"
                                    placeholder="Contenido de la lección"
                                    {...register("content", {
                                    required: { value: true, message: "Contenido requerido" },
                                    pattern: {
                                        value: patterms[category as EnumCategory],
                                        message: description[category as EnumCategory],
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "Requiere al menos 1 caracteres",
                                    }
                                    })}
                                />
                            {errors.content && (
                                <TooltipMessage message={errors.content.message!} />
                            )}
                            </div>
                        </div>
                        {
                            category == EnumCategory.NUMEROS && (
                                <div className="flex flex-wrap justify-between gap-2">
                                    <label htmlFor="operators" className="font-mono font-bold text-2xl">Operadores:</label>
                                    <StyledToggleButtonGroup
                                        size="small"
                                        value={operaciones}
                                        onChange={handleDevices}
                                        aria-label="operaciones"
                                    >
                                        <ToggleButton sx={{paddingX: 2, paddingY: 1}} value="+" aria-label="suma">
                                            +
                                        </ToggleButton>
                                        <ToggleButton sx={{paddingX: 2, paddingY: 1}} value="-" aria-label="resta">
                                            -
                                        </ToggleButton>
                                        <ToggleButton sx={{paddingX: 2, paddingY: 1}} value="*" aria-label="multiplicación">
                                            *
                                        </ToggleButton>
                                        <ToggleButton sx={{paddingX: 2, paddingY: 1}} value="/" aria-label="división">
                                            /
                                        </ToggleButton>
                                    </StyledToggleButtonGroup>
                                </div>
                            )
                        }
                        <div className="flex flex-wrap gap-2">
                            <label htmlFor="time" className="font-mono font-bold text-2xl">Tiempo:</label>
                            <div
                                className={`relative flex flex-wrap gap-2 text-sm ${errors.minutes
                                    ? "text-red-600 border-red-400"
                                    : "text-gray-600 border-gray-400 dark:text-gray-400"
                                    } container-fluid`}
                            >
                                <input
                                    disabled={isLoading}
                                    autoComplete="0"
                                    className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                                    type="number"
                                    placeholder="00"
                                    {...register("minutes", {
                                    required: { value: true, message: "Contenido requerido" },
                                    pattern: {
                                        value: /^[0-7]$/, 
                                        message: "Maximo 7 minutos",  
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "Requiere al menos 1 minuto",
                                    }
                                    })}
                                />
                                {errors.minutes && (
                                    <TooltipMessage message={errors.minutes.message!} />
                                )}
                            </div>
                            <span>:</span>
                            <div
                                className={`relative flex flex-wrap gap-2 text-sm ${errors.seconds
                                    ? "text-red-600 border-red-400"
                                    : "text-gray-600 border-gray-400 dark:text-gray-400"
                                    } container-fluid`}
                            >
                                <input
                                    disabled={isLoading}
                                    autoComplete="0"
                                    className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                                    type="number"
                                    placeholder="00"
                                    {...register("seconds", {
                                    required: { value: true, message: "Contenido requerido" },
                                    pattern: {
                                        // value: /^[0-9]+$/,
                                        // message: "Solo se permiten numeros",
                                        value: /^(0|[1-5]\d?|60)$/,
                                        message: "Maximo 60 segundos",
                                    },
                                    minLength: {
                                        value: 1,
                                        message: "Requiere al menos 1 caracter",
                                    }
                                    })}
                                />
                                {errors.seconds && (
                                    <TooltipMessage message={errors.seconds.message!} />
                                )}
                            </div>
                        </div>

                        <div className="flex flex-wrap justify-between gap-2">
                            <label htmlFor="intentos" className="font-mono font-bold text-2xl">Vidas:</label>
                            <div
                            className={`relative w-3/4 flex flex-wrap gap-2 text-sm ${errors.intentos
                                ? "text-red-600 border-red-400"
                                : "text-gray-600 border-gray-400 dark:text-gray-400"
                                } container-fluid`}
                            >
                                <input
                                    disabled={isLoading}
                                    autoComplete=""
                                    className="flex-1 focus:outline-none bg-transparent focus:bg-transparent btn border border-gray-400 p-3 ps-6 dark:text-gray-200"
                                    type="text"
                                    placeholder="Contenido de la lección"
                                    {...register("intentos", {
                                    required: { value: true, message: "Contenido requerido" },
                                    pattern: {
                                        value: /^[0-7]$/, 
                                        message: "Maximo 7 vidas",  
                                    },
                                    })}
                                />
                                {errors.intentos && (
                                    <TooltipMessage message={errors.intentos?.message || ''} />
                                )}
                            </div>
                        </div>
                        {
                            category == EnumCategory.NUMEROS && (
                                <Alert severity="info">Selecciona Operation y se consideraran solo los operadores</Alert>
                            )
                        }

                        <Alert severity="info">Por defecto todo el contenido a desarrollar</Alert>
                        <div className="flex justify-around border rounded-md p-4">
                            {
                                category == EnumCategory.PALABRAS && (
                                <div
                                className={`relative flex flex-wrap gap-2 text-sm ${errors.supplement
                                    ? "text-red-600 border-red-400"
                                    : "text-gray-600 border-gray-400 dark:text-gray-400"
                                    } container-fluid`}
                                >
                                    <label htmlFor="supplement" className="font-semibold text-xl">Uno aleatorio</label>
                                    <input
                                        disabled={isLoading}
                                        className="w-8"
                                        type="checkbox"
                                        {
                                            ...register("supplement")
                                        }
                                    />
                                </div>
                                )
                            }

                            <div
                            className={`relative flex flex-wrap gap-2 text-sm ${errors.supplement
                                ? "text-red-600 border-red-400"
                                : "text-gray-600 border-gray-400 dark:text-gray-400"
                                } container-fluid`}
                            >
                                <label htmlFor="operation" className="font-semibold text-xl"> {category == EnumCategory.PALABRAS ? 'Salteadas' : 'Operaciones'}</label>
                                <input
                                    disabled={isLoading}
                                    className="w-8"
                                    type="checkbox"
                                    {
                                        ...register("operation")
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={isLoading}
                        className="mt-4 py-3 px-4 w-full font-bold text-white bg-gray-900 btn hover:bg-gray-950 dark:bg-purple-500 dark:hover:purple-600"
                        type="submit"
                    >
                        {isLoading ? <IconLoading height={20} className="text-white" /> : 'Comenzar'}
                    </button>
                    
                    </form>
                </div>
            </div>        
        </div>        
        </>
    }

    console.log(progres)

    return <>
        <ModalDetallesChallenge open={detail} setOpen={handleDetailsModal} number={1} name={'Reto Personalizado'} descripction={'Considere que se trata de un reto personalizado a medidad por usted, cumpla con los requisitos y se registrara su progreso.'} />
        <ModalOutsideTime open={outside} setRouter={handleRouter} />
        {progres.porcentaje === 100 ? ((completed && reto ) ? (
                <CompleteChallenge {...reto} />
            ) : (
                <div className="w-full h-full grid place-content-center">
                    <IconLogo height={80} width={80} className="mx-auto mb-6" />
                    <span className="font-mono text-2xl text-s" >Espere...</span>
                </div> 
            )
        ): (
            <>
            <div className="flex flex-col gap-4 h-full">
                <ProgressbarChallenge porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={progres.intentos} />
                <StackContent content={progres.arreglo} objetivos={progres.objetivos} objetivo={progres.objetivo} operacion={progres.operacion} />

                <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
                    {
                        // (progres.supplement == false) && (
                        // currentImage != '' &&  
                        <Image
                            priority={true}
                            className="shadow-lg border rounded-xl m-auto aspect-video object-contain"
                            src={currentImage}
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
                    <FooterEndChallenge />
                ) : (
                <FooterChallenge
                    description={'Suerte con tu reto personalizado'}
                    submit={submit}
                    comprobation={handleVerification}
                    continuar={progres.continue}
                    changeContinue={changeContinue}
                    check={check}
                    endLesson={(progres.intentos === 0 || progres.porcentaje === 100) && true}
                    minutes={progres.minutes}
                    seconds={progres.seconds}
                    start={startime.inicio}
                />
                )
            }
            </>
        )
        }
    </>
}