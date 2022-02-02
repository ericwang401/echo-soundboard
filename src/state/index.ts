import { Action, action, createStore } from 'easy-peasy'

export interface Store {
  outputs: OutputsStore;
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
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
  setPrimary: action((state, payload: string) => {
    state.outputs.primary = payload
  }),
  setSecondary: action((state, payload: string) => {
    state.outputs.secondary = payload
  })
})
