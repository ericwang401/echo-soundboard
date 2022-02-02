import React from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'
import { useStoreState } from 'easy-peasy'
import { Store } from '@/state'

const App = () => {
  const outputs = useStoreState((state: Store) => state.outputs)

  console.log(outputs)
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
