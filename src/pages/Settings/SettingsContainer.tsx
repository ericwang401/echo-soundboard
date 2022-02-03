import Container from '@/components/Container'
import { ipcRenderer } from 'electron'
import FormSection from '@/components/FormSection'
import AppDataDirectory from '@/pages/settings/AppDataDirectory'
import FileDirectory from '@/pages/settings/FileDirectory'
import Microphone from '@/pages/settings/Microphone'
import Outputs from '@/pages/settings/Outputs'

const Settings = () => {
  return (
    <Container className='bg-black'>
      <div className='content py-4 space-y-6'>
        <FormSection
          title='Info'
          form={
            <p className='text-sm'>
              In the settings page, the microphone injector DOES NOT WORK.
              <br />
              Soundboard made by <span className="font-bold">Eric Wang</span>
              <br />
              Check me out on <button onClick={() => ipcRenderer.sendSync('open-external-link', 'https://github.com/ericwang401')} className='font-bold bg-transparent'>Github</button>
              <br />
              <button onClick={() => ipcRenderer.sendSync('open-external-link', 'https://www.patreon.com/performave')} className='font-bold bg-transparent'>Donate to my Patreon</button>
              <br />
              <button onClick={() => ipcRenderer.sendSync('open-external-link', 'https://github.com/ericwang401/echo-soundboard')} className='font-bold bg-transparent'>Project source code</button>
            </p>
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
