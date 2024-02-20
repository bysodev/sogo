"use client";

import data from '@/store/learnData.json';
import { TextField } from '@mui/material';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import { useRef, useState } from 'react';
import { FaPause, FaPlay } from 'react-icons/fa';

const numbers = data.numbers;
const letters = data.letters;

export default function Learn() {
  const { push } = useRouter();
  const [searchTerm, setSearchTerm] = useState({ number: '', letter: '' });

  const filteredNumbers = numbers.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.number.toLowerCase())
  );

  const filteredletters = letters.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.letter.toLowerCase())
  );

  const [isPlaying, setIsPlaying] = useState(() => new Array(filteredNumbers.length + filteredletters.length).fill(false));
  const audioRefs = useRef<HTMLAudioElement[]>([]);

  const handlePlayPause = (index: number) => {
    if (isPlaying[index] && audioRefs.current[index] !== null) {
      audioRefs.current[index].pause();
    } else if (audioRefs.current[index] !== null) {
      audioRefs.current[index].play();
    }
    setIsPlaying(prev => prev.map((val, idx) => (idx === index ? !val : val)));
  };

  const handleAudioEnd = (index: number) => {
    setIsPlaying(prev => prev.map((val, idx) => (idx === index ? false : val)));
  };

  return (
    <div className="lg:p-4">
      <h1 className="lg:rounded-xl border-2 p-1 font-bold text-xl text-center text-gray-500 mb-4">Aprendizaje</h1>
      <div className="grid">
        <section className='bg-purple-500 text-white text-center sm:text-start sm:flex lg:rounded-xl p-4 w-full gap-4' id='number-section'>
          <article className="w-5/6 font-bold grid gap-4 m-auto justify-items-center lg:justify-items-start">
            <header className="w-fit text-purple-500 bg-white p-2 px-4 text-center rounded-md text-base">
              <h5>Números</h5>
            </header>
            <p className="text-xs font-medium 2xl:text-sm">Aprende como realizar correctamente los números del 0 al 9 con videotutoriales de personas certificadas</p>
          </article>
          <aside className={`w-auto grid place-items-center text-white`}>
            <button onClick={() => push("/learn/course?search=number")} className="bg-purple-700 p-2 px-4 font-bold text-base rounded-lg hover:bg-purple-800 hover:scale-105">Comenzar</button>
          </aside>
        </section>
        <div className="flex justify-end p-4 pb-0 lg:px-0">
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm.number}
            onChange={(e: any) => setSearchTerm(prev => ({ ...prev, number: e.target.value }))}
          />
        </div>
        <div className="grid p-4 lg:px-0 gap-4 grid-cols-2 2xl:grid-cols-3">
          {filteredNumbers.map((item, index) => (
            <div key={index} className="relative flex flex-col bg-gray-300 p-6 rounded-lg h-64 justify-between">
              <div className='z-10 absolute h-full w-full top-0 start-0 bg-gradient-to-b from-gray-950 from-10% via-gray-800 via-30% to-transparent to-90% opacity-70 rounded-lg'></div>
              <Image height={100} width={100} placeholder="blur" blurDataURL={'/images/learn/numbers/preload-number-0.webp'} className='z-0 absolute h-full w-full top-0 start-0 rounded-lg object-cover object-top' src={`/images/learn${item.preaload}.webp`} alt={`Imagen de precarga para la lección ${item.title}`} />
              <div className="grid gap-4 z-20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <h2 className="font-bold text-gray-700 w-min bg-gray-200 p-2 text-sm lg:text-base leading-none rounded-lg">{(index + 1).toString().padStart(2, '0')}</h2>
                  <h2 className="w-min font-bold text-sm lg:text-base p-2 bg-transparent text-white border-white leading-none border-2 rounded-lg">{item.level}</h2>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-base lg:text-lg text-white font-bold whitespace-nowrap">{item.title}</h1>
                  <button className="bg-gray-200 p-2 rounded-lg" onClick={() => handlePlayPause(index)}>
                    {isPlaying[index] ? <FaPause className="w-2 h-2 lg:w-8 lg:h-8" /> : <FaPlay className="w-2 h-2 lg:w-8 lg:h-8" />}
                  </button>
                  <audio
                    ref={el => audioRefs.current[index] = el!}
                    src={"/audio" + item.audioPath + ".mp3"}
                    onEnded={() => handleAudioEnd(index)}
                  />
                </div>
              </div>
              <button type="button" onClick={() => push("/learn/course?search=number&char=" + item.title.slice(-1))} title="Iniciar etapa" className="block z-10 bg-purple-600 font-bold text-white rounded-lg py-2 text-base hover:bg-purple-800 hover:scale-105">Iniciar</button>
            </div>
          ))}
        </div>
      </div >
      <div className="grid gap-4">
        <section className={`bg-indigo-500 text-white text-center sm:text-start sm:flex lg:rounded-xl p-4 w-full gap-4`} id='letter-section'>
          <article className="w-5/6 font-bold grid gap-4 m-auto justify-items-center lg:justify-items-start">
            <header className="w-fit text-indigo-500 bg-white p-2 px-4 text-center rounded-md text-base">
              <h5>Abecedario</h5>
            </header>
            <p className="text-xs font-medium 2xl:text-sm">Aprende como realizar correctamente las señas estáticas del abecedario con videotutoriales de personas certificadas</p>
          </article>
          <aside className={`w-auto grid place-items-center text-white`}>
            <button onClick={() => push("/learn/course?search=letter")} className="bg-indigo-700 p-2 px-4 font-bold text-base rounded-lg hover:bg-indigo-800 hover:scale-110">Comenzar</button>
          </aside>
        </section>
        <div className="flex justify-end p-4 pb-0 lg:px-0">
          <TextField
            label="Buscar"
            variant="outlined"
            size="small"
            value={searchTerm.letter}
            onChange={(e: any) => setSearchTerm(prev => ({ ...prev, letter: e.target.value }))}
          />
        </div>
        <div className="grid p-4 gap-4 grid-cols-2 2xl:grid-cols-3">
          {filteredletters.map((item, index) => (
            <div key={index} className="relative flex flex-col bg-gray-300 p-6 rounded-lg h-64 justify-between">
              <div className='z-10 absolute h-full w-full top-0 start-0 bg-gradient-to-b from-gray-950 from-10% via-gray-800 via-30% to-transparent to-90% opacity-70 rounded-lg'></div>
              <Image height={100} width={100} placeholder="blur" blurDataURL={'/images/learn/numbers/preload-letter-A.webp'} className='z-0 absolute h-full w-full top-0 start-0 rounded-lg object-cover object-top' src={`/images/learn${item.preaload}.webp`} alt={`Imagen de precarga para la lección ${item.title}`} />
              <div className="grid gap-4 z-20">
                <div className="flex flex-col sm:flex-row gap-4">
                  <h2 className="font-bold text-gray-700 w-min bg-gray-200 p-2 text-sm lg:text-base leading-none rounded-lg">{(index + 1).toString().padStart(2, '0')}</h2>
                  <h2 className="w-min font-bold text-sm lg:text-base p-2 bg-transparent text-white border-white leading-none border-2 rounded-lg">{item.level}</h2>
                </div>
                <div className="flex gap-4">
                  <h1 className="text-base lg:text-lg text-white font-bold whitespace-nowrap">{item.title}</h1>
                  <button className="bg-gray-200 p-2 rounded-lg" onClick={() => handlePlayPause(index + filteredNumbers.length)}>
                    {isPlaying[index + filteredNumbers.length] ? <FaPause className="w-2 h-2 lg:w-8 lg:h-8" /> : <FaPlay className="w-2 h-2 lg:w-8 lg:h-8" />}
                  </button>
                  <audio
                    ref={el => audioRefs.current[index + filteredNumbers.length] = el!}
                    src={"/audio" + item.audioPath + ".mp3"}
                    onEnded={() => handleAudioEnd(index + filteredNumbers.length)}
                  />
                </div>
              </div>
              <button type="button" onClick={() => push("/learn/course?search=letter&char=" + item.title.slice(-1))} title="Iniciar etapa" className="block z-10 bg-indigo-600 font-bold text-white rounded-lg py-2 text-base hover:bg-indigo-800 hover:scale-105">Iniciar</button>
            </div>
          ))}
        </div>
      </div>
    </div >
  );
}
