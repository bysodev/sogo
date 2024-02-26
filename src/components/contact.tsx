import ModalMUI from '@/components/ModalMUI';
import WhatsAppLink from '@/components/WhatsAppLink';

import Image from "next/image";
import { useState } from 'react';
import { FaArrowRight } from "react-icons/fa";
import { HiX } from 'react-icons/hi';
import { IoLogoWhatsapp } from "react-icons/io";
import { MdEmail } from "react-icons/md";

export default function Contact() {

  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <section id='contact' className="bg-gray-900 text-white overflow-hidden">
      {/* Illustration behind hero content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative ">
        <Image className="absolute end-0 opacity-25 z-0" src={"/images/hand-3d-bg.png"} width={540} height={405} alt="Features 03" />
        <div className="py-12 md:py-20 z-10">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">Contacto</div>
            <h1 className="h2 mb-4">¿Tienes alguna sugerencia?</h1>
            <p className="text-xl text-gray-300 dark:text-gray-300">Puedes escribirnos directamente para comentarnos cualquier duda o sugerencia.</p>
          </div>
          {/* Section contact */}
          <div className="text-center z-10 relative">
            <a onClick={handleOpen} className="btn bg-purple-500 cursor-pointer hover:bg-purple-600">Contactar  <FaArrowRight className="ms-2" /></a>
            <ModalMUI width={{ xs: '90%', sm: 'auto' }} open={open} handleClose={() => { handleClose() }}>
              <div className='bg-white rounded-lg p-6'>
                <div className="flex justify-between">
                  <h2 className='font-semibold'>Escoger método de contacto:</h2>
                  <button onClick={() => { setOpen(false) }} className="text-gray-400" type='button' title='Cerrar ventana'><HiX /></button>
                </div>
                <hr className='my-4' />
                <div className="flex gap-4">
                  <WhatsAppLink >
                    <IoLogoWhatsapp />
                    <span>WhatsApp Chat</span>
                  </WhatsAppLink>
                  <a href="mailto:amgoyes@espe.edu.ec?subject=Plataforma%20Sogo%20Sign" title='Contactar Email' className="btn text-white whitespace-nowrap flex gap-2 bg-purple-500 hover:bg-purple-600">
                    <MdEmail />
                    <span>Enviar Correo</span>
                  </a>
                </div>
              </div>
            </ModalMUI>
          </div>
        </div>
      </div>
    </section >
  )
}
