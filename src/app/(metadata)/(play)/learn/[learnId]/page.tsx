"use client";
import data from '@/store/learnData.json';
import { CircularProgress } from "@mui/material";
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from "react";
import { FaAngleRight, FaPlay } from "react-icons/fa";
import { FaXmark } from "react-icons/fa6";
import Webcam from "react-webcam";

export default function LessonVocales() {
    const searchParams = useSearchParams()
    const category_learn = useMemo(() => searchParams.get('search'), [searchParams]);
    const [webcamMounted, setWebcamMounted] = useState(false);
    const webcamRef = useRef<Webcam | null>(null);
    const { push } = useRouter();
    const pathname = usePathname()
    const [contentData, setContentData] = useState<any>([]);
    const char = useMemo(() => searchParams.get('char'), [searchParams]);
    const [selectedChar, setSelectedChar] = useState<any>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    const [isDivVisible, setIsDivVisible] = useState(false);

    function handleButtonClick() {
        setIsDivVisible(prevIsDivVisible => !prevIsDivVisible);
    }

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.load();
        }
    }, [pathname, char, category_learn]);

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
                    <h1>Aprende {category_learn === "number" ? "los números del 0 al 9" : "las letras del abecedario"}</h1>
                    <p className="font-normal">Lección actual: {category_learn === "number" ? "Número" : "Letra"} {" " + selectedChar ?? 0}</p>
                </div>
                <div className="p-1 bg-white rounded-lg ms-auto">
                    <button onClick={() => { push('/learn') }} type="button" title="Salir" className="bg-purple-400 p-2 rounded-lg"><FaXmark className="text-lg font-bold text-purple-800" /></button>
                </div>
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
                    <div className={`${(!webcamMounted && selectedChar) && "hidden"} grid gap-20 w-full h-min p-20 bg-gray-100 rounded-lg lg:grid-cols-2 justify-center items-center text-center max-xl:gap-10 px-4`}>
                        <video
                            key={pathname}
                            ref={videoRef}
                            className="rounded-xl m-auto aspect-[12/9] object-contain w-full h-full"
                            height="500"
                            width="500"
                            controls
                        >
                            <source src={videoPath} type="video/mp4" /> {/* Provide the source of your video here */}
                            Your browser does not support the video tag.
                        </video>
                        <div className="w-full h-auto relative overflow-hidden rounded-xl">
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
                                mirrored={true}
                                onUserMedia={() => {
                                    handleClick();
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}