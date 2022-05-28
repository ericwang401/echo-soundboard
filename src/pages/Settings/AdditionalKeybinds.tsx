import FormSection from '@/components/FormSection'
import Button from '@/components/Button'
import { Store } from '@/state'
import { createTypedHooks } from 'easy-peasy'
import { ipcRenderer } from 'electron'
import Recorder from '@/components/Recorder'
import { useKeybindRecorder } from '@/components/KeybindRecorder'
import { motion } from 'framer-motion'
import { useMemo } from 'react'

const { useStoreActions, useStoreState } = createTypedHooks<Store>()

const AdditionalKeybinds = () => {
  const [keybinds, setKeybinds] = [
    useStoreState((store) => store.keybinds),
    useStoreActions((actions) => actions.setKeybind),
  ]

  const stopAllSoundsKeybind = useMemo(() => {
    const index = keybinds.findIndex((keybind) => keybind.name === 'stop-all-sounds')

    console.log('updated', keybinds[index])

    return keybinds[index]
  }, [keybinds])

  const { setShowPopover, options } = useKeybindRecorder({
    identifier: 'stop-all-sounds',
    keybinds: stopAllSoundsKeybind?.keybinds || [],

    dispatchKeybinds: (keybinds: string[]) => {
      ipcRenderer.sendSync('set-keybind', {
        name: 'stop-all-sounds',
        keybinds,
      })
      setKeybinds({
        name: 'stop-all-sounds',
        keybinds,
      })
    },
  })

  return (
    <FormSection
      title='Additional Keybinds'
      form={
        <>
          <p className='text-sm'>Stop all soundtracks</p>
          <motion.span layoutId='stop-all-sounds'>
            <Button onClick={() => setShowPopover(true)}>Manage keybind</Button>
          </motion.span>

          <Recorder options={options} />
        </>
      }
    ></FormSection>
  )
}

export default AdditionalKeybinds
