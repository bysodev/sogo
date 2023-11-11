export enum Category{
    numeros = 'numeros',
    vocales = 'vocales',
    abecedario = 'abecedario',
    null = ''
}

export const category = {
    numeros: 'numeros',
    vocales: 'vocales',
    abecedario: 'abecedario',
    null: ''
}

export interface typeLearn {
  categoria: Category;
  cantidad: number;
  porcentaje: number;
  asiertos: number;
  continue: boolean;
}