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
      form={
        <>
          <h3 className='text-xl font-semibold'>Audio Outputs</h3>

          <div className='py-3 space-y-2'>
            <div>
              <p className='text-sm'>Primary Output</p>
              <Dropdown
                className='w-72'
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
                className='w-72'
                value={secondaryOutput}
                items={outputs}
                onChange={(e: ChangeEvent<HTMLSelectElement>) =>
                  setSecondaryOutput(e.target.value)
                }
              />
            </div>
          </div>
        </>
      }
    />
  )
}

export default Outputs
