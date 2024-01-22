'use client'

import { CardChallengesCategoryProps } from '@/lib/types/challenge';
import { zustandStore } from '@/store/user';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function ChallengeCard(props: CardChallengesCategoryProps){
    const router = useRouter();
    const [select, setSelect] = useState('Facil');
    const assignChallenge = zustandStore((state) => state.assignChallenge);


    const handleChange = (event: SelectChangeEvent) => {
        setSelect(event.target.value)
    }

    return <div className='h-60 h w-96'>
        <div className='flex flex-row justify-between h-full w-full rounded-2xl bg-white transition-all duration-700 ease-out p-2'>
            
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

            <div>
                <FormControl sx={{ minWidth: 120 }} size="small">
                    <Select
                    value={select}
                    onChange={handleChange}
                    displayEmpty
                    inputProps={{ 'aria-label': 'Without label' }}
                    >
                    <MenuItem value='Facil'>Facil</MenuItem>
                    <MenuItem value='Medio'>Medio</MenuItem>
                    <MenuItem value='Dificil'>Dificil</MenuItem>
                    </Select>
                    <FormHelperText>Dificultad</FormHelperText>
                </FormControl>
            </div>
       
        </div>
  </div>
}