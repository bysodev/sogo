import { SlideProps } from "@mui/material";

export interface WebVideoElementWithScreenshot extends HTMLVideoElement {
    getScreenshot(): Promise<string>;
}
  
export type Times = {
    inicio: Date ,
    final: Date
}

export   type Progress = {
    preguntas: number,
    porcentaje: number,
    asiertos: number,
    tipo: string,
    continue: boolean,
    vocal: string,
};

export type TransitionProps = Omit<SlideProps, 'direction'>;
