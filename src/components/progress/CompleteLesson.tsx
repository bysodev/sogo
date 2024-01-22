'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

type Times = {
    inicio: Date, 
    final: Date
}

export default function CompleteLesson( {startime, errors}: {startime: Times, errors: {[key: string]: number}} ){
    const [tiempo, setTiempo] = useState({hora: 0, minuto: 0, segundo: 0});

    useEffect(() => {
        const milisegundos = (startime.final.getTime() - startime.inicio.getTime());
        let horas = Math.floor( milisegundos / 3600000 );
        let minutos = Math.floor( (milisegundos % 3600000) / 60000 );
        let segundos = Math.floor( (milisegundos % 60000) / 1000 );
        console.log( {horas, minutos, segundos} )
        setTiempo({hora: horas, minuto: minutos, segundo: segundos});
    }, [startime])

    return (
        <div className="flex w-full flex-col min-h-screen pb-24">
            <div className="">
                
            </div>
            <div className="flex-auto flex place-content-center items-center">
                <div>
                    <Image
                    className="rounded-xl shadow-md"
                    src={'/src/good.jpg'}
                    height={300}
                    width={300}
                    alt="Letra A"
                    /> 
                </div>
            </div>
            <div className="flex-auto text-center">
                <h5>¡Lección completada!</h5>
                <p>Avanza hacía tu proxima lección, bien hecho.</p>
            </div>
            <div className="flex justify-center gap-4">
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <pre>{JSON.stringify( tiempo ) }</pre>
                    <span>05:24 m/s</span>
                    <span>Tiempo</span>
                </div>
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <span>10+</span>
                    <span>Experiencia</span>
                </div>
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <span>90%</span>
                    <pre>{JSON.stringify( errors ) }</pre>
                    <span>General</span>
                </div>
            </div>
        </div>
    )
}