'use client'
import DrawerBotton from "@/components/DrawerBotton";
import Camara from "@/components/camara/Camara";
import { ProgressbarChallenge } from "@/components/challenge/ProgressbarChallenge";
import { StackContent } from "@/components/challenge/StackContent";
import IconLoading from "@/components/icons/IconLoading";
import IconLogo from "@/components/icons/logo";
import CompleteChallenge from "@/components/progress/CompleteChallenge";
import { FooterChallenge, FooterEndChallenge } from "@/components/progress/FooterChallenge";
import ModalDetallesChallenge, { ModalNotParameters, ModalOutsideTime } from "@/components/progress/ModalDetallesChallenge";
import { isValidResult } from "@/lib/actions/globales";
import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { WebVideoElementWithScreenshot } from "@/lib/types/lessons";
import textFieldStyles from "@/utilities/stylesMUI";
import { Alert, Stack, TextField, ToggleButton, ToggleButtonGroup, Tooltip, toggleButtonGroupClasses } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Confetti from 'react-confetti';
import { useForm } from "react-hook-form";
import { FaQuestionCircle } from "react-icons/fa";
import { IoMdArrowRoundBack } from "react-icons/io";
import { IoClose } from "react-icons/io5";

const not_pass = ['J', 'Ñ', 'Z', ' ', ''];

const default_palabra = `/lesson/letters/letra_A.jpg`;
const default_numero = `/lesson/numbers/numero_0.jpg`;

type ElementOperation = {
    operacion: any[],
    indices: number[],
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
    // Calcular los minutos
    const totalSeconds = Math.abs(totalMilliseconds) / 1000;
    const minutes = Math.floor(totalSeconds / 60);

    // Calcular los segundos restantes
    const seconds = Math.floor(totalSeconds % 60);
    if (Math.abs(totalMilliseconds) > (allowedTime * 1) + 1) {
        outside = true;
    }

    return { minutes, seconds, outside };
}

