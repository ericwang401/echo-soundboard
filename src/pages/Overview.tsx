import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'
import { Store } from '@/state'
import { ipcRenderer } from 'electron'
import { File } from '@/plugins/electron/events'
import { useStoreState } from 'easy-peasy'
import Button from '@/components/Button'
import Input from '@/components/Input'

const App = () => {
  const directory = useStoreState((state: Store) => state.fileDirectory)

  const [files, setFiles] = useState<File[]>([])
  const [searchResults, setSearchResults] = useState<File[]>([])
  const [query, setQuery] = useState('')

  useEffect(() => {
    try {
      const ipcFiles = ipcRenderer.sendSync('list-files', directory)

      if (Object.values(ipcFiles).length === 0) return;

      setFiles(ipcRenderer.sendSync('list-files', directory).files)
    } catch (e) {}
  }, [directory])

  useEffect(() => {
    const results = files.filter((file: File) => file.name.includes(query))
    setSearchResults(results)
  }, [query])

  const muteAll = () => {
    let muteEvent = new Event('muteAll', { bubbles: true })

    document.dispatchEvent(muteEvent)
  }

  return (
    <Container>
      <div className='content h-full w-full'>
        <div className='flex pt-4 w-full'>
          <Input
            className='grow-0 w-80'
            value={query}
            placeholder='Search for a tune'
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setQuery(event.target.value)
            }
          ></Input>
          <div className='grow'></div>
          <Button className='grow-0' isOutlined onClick={() => muteAll()}>
            Mute all
          </Button>
        </div>
        {query.length > 0 && (
          <>
            {searchResults && (
              <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
                {searchResults.map((file: File) => (
                  <AudioCard
                    key={file.path}
                    name={file.name}
                    path={file.path}
                  />
                ))}
              </div>
            )}
            {(!searchResults || searchResults.length === 0) && (
              <div className='grid h-full w-full place-items-center'>
                <h3 className='text-xl font-semibold'>No Search Results</h3>
              </div>
            )}
          </>
        )}
        {query.length === 0 && (
          <>
            {files && (
              <div className='grid grid-cols-3 lg:grid-cols-4 gap-4 py-4'>
                {files.map((file: File) => (
                  <AudioCard
                    key={file.path}
                    name={file.name}
                    path={file.path}
                  />
                ))}
              </div>
            )}
            {(!files || files.length === 0) && (
              <div className='grid h-full w-full place-items-center'>
                <h3 className='text-xl font-semibold'>No Sound Tracks :(</h3>
              </div>
            )}
          </>
        )}
      </div>
    </Container>
  )
}

export default App
