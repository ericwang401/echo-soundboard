import Container from '@/components/Container'
import AppDataDirectory from '@/pages/settings/AppDataDirectory'
import FileDirectory from '@/pages/settings/FileDirectory'
import Microphone from '@/pages/settings/Microphone'
import Outputs from '@/pages/settings/Outputs'


const Settings = () => {

  return (
    <Container className='bg-black'>
      <div className='content py-4 space-y-6'>
        <Outputs />
        <FileDirectory />
        <Microphone />
        <AppDataDirectory />
      </div>
    </Container>
  )
}

export default Settings
