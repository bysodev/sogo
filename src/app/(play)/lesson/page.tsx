"use client";

import Popover from '@mui/material/Popover';
import * as React from 'react';
import { BsBookmarkStarFill, BsStarFill } from "react-icons/bs";
import { FaLock } from "react-icons/fa6";

const BASE_LESSON = "/lesson/"

const SpotLearn: (SpotLearnItemWithLesson | SpotLearnItemWithoutLesson)[] = [
  {
    id: 1,
    left: "0",
    icon: BsStarFill,
    state: "current",
    lesson: {
      title: "Lección 1",
      message: "Ejemplo...",
      url: BASE_LESSON + "vocales",
    }
  },
  {
    id: 2,
    left: "-5rem",
  },
  {
    id: 3,
    left: "-8rem",
  },
  {
    id: 4,
    left: "-5rem",
  },
  {
    id: 5,
    left: "0",
  },
  {
    id: 6,
    left: "5em",
  },
  {
    id: 7,
    left: "8rem",
  },
  {
    id: 8,
    left: "5em",
  },
  {
    id: 9,
    left: "0",
  },
  {
    id: 10,
    left: "-5em",
  }
]

// Define the types
type SpotLearnItemWithLesson = {
  id: number;
  left: string;
  icon: React.ComponentType<any>; // Adjust the type if needed
  state: string;
  lesson: {
    title: string;
    message: string;
    url: string;
  };
};

type SpotLearnItemWithoutLesson = {
  id: number;
  left: string;
  icon?: undefined;
  state?: undefined;
  lesson?: undefined;
};




const LevelStage = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [currentMessage, setCurrentMessage] = React.useState<any | null>(null);

  const handleClick = (event: any, message: any) => {
    setAnchorEl(event.currentTarget);
    setCurrentMessage(message);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      {SpotLearn.map((item) => {
        const IconComponent = item.icon || FaLock; // Asignar el componente de icono dinámicamente

        return (
          <button
            key={item.id}
            className={`spot-lesson rounded-full ${item.state === "current" ? "text-white bg-red-600" : "text-gray-400 bg-gray-300"} `}
            style={{ marginLeft: item.left }}
            onClick={(event) => item.lesson ? handleClick(event, item.lesson) : null}
          >
            <span className="back opacity-50"></span>
            <span className={`front border ${item.state === "current" ? "border-red-600" : "border-gray-300"} `}>
              <IconComponent />
            </span>
          </button>
        );
      })}
      <Popover
        className='-ms-24 mt-1'
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {currentMessage && <div className="grid gap-2 rounded-lg shadow-lg p-3 bg-red-600 text-white text-xs w-48 justify-content-center">
          <h2 className="break-any font-bold">{currentMessage.title}</h2>
          <p style={{ overflowWrap: "anywhere" }}>{currentMessage.message}</p>
          <a href={currentMessage.url} className="text-center bg-white rounded-xl text-red-600 p-1 px-4 text-[0.6rem] font-bold">COMENZAR</a>
        </div>}
      </Popover>
    </>
  );
};

const Lesson = () => {

  return (
    <>
      <div className="grid place-items-center gap-12 w-full p-10">
        <section className="bg-gray-800 flex rounded-xl p-4 w-full">
          <article className="w-5/6  font-bold">
            <header className="text-gray-400 ">ETAPA 1, SECCIÓN 1</header>
            <p className="text-white text-xl">Números del 0 al 9</p>
          </article>
          <aside className="w-1/6 border-l-2 border-gray-600 grid place-items-center text-white"><BsBookmarkStarFill size={40} /></aside>
        </section>
        <LevelStage />
      </div>
    </>
  )
}

export default Lesson;