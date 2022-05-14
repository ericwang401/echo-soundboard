// Dispatch<SetStateAction<boolean>>
import { AnimatePresence, motion } from 'framer-motion'
import { XIcon } from '@heroicons/react/solid'
import Button from '@/components/Button'
import { Dispatch, SetStateAction } from 'react'

interface RecorderProps {
  options: {
    showPopover: boolean
    setShowPopover: Dispatch<SetStateAction<boolean>>
    recordKeybind: (stop?: boolean | undefined) => void
    isRecordingKeybind: boolean
    setIsRecordingKeybind: Dispatch<SetStateAction<boolean>>
    recordedHotkeys: string[]
    keybinds: string[]
    layoutId: string
  }
}

const Recorder = ({
  options: {
    showPopover,
    recordedHotkeys,
    layoutId,
    keybinds,
    recordKeybind,
    isRecordingKeybind,
    setShowPopover,
  },
}: RecorderProps) => {
  return (
    <>
      <AnimatePresence>
        {showPopover && (
          <motion.div
            transition={{ duration: 1 }}
            className='fixed z-[50] h-screen w-screen top-0 left-0 grid place-items-center'
          >
            <motion.div
              onClick={() => {
                setShowPopover(false)
                recordKeybind(true)
              }}
              className='absolute bg-gray-500/50 inset-0 top-0 left-0'
            />
            <motion.div
              layoutId={layoutId}
              className='absolute !z-[100] bg-neutral-900 border-neutral-700 border rounded-md p-4 min-w-[30rem]'
            >
              <div className='flex justify-between'>
                <h3 className='heading'>Set a Hotkey</h3>
                <button
                  onClick={() => {
                    setShowPopover(false)
                    recordKeybind(true)
                  }}
                >
                  <XIcon className='w-5 h-5' />
                </button>
              </div>
              <p className='text-sm'>
                {keybinds.length > 0 && !isRecordingKeybind && (
                  <>
                    Press Set Hotkey twice to remove the keybinding. <br></br>
                    <strong>Hotkeys:</strong> {keybinds.join(' ')}
                  </>
                )}
                {recordedHotkeys.length > 0 && isRecordingKeybind && (
                  <>
                    <strong>Recording:</strong> {recordedHotkeys.join(' ')}
                  </>
                )}

                {recordedHotkeys.length === 0 && keybinds.length === 0 && (
                  <>
                    Click to record hotkey <br />
                    Click again to stop
                  </>
                )}
              </p>
              <Button className='mt-2' onClick={() => recordKeybind(false)}>
                {isRecordingKeybind ? 'Recording' : 'Set Hotkey'}
              </Button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Recorder
