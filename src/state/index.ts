import { Action, action, createStore, persist } from 'easy-peasy'
import storageEngine from '@/state/storageEngine'

export interface Store {
  outputs: OutputsStore
  microphone: string
  fileDirectory: string
  volumeModifier: number
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
  setFileDirectory: Action<Store, string>
  setMicrophone: Action<Store, string>
  setVolumeModifier: Action<Store, number>
}

export interface OutputsStore {
  primary: string
  secondary: string
}

export const store = createStore<Store>(
  persist({
    outputs: {
      primary: 'test',
      secondary: '',
    },
    microphone: '',
    volumeModifier: 0,
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
    }),
    setVolumeModifier: action((state, payload: number) => {
      state.volumeModifier = payload
    }),
  }, {
    storage: storageEngine
  })
)
