import { EnumCategory, EnumDifficulty } from "./challenge"

export interface DetailsRankingApi{
    "dificultad": EnumDifficulty,
    "username": string,
    "progreso": number,
    "puntos": number,
    "ranking": number
}

export type ListRankingProps = {
    [key in EnumDifficulty]: DetailsRankingApi[];
}

export type CompleteRankingProps = {
    [key in EnumCategory]: ListRankingProps;
}