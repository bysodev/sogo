'use client'

import { EnumCategory } from "@/lib/types/challenge";

export const StackContent = ({content, objetivos, objetivo, operacion}: { content: any[], objetivos: any[] , objetivo: any, operacion: string[] | null }) => {
    const categoria = EnumCategory.PALABRAS;

    if( categoria == EnumCategory.PALABRAS ){
        objetivo as string
        objetivos as string[]
        content as string[]
    }

    return <div className="grid place-content-center w-full gap-6">
        <div className="flex gap-2 justify-center">
            {
                operacion && operacion.map((op, index) => {
                    return <div key={index} className="opacity-65 p-4 w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-gradient-to-tl bg-slate-500 text-white font-bold text-2xl">{op}</div>
                })
            }
        </div>
        <div className="flex gap-3 justify-center">
            {
                content.map((cont, index) => {
                    if (objetivos.includes(cont) ){
                        if( cont == objetivo ){
                            return <div key={index} className="animate-bounce p-4 w-16 h-16 flex items-center justify-center shadow-lg rounded-lg bg-fuchsia-500 shadow-fuchsia-500/50 text-white font-bold text-2xl">{cont}</div>
                        }
                        return <div key={index} className="p-4 w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-fuchsia-500 shadow-fuchsia-500/50 text-white font-bold text-2xl">{cont}</div>
                    }
                    return <div key={index} className="opacity-65 p-4 w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-gradient-to-tl bg-sky-500 text-white font-bold text-2xl">{cont}</div>
                })
            }
        </div>
     
  </div>
}