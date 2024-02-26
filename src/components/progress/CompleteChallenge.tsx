'use client'

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

type Times = {
    inicio: Date,
    final: Date
}

const formatoDosDigitos = (valor: any) => {
    return valor.toString().padStart(2, '0');
};

type res_challenge = {
    bonus: number
    end_points?: number
    fails?: number
    id_challenge?: number
    id_user?: number
    minutes: number
    points: number
    seconds: number
    streak?: number
    state?: string
}

export default function CompleteChallenge(
    {
        bonus,
        end_points,
        fails,
        id_challenge,
        id_user,
        minutes,
        points,
        seconds,
        streak,
        state,
    }: res_challenge
) {

    const router = useRouter();

    useEffect(() => {
        new Audio('/audio/sound-effect-global-win.wav').play();
    }, []);

    return (
        <div className="grid place-content-center gap-4 text-center pt-10 lg:pt-4 h-full">
            <Image
                className="rounded-xl shadow-md m-auto"
                src={'/src/good.jpg'}
                height={200}
                width={200}
                alt="Letra A"
            />
            <h1 className="text-3xl text-purple-600 font-extrabold">¡Reto Completado!</h1>
            <div className="flex flex-wrap justify-around gap-4">
                <div className="border w-40 border-purple-600 text-purple-600 rounded-lg text-center font-bold">
                    <div className="bg-purple-600 p-2">
                        <h2 className="text-white ">Tiempo</h2>
                    </div>
                    <div className="p-6">
                        <span>
                            {formatoDosDigitos(minutes)}:{formatoDosDigitos(seconds)} m:s
                        </span>
                    </div>
                </div>
                <div className="border w-40 border-cyan-600 text-cyan-600 rounded-lg text-center font-bold">
                    <div className="bg-cyan-600 p-2">
                        <h2 className="text-white ">Puntos</h2>
                    </div>
                    <div className="p-6">
                        <span>
                            + {points}
                        </span>
                    </div>
                </div>
                <div className="border w-40 border-teal-600 text-teal-600 rounded-lg text-center font-bold">
                    <div className="bg-teal-600 p-2">
                        <h2 className="text-white ">Bonus</h2>
                    </div>
                    <div className="p-6">
                        <span>
                            + {bonus}
                        </span>
                    </div>
                </div>
            </div>
            <div className="mt-6" >
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
    )
}