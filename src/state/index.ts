import { Action, action, createStore, persist } from 'easy-peasy'
import storageEngine from '@/state/storageEngine'

export interface Store {
  outputs: OutputsStore
  microphone: string
  fileDirectory: string
  soundTrackVolume: number
  soundTracksSettings: soundTrackSetting[]
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
  setFileDirectory: Action<Store, string>
  setMicrophone: Action<Store, string>
  setSoundTrackVolume: Action<Store, number>
  setSoundTrackSetting: Action<Store, soundTrackSetting>
}

export interface soundTrackSetting {
  path: string
  keybind?: string
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
    soundTrackVolume: 1,
    fileDirectory: '',
    soundTracksSettings: [],
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
    setSoundTrackVolume: action((state, payload: number) => {
      state.soundTrackVolume = payload
    }),
    setSoundTrackSetting: action((state, payload: soundTrackSetting) => {
      // check if soundtrack path is in state

    })
  }, {
    storage: storageEngine
  })
)
