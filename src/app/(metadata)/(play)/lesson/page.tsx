"use client";
import Popover from '@mui/material/Popover';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { BsBookmarkStarFill } from 'react-icons/bs';
import { FaLock } from "react-icons/fa6";

const fetchSections = async () => {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/section/`, {
      method: 'GET',
      cache: 'no-store'
    },
    );

    if (!response.ok) {
      throw new Error(`Error al obtener las secciones con lecciones: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error al obtener las secciones con lecciones', error);
    return [];
  }
};
const LevelStage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [currentMessage, setCurrentMessage] = useState<any | null>(null);
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    fetchSections().then((sectionsData) => {
      setSections(sectionsData);
    });
  }, []);

  const handleClick = (event: any, lesson: any, active: number) => {
    setAnchorEl(event.currentTarget);
    if (active !== 1) {
      setCurrentMessage({
        "title": `${lesson.name}`,
        "message": `${lesson.content}`,
        "random": `${lesson.random === true ? "Si" : "No"}`,
        "id": `${lesson.id}`
      });
    } else {
      setCurrentMessage({
        "title": `${lesson.name}/#`,
        "blocked": true,
      });
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {sections.map((sectionWithLessons, index) => (
        <div key={sectionWithLessons.section.id} className="grid place-items-center w-full p-10">
          <section className="bg-gray-800 flex rounded-xl p-4 w-full">
            <article className="w-5/6  font-bold">
              <header className="text-gray-400 ">SECCIÓN {index + 1}: {sectionWithLessons.section.name}</header>
              <p className="text-white text-xl">{sectionWithLessons.section.description}</p>
            </article>
            <aside className="w-1/6 border-l-2 border-gray-600 grid place-items-center text-white"><BsBookmarkStarFill size={40} /></aside>
          </section>
          <div className='grid place-items-center w-full gap-8 m-10'>
            {sectionWithLessons.lessons.map((lesson: any, index: number) => (
              <button
                key={index}
                className={`spot-lesson rounded-full ${lesson.state_id === 2 ? "text-white bg-red-600" : "text-gray-400 bg-gray-300"} `}
                onClick={(event) => handleClick(event, lesson, lesson.state_id)}
              >
                <span className="back opacity-50"></span>
                <span className={`front border ${lesson.state_id === 2 ? "border-red-600" : "border-gray-300"} `}>
                  <FaLock />
                </span>
              </button>
            ))}
          </div>
        </div>
      ))}
      <Popover
        className='bg-transparent -ms-24 mt-1 px-10'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {currentMessage && <div className={`grid font-medium rounded-lg shadow-lg p-4 px-8 ${currentMessage.blocked ? "bg-gray-300 text-black" : "bg-red-600 text-white"} text-xs w-56 justify-content-center`}>
          <h2 className="break-any font-bold mb-3 text-center">{currentMessage.title} </h2>
          <p style={{ overflowWrap: "anywhere" }}>Contenido: {currentMessage.message ?? "No disponible"}</p>
          <p style={{ overflowWrap: "anywhere" }}>Aleatorio: {currentMessage.random ?? "No disponible"}</p>
          {/* Assuming you have a URL in your lesson data */}
          <Link aria-disabled={currentMessage.blocked} href={{
            pathname: "/lesson/start",
            query: { id: currentMessage.id },
          }}
            className={`${currentMessage.blocked && "disabled"} my-2 mt-6 text-center bg-white rounded-xl ${currentMessage.blocked ? "text-black" : "text-red-600 "} p-1 px-4 text-[0.6rem] font-bold`}>
            {currentMessage.blocked ? "BLOQUEADO" : "COMENZAR"}
          </Link>
        </div>}
      </Popover>
    </>
  );
};

export default LevelStage;
