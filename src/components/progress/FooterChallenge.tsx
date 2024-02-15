import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";

interface FooterLessonProps {
    comprobation: Function;
    continuar: boolean;
    changeContinue: Function;
    submit: boolean;
    check: boolean | null;
    description?: string;
    endLesson: boolean,
    minutes: number, 
    seconds: number,
    start: Date

}

export const FooterChallenge: React.FC<FooterLessonProps> = ({
    comprobation,
    continuar,
    changeContinue,
    submit,
    check,
    description,
    endLesson, 
    minutes, 
    seconds,
    start
}) => {
    const [[mins, secs], setTime] = useState([minutes, seconds]);
    const [end, setEnd] = useState(false);

    useEffect(() => {
        setTime([minutes, seconds])
    }, [start, minutes, seconds])
  
    useEffect(() => {
        if( !end ){
            const tick = () => {
                if (secs === 0) {
                    setTime([mins - 1, 59]);
                } else {
                    setTime([mins, secs - 1]);
                }
            };
        
            const timerId = setInterval(() => tick(), 1000);
            if( mins == 0 && secs == 0 ){
                setEnd(true)
            }
            return () => clearInterval(timerId);
        }
    }, [mins, secs, end]);

    const formatoDosDigitos = (valor: any) => {
        return valor.toString().padStart(2, '0');
    };

    const { push } = useRouter();
    // set colors by 3 states: null, true and false with transparent, green and red
    const color = check === null || continuar ? "text-gray-500" : check ? "text-green-500" : "text-red-500";
    const bg = check === null || continuar ? "bg-transparent" : check ? "bg-[#d7ffb8]" : "bg-[#ffdfe0]";
    return (
        <div className={`border-t-2 border-t-gray-200 p-5 mt-auto ${bg}`}>
            <div className="xl:px-10 mx-auto container">
                <div className="flex justify-between w-full items-center">
                    <div className="flex gap-6">
                        <Image width={80} height={80} src={"/images/crab-icon.svg"} alt="Icon crab" />
                        <div className={`${color} self-center`}>
                            {continuar ? (
                                <>
                                    <p className="text-2xl font-bold">¡Genial, lo estas consiguiendo!</p>
                                    <p className="font-bold">Continua con el reto y empieza con los más nuevos.</p>
                                </>
                            ) : (
                                <div>
                                    <p className="text-2xl font-bold">{check === null ? description : check ? "¡Muy bien!" : "¡Sigue intentando!"}</p>
                                    <div className="flex justify-start gap-4">
                                        <p>Tiempo Restante: <span className={`font-bold bg-white p-1 rounded-md ${ (mins >= 1 ) ? 'text-emerald-600' : 'text-red-600' }`}>{formatoDosDigitos(mins)}:{formatoDosDigitos(secs)}</span></p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    {!continuar ? (
                        <button
                            type="button"
                            className={`p-2 px-8 h-12 ${check === null ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : check ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : "bg-red-500 font-bold shadow-[0_6px_0px_#a22e2e]"} text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
                            onClick={() => {
                                comprobation();
                            }}
                            disabled={!submit}
                        >
                            COMPROBAR
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`p-2 px-8 h-12 ${check === null ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : check ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : "bg-red-500 font-bold shadow-[0_6px_0px_#a22e2e]"} text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
                            onClick={() => {
                                endLesson ? push("/challenge") : changeContinue()
                            }}
                        >
                            CONTINUAR
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export const FooterEndChallenge = ( ) => {

    const router = useRouter();

    return (
        <div className={`border-t-2 border-t-gray-200 p-5 mt-auto`}>
        <div className="xl:px-10 mx-auto container">
            <div className="flex justify-between w-full items-center">
                <div className="flex gap-6">
                    <Image width={80} height={80} src={"/images/crab-icon.svg"} alt="Icon crab" />
                    <div className={`self-center`}>
                            <>
                                <p className="text-2xl font-bold">¡Que lastima, se termino el reto!</p>
                                <p className="font-bold"></p>
                            </>
                            <div>
                                <p className="text-sm font-semibold text-gray-600"> Puedes optar por regresar a los retos o vovler a intentarlo en esta categoria </p>
                            </div>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2" > 
                    <button
                        type="button"
                        className={`p-2 px-8 h-12 bg-teal-500 font-bold shadow-teal-800 shadow-[0_6px_0px_#A94438] text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
                        onClick={() => {
                            router.push(`/challenge`)
                        }}
                    >
                        VOLVER
                    </button>
                </div>
            </div>
        </div>
    </div>
    )
}