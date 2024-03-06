"use client";
import ModalMUI from '@/components/ModalMUI';
import VideoPlayer from '@/components/ui/VideoPlayer';
import data from '@/store/learnData.json';
import { Alert, CircularProgress } from "@mui/material";
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from "react";
import { FaAngleRight, FaPlay, FaQuestion } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import { HiX } from 'react-icons/hi';
import Webcam from "react-webcam";

export default function LessonVocales() {
    const searchParams = useSearchParams()
    const category_learn = useMemo(() => searchParams.get('search'), [searchParams]);
    const [webcamMounted, setWebcamMounted] = useState(false);
    const webcamRef = useRef<Webcam | null>(null);
    const { push } = useRouter();
    const [contentData, setContentData] = useState<any>([]);
    const char = useMemo(() => searchParams.get('char'), [searchParams]);
    const [selectedChar, setSelectedChar] = useState<any>(null);
    const [isDivVisible, setIsDivVisible] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);


    useEffect(() => {
        const modalPreference = localStorage.getItem('modalLearn');
        if (!modalPreference) {
            setModalOpen(true);
        }
    }, []);

    const handleClose = () => {
        localStorage.setItem('modalLearn', 'closed');
        setModalOpen(false);
    };
    const handleOpen = () => {
        localStorage.removeItem('modalPreference');
        setModalOpen(true);
    };

    function handleButtonClick() {
        setIsDivVisible(prevIsDivVisible => !prevIsDivVisible);
    }


    useEffect(() => {
        if (data.numbers && data.letters) {
            if (category_learn === 'number') {
                if (char) {
                    setSelectedChar(char);
                } else {
                    setSelectedChar(data.numbers[0].title.slice(-1));
                }
                setContentData(data.numbers);
            } else if (category_learn === 'letter') {
                if (char) {
                    setSelectedChar(char);
                } else {
                    setSelectedChar(data.letters[0].title.slice(-1));
                }
                setContentData(data.letters);
            }
        }
    }, [category_learn, char]);


    function handleClick() {
        setWebcamMounted(true);
    }

    const videoPath = `/videos/${category_learn === "number" ? "numbers/number" : "letters/letter"}-${!char && category_learn === "number" ? 0 : !char && category_learn === "letter" ? "A" : char}.mp4`;

    return (
        <div className="2xl:container mx-auto w-full h-full relative">
            <div className="bg-purple-300 font-bold  p-4 m-4 rounded-lg flex text-base gap-4">
                <div className="p-1 bg-white rounded-lg">
                    <button onClick={handleButtonClick} type="button" title="Desplegar menú" className="bg-purple-400 p-2 rounded-lg"><FaAngleRight className={`${isDivVisible && "rotate-180"} text-lg font-bold text-purple-800`} /></button>
                </div>
                <div className="block leading-none my-auto text-purple-800">
                    <h1>{category_learn === "number" ? "Números del 0 al 9" : "Letras del abecedario"}</h1>
                    <p className="text-xs sm:text-sm font-normal">
                        Lección actual: {category_learn === "number" ? "Número" : "Letra"} {" " + (selectedChar || "A")}
                    </p>
                </div>
                <div className="p-1 bg-white rounded-lg ms-auto">
                    <button onClick={() => { push('/learn') }} type="button" title="Salir" className="bg-purple-400 p-2 rounded-lg"><FaXmark className="text-lg font-bold text-purple-800" /></button>
                </div>
            </div>
            <div className="absolute bottom-0 right-0 m-6 p-1 bg-white rounded-lg ms-auto">
                <button onClick={handleOpen} className="animate-bounce bg-purple-400 p-2 rounded-lg" type="button" title="Mostrar información"><FaQuestion className="animate-pulse text-lg font-bold text-purple-800" /></button>
            </div>
            <div className="flex flex-col gap-4 h-full">
                {(!webcamMounted && selectedChar) && (
                    <CircularProgress
                        className="absolute top-1/2 left-1/2"
                        style={{ transform: 'translate(-50%, -50%)' }}
                    />
                )}
                <div className="flex flex-col lg:flex-row gap-4 m-4">
                    <div className={`w-auto grid grid-cols-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-1 gap-4 rounded-lg max-h-screen overflow-y-auto ${isDivVisible ? '' : 'hidden'}`}>
                        {contentData.map((item: any) => (
                            <div className="text-purple-500 bg-gray-100 px-4 py-2 rounded-lg flex gap-4 cursor-pointer" onClick={() => push("/learn/course?search=" + category_learn + "&char=" + item.title.slice(-1))} key={item.title}>
                                <div className="grid place-content-center">
                                    <button title='Iniciar sesión' type='button' className='bg-purple-700 text-white p-3 rounded-lg'><FaPlay /></button>
                                </div>
                                <h2 className='w-24'>{item.title}</h2>
                            </div>
                        ))}
                    </div>
                    <div className={`${(!webcamMounted && selectedChar) && "hidden"} grid gap-20 w-full h-min p-4 lg:p-14 bg-gray-100 rounded-lg lg:grid-cols-2 justify-center items-center text-center max-xl:gap-10 px-4`}>
                        <div className='block'>
                            <VideoPlayer src={videoPath} />
                        </div>
                        <div className="w-full h-auto relative overflow-hidden rounded-xl">
                            <Alert severity="info">La activación de la cámara es para practicar, no es una evaluación en tiempo real</Alert>
                            <Webcam
                                width={500}
                                height={600}
                                screenshotQuality={1}
                                className="aspect-[12/9] object-contain w-full h-full "
                                audio={false}
                                ref={webcamRef}
                                forceScreenshotSourceSize={true}
                                minScreenshotWidth={1920}
                                minScreenshotHeight={1080}
                                screenshotFormat="image/jpeg"
                                onUserMedia={() => {
                                    handleClick();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <ModalMUI width={{ xs: '100%', lg: 'auto', xl: 'auto' }} open={modalOpen} handleClose={handleClose}>
                <div className="relative bg-white p-8 rounded-xl">
                    <div className="text-gray-800">
                        <h1 className="font-bold text-2xl md:text-2xl xl:text-3xl mb-6 text-center text-purple-400">Bienvenido a Sogo Sign</h1>
                        <button className="absolute top-0 right-0 m-4" onClick={handleClose}><HiX size={25} /></button>
                    </div>
                    <h2 className="font-bold text-lg mb-4">Inidicaciones Generales:</h2>
                    <p className="mb-6 text-justify">En esta sección, la cámara funciona como un espejo que permite practicar y repasar las señas estáticas de la LSE. No se realiza una evaluación en tiempo real, lo que permite practicar a un ritmo propio.</p>
                    <Image priority src={"/images/how2learn.webp"} width={500} height={500} alt="Imagen introductoria al módulo de aprendizaje" className="h-auto mb-6 w-full mx-auto object-contain" />
                </div>
            </ModalMUI>
        </div>
    )
}