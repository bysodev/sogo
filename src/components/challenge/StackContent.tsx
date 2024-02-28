'use client'


export const StackContent = ({ content, indices, objetivos, objetivo, operacion }: { content: any[], indices: number[], objetivos: any[], objetivo: any, operacion: string[] }) => {
    return <div className={` ${operacion?.length > 1 && ''} flex justify-center w-full gap-6`}>
        {operacion?.length > 1 && (
            <div className="flex gap-4">
                <div className="flex gap-2 justify-center">
                    {operacion.map((op, index) => (
                        <div key={index} className="opacity-65 p-4 w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-gradient-to-tl bg-slate-500 text-white font-bold text-2xl">{op}</div>
                    ))}
                </div>
                <div className="opacity-65 p-4 w-14 h-14 flex items-center justify-center shadow-lg rounded-lg bg-gradient-to-tl bg-slate-500 text-white font-bold text-2xl">=</div>
            </div>
        )}
        <div className="flex gap-3 justify-center">
            {
                content.map((cont, index) => {
                    if (objetivos.includes(cont) && indices.includes(index)) {
                        if (objetivo == cont && indices[0] == index) {
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