import { useEffect, useRef } from 'react'
import { ipcRenderer } from 'electron'
import { Store } from '@/state'
import { createTypedHooks, useStoreRehydrated } from 'easy-peasy'

const { useStoreState } = createTypedHooks<Store>()

const useBindings = () => {
  const rehydrated = useStoreRehydrated()
  const keybindListener = useRef<any>()

  const keybinds = useStoreState((state) => state.keybinds)

  const triggerKeybind = (event: any, keybindName: string) => {
    if (keybindName === 'stop-all-sounds') {
      let muteEvent = new Event('muteAll', { bubbles: true })
      document.dispatchEvent(muteEvent)

      console.log('Dispatched: 🔇 Muted all sounds by keybind')
    }
  }

  useEffect(() => {
    if (rehydrated) {
      keybinds.map((keybind) => {
        ipcRenderer.send('set-keybind', keybind)
      })

      keybindListener.current = ipcRenderer.on(
        'trigger-keybind',
        triggerKeybind
      )
    }
  }, [rehydrated])
}

export default useBindings