function ordenamientoContent(category: string, content: string, supplement: boolean, operation: boolean): [string[], number[]] | ElementOperation {
    const letrasSaltandoUna: string[] = [];
    const indicesSaltandoUna: number[] = [];
    const prime_arr_prim = content.split('');

    if (category == EnumCategory.PALABRAS) {
        if (operation == true) {
            for (let i = 1; i < content.length; i += 2) {
                if (content[i] && !not_pass.includes(content[i])) {
                    letrasSaltandoUna.push(content[i]);
                    indicesSaltandoUna.push(i);
                }
            }
        } else {
            const prime_arr = content.split('');
            return [prime_arr.filter(letra => !not_pass.includes(letra)), prime_arr.map((letra, index) => index).filter(index => !not_pass.includes(prime_arr[index]))];
        }

        if (supplement == true) {
            let indiceAleatorio = Math.floor(Math.random() * content.length);
            if (content[indiceAleatorio] && !not_pass.includes(content[indiceAleatorio])) {
                letrasSaltandoUna.push(content[indiceAleatorio]);
                indicesSaltandoUna.push(indiceAleatorio);
            }
        }
        return [letrasSaltandoUna, indicesSaltandoUna];
    }

    if (category == EnumCategory.NUMEROS) {
        const num1: number = Math.floor(Math.random() * 10);
        const num2: number = Math.floor(Math.random() * 10);
        const numeros_salteados = []
        const prime_arr = content.split('');

        if (operation == true) {
            const operator = content[Math.floor(Math.random() * content.length)];
            let cal = calc_operaciones(operator as Operador, num1, num2);
            if (!cal) {
                return ordenamientoContent(category, content, supplement, operation)
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
                    indicesSaltandoUna.push(i);
                }
            }
            return [numeros_salteados, indicesSaltandoUna];
        }
        return [prime_arr, prime_arr.map((letra, index) => index)];
    }
    return [prime_arr_prim, prime_arr_prim.map((letra, index) => index)]
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
        if (!response.ok) {
            throw new Error(`Error al registrar el reto: ${response.status}`);
        } else {
            const data = await response.json()
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
    const [img, setImagen] = useState<any>();
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
        indices: [0],
        objetivos: [''],
        objetivo: '',
        operation: false,
        supplement: false,
        minutes: 0,
        seconds: 0,
        fails_max: 0
    });
    const [originalObjetivosLength, setOriginalObjetivosLength] = useState(0);

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
        setImagen(captura);
    };

    const setFoto = () => {
        setImagen("")
        setCounter(parseInt(toggleTime))
    }

    useEffect(() => {
        if (searchParams.has('category') && searchParams.has('difficulty')) {
            const categoria = searchParams.get('category') as string;
            const dificultad = searchParams.get('difficulty') as string;
            if (isValidCategory(categoria) && isValidDifficulty(dificultad)) {
                setCategory(categoria.toUpperCase() as EnumCategory)
                setDifficulty(dificultad.toUpperCase() as EnumDifficulty)
                setProcced(true)
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
        const { operation, supplement, intentos, minutes, seconds } = { ...data };
        let content = data.content?.toUpperCase() as string;
        if (category == EnumCategory.NUMEROS && operation)
            content = operaciones[Math.floor(Math.random() * operaciones.length)];
        let arreglo = content.split('');
        let objetivo_temporal: [string[], number[]] | ElementOperation = ordenamientoContent(category as string, content, supplement, operation);
        let objetivos = [''];
        let indices = [0];
        let operacion = [''];

        if (category == EnumCategory.NUMEROS && operation == true && objetivo_temporal) {
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
        let setObjetivos = new Set(objetivos);
        let distancia = setObjetivos.size;
        // let distancia = objetivos.length;

        // console.log({...data, signo: operation});
        setIsLoading(true);
        const urlPalabraImg = `/lesson/letters/letra_${objetivo}.jpg`;
        const urlNumeroImg = `/lesson/numbers/numero_${objetivo}.jpg`;
        const urlImg = category === EnumCategory.PALABRAS ? urlPalabraImg : (category === EnumCategory.NUMEROS ? urlNumeroImg : '/lesson/default.jpg')
        setCurrentImage(urlImg)

        // VALIDACIONES
        if (operation == true) {
            if (operaciones.length !== 0) {
                setprogress((prev) => ({
                    ...prev,
                    distancia,
                    content,
                    indices,
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
                setOriginalObjetivosLength(objetivos.length)
                setIsLoading(false);
                setPrimeData(false);
                reset();
            }
        } else {
            // setprogress({...data})
            setprogress((prev) => ({
                ...prev,
                distancia,
                content,
                indices,
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
            setOriginalObjetivosLength(objetivos.length)
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
            category: category,
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
        console.log(progres.asiertos)
        const urlPalabraImg = `/lesson/letters/letra_${progres.objetivos[1]}.jpg`;
        const urlNumeroImg = `/lesson/numbers/numero_${progres.objetivos[1]}.jpg`;
        let index_trash = progres.objetivos.indexOf(progres.objetivo);
        const urlImg = category === EnumCategory.PALABRAS ? (urlPalabraImg || default_palabra) : (category === EnumCategory.NUMEROS ? (urlNumeroImg || default_numero) : '/lesson/default.jpg')
        setprogress((pro) => ({
            ...pro,
            porcentaje: ((pro.asiertos) / Number(originalObjetivosLength)) * 100,
            objetivos: pro.objetivos.filter((obj, index) => index !== index_trash),
            indices: pro.indices.filter((obj, index) => index !== index_trash),
            objetivo: pro.objetivos.find((obj, index) => index !== index_trash) as string,
            continue: false,
        }));
        setCurrentImage(urlImg)
        setCheck(null)
        setFoto()
    };
    const handleSubmitChall = () => {
        const tiempo_finzalizacion = new Date();
        const totalTime = (tiempo_finzalizacion.getTime() - startime.inicio.getTime());
        // const totalTime = (startime.final.getTime() - startime.inicio.getTime());
        const maxTime = ((progres.minutes * 60) + progres.seconds) * 1000;
        const { minutes, seconds, outside } = getMinutesAndSeconds(totalTime, maxTime);

        if (outside) {
            setOutside(true);
        } else {
            const fails = progres.fails_max - progres.intentos
            handlePostChallenge(category as string, difficulty as string, progres.minutes, progres.seconds, minutes, seconds, progres.fails_max, fails).then((response) => {
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
        console.log(progres)
        if (progres.porcentaje === 100) {
            handleSubmitChall()
        }
    }, [progres.porcentaje])

    useEffect(() => {
        if (progres.intentos === 0 && progres.content !== '') {
            new Audio('/audio/sound-effect-global-lose.wav').play();
        }
    }, [progres.intentos]);

    if (!procced) {
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

    if (prime) {
        return <>
            <div className="h-auto w-full lg:w-1/2 grid justify-center mx-auto">
                <div className="flex flex-col gap-4 lg:py-4 lg:px-4">
                    <div className="relative lg:rounded-xl border-2 p-1">
                        <h1 className="font-bold text-xl text-center text-gray-500">Retos Personalizados</h1>
                        <button className="absolute start-0 top-0 m-3 text-gray-500" onClick={() => { router.push('/challenge') }} type='button' title='Retroceder'><IoMdArrowRoundBack /></button>
                    </div>
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
                                <div className="p-4">
                                    <div className="tracking-wide text-sm text-indigo-500 font-semibold flex justify-between">
                                        <span className="text-gray-900 dark:text-white font-extrabold text-xl">
                                            ¿Cómo funciona?
                                        </span>
                                        <button className="text-gray-700" onClick={handleClose}><IoClose size={20} /></button>
                                    </div>
                                    <p className="my-2 text-gray-500">
                                        En el formulario de abajo, puede seleccionar el contenido que desee predecir por su cuenta. Dado que utiliza la misma lógica que los retos, podrá personalizar todos los parámetros.
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
                                <TextField
                                    autoComplete="abc"
                                    disabled={isLoading}
                                    sx={textFieldStyles}
                                    className={`focus:outline-none w-full bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.content
                                        ? "text-red-600 border-red-400"
                                        : "text-gray-600 border-gray-400"
                                        }`}
                                    type="text"
                                    label="Contenido de la lección"
                                    size="small"
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
                                    error={Boolean(errors.content)}
                                    helperText={errors.content && errors.content.message}
                                />
                                {
                                    category == EnumCategory.NUMEROS && (
                                        <div className="flex flex-wrap justify-between gap-2 shadow-md border-2 rounded-md border-gray-300">
                                            <label htmlFor="operators" className="my-auto ms-4 tracking-wider font-light text-sm text-gray-900">Operadores</label>
                                            <StyledToggleButtonGroup
                                                size="small"
                                                value={operaciones}
                                                onChange={handleDevices}
                                                aria-label="operaciones"
                                            >
                                                <ToggleButton sx={{ paddingX: 2, paddingY: 1 }} value="+" aria-label="suma">
                                                    +
                                                </ToggleButton>
                                                <ToggleButton sx={{ paddingX: 2, paddingY: 1 }} value="-" aria-label="resta">
                                                    -
                                                </ToggleButton>
                                                <ToggleButton sx={{ paddingX: 2, paddingY: 1 }} value="*" aria-label="multiplicación">
                                                    *
                                                </ToggleButton>
                                                <ToggleButton sx={{ paddingX: 2, paddingY: 1 }} value="/" aria-label="división">
                                                    /
                                                </ToggleButton>
                                            </StyledToggleButtonGroup>
                                        </div>
                                    )
                                }
                                <div className="flex flex-col lg:flex-row gap-4 lg:gap-2">
                                    <div className="flex gap-2">
                                        <TextField
                                            autoComplete="5"
                                            disabled={isLoading}
                                            sx={textFieldStyles}
                                            className={`focus:outline-none w-full bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.minutes
                                                ? "text-red-600 border-red-400"
                                                : "text-gray-600 border-gray-400"
                                                }`}
                                            type="number"
                                            label="Tiempo minutos"
                                            size="small"
                                            {...register("minutes", {
                                                required: { value: true, message: "Minutos requeridos" },
                                                pattern: {
                                                    value: /^[0-7]$/,
                                                    message: "Maximo 7 minutos",
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "Requiere al menos 1 minuto",
                                                }
                                            })}
                                            error={Boolean(errors.minutes)}
                                            helperText={errors.minutes && errors.minutes.message}
                                        />

                                        <span className="m-auto">:</span>
                                        <TextField
                                            autoComplete="00"
                                            disabled={isLoading}
                                            sx={textFieldStyles}
                                            className={`focus:outline-none w-full bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.seconds
                                                ? "text-red-600 border-red-400"
                                                : "text-gray-600 border-gray-400"
                                                }`}
                                            type="number"
                                            label="Tiempo segunados"
                                            size="small"
                                            {...register("seconds", {
                                                required: { value: true, message: "Segundos requeridos" },
                                                pattern: {
                                                    value: /^(0|[1-5]\d?|60)$/,
                                                    message: "Maximo 60 segundos",
                                                },
                                                minLength: {
                                                    value: 1,
                                                    message: "Requiere al menos 1 caracter",
                                                }
                                            })}
                                            error={Boolean(errors.seconds)}
                                            helperText={errors.seconds && errors.seconds.message}
                                        />
                                    </div>
                                    <TextField
                                        autoComplete="3"
                                        disabled={isLoading}
                                        sx={textFieldStyles}
                                        className={`focus:outline-none w-full lg:w-2/5 bg-transparent focus:bg-transparent btn border shadow-none border-gray-400  dark:text-gray-200 ${errors.intentos
                                            ? "text-red-600 border-red-400"
                                            : "text-gray-600 border-gray-400"
                                            }`}
                                        type="number"
                                        label="Vidas o intentos"
                                        size="small"
                                        {...register("intentos", {
                                            required: { value: true, message: "Vidas máximas requeridas" },
                                            pattern: {
                                                value: /^[0-7]$/,
                                                message: "Máximo 7 vidas",
                                            },
                                        })}
                                        error={Boolean(errors.intentos)}
                                        helperText={errors.intentos && errors.intentos.message}
                                    />
                                </div>
                                {
                                    category == EnumCategory.NUMEROS && (
                                        <Alert severity="info">Selecciona Operación y se consideraran solo los operadores</Alert>
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
                                                <label htmlFor="supplement" className="font-semibold text-lg">Aleatorio</label>
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
                                        <label htmlFor="operation" className="font-semibold text-lg"> {category == EnumCategory.PALABRAS ? 'Salteadas' : 'Operaciones'}</label>
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


    return <>
        <ModalDetallesChallenge open={detail} setOpen={handleDetailsModal} number={1} name={'Reto Personalizado'} descripction={'Considere que se trata de un reto personalizado a medidad por usted, cumpla con los requisitos y se registrara su progreso.'} />
        <ModalOutsideTime open={outside} setRouter={handleRouter} />
        {progres.porcentaje === 100 ? ((completed && reto) ? (
            <CompleteChallenge {...reto} />
        ) : (
            <div className="w-full h-full grid place-content-center">
                <div>
                    <IconLogo height={60} width={60} className="mx-auto mb-6" />
                    <span className="font-mono text-2xl text-s" >Espere...</span>
                </div>
            </div>
        )
        ) : (
            <>
                {check && <Confetti className="!z-50 !h-full !w-full" />}
                <div className="flex flex-col gap-2 h-full">
                    <ProgressbarChallenge porcentaje={progres.porcentaje} setDrawer={setDrawer} totalTry={progres.intentos} />
                    <StackContent content={progres.arreglo} indices={progres.indices} objetivos={progres.objetivos} objetivo={progres.objetivo} operacion={progres.operacion} />

                    <div className="grid lg:grid-cols-2 justify-center items-center text-center h-full">
                        {
                            <Image
                                priority={true}
                                className="shadow-lg border rounded-xl m-auto aspect-[12/9] object-contain"
                                src={currentImage || default_palabra}
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
                    {drawer && <DrawerBotton drawer={drawer} setDrawer={setDrawer} />}
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
