"use client"
import ModalMUI from '@/components/ModalMUI';
import { Fetcher } from '@/lib/types/lessons';
import Link from 'next/link';
import { useState } from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { FaCheck, FaExclamationTriangle, FaLock } from "react-icons/fa";
import { FaCircleCheck, FaCircleXmark, FaLocationCrosshairs } from 'react-icons/fa6';
import useSWR from 'swr';

const LevelStage = () => {
  const { data: lesson, isLoading, error: isError } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/section/`, Fetcher)
  const [open, setOpen] = useState(false);
  const [currentMessage, setCurrentMessage] = useState<any | null>(null);

  const handleOpen = (lesson: any, active: number) => {
    if (active !== 1) {
      setCurrentMessage({
        "title": `${lesson.name}`,
        "message": `${lesson.content}`,
        "random": `${lesson.random === true ? "Si" : "No"}`,
        "id": `${lesson.id}`,
        "stateId": lesson.state_id,
        "section_id": lesson.section_id
      });
    } else {
      setCurrentMessage({
        "title": `${lesson.name}/#`,
        "blocked": true,
        "stateId": lesson.state_id
      });
    }
    setOpen(true);
  };

  const lockIcon = (stateId: number) => {
    switch (stateId) {
      case 2:
        return <FaLocationCrosshairs />;
      case 3:
        return <FaExclamationTriangle />;
      case 4:
        return <FaCheck />;
      default:
        return <FaLock />;
    }
  };

  const sectionColor = (index: number) => {
    const colors = ["purple-600", "indigo-600", "pink-400"];
    return colors[index % colors.length];
  };

  return (
    <div className='p-10'>
      <h1 className='text-gray-500 font-bold text-xl border-b-2'>Las lecciones se basan en señas estáticas</h1>
      {isLoading ? (
        <p>Cargando...</p>
      ) : isError ? (
        <p>Ocurrió un error al cargar los productos.</p>
      ) : (
        lesson?.data && lesson.data.map((sectionWithLessons: any, index: number) => {
          const color = sectionColor(index);
          return (
            <div key={sectionWithLessons.section.id} className="grid place-items-center w-full pt-10">
              <section className={`bg-${color} text-white flex rounded-xl p-4 w-full`}>
                <article className="w-5/6  font-bold">
                  <header>SECCIÓN {index + 1}: {sectionWithLessons.section.name}</header>
                  <p className="text-xl">{sectionWithLessons.section.description}</p>
                </article>
                <aside className={`w-1/6 border-l-2 border-white grid place-items-center text-white`}><BsBookmarkStarFill size={40} /></aside>
              </section>
              <div className='grid place-items-center w-full gap-8 m-10'>
                {sectionWithLessons.lessons.map((lesson: any, index: number) => {
                  const stateId = lesson.state_id;
                  const lockIconValue = lockIcon(stateId);
                  return (
                    <button
                      key={index}
                      className={`spot-lesson rounded-full text-white ${stateId === 1 ? "bg-gray-400" : "bg-" + color}`}
                      onClick={() => handleOpen(lesson, stateId)}
                    >
                      <span className="back opacity-50"></span>
                      <span className={`front ${stateId === 1 ? "border-gray-400" : "border-" + color}`}>
                        {lockIconValue}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )
        }))}

      <ModalMUI open={open} handleClose={() => { setOpen(false) }}>
        <article className={`${currentMessage?.blocked ? "text-gray-600" : "text-" + sectionColor(currentMessage?.section_id - 1)}`}>
          <h3 className={`rounded-t-xl ${currentMessage?.blocked ? "bg-gray-400" : "bg-" + sectionColor(currentMessage?.section_id - 1)} p-4 font-bold text-white text-lg`}>
            {currentMessage?.title}
          </h3>
          <div className="text-md font-medium bg-white p-4 flex flex-col gap-2 rounded-b-xl">
            <p>
              Contenido:{" "}
              {currentMessage?.message
                ? currentMessage.message.split(',').map((item: any, index: number) => (
                  <span className={`whitespace-nowrap rounded-full bg-purple-100 px-2 py-0.5 mx-1`} key={index}>{item}</span>
                ))
                : "No disponible"
              }
            </p>
            <div className='grid grid-cols-2'>
              <p className='flex gap-6 items-center'>Aleatorio: {currentMessage?.random === "Si" ? <FaCircleCheck size={22} /> : <FaCircleXmark size={22} />}</p>
              <div>
                <p className='flex gap-6 items-center'>Estado: <span
                  className={`whitespace-nowrap rounded-full ${currentMessage?.blocked ? "bg-gray-100" : "bg-purple-100"} px-2.5 py-0.5 text-${sectionColor(currentMessage?.section_id - 1)}`}
                >
                  {currentMessage?.stateId == 1 ? "Bloqueado" : currentMessage?.stateId == 2 ? "Disponible" : currentMessage?.stateId == 3 ? "Recuperar" : currentMessage?.stateId == 4 ? "Completado" : "No disponible"}
                </span></p>

              </div>
            </div>
            <div className='text-center my-4'>
              <Link aria-disabled={currentMessage?.blocked} href={{
                pathname: "/lesson/start",
                query: { id: currentMessage?.id },
              }}
                className={`${currentMessage?.blocked && "disabled"} text-lg text-center py-2 px-8 rounded-xl ${currentMessage?.blocked ? "text-gray-600 bg-gray-300" : "text-white bg-" + sectionColor(currentMessage?.section_id - 1)} p-1 px-4 text-[0.6rem] font-bold`}>
                {currentMessage?.blocked ? "BLOQUEADO" : "COMENZAR"}
              </Link>
            </div>
          </div>
        </article>
      </ModalMUI>
    </div >
  );
};

export default LevelStage;
