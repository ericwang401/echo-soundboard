import Container from '@/components/Container'
import { ipcRenderer } from 'electron'
import FormSection from '@/components/FormSection'
import AppDataDirectory from '@/pages/settings/AppDataDirectory'
import FileDirectory from '@/pages/settings/FileDirectory'
import Microphone from '@/pages/settings/Microphone'
import Outputs from '@/pages/settings/Outputs'
import Mascot from '@/assets/images/mascot.jpg'
import { ExclamationCircleIcon } from '@heroicons/react/solid'


const Settings = () => {
  return (
    <Container className='bg-black'>
      <div className='content py-4 space-y-6'>
        <FormSection
          title='Info'
          removePadding
          noTitle
          form={
            <div className='grid grid-cols-2'>
              <div className='p-6 space-y-2'>
                <span>
                  <h3 className='text-xl font-semibold'>Echo Soundboard</h3>
                  <p className='text-sm'>
                    A Performave product &#8226; Version { ipcRenderer.sendSync('get-version') } Beidou
                  </p>
                </span>

                <div className='flex items-center text-sm space-x-3 w-full p-2 rounded-md bg-yellow-800'>
                    <ExclamationCircleIcon className='w-5 h-5' /> <span>Keybinds are disabled when viewing settings</span>
                </div>
                <p className='text-sm'>
                  <br />
                  Soundboard made by{' '}
                  <span className='font-bold'>Eric Wang</span>
                  <br />
                  Check me out on{' '}
                  <button
                    onClick={() =>
                      ipcRenderer.sendSync(
                        'open-external-link',
                        'https://github.com/ericwang401'
                      )
                    }
                    className='font-bold bg-transparent'
                  >
                    Github
                  </button>
                  <br />
                  <button
                    onClick={() =>
                      ipcRenderer.sendSync(
                        'open-external-link',
                        'https://www.patreon.com/performave'
                      )
                    }
                    className='font-bold bg-transparent'
                  >
                    Donate to my Patreon
                  </button>
                  <br />
                  <button
                    onClick={() =>
                      ipcRenderer.sendSync(
                        'open-external-link',
                        'https://github.com/ericwang401/echo-soundboard'
                      )
                    }
                    className='font-bold bg-transparent'
                  >
                    Project source code
                  </button>
                </p>
              </div>

              <picture className='w-full h-full'>
                <img
                  src={Mascot}
                  alt='Yae Miko. Mascot for this version of Echo'
                  className='object-cover object-center h-full w-full'
                />
              </picture>
            </div>
          }
        />
        <Outputs />
        <FileDirectory />
        <Microphone />
        <AppDataDirectory />
      </div>
    </Container>
  )
}

export default Settings
