import { soundTrackSettings, Store } from '@/state'
import { ipcRenderer } from 'electron'
import {
  VolumeUpIcon,
  PlayIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline'
import { LinkIcon } from '@heroicons/react/solid'
import { useStoreState } from 'easy-peasy'
import { useEffect, useRef, useMemo } from 'react'
import { motion } from 'framer-motion'
import { createTypedHooks } from 'easy-peasy'
import Recorder from '@/components/Recorder'

import { play as _play } from '@/util/soundboardTools'
import { useKeybindRecorder } from '@/components/KeybindRecorder'

const { useStoreActions } = createTypedHooks<Store>()


export interface AudioCardProps {
  name: string
  path: string
}

const AudioCard = (props: AudioCardProps) => {
  const [primaryOutput, secondaryOutput] = useStoreState((state: Store) => [
    state.outputs.primary,
    state.outputs.secondary,
  ])

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

  const soundTrackVolume = useStoreState(
    (state: Store) => state.soundTrackVolume
  )

  const play = () =>
    _play(props, primaryOutput, secondaryOutput, soundTrackVolume)

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

    keybindListener.current = ipcRenderer.on(
      'play-soundtrack',
      playSoundViaPath
    )

    return () => {
      ipcRenderer.removeListener('play-soundtrack', playSoundViaPath)
    }
  }, [])


  const setSoundTrackSettings = useStoreActions(
    (actions) => actions.setSoundTrackSettings
  )

  const { setShowPopover, showPopover, options } = useKeybindRecorder({
    ...props,
    keybinds: fetchSoundTrackSettings.keybinds,
    dispatchKeybinds: (keybinds: string[]) => {
      setSoundTrackSettings({
        path: props.path,
        keybinds,
      })
    }
  })

  /*
  // for debugging only
  useEffect(() => {
    console.log('changed!', { recordedHotkeys })
  }, [recordedHotkeys]) */

  return (
    <>
      <motion.div
        transition={{ duration: 0.25 }}
        layoutId={props.path}
        className='relative flex items-center bg-black border-neutral-700 border rounded-md p-4'
      >
        <div className='grid z-[1] place-items-center absolute w-full h-full -ml-4 transition-opacity opacity-0 hover:opacity-100 bg-gray-800 rounded-md'>
          <div
            className='absolute cursor-pointer inset-0 opacity-0'
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
      </motion.div>

      <Recorder options={options} />

      {/* <AnimatePresence>
        {showPopover && (
          <motion.div
            transition={{ duration: 1 }}
            className='fixed z-[50] h-screen w-screen top-0 left-0 grid place-items-center'
          >
            <motion.div
              onClick={() => {
                setShowPopover(false)
              }}
              className='absolute bg-gray-500/50 inset-0 top-0 left-0'
            />
            <motion.div
              //onMouseLeave={() => recordKeybind(true)}
              layoutId={props.path}
              className='absolute !z-[100] bg-neutral-900 border-neutral-700 border rounded-md p-4 min-w-[30rem]'
            >
              <div className='flex justify-between'>
                <h3 className='heading'>Set a poop</h3>
                <button
                  onClick={() => {
                    setShowPopover(false)
                  }}
                >
                  <XIcon className='w-5 h-5' />
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence> */}
    </>
  )
}

export default AudioCard
