import { FaArrowRight } from "react-icons/fa";

import Hand3d from '@/../../public/images/hand-3d-bg.png';

import Image from "next/image";
export default function Contact() {
  return (
    <section id='contact' className="bg-gray-900 text-white overflow-hidden">
      {/* Illustration behind hero content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative">
        <Image className="absolute end-0 opacity-25" src={Hand3d} width={540} height={405} alt="Features 03" />
        <div className="py-12 md:py-20 z-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">Contacto</div>
            <h1 className="h2 mb-4">¿Tienes alguna sugerencia?</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">Puedes escribirnos directamente para comentarnos cualquier duda o sugerencia.</p>
          </div>

          {/* Section contact */}
          <form action="mailto:amgoyes@espe.edu.ec?subject=Plataforma%20Sogo%20Sign" method="GET">
            <div className="text-center">
              <button type="submit" className="btn bg-purple-500 hover:bg-purple-600">Contactar  <FaArrowRight className="ms-2" /></button>
            </div>
          </form>

        </div>
      </div>
    </section >
  )
}
