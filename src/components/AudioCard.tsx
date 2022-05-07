import Button from '@/components/Button'
import { soundTrackSettings, Store } from '@/state'
import { ipcRenderer } from 'electron'
import { ExtendedAudioElement } from '@/util/AudioDevices'
import {
  VolumeUpIcon,
  PlayIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/solid'
import { useStoreState, createTypedHooks } from 'easy-peasy'
import { useEffect, useCallback, useRef, useState, useMemo } from 'react'

const { useStoreActions } = createTypedHooks<Store>()

interface AudioCardProps {
  name: string
  path: string
}

const AudioCard = (props: AudioCardProps) => {
  const popoverContainer = useRef<HTMLDivElement>(null)
  const [primaryOutput, secondaryOutput] = useStoreState((state: Store) => [
    state.outputs.primary,
    state.outputs.secondary,
  ])

  const setSoundTrackSettings = useStoreActions(
    (actions) => actions.setSoundTrackSettings
  )
  const _soundTracksSettings = useStoreState(
    (state: Store) => state.soundTracksSettings
  )
  const fetchSoundTrackSettings = useMemo((): soundTrackSettings => {
    let index = _soundTracksSettings.findIndex(
      (soundTrack) => soundTrack.path === props.path
    )

    if (index !== -1) {
      return _soundTracksSettings[index]
    }

    return {
      path: props.path,
      keybinds: [],
    }
  }, [_soundTracksSettings, props.path])

  const [showPopover, setShowPopover] = useState<boolean>(false)

  const soundTrackVolume = useStoreState(
    (state: Store) => state.soundTrackVolume
  )

  const [isRecordingKeybind, setIsRecordingKeybind] = useState<boolean>(false)
  const [_recordedHotkeys, _setRecordedHotkeys] = useState<string[]>([])
  const recordedHotkeys = useRef(_recordedHotkeys)
  const setRecordedHotkeys = (data: string[]) => {
    recordedHotkeys.current = data
    _setRecordedHotkeys(data)
  }

  const play = async () => {
    let primary = new Audio() as ExtendedAudioElement
    let secondary = new Audio() as ExtendedAudioElement
    primary.volume = soundTrackVolume
    secondary.volume = soundTrackVolume
    primary.src = props.path
    secondary.src = props.path
    await primary.setSinkId(primaryOutput)
    await secondary.setSinkId(secondaryOutput)
    if (primaryOutput !== '') {
      primary.play()
    }

    if (secondaryOutput !== '') {
      secondary.play()
    }

    document.addEventListener('muteAll', () => {
      primary.src = ''
      secondary.src = ''
      primary.remove()
      secondary.remove()
      primary.pause()
      secondary.pause()
    })

    primary.addEventListener('ended', () => {
      primary.src = ''
      secondary.src = ''
      primary.remove()
    })
    secondary.addEventListener('ended', () => {
      primary.src = ''
      secondary.src = ''
      secondary.remove()
    })
  }

  const keybindListener = useRef<any>()
  const playSoundViaPath = (event: any, path: string) => {
    if (path === props.path) {
      play()
      console.log('Playing sound track from keybind via IPC', props.path)
    }
  }
  useEffect(() => {
    ipcRenderer.sendSync('set-keybind', {
      path: props.path,
      keybinds: fetchSoundTrackSettings.keybinds,
    })
    ipcRenderer.removeListener('play-soundtrack', playSoundViaPath)

    keybindListener.current = ipcRenderer.on(
      'play-soundtrack',
      playSoundViaPath
    )

    return () => {
      ipcRenderer.removeListener('play-soundtrack', playSoundViaPath)
    }
  }, [])

  useEffect(() => {
    ipcRenderer.removeListener('play-soundtrack', playSoundViaPath)

    keybindListener.current = ipcRenderer.on(
      'play-soundtrack',
      playSoundViaPath
    )
  }, [fetchSoundTrackSettings])

  /*
  // for debugging only
  useEffect(() => {
    console.log('changed!', { recordedHotkeys })
  }, [recordedHotkeys]) */

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
      ipcRenderer.sendSync('set-keybind', {
        path: props.path,
        keybinds: _recordedHotkeys,
      })
      setSoundTrackSettings({
        path: props.path,
        keybinds: _recordedHotkeys,
      })

      console.log('User clicked stop recording:', 'Registered keybind!', {
        path: props.path,
        keybinds: _recordedHotkeys,
      })
      document.removeEventListener('keydown', logEvent)
    }
  }

  return (
    <div className='relative'>
      <div className='relative flex items-center bg-black border-neutral-700 border rounded-md p-4'>
        <div className='grid z-10 place-items-center absolute w-full h-full -ml-4 transition-opacity opacity-0 hover:opacity-100 bg-gray-800 rounded-md'>
          <div
            className='absolute cursor-pointer inset-0 pointe opacity-0'
            onClick={() => play()}
          ></div>
          <div className='grid grid-cols-3 w-full'>
            <div className='col-start-2 flex justify-center items-center'>
              <PlayIcon className='w-7 h-7' />
              <span className='ml-1.5'>Play</span>
            </div>
            <div className='col-start-3 flex justify-end'>
              <div className='relative'>
                <button
                  onClick={() => setShowPopover(!showPopover)}
                  className='p-2 z-10 m-2  ml-0 rounded-md transition-colors bg-transparent hover:bg-gray-900'
                >
                  <DotsVerticalIcon className='w-5' />
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-shrink-0 relative z-0'>
          <VolumeUpIcon className='relative w-5 h-5' />
          {fetchSoundTrackSettings.keybinds.length > 0 && (
            <LinkIcon className='absolute transform translate-y-2 translate-x-1 bottom-0 right-0 w-3 h-3' />
          )}
        </div>
        <p className='ml-1.5 flex-shrink break-words overflow-ellipsis overflow-hidden whitespace-nowrap'>
          {props.name}
        </p>
      </div>
      {showPopover && (
        <div
          onMouseLeave={() => recordKeybind(true)}
          ref={popoverContainer}
          className='absolute !z-[100] bg-neutral-900 border-neutral-700 border rounded-md transform translate-y-[7rem] bottom-0 p-4 w-56'
        >
          <p className='text-sm'>
            {fetchSoundTrackSettings.keybinds.length > 0 &&
              !isRecordingKeybind && (
                <>
                  <strong>Hotkeys:</strong>{' '}
                  {fetchSoundTrackSettings.keybinds.join(' ')}
                </>
              )}
            {_recordedHotkeys.length > 0 && isRecordingKeybind && (
              <>
                <strong>Recording:</strong> {_recordedHotkeys.join(' ')}
              </>
            )}

            {_recordedHotkeys.length === 0 &&
              fetchSoundTrackSettings.keybinds.length === 0 && (
                <>
                  Click to record hotkey <br />
                  Click again to stop
                </>
              )}
          </p>
          <Button className='mt-2' onClick={() => recordKeybind(false)}>
            {isRecordingKeybind ? 'Recording' : 'Set Hotkey'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default AudioCard
