'use client'

import { DetailsChallengeApi, EnumDifficulty } from '@/lib/types/challenge';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useCallback, useEffect, useState } from 'react';
import { Striped } from '../progress/Striped';



export function ChallengeCard( {details, title}: {details:  Array<DetailsChallengeApi>, title: string}){
    // const router = useRouter();
    const [select, setSelect] = useState<EnumDifficulty>(EnumDifficulty.FACIL);
    const [detalle, setDetalle] = useState<DetailsChallengeApi>();

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

    

    return <div className='h-60 h w-96'>
        <div className='flex flex-row justify-between h-full w-full rounded-2xl bg-teal-500 transition-all duration-700 ease-out p-2'>
            <div className='grid place-content-center'>
                <h5>{title}</h5>
                <h5>Total: {detalle?.puntos} puntos </h5>
                <Striped progreso={ obtenerProgreso() } puntos={detalle?.progreso} total={detalle?.total} />
            </div>

            <div className=''>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
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