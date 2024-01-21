/* eslint-disable no-unused-vars */
import { typeUser } from '@/lib/types/user';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface State {
  user: typeUser;
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
      fetchRegisterUser: async () => {
  
      },

    }),
    {
      name: 'user',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
