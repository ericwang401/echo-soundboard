import { Action, action, createStore } from 'easy-peasy'

export interface Store {
  outputs: OutputsStore;
  microphone: string;
  fileDirectory: string;
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
  setFileDirectory: Action<Store, string>
  setMicrophone: Action<Store, string>
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
  microphone: '',
  fileDirectory: '',
  setPrimary: action((state, payload: string) => {
    state.outputs.primary = payload
  }),
  setSecondary: action((state, payload: string) => {
    state.outputs.secondary = payload
  }),
  setFileDirectory: action((state, payload: string) => {
    state.fileDirectory = payload
  }),
  setMicrophone: action((state, payload: string) => {
    state.microphone = payload
  })
})