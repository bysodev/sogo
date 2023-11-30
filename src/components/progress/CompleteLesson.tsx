import Image from "next/image";

export default function CompleteLesson(){

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
                    <span>08:20 m/s</span>
                    <span>Tiempo</span>
                </div>
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <span>10+</span>
                    <span>Experiencia</span>
                </div>
                <div className="border p-6 rounded-lg flex flex-col place-content-center text-center">
                    <span>90%</span>
                    <span>General</span>
                </div>
            </div>
        </div>
    )
}