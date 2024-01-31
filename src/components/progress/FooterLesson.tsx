import Image from "next/image";
import { useRouter } from 'next/navigation';

interface FooterLessonProps {
    comprobation: Function;
    continuar: boolean;
    changeContinue: Function;
    submit: boolean;
    check: boolean | null;
    nroAttempts: number;
    description?: string;
    messageLesson: string
    endLesson: boolean
}

export const FooterLesson: React.FC<FooterLessonProps> = ({
    comprobation,
    continuar,
    changeContinue,
    submit,
    check,
    nroAttempts,
    description,
    messageLesson,
    endLesson
}) => {
    const { push } = useRouter();
    // set colors by 3 states: null, true and false with transparent, green and red
    const color = check === null ? "text-gray-500" : check ? "text-green-600" : "text-red-600";
    const bg = check === null ? "bg-transparent" : check ? "bg-[#d7ffb8]" : "bg-[#ffdfe0]";
    return (
        <div className={`border-t-2 border-t-gray-200 p-5 mt-auto ${bg}`}>
            <div className="xl:px-10 mx-auto container">
                <div className="flex flex-col lg:flex-row justify-between w-full items-center gap-4">
                    <div className="w-full flex gap-6">
                        <Image width={80} height={80} src={"/images/crab-icon.svg"} alt="Icon crab" />
                        <div className={`${color} self-center`}>
                            {!check && continuar ? (
                                <>
                                    <p className="text-2xl font-bold">{endLesson && messageLesson === "" ? "¡Excelente!" : (endLesson ? "Lección fallida" : "¡No te desanimes!")}</p>
                                    <p className="font-bold">{endLesson && messageLesson === "" ? "Has desbloqueado la siguiente lección" : (messageLesson === "" ? "Continúa con los ejercicios restantes" : "Puedes volver a dar la lección")}</p>
                                </>
                            ) : (
                                <>
                                    <p className="text-2xl font-bold">{endLesson ? "¡Felicidades!" : (check === null ? description : (check ? "¡Excelente!" : "¡Sigue intentando!"))}</p>
                                    <p>{endLesson ? "Has desbloqueado la siguiente lección" : <>Intentos restantes: <span className="font-bold">{nroAttempts}/3</span></>}</p>
                                </>
                            )}
                        </div>
                    </div>
                    {!continuar ? (
                        <button
                            type="button"
                            className={`w-full lg:w-auto p-2 px-8 h-12 ${check === null ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : check ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : "bg-red-500 font-bold shadow-[0_6px_0px_#a22e2e]"} text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
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
                            className={`w-full lg:w-auto p-2 px-8 h-12 ${check === null ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : check ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : "bg-red-500 font-bold shadow-[0_6px_0px_#a22e2e]"} text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
                            onClick={() => {
                                endLesson ? push("/lesson") : changeContinue()
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