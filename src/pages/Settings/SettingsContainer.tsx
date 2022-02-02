import Container from '@/components/Container'
import FileDirectory from '@/pages/Settings/FileDirectory'
import Microphone from '@/pages/Settings/Microphone'
import Outputs from '@/pages/Settings/Outputs'


const Settings = () => {

  return (
    <Container className='bg-black'>
      <div className='content py-4 space-y-6'>
        <Outputs />
        <FileDirectory />
        <Microphone />
      </div>
    </Container>
  )
}

export default Settings
