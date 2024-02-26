/* eslint-disable */

export interface ChallengeCategoryByUser {
  id: number;
  number: number;
  name: string;
  category_id: number;
  difficulty_id: number;
  description: string;
  points: number;
  minutes_max: number;
  seconds_max: number;
  fails_max: number;
  random: boolean;
  operation: boolean;
  spelled: boolean;
  supplement: boolean;
  state: boolean;
  time_creation: string;
  time_update: string;
  end_points: number;
  difficulty_name: string;
  category_name: string;
  reach_state: number;
  minutes: number;
  content: Array<string>;
}

export enum EnumCategory {
  NUMEROS = 'NUMEROS',
  PALABRAS = 'PALABRAS',
}

export enum EnumDifficulty {
  FACIL = 'FACIL',
  MEDIO = 'MEDIO',
  DIFICIL = 'DIFICIL',
}

export interface DetailsChallengeApi {
  dificultad: EnumDifficulty;
  total: number;
  progreso: number;
  puntos: number;
}

export interface CardChallengesCategoryProps {
  [EnumCategory.NUMEROS]: Array<DetailsChallengeApi>;
  [EnumCategory.PALABRAS]: Array<DetailsChallengeApi>;
}

export interface ContentChallenge {
  id: number;
  number: number;
  name: string;
  category_id: number;
  difficulty_id: number;
  description: string;
  points: number;
  minutes_max: number;
  seconds_max: number;
  fails_max: number;
  random: boolean;
  operation: boolean;
  spelled: boolean;
  supplement: boolean;
  state: boolean;
  time_creation: string;
  time_update: string;
  end_points: number;
  difficulty_name: string;
  category_name: string;
  reach_state: number;
  minutes: number;
  content: Array<string>;
}

export enum ErrorOrigen {
  SERVER = 'SERVER',
  CLIENTE = 'CLIENTE',
}
export type ErrorChallenge = {
  status: number;
  mensaje: string;
  origen: ErrorOrigen;
};

export type Progress = {
  preguntas: number;
  etapa: number;
  porcentaje: number;
  asiertos: number;
  tipo: string;
  continue: boolean;
  char: string;
};

export const fetcher = async (url: string) => {
  const res = await fetch(url);

  // If the status code is not in the range 200-299,
  // we still try to parse and throw it.
  if (!res.ok) {
    const error = new Error('An error occurred while fetching the data.');
    // Attach extra info to the error object.
    error.message = 'An error occurred while fetching thefdfdsfsdfdsfsdf data.';
    throw error;
  }

  return res.json();
};
