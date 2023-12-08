"use client"
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import { MdExpandMore } from "react-icons/md";

export default function FaqSection() {
  return (
    <section id='faq'>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="py-12 md:py-20">

          {/* Section header */}
          <div className="max-w-3xl mx-auto text-center pb-6 md:pb-10">
            <div className="inline-flex text-sm font-semibold py-1 px-3 m-2 text-purple-600 bg-purple-200 rounded-full mb-4">FAQ</div>
            <h1 className="h2 mb-4">Preguntas frecuentes</h1>
          </div>
          <div className='grid gap-4'>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='font-bold'>Pregunta 1</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='font-bold'>Pregunta 2</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
                </p>
              </AccordionDetails>
            </Accordion>
            <Accordion className='shadow-lg btn block p-1 dark:text-white dark:bg-gray-800'>
              <AccordionSummary
                expandIcon={<MdExpandMore className='dark:text-white' size={25} />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <h3 className='font-bold'>Pregunta 3</h3>
              </AccordionSummary>
              <AccordionDetails>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                  malesuada lacus ex, sit amet blandit leo lobortis eget.
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
