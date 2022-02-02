import React from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'
import { useStoreState } from 'easy-peasy'
import { Store } from '@/state'
import { ipcRenderer } from 'electron'

const App = () => {
  const outputs = useStoreState((state: Store) => state.outputs)

  console.log(ipcRenderer.sendSync('list-files', 'C:\\Users\\Eric Wang\\Music'))

  console.log(outputs)

  const getNewFolder = () => {
    console.log(ipcRenderer.sendSync('get-new-folder'))
  }
  return (
    <Container>
      <div className='content'>
        <button onClick={() => getNewFolder()}>open dialog</button>
        <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
          <AudioCard name='chamber' />
          <AudioCard name='chamber' />
          <AudioCard name='chamber' />
        </div>
      </div>
    </Container>
  )
}

export default App
