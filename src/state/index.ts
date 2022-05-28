import { Action, action, createStore, persist } from 'easy-peasy'
import storageEngine from '@/state/storageEngine'

export interface Store {
  outputs: OutputsStore
  microphone: string
  fileDirectory: string
  soundTrackVolume: number
  soundTracksSettings: soundTrackSettings[]
  keybinds: Keybind[]
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
  setFileDirectory: Action<Store, string>
  setMicrophone: Action<Store, string>
  setSoundTrackVolume: Action<Store, number>
  setSoundTrackSettings: Action<Store, soundTrackSettings>
  setKeybind: Action<Store, Keybind>
}

export interface soundTrackSettings {
  path: string
  keybinds: string[]
}

export interface OutputsStore {
  primary: string
  secondary: string
}

export interface Keybind {
    name: string,
    keybinds: string[]
}

export const store = createStore<Store>(
  persist({
    outputs: {
      primary: '',
      secondary: '',
    },
    microphone: '',
    soundTrackVolume: 1,
    fileDirectory: '',
    soundTracksSettings: [],
    keybinds: [],
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
    setSoundTrackSettings: action((state, payload: soundTrackSettings) => {
      // check if soundtrack path is in state
      const index = state.soundTracksSettings.findIndex(
        (soundTrack) => soundTrack.path === payload.path
      )

      if (index === -1) {
        state.soundTracksSettings.push(payload)
      } else {
        state.soundTracksSettings[index] = payload
      }
    }),
    setKeybind: action((state, payload: Keybind) => {
      const index = state.keybinds.findIndex(
        (keybind) => keybind.name === payload.name
      )

      if (index === -1) {
        state.keybinds.push(payload)
      } else {
        state.keybinds[index] = payload
      }
    }),
  }, {
    storage: storageEngine
  })
)
