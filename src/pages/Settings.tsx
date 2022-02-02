import Container from '@/components/Container'
import FormSection from '@/components/FormSection'
import { ChevronDownIcon } from '@heroicons/react/outline'

const Settings = () => {
  return (
    <Container>
      <div className='content py-4'>
        <FormSection
          form={
            <>
              <h3 className='text-xl font-semibold'>Audio Outputs</h3>

              <div className='py-3'>
                <div className='relative inline-block'>
                  <div className='absolute flex items-center justify-end px-2.5 inset-0 select-none pointer-events-none'>
                    <ChevronDownIcon className='w-3 h-3' />
                  </div>
                  <select
                    className='bg-black transition-colors border border-neutral-700 hover:border-neutral-300 text-sm outline-none rounded-md px-2.5 py-2  appearance-none'
                    name='cars'
                    id='cars'
                  >
                    <option value='volvo'>Volvo</option>
                    <option value='saab'>Saab</option>
                    <option value='mercedes'>Mercedes</option>
                    <option value='audi'>Audi</option>
                  </select>
                </div>
              </div>
            </>
          }
        />
      </div>
    </Container>
  )
}

export default Settings
