'use client'
import { DetailsChallengeApi, EnumCategory, EnumDifficulty } from '@/lib/types/challenge';
import { FormControl, FormHelperText, MenuItem, Select, SelectChangeEvent } from '@mui/material';
import { ThemeProvider, createTheme, styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { FaQuestion } from "react-icons/fa";
import { Striped } from '../progress/Striped';
import ModalDetalles from './ModalDetalles';

export function ChallengeCard({ details, title, category }: { details: Array<DetailsChallengeApi>, title: string, category: EnumCategory }) {
    const [select, setSelect] = useState<EnumDifficulty>(EnumDifficulty.FACIL);
    const [detalle, setDetalle] = useState<DetailsChallengeApi>();
    const [modal, setModal] = useState(false);
    const router = useRouter();

    const StyledMenuItem = styled(MenuItem)(() => ({
        '&.Mui-selected': { // This targets the selected menu item
            backgroundColor: 'light', // Change this to your preferred color
            '&:hover': {
                backgroundColor: '#dde5ff', // Change this to your preferred color
            },
        },
        padding: '0.5rem 1rem',
    }));

    const theme = createTheme({
        components: {
            MuiMenu: {
                styleOverrides: {
                    list: { // This targets the ul element
                        backgroundColor: '#fff', // Change this to your preferred color
                        margin: '0',
                        border: '1px solid #e5e7eb',
                    },
                },
            },
        },
    });

    const handleDetalis = useCallback((dificultad: EnumDifficulty): DetailsChallengeApi | undefined => {
        return details.find((detail: DetailsChallengeApi) => detail.dificultad == dificultad);
    }, [details]);

    const obtenerProgreso = useCallback((): number => {
        console.log(detalle)
        if (detalle?.progreso)
            return (detalle?.progreso / detalle?.total) * 100
        return 0;
    }, [detalle]);

    useEffect(() => {
        let temporal = handleDetalis(select);
        if (temporal)
            setDetalle(temporal)
    }, [select, handleDetalis])

    const handleChange = useCallback((event: SelectChangeEvent) => {
        setSelect(event.target.value as EnumDifficulty)
    }, []);

    const handleModal = useCallback((): void => {
        setModal(false)
    }, []);

    return (
        <div className={`${category === "PALABRAS" ? "bg-purple-500" : "bg-indigo-500"} gap-4 flex flex-row justify-between h-full w-full rounded-2xl transition-all duration-700 ease-out p-8 px-6`}>
            <div className='w-full grid items-center gap-4'>
                <div className='block'>
                    <p className='text-2xl font-bold text-white'>Categoría: {title.charAt(0).toUpperCase() + title.slice(1).toLowerCase()}</p>
                    <Striped gradientColor1={category === "PALABRAS" ? '#e6b4ff' : '#bbbcf1'} gradientColor2={category === "PALABRAS" ? '#caa6ea' : '#8a8cf1'} progreso={obtenerProgreso()} puntos={detalle?.progreso} total={detalle?.total} />
                </div>
                <div className='flex justify-between'>
                    <button type='button' title='Comenzar reto' className={`${category === "PALABRAS" ? "text-purple-500" : "text-indigo-500"} p-2 px-4 bg-white font-bold rounded-xl hover:bg-opacity-80 leading-none`}
                         onClick={() => {
                            ( detalle && (detalle?.progreso == detalle?.total) && detalle?.progreso != 0 ) ?
                                router.push(`/challenge/customized?category=${category}&difficulty=${select}`) :
                                router.push(`/challenge/${category}/${select}`) 
                        }}
                    >
                        COMENZAR
                    </button>
                  
                  
                    <div className='flex justify-end'>
                        <div className='flex bg-white bg-opacity-20 p-2 rounded-md'>
                            <span className='font-bold text-lg text-white'>{detalle?.puntos} EXP</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-1/3 flex flex-col justify-between'>
                <div className="flex justify-end">
                    <button
                        className={`p-2 bg-white ${category === "PALABRAS" ? "text-purple-500" : "text-indigo-500"} font-bold rounded-md hover:bg-opacity-80`}
                        onClick={() => {
                            setModal(true)
                        }}
                    >
                        <FaQuestion />
                    </button>
                    <ModalDetalles key={category} open={modal} handleClose={handleModal} category={category} />
                </div>
                <ThemeProvider theme={theme}>

                    <FormControl sx={{ minWidth: 50 }} size="small">
                        <FormHelperText className="!text-white !font-semibold !m-0 !text-end !text-sm !font-inter">Dificultad:</FormHelperText>
                        <Select
                            className={`${category === "PALABRAS" ? "!text-purple-500" : "!text-indigo-500"} !font-semibold bg-white text !rounded-xl`}
                            value={select}
                            onChange={handleChange}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >
                            <StyledMenuItem value={EnumDifficulty.FACIL}>Facil</StyledMenuItem>
                            <StyledMenuItem value={EnumDifficulty.MEDIO}>Medio</StyledMenuItem>
                            <StyledMenuItem value={EnumDifficulty.DIFICIL}>Dificil</StyledMenuItem>
                        </Select>
                    </FormControl>
                </ThemeProvider>
            </div>
        </div>
    )

}