import FormSection from '@/components/FormSection'
import { createTypedHooks } from 'easy-peasy'
import { Store } from '@/state'
import { getDevices } from '@/util/AudioDevices'
import { useEffect, useState, ChangeEvent, useCallback, useRef } from 'react'
import Dropdown from '@/components/Dropdown'
import { debounce } from 'debounce'
import Button from '@/components/Button'

const { useStoreActions, useStoreState } = createTypedHooks<Store>()

const Microphone = () => {
  const microphone = useStoreState(state => state.microphone)
  const setMicrophone = useStoreActions(actions => actions.setMicrophone)

  const [microphoneChangeInDecibels, setMicrophoneChangeInDecibels] = [useStoreState(state => state.microphoneChangeInDecibels), useStoreActions(actions => actions.setMicrophoneChangeInDecibels)]

  const [inputs, setInputs] = useState([
    {
      value: '',
      display: '',
    },
  ])

  const [decibels, setDecibels] = useState(microphoneChangeInDecibels)

  const mutateDecibels = useCallback(
    debounce((val: number) => {
      setMicrophoneChangeInDecibels(val)
    }, 500), [])

  useEffect(() => {
    mutateDecibels(decibels)
  }, [decibels])

  useEffect(() => {
    ; (async function () {
      let devices = await getDevices(true)

      devices.forEach((device) => {
        setInputs((inputs) => [
          ...inputs,
          { value: device.deviceId, display: device.label },
        ])
      })
    })()
  }, [])

  return (
    <FormSection
      title='Microphone Injector'
      form={
        <>
          <div>
            <p className='text-sm'>Microphone</p>
            <Dropdown
              className='w-80'
              value={microphone}
              items={inputs}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setMicrophone(e.target.value)
              }
            />


          </div>

          <p className='text-sm pt-4'>
            Microphone Amplifier (decibels) (this is an experimental feature) (set to 0 db to disable)
          </p>
          <div className="flex space-x-2">
            <Button onClick={() => setDecibels(0)} isOutlined={true}>Reset</Button>
            <input className="w-80" onChange={(e: ChangeEvent<HTMLInputElement>) => setDecibels(Number(e.target.value))} type="range" min="-30" max="30" value={decibels} />
            <p className='text-sm'>Decibels: {decibels}</p>
          </div>
        </>
      }
    />
  )
}

export default Microphone
