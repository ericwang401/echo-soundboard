import { createTypedHooks, useStoreState } from 'easy-peasy'
import { useState } from 'react'
import { getDevices } from '@/util/AudioDevices'
import { useEffect } from 'react'
import { Store } from '@/state'
import FormSection from '@/components/FormSection'
import { ChangeEvent } from 'react'
import Dropdown from '@/components/Dropdown'

const { useStoreActions } = createTypedHooks<Store>()

const Outputs = () => {
  const primaryOutput = useStoreState((state: Store) => state.outputs.primary)
  const setPrimaryOutput = useStoreActions((actions) => actions.setPrimary)

  const secondaryOutput = useStoreState(
    (state: Store) => state.outputs.secondary
  )
  const setSecondaryOutput = useStoreActions((actions) => actions.setSecondary)

  const [outputs, setOutputs] = useState([
    {
      value: '',
      display: '',
    },
  ])

  useEffect(() => {
    ;(async function () {
      let devices = await getDevices()

      devices.forEach((device) => {
        setOutputs((outputs) => [
          ...outputs,
          { value: device.deviceId, display: device.label },
        ])
      })
    })()
  }, [])

  return (
    <FormSection
      title='Audio Outputs'
      form={
        <>
          <div>
            <p className='text-sm'>Primary Output</p>
            <Dropdown
              className='w-80'
              value={primaryOutput}
              items={outputs}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setPrimaryOutput(e.target.value)
              }
            />
          </div>

          <div>
            <p className='text-sm'>Secondary Output</p>
            <Dropdown
              className='w-80'
              value={secondaryOutput}
              items={outputs}
              onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                setSecondaryOutput(e.target.value)
              }
            />
          </div>
        </>
      }
    />
  )
}

export default Outputs
