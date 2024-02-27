import Image from 'next/image'

export default function About() {
  return (
    <section id='about'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 mb-10">
        <div className="py-12 md:py-20">
          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-16">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">Acerca de</div>
            <h1 className="h2 mb-4">Somos SoGo Sign</h1>
          </div>

          {/* Items */}
          <div className="grid gap-20">

            {/* 1st item */}
            <div className="h-fit md:grid md:grid-cols-12 md:gap-6 items-center">
              {/* Image */}
              <div className="relative max-w-xl md:max-w-none md:w-full mx-auto md:col-span-5 lg:col-span-6 mb-8 md:mb-0 md:order-1" data-aos="fade-up">
                <Image className="w-full max-w-auto h-full object-contain transition-opacity duration-500 hover:opacity-0" src={"/images/foto-grupal-1.webp"} width={415} height={300} alt="Features 01" />
                <Image
                  className="absolute inset-0 w-full h-auto object-contain opacity-0 transition-opacity duration-500 hover:opacity-100"
                  src={"/images/foto-grupal-2.webp"}
                  width={415}
                  height={300}
                  alt="Features 02"
                />
              </div>
              {/* Content */}
              <div className="max-w-xl md:max-w-none md:w-full mx-auto md:col-span-7 lg:col-span-6" data-aos="fade-right">
                <div className="md:pr-4 lg:pr-12 xl:pr-16">
                  <div className="font-architects-daughter text-lg 2xl:text-xl text-purple-600 mb-2 relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-4 before:h-4 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>1.</span></div>
                  <div className='flex gap-4'>
                    <h3 className="h3 mb-3">Hola</h3>
                    <svg className='h-12 w-12 -mt-4 -rotate-12 wave' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" aria-hidden="true" role="img" preserveAspectRatio="xMidYMid meet"><path fill="#FFDC5D" d="M32.375 16.219c-1.381-.611-3.354.208-4.75 2.188c-.917 1.3-1.187 3.151-2.391 3.344c-.46.074-.71-.206-.84-.609c-.137-.68-.107-1.731.147-3.201l2.74-12.315c.218-.941-.293-1.852-1.523-2.149s-2.155.306-2.374 1.247L20.938 15.89c-.493 2.466-1.407 2.018-1.186-.775v-.001l.701-13.092C20.51 1.01 19.732.183 18.582.139c-1.15-.044-1.979.646-2.038 1.657l-.668 13.409c-.143 2.707-1.112 1.687-1.322-.274L13 4.083c-.159-1.023-1.118-1.73-2.268-1.546c-1.15.185-1.845 1.136-1.686 2.159l1.495 9.914c.593 3.785-.182 4.833-1.458.723L7.489 9.308c-.26-.967-1.213-1.567-2.41-1.231c-1.197.336-1.713 1.299-1.454 2.266l1.558 5.663c.651 4.077.651 5.686.651 8.493S7.125 36 17 36s11.906-10.031 12-10.666c0 0 .123-1.48 1.156-2.865a57.846 57.846 0 0 1 3.125-3.866c.317-.359.625-1.707-.906-2.384z" /><path fill="#EF9645" d="M24.911 21.741c-.3-.122-.554-.436-.584-1.119c-1.892.259-4.451.789-6.42 2.715c-2.556 2.499-2.992 5.2-2.971 7.007c.017 1.457.812 2.147 1.045-.012c.293-2.727 2.282-8.143 8.93-8.591z" /></svg>
                  </div>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4 text-justify">SoGo Sign nace de la necesidad de una plataforma completamente gratuita para <span className='bg-purple-500 text-white px-1 hover:bg-purple-600 transition duration-300 '>aprender lengua de señas ecuatoriana (LSE)</span> de manera dinámica, divertida y efectiva.</p>
                  <p className="text-lg 2xl:text-xl text-gray-500 dark:text-gray-300 mb-4 text-justify">Plataforma desarrollada por estudiantes del departamento de Ciencias de la Computación de la Universidad de las Fuerzas Armadas ESPE sede Santo Domingo. Cursando el último semestre de la carrera de Tecnologías de la Información</p>
                  <ul className="text-base 2xl:text-lg text-gray-500 dark:text-gray-300 -mb-2">
                    <li className="flex items-center mb-2">
                      <div className="font-architects-daughter relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-2 before:h-2 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>Directora: <span className='font-medium'>MSc. Verónica Isabel Martínez Cepeda</span></span></div>
                    </li>
                    <li className="flex items-center mb-2">
                      <div className="font-architects-daughter relative before:top-1/2 before:bottom-1/2 before:-translate-y-1/2 before:content-[''] before:w-2 before:h-2 before:absolute before:bg-purple-500"><span className='ms-6 font-extrabold'>Tesistas:</span><ul className='absolute ms-[6.7rem] top-0 font-medium whitespace-nowrap'><li>Bryan Alfredo Solórzano Montero</li><li>Anthony Mauricio Goyes Díaz</li></ul></div>
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
