import { SlideProps } from '@mui/material';

export interface WebVideoElementWithScreenshot extends HTMLVideoElement {
  getScreenshot(): Promise<string>;
}

export type Times = {
  inicio: Date;
  final: Date;
};


export   type Progress = {
    preguntas: number,
    porcentaje: number,
    asiertos: number,
    tipo: string,
    continue: boolean,
    vocal: string,
};

export type Lesson = {
  number: number;
  name: string;
  category_id: number;
  description: string;
  content: Array<string>;
  points: number;
  state_id: number;
  random: boolean;
  max_time: number;
};

export const Fetcher = (url: any) => fetch(url).then((res) => res.json());

export type TransitionProps = Omit<SlideProps, 'direction'>;
