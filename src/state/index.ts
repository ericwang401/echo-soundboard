import { createStore } from 'easy-peasy'

export interface Store {
  outputs: OutputsStore;
}

export interface OutputsStore {
  primary: string;
  secondary: string;
}

export const store = createStore<Store>({
  outputs: {
    primary: 'test',
    secondary: '',
  },
})
