import { User } from '@/types/user/user';
import { create } from 'zustand';

type State = {
  userInfo: User | null;
  userToken: string;
}

type Actions = {
  setUserInfo: (userInfo: User) => void;
}

export const userStore = create<State & Actions>((set) => ({
  userInfo: null,
  userToken: '',
  setUserInfo: (userInfo) => {
    set({ userInfo });
  },
}));
