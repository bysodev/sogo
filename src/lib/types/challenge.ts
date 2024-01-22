export interface ChallengeCategoryByUser{
    id: number
    number: number
    name: string
    category_id: number
    difficulty_id: number
    description: string
    points: number
    minutes_max: number
    seconds_max: number
    fails_max: number
    random: boolean
    operation: boolean
    spelled: boolean
    supplement: boolean
    state: boolean
    time_creation: string
    time_update: string
    end_points: number
    difficulty_name: string
    category_name: string
    reach_state: number
    minutes: number
    content: Array<string>
}

export enum EnumCategory {
    PALABRAS = 'PALABRAS',
    NUMEROS = 'NUMEROS'
}

export enum EnumDifficulty {
    FACIL = 'FACIL',
    MEDIO = 'MEDIO',
    DIFICIL = 'DIFICIL'
}

export interface detailsChallengeApi{
    "dificultad": EnumDifficulty,
    "total": number,
    "progreso": number,
    "puntos": number
}

export interface CardChallengesCategoryProps {
    [EnumCategory.PALABRAS]: Array<detailsChallengeApi>,
    [EnumCategory.NUMEROS]: Array<detailsChallengeApi>
}