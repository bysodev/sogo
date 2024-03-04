import NavRanking from "@/components/cards/NavRanking";
import { EnumCategory, EnumDifficulty } from "@/lib/types/challenge";
import { DetailsRankingApi } from "@/lib/types/rankings";
import { useAvatar } from "@/utilities/useAvatars";
import { Alert, Avatar, Box, Card, CircularProgress, List, ListItemAvatar, ListItemText, ListItem as MuiListItem, Tooltip, Typography } from "@mui/material";
import { styled } from '@mui/material/styles';
import Image from "next/image";
import { useState } from "react";
import { FaCrown, FaQuestionCircle } from "react-icons/fa";
import useSWR from "swr";

interface TabPanelProps {
  children?: React.ReactNode;
  dir?: string;
  index: string;
  value: EnumDifficulty;
}

const ListItemTop3 = styled(MuiListItem)({
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
        <Box>
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

  return (
    <section className="relative dark:bg-gray-900 lg:w-[30rem] h-full duration-300 pt-5 lg:pt-0">
      <div className="mb-32 lg:mb-0 lg:fixed overflow-y-auto h-full lg:border-l-4 ">
        <div className="h-auto text-center text-gray-900 dark:text-gray-100 lg:py-4 px-4 pt-10 lg:p-4 grid gap-4 border-t-4 lg:border-t-0 ">
          <h1 className="lg:rounded-xl border-2 p-1 font-bold text-xl text-center text-gray-500">Tabla de clasificación</h1>
          <p className="text-gray-500 text-xs text-balance">Top 5 de los personas con el puntaje más alto alcanzado entre las lecciones y retos</p>
          <div className="border-2 p-4 rounded-lg">
            <h2 className="text-sm text-start text-gray-600 font-semibold">Categoría: <span className="font-normal">Palabras</span></h2>
            <NavRanking value={palabras} setValue={setPalabras} key='PALABRAS' />
            {errorPalabras || errorNumeros ? (
              <p>Error al cargar los datos</p>
            ) : !rankPalabras || !rankNumeros ? (
              <CircularProgress />
            ) : (
              Object.values(EnumDifficulty).map((difficulty, index) => (
                <TabPanel value={palabras} index={difficulty} key={index}>
                  {rankPalabras.PALABRAS && <ListRankings ranks={rankPalabras.PALABRAS[difficulty]} />}
                </TabPanel>
              ))
            )}
          </div>
          <div className="border-2 p-4 rounded-lg">
            <h2 className="text-sm text-start text-gray-600 font-semibold">Categoría: <span className="font-normal">Números</span></h2>
            <NavRanking value={numeros} setValue={setNumeros} key='NUMEROS' />
            {errorPalabras || errorNumeros ? (
              <p>Error al cargar los datos</p>
            ) : !rankPalabras || !rankNumeros ? (
              <CircularProgress />
            ) : (
              Object.values(EnumDifficulty).map((difficulty, index) => (
                <TabPanel value={numeros} index={difficulty} key={index}>
                  {rankNumeros.NUMEROS && <ListRankings ranks={rankNumeros.NUMEROS[difficulty]} />}
                </TabPanel>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

const rankColors: { [key: number]: string } = {
  1: 'bg-yellow-300 border-yellow-400 text-yellow-600', // oro
  2: 'bg-gray-300 border-gray-400 text-gray-600', // plata
  3: 'bg-orange-300 border-orange-400 text-orange-600', // bronce
};


export const RankItem = ({ rank, rankNumber }: { rank: DetailsRankingApi, rankNumber: number }) => {
  const { avatar, avatarError, isLoading } = useAvatar(rank.image);
  if (avatarError) {
    return <p>Error al cargar el avatar</p>
  }

  const ListItem = rankNumber <= 3 ? ListItemTop3 : ListItem4And5;

  const marginTopClass = rankNumber === 1 ? '' : rankNumber === 2 ? 'mt-6' : 'mt-10';

  return (
    <ListItem className='text-base mt-5'>
      {rankNumber <= 3 ? (
        <>
          <ListItemAvatar className="relative">
            {isLoading ? (
              <CircularProgress />
            ) : (
              <Image className={`rounded-full border-[4px] ${rankColors[rankNumber]} w-auto ${rankNumber === 1 ? "h-24" : "h-[5.5rem]"} ${marginTopClass}`} src={avatar || ''} height={100} width={100} alt={`Imagen del usuario ${rank.username}`} />
            )}
            {rankNumber === 1 && <FaCrown size={75} className={`absolute -top-11 rotate-[35deg] -right-7 text-4xl text-yellow-300`} />}
            <span className={`absolute grid place-content-center bottom-0 leading-none rounded-full border-[4px] h-8 w-8 text-center text-base font-bold ${rankColors[rankNumber]}`}>{rankNumber}</span>
          </ListItemAvatar>
          <ListItemText
            className={rankColors[rankNumber] + " w-full py-4 rounded-t-lg"}
            primary={
              <Typography component="p" variant="body1" fontSize={14} fontWeight={600} color="text.primary" textAlign={"center"} style={{
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}>
                {rank.username}
              </Typography>
            }
            secondary={
              <Typography fontSize={10} fontWeight={600} textAlign={"center"} className={"rounded-lg bg-purple-100 border-2 border-purple-500 text-purple-600 w-min !mx-auto whitespace-nowrap p-1 px-4 flex gap-2 flex-nowrap items-center"}>
                {rank.puntos} pts <Tooltip title={`Lecciones: ${rank.lecciones} | Retos: ${rank.retos}`} placement="top" arrow>
                  <div>
                    <FaQuestionCircle />
                  </div>
                </Tooltip>
              </Typography>
            }
          />
        </>
      ) : (
        <>
          <Card variant="outlined" sx={{ width: '100%', display: 'flex', padding: '0.5rem 0rem 0.5rem 0rem', border: '2px solid #E5E7EB' }}>
            <ListItemAvatar className="flex justify-center items-center relative">
              <span className={`grid place-content-center leading-none h-8 w-8 text-center text-base font-bold ${rankColors[rankNumber]}`}>{rankNumber}</span>
              {isLoading ? (
                <CircularProgress />
              ) : (
                <Image className="rounded-full border-2 border-gray-400 w-auto" src={avatar || ''} height={20} width={20} alt={`Imagen del usuario ${rank.username}`} />
              )}
            </ListItemAvatar>
            <ListItemText
              className="justify-between items-center px-4"
              sx={{ fontSize: 20, display: 'inline-flex', justifyContent: 'around' }}
              primary={
                <Typography component="p" variant="body1" fontSize={14} fontWeight={600} color="text.primary" textAlign={"center"}>
                  {rank.username}
                </Typography>
              }
              secondary={
                <Typography fontSize={14} fontWeight={600} color="text.secondary" textAlign={"center"}>
                  {rank.puntos} pts
                </Typography>
              }
            />
          </Card>
        </>
      )}
    </ListItem>
  )
}

export const ListRankings = ({ ranks }: { ranks: DetailsRankingApi[] }) => {
  if (ranks.length === 0) {
    return (
      <List dense={true}>
        <Alert variant="outlined" severity="info">
          Animate a intentarlo. Puedes estar de primero en el TOP
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

  return (
    <List dense={true}>
      <div className="grid grid-cols-3">
        {topThree.map(({ rank, rankNumber }, index) => {
          const marginTopClass = rankNumber === 1 ? '' : rankNumber === 2 ? 'mt-8' : 'mt-10';
          if (rank) {
            vacancyCounter++;
            return (
              <RankItem key={index} rank={rank} rankNumber={rankNumber} />
            );
          } else {
            vacancyCounter++;
            const ListItem = ListItemTop3;
            return (
              <ListItem key={index} className={"text-base mt-4"}>
                <ListItemAvatar className="relative">
                  <Avatar
                    className={`${rankColors[rankNumber]} rounded-full border-[4px] ${marginTopClass}`}
                    src={''}
                    alt={'Imagen por defecto'}
                    sx={{ width: 90, height: 90 }}
                  />
                  <span className={`${rankColors[rankNumber]} absolute grid place-content-center bottom-0 leading-none rounded-full border-[4px] h-8 w-8 text-center text-base font-bold`}>{rankNumber}</span>
                </ListItemAvatar>
                <ListItemText
                  className={rankColors[rankNumber] + " w-full py-4 rounded-t-lg"}
                  sx={{ fontSize: 20 }}
                  primary={
                    <Typography component="p" variant="body1" fontSize={14} fontWeight={600} color="text.primary" textAlign={"center"}>
                      Vacante
                    </Typography>
                  }
                  secondary={
                    <Typography fontSize={10} fontWeight={600} textAlign={"center"} className={"rounded-lg bg-purple-100 border-2 border-purple-500 text-purple-600 w-min !mx-auto whitespace-nowrap p-1 px-4 flex gap-2 flex-nowrap items-center"}>
                      ? pts
                    </Typography>
                  }
                />
              </ListItem>
            );
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
              <span className={`grid place-content-center leading-none h-8 w-8 text-center text-base font-bold`}>{vacancyCounter++}</span>
              <Avatar />
            </ListItemAvatar>
            <ListItemText
              className="justify-between items-center px-4"
              sx={{ fontSize: 20, display: 'inline-flex', justifyContent: 'around' }}
              primary={
                <Typography component="p" variant="body1" fontSize={14} fontWeight={600} color="text.primary" textAlign={"center"}>
                  Vacante
                </Typography>
              }
              secondary={
                <Typography fontSize={14} fontWeight={600} color="text.secondary" textAlign={"center"}>
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