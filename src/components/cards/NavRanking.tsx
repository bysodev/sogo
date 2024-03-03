'use client'

import { EnumDifficulty } from "@/lib/types/challenge";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { MdOutlineSignalCellularAlt, MdOutlineSignalCellularAlt1Bar, MdOutlineSignalCellularAlt2Bar } from "react-icons/md";

const actionStyles =
{
  backgroundColor: '#f4eafd',
  borderRadius: 2,
  marginBottom: '1rem',
  '& .MuiBottomNavigationAction-root': { // Estilos para todos los BottomNavigationAction
    display: 'flex',
    flexDirection: 'row',
    gap: '0.1rem',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#9333ea',
    backgroundColor: 'transparent',
    margin: '0.5rem',
    borderRadius: 2,
    '&:hover': { // Estilo para el estado hover
      color: 'rgb(88,28,135)',
    },
    '& .MuiBottomNavigationAction-label': { // Estilo para la etiqueta
      fontSize: '0.8rem',
    },
  },
  '& .MuiBottomNavigationAction-root:nth-of-type(1)': { // Estilos para el primer BottomNavigationAction
    '&.Mui-selected': { color: 'rgb(34,197,94)', backgroundColor: '#ecffec', border: '2px solid rgb(34,197,94)' },
  },
  '& .MuiBottomNavigationAction-root:nth-of-type(2)': { // Estilos para el segundo BottomNavigationAction
    '&.Mui-selected': { color: '#fdbc35', backgroundColor: '#fdf9f2', border: '2px solid #fdbc35' },
  },
  '& .MuiBottomNavigationAction-root:nth-of-type(3)': { // Estilos para el tercer BottomNavigationAction
    '&.Mui-selected': { color: '#ef4444', backgroundColor: '#efd7d7', border: '2px solid #ef4444' },
  },
  '& .MuiButtonBase-root': {
    gap: 1,
  }
}

export default function NavRanking({ value, setValue }: { value: EnumDifficulty, setValue: Function }) {
  return (
    <Box>
      <BottomNavigation
        showLabels
        value={value}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        sx={actionStyles}
      >
        <BottomNavigationAction value={EnumDifficulty.FACIL} label="Fácil" icon={<FacilIcon />} />
        <BottomNavigationAction value={EnumDifficulty.MEDIO} label="Medio" icon={<MedioIcon />} />
        <BottomNavigationAction value={EnumDifficulty.DIFICIL} label="Difícil" icon={<DificilIcon />} />
      </BottomNavigation>
    </Box>
  )
}

const FacilIcon = () => {
  return (
    <div className="relative">
      <MdOutlineSignalCellularAlt1Bar size={20} />
      <MdOutlineSignalCellularAlt className="absolute top-0" size={20} style={{ opacity: 0.2 }} />
    </div>
  );
}

const MedioIcon = () => {
  return (
    <div className="relative">
      <MdOutlineSignalCellularAlt2Bar size={20} />
      <MdOutlineSignalCellularAlt className="absolute top-0" size={20} style={{ opacity: 0.2 }} />
    </div>
  );
}

const DificilIcon = () => {
  return <> <MdOutlineSignalCellularAlt size={20} /> </>
}