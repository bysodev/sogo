import { default as LinearProgress, linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { Dispatch, SetStateAction } from 'react';

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === 'light' ? '#756AB6' : '#308fe8',
    },
  }));

export const Progressbar = ({porcentaje, setDrawer}: {porcentaje: number, setDrawer: Dispatch<SetStateAction<boolean>>}) => {
    // let wid = `h-5 bg-slate-600 w-${porcentaje}`
    return (
    <div className='w-full flex place-content-center items-center'>
        <div className='flex items-center gap-4 w-4/5'>
            <button 
                onClick={() =>{
                    setDrawer(true)
                }}
                className=""
            >
                <span>X</span>
            </button>
            <div className='w-full'>
                <BorderLinearProgress variant="determinate" value={porcentaje} />
            </div>
        </div>
    </div>
    );
}