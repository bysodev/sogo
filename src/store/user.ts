/* eslint-disable no-unused-vars */
import { ChallengeCategoryByUser } from '@/lib/types/challenge';
import { typeUser } from '@/lib/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State { 
  user: typeUser; 
  challenge: ChallengeCategoryByUser;
  assignChallenge: (props: ChallengeCategoryByUser) => void; 
  fetchRegisterUser: () => void; 
} 

// persist(
export const zustandStore = create<State>()( 
  persist(
    (set) => ({
      user: {
        username: '',
        email: '',
        token: '',
      },
      challenge: {
        id: 0,
        number: 0,
        name: '',
        category_id: 0,
        difficulty_id: 0,
        description: '',
        points: 0,
        minutes_max: 0,
        seconds_max: 0,
        fails_max: 0,
        random: false,
        operation: false,
        spelled: false,
        supplement: false,
        state: false,
        time_creation: '',
        time_update: '',
        end_points: 0,
        difficulty_name: '',
        category_name: '',
        reach_state: 0,
        minutes: 0,
        content: [''],
      },
      assignChallenge: ( props: ChallengeCategoryByUser ) => set(() => ({challenge: props})),
      fetchRegisterUser: async () => {
  
      },

    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
); 