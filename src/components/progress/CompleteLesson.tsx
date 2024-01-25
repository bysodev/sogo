'use client'

import Image from "next/image";
import { useEffect, useState } from "react";

type Times = {
    inicio: Date,
    final: Date
}

export default function CompleteLesson({ startime, errors, messageLesson, score }: { startime: Times, errors: { [key: string]: number }, messageLesson: string, score: number }) {
    const [tiempo, setTiempo] = useState({ hora: 0, minuto: 0, segundo: 0 });

    useEffect(() => {
        const milisegundos = (startime.final.getTime() - startime.inicio.getTime());
        let horas = Math.floor(milisegundos / 3600000);
        let minutos = Math.floor((milisegundos % 3600000) / 60000);
        let segundos = Math.floor((milisegundos % 60000) / 1000);
        setTiempo({ hora: horas, minuto: minutos, segundo: segundos });
    }, [startime,])

    function calculatePrecision(errors: { [key: string]: number }) {
        // Calcular la suma total de los errores
        const totalErrors = Object.values(errors).reduce((a, b) => a + b, 0);

        // Calcular el total posible (3 errores por cada elemento)
        const totalPossible = Object.keys(errors).length * 3;

        // Calcular la precisión (100% - porcentaje de errores)
        const precision = 100 - (totalErrors / totalPossible) * 100;

        // Redondear a un número entero
        return Math.round(precision);
    }

    return (
        <div className="grid place-content-center gap-4 text-center pt-10 lg:pt-4 h-full">
            <Image
                className="rounded-xl shadow-md m-auto"
                src={'/src/good.jpg'}
                height={200}
                width={200}
                alt="Letra A"
            />
            <h1 className="text-3xl text-purple-600 font-extrabold">{messageLesson === "" ? "¡Lección Completada!" : "Vaya..."}</h1>
            {messageLesson !== "" && <p className="text-xl text-gray-500">{messageLesson}</p>}
            <div className="grid lg:grid-cols-3 justify-center gap-4">
                <div className="border border-purple-600 text-purple-600 rounded-lg text-center font-bold">
                    <div className="bg-purple-600 p-2">
                        <h2 className="text-white ">Tiempo</h2>
                    </div>
                    <div className="p-6">
                        <span>
                            {(tiempo.hora * 60 + tiempo.minuto).toString().padStart(2, '0')}:
                            {tiempo.segundo.toString().padStart(2, '0')} m:s
                        </span>
                    </div>
                </div>
            </div>
            <div className="flex-auto text-center">
                <h5>¡Lección completada!</h5>
                <p>Avanza hacía tu proxima lección, bien hecho.</p>
            </div>
            <div className="flex justify-center gap-4">
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <pre>{JSON.stringify( tiempo ) }</pre>
                    <span>08:20 m/s</span>
                    <span>Tiempo</span>
                </div>
                <div className="border border-pink-400 text-pink-400 rounded-lg text-center font-bold">
                    <div className="bg-pink-400 p-2">
                        <h2 className="text-white ">Precisión</h2>
                    </div>
                    <div className="p-6">
                        <span>
                            {calculatePrecision(errors)}%
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}