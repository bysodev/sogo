'use client'

import { EnumDifficulty } from "@/lib/types/challenge";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";

export default function NavRanking({value, setValue}: {value: EnumDifficulty, setValue: Function}) {
    return (
       <Box>
        <BottomNavigation
          showLabels
          value={value}
          onChange={(event, newValue) => {
            setValue(newValue);
          }}
          sx={{
            borderTopLeftRadius: 14, 
            borderTopRightRadius: 14, 
          }}
        >
          <BottomNavigationAction value={EnumDifficulty.FACIL} label="Facil" icon={ <FacilIcon /> } />
          <BottomNavigationAction value={EnumDifficulty.MEDIO} label="Medio" icon={<MedioIcon />} />
          <BottomNavigationAction value={EnumDifficulty.DIFICIL} label="Dificil" icon={<DificilIcon />} />
        </BottomNavigation>
      </Box>
      )
  }
  
  const FacilIcon = () => {
    return <> 🎈 </>
  }
  
  const MedioIcon = () => {
    return <> 🎯 </>
  }
  
  const DificilIcon = () => {
    return <> ⚔ </>
  }