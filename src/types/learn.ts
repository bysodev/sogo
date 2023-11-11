export const category = {
    numeros: 'numeros',
    vocales: 'vocales',
    abecedario: 'abecedario',
    null: ''
}

export interface typeLearn {
  categoria: string;
  cantidad: number;
  porcentaje: number;
  asiertos: number;
  continue: boolean;
}