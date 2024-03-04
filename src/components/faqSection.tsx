"use client"

import { Accordion, AccordionDetails, AccordionSummary } from "@mui/material"
import Link from "next/link"
import { MdExpandMore } from "react-icons/md"

export default function FaqSection() {
  return (
    <section id='faq'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">F.A.Q</div>
            <h1 className="h2 mb-4">Preguntas frecuentes</h1>
          </div>
          <div className='grid gap-4 text-justify'>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Cómo registrarse?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Para registrarte, dirígete a la página de <Link href={'/auth/register'} className="text-purple-600 dark:text-purple-400 text-lg">registro</Link> y crea tu cuenta. Se te pedirá un correo electrónico personal al cual tengas acceso, ya que este se utilizará en el proceso manual de verificación de la cuenta. Posteriormente, podrás ingresar rápidamente a la plataforma Sogo Sign utilizando las credenciales de acceso proporcionadas o mediante tu cuenta de Google o Github. Una vez dentro, encontrarás disponible todo el material de aprendizaje y las funciones necesarias para comenzar tu experiencia de aprendizaje en Lengua de Señas Ecuatoriana utilizando Inteligencia Artificial.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Cómo crear mi propio reto?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  La creación de un reto está condicionado a terminar todos los retos de al menos una categoría y nivel de dificultad. Cuando el indicador de la barra de progreso esté al 100%, al querer comenzar un nuevo reto, lo llevará a crear un reto personalizado. No existe un límite de retos personalizados establecidos pero será menor la cantidad puntos obtenidos.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Por qué debo activar la cámara en el módulo de aprendizaje?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Se aclara que la función de la cámara se destina exclusivamente a prácticas y no se utiliza con fines de validación. Dado que ha demostrado beneficios significativos en la memorización de las señas presentes en los temarios, mejorando así la experiencia de aprendizaje.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Existen restricciones en cuanto a la cantidad de accesos o al tiempo de uso de la plataforma?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  No hay limitaciones de acceso al contenido ofrecido en la plataforma Sogo Sign. Desde el momento de la creación de tu cuenta podrás acceder a todos los recursos y modalidades que ofrecemos.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Sogo Sign está disponible en todas las plataformas?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  La plataforma Sogo Sign funciona en la mayoría de dispositivos, tanto para sistemas operativeos Windows, Mac, Linux, Android y iOS. Además, no necesitas descargar ninguna aplicación, ya que puedes acceder a la plataforma desde cualquier navegador web. Nuestro diseño responsive te permite ingresar desde cualquier dispositivo móvil, tablet o computadora. Sogo Sign recomienda utilizar el navegador de Google Chrome o que esté basado en chromium para una mejor experiencia.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Cómo puedo mejorar la precisión de las predicciones?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Se recomienda repasar el material de aprendizaje y realizar la seña con la configuración correcta según lo indicado por el profesor.
                  Además, para garantizar un rendimiento óptimo en las predicciones de la plataforma, es fundamental atender a los siguientes aspectos:
                </p>
                <p>
                  A) Asegurar una iluminación adecuada. <br />
                  B) Contar con una conexión a internet rápida y estable. <br />
                  C) Procurar que en el encuadre de la foto solo sea visible la mano con la seña respectiva.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¿Cómo los contacto?</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Nos encantaría poder ayudarte y solverta tus dudas. Puedes contactarnos desde nuestras <a className="text-purple-600 dark:text-purple-400 text-lg" href="#contact">
                    opciones de contacto
                  </a> o directamente a nuestro correo electrónico: <a href="mailto:educaciondigital@espe.edu.ec" className="text-black font-bold dark:text-purple-400">educaciondigital@espe.edu.ec</a>.
                </p>

              </AccordionDetails>
            </Accordion>
          </div>
        </div>
      </div>
      <div className='dark:text-gray-900'>
        <svg viewBox="0 0 1440 320" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 64L80 58.7C160 53 320 43 480 80C640 117 800 203 960 197.3C1120 192 1280 96 1360 48L1440 0V320H1360C1280 320 1120 320 960 320C800 320 640 320 480 320C320 320 160 320 80 320H0V64Z" />
        </svg>
      </div>
    </section >
  )
}
