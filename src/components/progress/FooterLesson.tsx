import ModalMUI from "@/components/ModalMUI";
import { CircularProgress } from "@mui/material";
import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa";
import { HiX } from "react-icons/hi";
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
    const [modalOpen, setModalOpen] = useState(false);
    useEffect(() => {
        const modalPreference = localStorage.getItem('modalLesson');
        if (modalPreference) {
            setModalOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('modalLesson', 'closed');
        setModalOpen(false);
    };
    const handleOpen = () => {
        setModalOpen(true);
    };
    // set colors by 3 states: null, true and false with transparent, green and red
    const color = check === null ? "text-gray-500" : check ? "text-green-600" : "text-red-600";
    const bg = check === null ? "bg-transparent" : check ? "bg-[#d7ffb8]" : "bg-[#ffdfe0]";
    return (
        <div className={`border-t-2 border-t-gray-200 p-5 mt-auto ${bg}`}>
            <div className="xl:px-10 mx-auto container">
                <div className="flex flex-col lg:flex-row justify-between w-full items-center gap-4">
                    <div className="w-full flex gap-6">
                        <div className="relative">
                            {check === false && (
                                <button onClick={handleOpen} className="animate-bounce border-2 absolute -top-8 left-10 transform translate-x-[-50%] translate-y-[-50%] bg-white p-2 rounded-lg shadow-md" type="button" title="Mostrar información">
                                    <FaQuestion className="text-lg font-bold text-purple-800" />
                                </button>
                            )}
                            <Image priority width={80} height={80} src={"/images/crab-icon.svg"} alt="Icon crab" />
                        </div>
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
                            {!submit ? <CircularProgress color="inherit" size={24} /> : "COMPROBAR"}
                        </button>
                    ) : (
                        <button
                            type="button"
                            className={`w-full lg:w-auto p-2 px-8 h-12 animate-pulse ${check === null ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : check ? "bg-green-500 font-bold shadow-[0_6px_0px_#147839]" : "bg-red-500 font-bold shadow-[0_6px_0px_#a22e2e]"} text-white border-none rounded-md text-lg hover:shadow-transparent hover:translate-y-1`}
                            onClick={() => {
                                endLesson ? push("/lesson") : changeContinue()
                            }}
                        >
                            CONTINUAR
                        </button>
                    )}
                </div>
            </div>

            <ModalMUI width={{ xs: '60%', lg: '60%', xl: '60%' }} open={modalOpen} handleClose={handleClose}>
                <div className="relative bg-white p-4 rounded-xl overflow-y-auto h-40 sm:h-64 md:h-80 lg:h-auto">
                    <div className="text-gray-800">
                        <h1 className="font-bold text-2xl md:text-2xl xl:text-3xl mb-6 text-center text-purple-400">Indicaciones Generales</h1>
                        <button className="absolute top-0 right-0 m-4" onClick={handleClose}><HiX size={25} /></button>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 px-4 mx-8">
                        <div>
                            <h2 className="font-bold text-lg mb-2">¿Cómo colocar la imagen frente a la pantalla?</h2>
                            <p className="mb-4 text-justify">Debe garantizar que la mano esté centrada y visible en el cuadro de la cámara, de forma nítida y bien iluminada. Puede tomar la foto nuevamente al presionar sobre &apos;Reiniciar Temporizador&apos; si lo requiere.</p>
                            <Image priority src={"/images/how2lesson.webp"} height={100} width={500} alt="Imagen correcta" className="h-auto w-auto mt-auto mx-auto object-contain" />
                        </div>
                        <div className="flex flex-col justify-between">
                            <div>
                                <h2 className="font-bold text-lg mb-2">¿Cómo NO colocar la imagen frente a la pantalla?</h2>
                                <p className="mb-4 text-justify">Se deben evitar objetos que obstruyan la mano en el cuadro, así como colocar el rostro detrás de la mano; se sugiere un fondo ordenado. Además, no se recomienda lugares con poca iluminación.</p>
                            </div>
                            <Image priority src={"/images/how2Notlesson.webp"} height={300} width={500} alt="Imagen correcta" className="h-auto mt-auto w-auto mx-auto object-contain" />
                        </div>
                    </div>
                </div>
            </ModalMUI>
        </div>

    );
};