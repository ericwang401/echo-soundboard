import React, { KeyboardEvent, useEffect, useState } from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'
import { Store } from '@/state'
import { ipcRenderer } from 'electron'
import { File } from '@/plugins/electron/events'
import { useStoreState } from 'easy-peasy'
import Button from '@/components/Button'

const App = () => {
  const directory = useStoreState((state: Store) => state.fileDirectory)

  const [files, setFiles] = useState<File[]>([])

  useEffect(() => {
    try {
      setFiles(ipcRenderer.sendSync('list-files', directory).files)
    } catch (e) {}
  }, [directory])

  const muteAll = () => {
    let muteEvent = new Event('muteAll', { bubbles: true })

    document.dispatchEvent(muteEvent)
  }

  return (
    <Container>
      <div className='content h-full w-full'>
        <div className='flex pt-4 justify-end w-full'>
          <Button isOutlined onClick={() => muteAll()}>
            Mute all
          </Button>
        </div>
        {files && (
          <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
            {files.map((file: File) => (
              <AudioCard key={file.path} name={file.name} path={file.path} />
            ))}
          </div>
        )}
        {(!files || files.length === 0) && (
          <div className='grid h-full w-full place-items-center'>
            <h3 className='text-xl font-semibold'>No Sound Tracks :(</h3>
          </div>
        )}
      </div>
    </Container>
  )
}

export default App
