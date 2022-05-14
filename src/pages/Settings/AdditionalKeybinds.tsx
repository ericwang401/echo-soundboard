import FormSection from '@/components/FormSection'
import Button from '@/components/Button'
import { Store } from '@/state'
import { createTypedHooks } from 'easy-peasy'
import { ipcRenderer } from 'electron'
import Recorder from '@/components/Recorder'
import { useKeybindRecorder } from '@/components/KeybindRecorder'
import { motion } from 'framer-motion'

const { useStoreActions, useStoreState } = createTypedHooks<Store>()

const AdditionalKeybinds = () => {
  const [keybinds, setKeybinds] = [
    useStoreState((store) => store.keybinds),
    useStoreActions((actions) => actions.setKeybind),
  ]
  const { setShowPopover, options } = useKeybindRecorder({
    identifier: 'stop-all-sounds',
    keybinds: keybinds['stop-all-sounds'] || [],

    dispatchKeybinds: (keybinds: string[]) => {
      ipcRenderer.sendSync('set-keybind', keybinds)
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
