'use client'
import { default as LinearProgress, linearProgressClasses } from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { FaTrophy } from "react-icons/fa";

// Styled component for customizing the LinearProgress component
import { LinearProgressProps } from '@mui/material/LinearProgress';

type BorderLinearProgressProps = LinearProgressProps & {
  gradientColor1?: string;
  gradientColor2?: string;
};

const BorderLinearProgress = styled(LinearProgress)<BorderLinearProgressProps>(({ theme }) => ({
  height: 15,
  borderRadius: 10,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[theme.palette.mode === 'light' ? 200 : 800],
  },
}));

export const Striped = ({ progreso = 50, puntos = 0, total = 0, gradientColor1 = '#caa6ea', gradientColor2 = '#9333ea' }: { progreso: number, puntos: any, total: any, gradientColor1?: string, gradientColor2?: string }) => {
  const gradientStyle = () => ({
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 10,
      backgroundImage: `repeating-linear-gradient(45deg, ${gradientColor1} 0, ${gradientColor1} 20px, ${gradientColor2} 20px, ${gradientColor2} 40px)`,
    },
  });
  return <div className="flex w-full justify-between items-center gap-2">
    <FaTrophy size={40} color='white' />
    <BorderLinearProgress className='w-full' variant="determinate" value={progreso} sx={gradientStyle} />
    <div className="w-1/5 m-auto ml-1">
      <p className="text-base -tracking-normal font-bold text-white whitespace-nowrap">{puntos} / <span className='text-gray-300'>{total}</span></p>
    </div>
  </div>
}