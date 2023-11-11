'use client'

import Link from "next/link";
import { useRouter } from "next/navigation";

const vocales = ['A', 'E', 'I', 'O', 'U'];
const numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

export default function Learn(){

    const router = useRouter();
    
    return (<>
        <div className="m-3">
            <button onClick={() => router.back()} type="button" className="rounded-md shadow-md relative -top-1 -left-1 bg-cyan-900 py-2.5 px-5 font-medium uppercase text-white transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:border-2  before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0">
                {/* <Link href='/learn' >REGRESAR</Link>  */}
                REGRESAR
            </button>
        </div>
        
        <h5>COMENZAR CON LOS NUMEROS</h5>
    </>)
}