import NavRanking from "@/components/cards/NavRanking";
import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { DetailsRankingApi } from "@/lib/types/rankings";
import { useAvatar } from "@/utilities/useAvatars";
import { Alert, Avatar, Box, Card, CircularProgress, List, ListItemAvatar, ListItemText, ListItem as MuiListItem, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import { useState } from "react";
import { FaCrown } from "react-icons/fa";
import useSWR from "swr";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: EnumDifficulty;
}

const ListItemTop3 = styled(MuiListItem)({
  // reemplaza esto con tus propios estilos para el top 3
  display: 'flex',
  flexDirection: "column",
  padding: '0',
  justifyItems: 'center',
});

const ListItem4And5 = styled(MuiListItem)({
  // reemplaza esto con tus propios estilos para los rangos 4 y 5
  height: 'auto',
  paddingLeft: '0',
  paddingRight: '0',
});

const fetcher = (url: string) => fetch(url).then(res => res.json());

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div {...other}>
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

  const { data: rankPalabras, error: errorPalabras } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/ranking?category=${EnumCategory.PALABRAS}`, fetcher);
  const { data: rankNumeros, error: errorNumeros } = useSWR(`${process.env.NEXT_PUBLIC_ROUTE_APP}/api/auth/ranking?category=${EnumCategory.NUMEROS}`, fetcher);

  if (errorPalabras || errorNumeros) {
    return <>Error loading data</>;
  }

  if (!rankPalabras || !rankNumeros) {
    return <>Loading...</>;
  }

  return (
    <section className="relative dark:bg-gray-900 h-full duration-300 border-l-4">
      <div className="fixed overflow-y-auto h-screen text-center text-gray-900 dark:text-gray-100 py-10 px-6 grid gap-4">
        <h1 className="text-3xl font-bold">Tabla de clasificación</h1>
        <p className="text-gray-500">Top 5 de los personas con el puntaje más alto alcanzado entre las lecciones y retos.</p>
        <div className="border-2 p-4 rounded-lg">
          <h2 className="text-xl text-start text-gray-600 font-semibold">Categoría: <span className="font-normal">Palabras</span></h2>
          <NavRanking value={palabras} setValue={setPalabras} key='PALABRAS' />
          {Object.values(EnumDifficulty).map((difficulty, index) => (
            <TabPanel value={palabras} index={difficulty} key={index}>
              {rankPalabras.PALABRAS && <ListRankings ranks={rankPalabras.PALABRAS[difficulty]} />}
            </TabPanel>
          ))}
        </div>

        <div className="border-2 p-4 rounded-lg">
          <h2 className="text-xl text-start text-gray-600 font-semibold">Categoría: <span className="font-normal">Números</span></h2>
          <NavRanking value={numeros} setValue={setNumeros} key='NUMEROS' />
          {Object.values(EnumDifficulty).map((difficulty, index) => (
            <TabPanel value={numeros} index={difficulty} key={index}>
              {rankNumeros.NUMEROS && <ListRankings ranks={rankNumeros.NUMEROS[difficulty]} />}
            </TabPanel>
          ))}
        </div>
      </div>
    </section>
  )
}

export const RankItem = ({ rank, rankNumber }: { rank: DetailsRankingApi, rankNumber: number }) => {
  const { avatar, avatarError, isLoading } = useAvatar(rank.image);
  if (avatarError) {
    return <p>Error al cargar el avatar</p>
  }

  const ListItem = rankNumber <= 3 ? ListItemTop3 : ListItem4And5;

  const rankColors: { [key: number]: string } = {
    1: 'bg-yellow-200 border-yellow-300 text-yellow-500',
    2: 'bg-slate-200 border-slate-300 text-slate-500',
    3: 'bg-purple-200 border-purple-300 text-purple-500',
  };

  return (
    <ListItem className='text-base'>
      {rankNumber <= 3 ? (
        <>
          <ListItemAvatar className="relative">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Image className={`rounded-full border-[6px] ${rankColors[rankNumber]} w-auto ${rankNumber === 1 ? "h-28" : "h-20"}`} src={avatar || ''} height={100} width={100} alt={`Imagen del usuario ${rank.username}`} />
            )}
            {rankNumber === 1 && <FaCrown size={75} className={`absolute -top-11 rotate-[35deg] -right-6 text-4xl text-yellow-300`} />}
            <span className={`absolute grid place-content-center bottom-0 leading-none rounded-full border-[6px] h-10 w-10 text-center text-xl font-semibold ${rankColors[rankNumber]}`}>{rankNumber}</span>
          </ListItemAvatar>
          <ListItemText
            sx={{ fontSize: 20 }}
            primary={
              <Typography component="p" variant="body1" fontSize={20} fontWeight={600} color="text.primary" textAlign={"center"}>
                {rank.username}
              </Typography>
            }
            secondary={
              <Typography fontSize={15} fontWeight={600} color="text.secondary" textAlign={"center"}>
                {rank.puntos} pts
              </Typography>
            }
          />
        </>
      ) : (
        <>
          <Card variant="outlined" sx={{ width: '100%', display: 'flex', padding: '0.5rem 0rem 0.5rem 0rem', border: '2px solid #E5E7EB' }}>
            <ListItemAvatar className="flex justify-center items-center relative">
              <span className={`grid place-content-center leading-none h-10 w-10 text-center text-xl font-semibold ${rankColors[rankNumber]}`}>{rankNumber}</span>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Image className="rounded-full border-2 border-gray-400 w-auto" src={avatar || ''} height={30} width={30} alt={`Imagen del usuario ${rank.username}`} />
              )}
            </ListItemAvatar>
            <ListItemText
              className="justify-between items-center px-4"
              sx={{ fontSize: 20, display: 'inline-flex', justifyContent: 'around' }}
              primary={
                <Typography component="p" variant="body1" fontSize={20} fontWeight={600} color="text.primary" textAlign={"center"}>
                  {rank.username}
                </Typography>
              }
              secondary={
                <Typography fontSize={20} fontWeight={600} color="text.secondary" textAlign={"center"}>
                  {rank.puntos} pts
                </Typography>
              }
            />
          </Card>
        </>
      )}
      {/* <ListItemText
        sx={{ fontSize: 20 }}
        primary={
          <Typography component="p" variant="body1" fontSize={25} fontWeight={600} color="text.primary" textAlign={"center"}>
            {rank.username}
          </Typography>
        }
        secondary={`Retos: ${rank.retos} | ${rank.puntos} EXP`}
      /> */}
    </ListItem>
  )
}

export const ListRankings = ({ ranks }: { ranks: DetailsRankingApi[] }) => {
  if (ranks.length === 0) {
    return (
      <List dense={true}>
        <Alert variant="outlined" severity="info">
          Animate a intentarlo, puedes estar de primero en el TOP
        </Alert>
      </List>
    )
  }

  const topThree = [
    { rank: ranks[1] || null, rankNumber: 2 },
    { rank: ranks[0] || null, rankNumber: 1 },
    { rank: ranks[2] || null, rankNumber: 3 },
  ];
  const remainingRanks = ranks.slice(3);
  let vacancyCounter = 1;



  const rankColors: { [key: number]: string } = {
    1: 'bg-yellow-200 border-yellow-300 text-yellow-500',
    2: 'bg-slate-200 border-slate-300 text-slate-500',
    3: 'bg-purple-200 border-purple-300 text-purple-500',
  };


  return (
    <List dense={true}>
      <div className="grid grid-cols-3">
        {topThree.map(({ rank, rankNumber }, index) => {
          if (rank) {
            vacancyCounter++;
            return <RankItem key={index} rank={rank} rankNumber={rankNumber} />
          } else {
            const ListItem = ListItemTop3;
            return (
              <ListItem key={index} className='text-base'>
                <ListItemAvatar className="relative">
                  <Avatar
                    className={`${rankColors[rankNumber]} rounded-full border-[6px]`}
                    src={''}
                    alt={'Imagen por defecto'}
                    sx={{ width: 100, height: 100 }}
                  />
                  <span className={`${rankColors[rankNumber]} absolute grid place-content-center bottom-0 leading-none rounded-full border-[6px] h-10 w-10 text-center text-xl font-semibold`}>{vacancyCounter++}</span>
                </ListItemAvatar>
                <ListItemText
                  sx={{ fontSize: 20 }}
                  primary={
                    <Typography component="p" variant="body1" fontSize={20} fontWeight={600} color="text.primary" textAlign={"center"}>
                      Vacante
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={15} fontWeight={600} color="text.secondary" textAlign={"center"}>
                      ? pts
                    </Typography>
                  }
                />
              </ListItem>
            )
          }
        })}
      </div>
      {remainingRanks.slice(0, 2).map((rank, index) => (
        <RankItem key={index} rank={rank} rankNumber={vacancyCounter++} />
      ))}
      {Array(Math.max(0, 5 - vacancyCounter + 1)).fill(0).map((_, index) => (
        <ListItem4And5 key={ranks.length + index}>
          <Card variant="outlined" sx={{ width: '100%', display: 'flex', padding: '0.5rem 0rem 0.5rem 0rem', border: '2px solid #E5E7EB' }}>
            <ListItemAvatar className="flex justify-center items-center relative">
              <span className={`grid place-content-center leading-none h-10 w-10 text-center text-xl font-semibold`}>{vacancyCounter++}</span>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              className="justify-between items-center px-4"
              sx={{ fontSize: 20, display: 'inline-flex', justifyContent: 'around' }}
              primary={
                <Typography component="p" variant="body1" fontSize={20} fontWeight={600} color="text.primary" textAlign={"center"}>
                  Vacante
                </Typography>
              }
              secondary={
                <Typography fontSize={20} fontWeight={600} color="text.secondary" textAlign={"center"}>
                  ? pts
                </Typography>
              }
            />
          </Card>
        </ListItem4And5>
      ))}
    </List>
  )
}