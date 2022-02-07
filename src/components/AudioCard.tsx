import Button from '@/components/Button'
import { Store } from '@/state'
import { ExtendedAudioElement } from '@/util/AudioDevices'
import {
  VolumeUpIcon,
  PlayIcon,
  DotsVerticalIcon,
} from '@heroicons/react/outline'
import { useStoreState } from 'easy-peasy'
import { useEffect, useCallback, useRef, useState } from 'react'

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
  const [showPopover, setShowPopover] = useState<boolean>(false)
  const soundTrackVolume = useStoreState(
    (state: Store) => state.soundTrackVolume
  )
  const [isRecordingKeybind, setIsRecordingKeybind] = useState<boolean>(false)
  const play = async () => {
    let primary = new Audio() as ExtendedAudioElement
    let secondary = new Audio() as ExtendedAudioElement
    primary.volume = soundTrackVolume
    secondary.volume = soundTrackVolume
    primary.src = props.path
    secondary.src = props.path
    await primary.setSinkId(primaryOutput)
    await secondary.setSinkId(secondaryOutput)
    document.addEventListener('muteAll', () => {
      primary.pause()
      secondary.pause()
    })
    if (primaryOutput !== '') {
      primary.play()
    }

    if (secondaryOutput !== '') {
      secondary.play()
    }
  }

  const logEvent = useCallback((e: globalThis.KeyboardEvent) => {
    console.log(e)
  }, [])

  const recordKeybind = () => {
    if (!isRecordingKeybind) {
      setIsRecordingKeybind(true)
      document.addEventListener('keydown', logEvent)
    } else if (isRecordingKeybind) {
      setIsRecordingKeybind(false)
      document.removeEventListener('keydown', logEvent)
    }
  }

  return (
    <div className='relative flex items-center bg-black border-neutral-700 border rounded-md p-4'>
      <div className='grid place-items-center absolute w-full h-full -ml-4 transition-opacity opacity-0 hover:opacity-100 bg-gray-800 rounded-md'>
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

              {showPopover && (
                <div
                  ref={popoverContainer}
                  className='absolute z-20 bg-neutral-900 border-neutral-700 border rounded-md mt-2 p-4 w-56'
                >
                  <p className='text-sm'>
                    Click to record hotkey <br />
                    Click again to stop
                  </p>
                  <Button onClick={recordKeybind}>{isRecordingKeybind ? 'Recording' : 'No Hotkey'}</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <VolumeUpIcon className='w-5 h-5 flex-shrink-0' />
      <p className='ml-1.5 flex-shrink break-words overflow-ellipsis overflow-hidden whitespace-nowrap'>
        {props.name}
      </p>
    </div>
  )
}

export default AudioCard
