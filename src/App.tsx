import React from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'

function App() {
  return (
    <Container>
      <div className='grid grid-cols-3 gap-4 content py-4'>
        <AudioCard name='chamber' />
        <AudioCard name='chamber' />
        <AudioCard name='chamber' />
      </div>
    </Container>
  )
}

export default App
