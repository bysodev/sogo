import { default as LinearProgress, linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { useRouter } from 'next/navigation';
import { Dispatch, SetStateAction } from 'react';
import { HiHeart, HiX } from 'react-icons/hi';
// Styled component for customizing the LinearProgress component
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 20,
    borderRadius: 10,
    [`&.${linearProgressClasses.colorPrimary}`]: {
        backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
        borderRadius: 10,
        backgroundImage: theme.palette.mode === 'light' ? 'repeating-linear-gradient(45deg, #caa6ea  0, #caa6ea  20px, #9333ea 20px, #9333ea 40px)' : '#308fe8',
    },
}));

// Progressbar component
export const ProgressbarChallenge = ({ porcentaje, setDrawer, totalTry }: { porcentaje: number, setDrawer: Dispatch<SetStateAction<boolean>>, totalTry: number }) => {
    const { push } = useRouter();
    return (
        <div className='w-full flex gap-5 items-center p-10 px-16 pb-0'>
            <button
                title='Cerrar'
                type='button'
                onClick={() => {
                    porcentaje === 0 ? push('/lesson') : setDrawer(true);
                }}
            >
                <HiX
                    color="#afafaf"
                    size={26}
                />
            </button>
            <div className='w-full'>
                <BorderLinearProgress variant="determinate" value={porcentaje} />
            </div>
            <div className='flex gap-2 items-center'>
                <HiHeart color="#9333ea" size={30} />
                <span className='text-purple-600 font-bold leading-none'>{totalTry}</span>
            </div>
        </div>
    );
}