import { useCallback, useRef, useState } from 'react'
import { ipcRenderer } from 'electron'
import { AudioCardProps } from '@/components/AudioCard'

export interface useKeyboardRecorderProps {
  identifier: string
  keybinds: string[]
  dispatchKeybinds: (keybinds: string[]) => any
}

export const useKeybindRecorder = (props: useKeyboardRecorderProps) => {
  const [showPopover, setShowPopover] = useState<boolean>(false)


  const [isRecordingKeybind, setIsRecordingKeybind] = useState<boolean>(false)
  const [_recordedHotkeys, _setRecordedHotkeys] = useState<string[]>([])
  const recordedHotkeys = useRef(_recordedHotkeys)
  const setRecordedHotkeys = (data: string[]) => {
    recordedHotkeys.current = data
    _setRecordedHotkeys(data)
  }

  const logEvent = useCallback((e: globalThis.KeyboardEvent) => {
    let currentKeys = [...recordedHotkeys.current]

    // check if e.key exists in currentKeys
    let index = currentKeys.findIndex((key) => key === e.key)
    if (index === -1) {
      setRecordedHotkeys([...recordedHotkeys.current, e.key])
    }
  }, [])

  const recordKeybind = (stop?: boolean) => {
    if (stop) {
      console.log(
        'Stopped recording hotkey because mouse left popover',
        "Keybinding also didn't register"
      )
      setIsRecordingKeybind(false)
      setRecordedHotkeys([]) // reset mappings
      document.removeEventListener('keydown', logEvent)

      return
    }

    if (!isRecordingKeybind) {
      setRecordedHotkeys([]) // reset mappings
      setIsRecordingKeybind(true)
      document.addEventListener('keydown', logEvent)
    } else if (isRecordingKeybind) {
      setIsRecordingKeybind(false)
      props.dispatchKeybinds(_recordedHotkeys)

      console.log('User clicked stop recording:', 'Registered keybind!', {
        path: props.identifier,
        keybinds: _recordedHotkeys,
      })
      document.removeEventListener('keydown', logEvent)
    }
  }

  return { setShowPopover, showPopover, options: {
    showPopover,
    setShowPopover,
    isRecordingKeybind,
    setIsRecordingKeybind,
    recordKeybind,
    recordedHotkeys: recordedHotkeys.current,
    keybinds: props.keybinds,
    layoutId: props.identifier,
  } }
}
