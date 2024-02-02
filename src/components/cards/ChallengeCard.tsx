'use client'

import { DetailsChallengeApi, EnumCategory, EnumDifficulty } from '@/lib/types/challenge';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { Striped } from '../progress/Striped';
import ModalDetalles from './ModalDetalles';

export function ChallengeCard( {details, title, category}: {details:  Array<DetailsChallengeApi>, title: string, category: EnumCategory}){
    // const router = useRouter();
    const [select, setSelect] = useState<EnumDifficulty>(EnumDifficulty.FACIL);
    const [detalle, setDetalle] = useState<DetailsChallengeApi>();
    const [modal, setModal] = useState(false);
    const router = useRouter();

    // const assignChallenge = zustandStore((state) => state.assignChallenge);

    const handleDetalis = useCallback((dificultad: EnumDifficulty): DetailsChallengeApi | undefined => {
        return details.find( (detail:DetailsChallengeApi) => detail.dificultad == dificultad );
    }, [details]);

    const obtenerProgreso = useCallback((): number => {
        if (detalle?.progreso)
            return ( detalle?.progreso / detalle?.total ) * 100 
        return 0;
    }, [detalle]);

    useEffect(() => { 
        let temporal = handleDetalis( select );
        if( temporal )
            setDetalle( temporal )
    }, [select, handleDetalis])

    const handleChange = (event: SelectChangeEvent) => {
        setSelect( event.target.value as EnumDifficulty )
    }

    const handleModal = (): void => {
        setModal( false )
    }

    return <div className='h-72 w-2/3'>
        <div className='flex flex-row justify-between h-full w-full rounded-2xl bg-sky-700 transition-all duration-700 ease-out p-4'>
            <div className='w-2/3 grid items-center'>
                <div className='w-full space-y-4'>
                    <p className='text-xl font-bold text-white'>{title}</p>
                    <Striped progreso={ obtenerProgreso() } puntos={detalle?.progreso} total={detalle?.total} />
                </div>
                <div className="flex justify-around">
                    <button
                        className='p-2 bg-white text-sky-700 font-bold rounded-md hover:bg-inherit hover:text-white'
                        color='inherit'
                        onClick={() => {
                            console.log('COMENZAR')
                            router.push(`/challenge/${category}/${detalle?.dificultad}`)
                        }}
                     
                    >
                        COMENZAR
                    </button>
                    <button
                        className='p-2 bg-white text-sky-700 font-bold rounded-md hover:bg-inherit hover:text-white'
                        onClick={() => {
                            console.log('DETALLES')
                            setModal(true)
                        }}
                    >
                        DETALLES
                    </button>
                    <ModalDetalles key={category} open={modal} handleClose={handleModal} category={category} />
                </div>
            </div>

            <div className='w-1/3 flex flex-col justify-between'>
                <FormControl sx={{ minWidth: 120 }} size="small">
                {/* <FormControl className="bg-transparent" size="small"> */}
                    <Select
                        className='bg-white'
                        value={select}
                        onChange={handleChange}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value={EnumDifficulty.FACIL}>Facil</MenuItem>
                    <MenuItem value={EnumDifficulty.MEDIO}>Medio</MenuItem>
                    <MenuItem value={EnumDifficulty.DIFICIL}>Dificil</MenuItem>
                    </Select>
                    <FormHelperText>Dificultad</FormHelperText>
                </FormControl>

                <div className='flex justify-end'>
                    <div className='flex bg-white bg-opacity-20 p-2 rounded-md'>
                        <span className='font-bold text-xl text-white'>{detalle?.puntos} EXP</span>
                    </div>
                </div>
            </div>
       
        </div>
  </div>
}

  {/* <div> 
                <header className="text-center text-xl font-extrabold text-gray-600">{fecha_creation}</header>

                <div>
                    <p className="text-center text-3xl font-extrabold text-gray-900">#{props.number} {props.name}</p>
                    <p className="text-center text-1xl font-extrabold text-gray-400">Max. Tiempo: {`${props.minutes_max}:${props.seconds_max} m/s`}</p>
                    <p className="text-center text-1xl font-extrabold text-gray-400">Max. Fallas: {props.fails_max}</p>
                    <p className="text-center text-1xl font-extrabold text-gray-400">{props.points} points</p>
                </div>
                <div>
                    <Striped progreso={75} />
                </div>

                <footer className="mb-10 flex justify-center">
                    <button 
                        className={`flex items-baseline gap-2 rounded-lg ${  (props.difficulty_id == 2) ? 'bg-purple-600' : 'bg-emerald-600' }  px-4 py-2.5 text-xl font-bold text-white hover:bg-[#FF7308]`}
                        onClick={() => {
                            assignChallenge(props)
                            router.push('/challenge/start')
                        }}
                    >
                        <span>Start</span>
                        <i className="fas fa-hand-peace text-xl"></i>
                    </button>
                </footer>
            </div>
            <div>
                <div className={`inline-flex text-sm font-semibold py-1 px-3 m-2  ${ ( props.difficulty_id == 2) ? 'text-purple-600 bg-purple-200' : 'text-emerald-600 bg-emerald-200' }  rounded-full mb-4`}>{props.difficulty_name}</div>
                { 
                    props.end_points != null && <p className={`text-center text-1xl font-extrabold  ${  (props.difficulty_id == 2) ? 'text-purple-600' : 'text-emerald-600' }`}>{props.end_points} points</p>
                }
                
            </div> */}