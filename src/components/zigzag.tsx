import Image from 'next/image'

const FeatDefault = '/images/feature-default.jpg'

export default function Zigzag() {
  return (
    <section id='features' className='bg-gray-50 dark:bg-gray-900 relative'>
      <div className="absolute left-1/2 transform -translate-x-1/2 bottom-0 pointer-events-none " aria-hidden="true">
        <svg width="1360" height="578" viewBox="0 0 1360 578" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient x1="50%" y1="0%" x2="50%" y2="100%" id="illustration-02">
              <stop stopColor="#fff" offset="0%" />
              <stop stopColor="#ddd6fe" offset="77.402%" />
              <stop stopColor="#c4b5fd" offset="100%" />
            </linearGradient>
          </defs>
          <g fill="url(#illustration-02)" fillRule="evenodd">
            <circle cx="1232" cy="128" r="128" />
            <circle cx="155" cy="443" r="64" />
          </g>
        </svg>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">Características</div>
            <h1 className="h2 mb-4">Aprende y diviértete</h1>
            <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300">Aprende desde la comodidad de tu casa. Donde tú decides cuándo y cómo aprender, sin tiempos fijos.</p>
          </div>

          {/* Items */}
          <div className="grid gap-20">
            {/* 1st item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatDefault} width={415} height={300} alt="Features 01" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-lg 2xl:text-xl text-purple-600 mb-2 relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-4 before:h-4 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>1.</span></div>
                  <h3 className="h3 mb-3">Basado en la lengua de señas ecuatoriana</h3>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4">Primera plataforma basada en la lengua de señas ecuatoriana &ldquo;Gabriel Román&rdquo; (LSE).</p>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4">Permite aprender:</p>
                  <ul className="text-base 2xl:text-lg text-gray-500 dark:text-gray-300 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Números del cero al nueve</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Letras sin movimiento del abecedario</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 2nd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 rtl" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatDefault} width={415} height={300} alt="Features 02" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-left">
                <div className="md:pl-4 lg:pl-12 xl:pl-16">
                  <div className="font-architects-daughter text-lg 2xl:text-xl text-purple-600 mb-2 relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-4 before:h-4 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>2.</span></div>
                  <h3 className="h3 mb-3">Material didáctico para la enseñanza</h3>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4">Uno de los módulos de la plataforma está destinada a brindar material didáctico segmentado en etapas definidas para aprender la lengua de señas ecuatoriana.</p>
                  <ul className="text-base 2xl:text-lg text-gray-500 dark:text-gray-300 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Lecciones en video</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Material interactivo</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Retroalimentación inmediata</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* 3rd item */}
            <div className="md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image className="max-w-full mx-auto md:max-w-none h-auto" src={FeatDefault} width={415} height={300} alt="Features 03" />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-lg 2xl:text-xl text-purple-600 mb-2 relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-4 before:h-4 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>3.</span></div>
                  <h3 className="h3 mb-3">Lecciones dinámicas</h3>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4">Se evalúa el conocimiento adquirido en lecciones definidas por niveles que serán puntuados. Cada lección requiere ser aprobada para continuar.</p>
                  <ul className="text-base 2xl:text-lg text-gray-500 dark:text-gray-300 -mb-2">
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Retroalimentación inmediata</span>
                    </li>
                    <li className="flex items-center mb-2">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Interfaz intuitiva</span>
                    </li>
                    <li className="flex items-center">
                      <svg className="w-3 h-3 fill-current text-purple-500 mr-2 shrink-0" viewBox="0 0 12 12" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.28 2.28L3.989 8.575 1.695 6.28A1 1 0 00.28 7.695l3 3a1 1 0 001.414 0l7-7A1 1 0 0010.28 2.28z" />
                      </svg>
                      <span>Reconocimiento preciso</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section >
  )
}
