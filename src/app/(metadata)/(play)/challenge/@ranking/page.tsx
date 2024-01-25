'use client'
import NavRanking from "@/components/cards/NavRanking";
import { getRankingByCategory } from "@/lib/actions/ranking";
import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { CompleteRankingProps, DetailsRankingApi } from "@/lib/types/rankings";
import { Alert, Box, IconButton, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";
import { useEffect, useState } from "react";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: EnumDifficulty;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function RankingChallengePage() {

  const [palabras, setPalabras] = useState(EnumDifficulty.FACIL);
  const [numeros, setNumeros] = useState(EnumDifficulty.FACIL);
  const [rankPalabras, setRankPalabras] = useState<CompleteRankingProps>();
  const [rankNumeros, setRankNumeros] = useState<CompleteRankingProps>();
  
  useEffect(() => {
    (
      async () => {
        const respuesta: CompleteRankingProps | null = await getRankingByCategory( EnumCategory.PALABRAS )
        if (respuesta?.PALABRAS ){
          setRankPalabras(respuesta)
        }
      }
    )() 

  }, [])

  useEffect(() => {
    (
      async () => {
        const respuesta: CompleteRankingProps | null = await getRankingByCategory( EnumCategory.NUMEROS )
        if (respuesta?.NUMEROS)
          setRankNumeros(respuesta)
      }
    )() 

  }, [])

  useEffect(() => {
    console.log('Este es el valor: '+palabras)
  }, [palabras])

  useEffect(() => {
    console.log(rankPalabras?.PALABRAS );
  }, [rankPalabras])

  if( !rankPalabras?.PALABRAS || !rankNumeros?.NUMEROS ){
    return <>NO SE ENCEUNTRAN CARGADOS LOS DATOS</>
  }

  return <div className="w-2/5 flex justify-center flex-wrap tems-center space-x-4">
    <div className="w-full">
      <NavRanking value={palabras} setValue={setPalabras} key='PALABRAS'/>
      <TabPanel value={palabras} index={EnumDifficulty.FACIL} key={1}>
        {
          rankPalabras.PALABRAS && <ListRankings ranks={rankPalabras.PALABRAS.FACIL} />
        }
      </TabPanel>
      <TabPanel value={palabras} index={EnumDifficulty.MEDIO} key={2}>
        {
          rankPalabras.PALABRAS && <ListRankings ranks={rankPalabras.PALABRAS.MEDIO} />
        }
      </TabPanel>
      <TabPanel value={palabras} index={EnumDifficulty.DIFICIL} key={3}>
        {
          rankPalabras.PALABRAS && <ListRankings ranks={rankPalabras.PALABRAS.DIFICIL} />
        }
      </TabPanel>
    </div>

    <div className="w-full">
      <NavRanking value={numeros} setValue={setNumeros} key='NUMEROS'/>
      <TabPanel value={numeros} index={EnumDifficulty.FACIL} key={4}>
        {
          rankPalabras.NUMEROS && <ListRankings ranks={rankNumeros.NUMEROS.FACIL} />
        }
      </TabPanel>
      <TabPanel value={numeros} index={EnumDifficulty.MEDIO} key={5}>
        {
          rankPalabras.NUMEROS && <ListRankings ranks={rankNumeros.NUMEROS.MEDIO} />
        }
      </TabPanel>
      <TabPanel value={numeros} index={EnumDifficulty.DIFICIL} key={6}>
        {
          rankPalabras.NUMEROS && <ListRankings ranks={rankNumeros.NUMEROS.DIFICIL} />
        }
      </TabPanel>
    </div>
    
  </div>
}

export const ListRankings = ( {ranks}: {ranks: DetailsRankingApi[]}) => {

  if( ranks.length == 0 ){
    return (
      <>
      <List dense={true}>
        <Alert variant="outlined" severity="info">
          Animate a intentarlo, puedes estar de primero en el TOP
      </Alert>
      </List>
    </>
    )
  }


  return (
    <>
      <List dense={true}>
        {
          ranks.map((rank, index) => (
            <ListItem
            key={index}
            secondaryAction={
              <IconButton edge="end" aria-label="puntaje">
                { rank.puntos } EXP
              </IconButton>
            }
            >
            <ListItemAvatar sx={{ fontSize: 30 }}>
              { (index == 0) && <TobOne /> }
              { (index == 1) && <TopTwo /> }
              { (index == 2) && <TopThree /> }
              { (index > 2 ) && index + 1}
            </ListItemAvatar>
            <ListItemText
              sx={{
                fontSize: 20
              }}
              primary={
                <>
                 <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body1"
                    fontSize={30}
                    color="text.primary"
                  >
                    {rank.username}
                  </Typography>
                </>
              }
              secondary={
                <>
                  <Typography
                    sx={{ display: 'inline' }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    Retos: { rank.progreso }
                  </Typography>
                </>
              }
            />
          </ListItem>
          ))
        }
      
      </List>
    </>
  )
}

const TobOne = () => {
  return <> 🥇 </>
}

const TopTwo = () => {
  return <> 🥈 </>
}

const TopThree = () => {
  return <> 🥉 </>
}