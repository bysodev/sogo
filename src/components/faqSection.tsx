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
          <div className='grid gap-4 text-balance'>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¡Empieza a utilizar Sogo Sign!</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Dirigite a <Link href={'/auth/register'} className="text-purple-600 dark:text-purple-400 text-lg">registrarme</Link>  y crea una cuenta, necesitas un correo electrónico personal al cual te pueda hacer llegar un correo de verificación y finalmente una redirección al aplicativo para finalizar el proceso, en cuestión de segundos todo estará listo para que puedas empezar.
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
                  Primero hay que terminar los retos de una categoría y nivel de dificultad en específico, al querer comenzar cuando la barra de progreso esté llena lo llevará a crear su nuevo reto. Pero si tienes creatividad puedes crear retos ilimitados con un truquito
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
                  Se explica que la funcionalidad de la cámara solo es para practicar y no se la usa para validar nada, sin embargo, hemos detectado buen uso de este componente al practicar de forma grupal o de forma individual con mejores resultados en memorizar las señas de los temarios.
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
                  En primer lugar, asegúrate de realizar la señal en la parte del cuerpo indicada por el profesor y con la configuración manual correcta.
                  Además, para garantizar un rendimiento óptimo de la plataforma, es fundamental atender a los siguientes aspectos:
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
                <h3 className='text-base md:text-lg xl:text-xl font-bold'>¡Aun tengo algunas dudas, como los contacto!</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Nos encantaría poder ayudarte, puedes contactarnos desde <a className="text-purple-600 dark:text-purple-400 text-lg" href="#contact">
                  aquí
                  </a> o directamente a nuestro correo electrónico: educaciondigital@espe.edu.ec.
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
