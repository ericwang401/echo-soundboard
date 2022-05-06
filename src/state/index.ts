import { Action, action, createStore, persist } from 'easy-peasy'
import storageEngine from '@/state/storageEngine'

export interface Store {
  outputs: OutputsStore
  microphone: string
  fileDirectory: string
  soundTrackVolume: number
  soundTracksSettings: soundTrackSettings[]
  setPrimary: Action<Store, string>
  setSecondary: Action<Store, string>
  setFileDirectory: Action<Store, string>
  setMicrophone: Action<Store, string>
  setSoundTrackVolume: Action<Store, number>
  setSoundTrackSettings: Action<Store, soundTrackSettings>
}

export interface soundTrackSettings {
  path: string
  keybinds: string[]
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
    })
  }, {
    storage: storageEngine
  })
)
