'use client'

import Link from "next/link"

export function Enunciados({title, contenido, url}: {title: string, contenido: string, url: string}) {

    return (
        <div className=" w-9/12 bg-sky-600 grid grid-flow-col rounded-lg bg-opacity-90">
            <div className="p-2">
                <div className="w-fit m-2 p-1 bg-white text-sky-600 text-center rounded-md  ">
                    <h5>{title}</h5>
                </div>
                <div className="text-white m-2 mt-6">
                    <h6>{contenido}</h6>
                </div>
                
            </div>
            <div className=" grid place-content-center m-3">
            <button type="button" className="rounded-md shadow-md relative -top-1 -left-1 bg-cyan-900 py-2.5 px-5 font-medium uppercase text-white transition-all before:absolute before:top-1 before:left-1 before:-z-[1] before:h-full before:w-full before:border-2  before:transition-all before:content-[''] hover:top-0 hover:left-0 before:hover:top-0 before:hover:left-0">
                <Link href={`learn/${url}`} rel="preload">COMENZAR</Link> 
            </button>
            </div>
          
        </div>
    )
}