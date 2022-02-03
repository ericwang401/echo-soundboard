import FormSection from '@/components/FormSection'
import { createTypedHooks, useStoreState } from 'easy-peasy'
import { Store } from '@/state'
import { getDevices } from '@/util/AudioDevices'
import { useEffect, useState, ChangeEvent } from 'react'
import Dropdown from '@/components/Dropdown'

const { useStoreActions } = createTypedHooks<Store>()

const Microphone = () => {
  const microphone = useStoreState((state: Store) => state.microphone)
  const setMicrophone = useStoreActions((actions) => actions.setMicrophone)

  const [inputs, setInputs] = useState([
    {
      value: '',
      display: '',
    },
  ])

  useEffect(() => {
    ;(async function () {
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
        </>
      }
    />
  )
}

export default Microphone
