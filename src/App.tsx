import React, { useEffect, useState } from 'react'
import Container from '@/components/Container'
import AudioCard from '@/components/AudioCard'
import { Store } from '@/state'
import { ipcRenderer } from 'electron'
import { File } from '@/plugins/electron/events'
import { ExtendedAudioElement } from '@/util/AudioDevices'
import { useStoreState } from 'easy-peasy'

const App = () => {
  const [primaryOutput, secondaryOutput] = useStoreState((state: Store) => [
    state.outputs.primary,
    state.outputs.secondary,
  ])
  const directory = useStoreState((state: Store) => state.fileDirectory)

  const [files, setFiles] = useState<File[]>([])
  let primaryInjector = new Audio() as ExtendedAudioElement
  let secondaryInjector = new Audio() as ExtendedAudioElement

  useEffect(() => {
    try {
      setFiles(ipcRenderer.sendSync('list-files', directory).files)
    } catch (e) {}

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          // to reduce latency
          echoCancellation: false,
          noiseSuppression: false,
        },
      })
      .then(async function (stream) {
        // if the outputs are empty, the AudioContext plays to the speakers by default
        // we don't want that, we only want to play on the audio device the user SPECIFIED
        // if the user didn't specify an audio device, then just don't play-simple
        if (primaryOutput === '' && secondaryOutput === '') return;

        // Create a variable that hooks into the microphone
        let aCtx = new AudioContext()
        let microphone = aCtx.createMediaStreamSource(stream)
        let destination = aCtx.createMediaStreamDestination()
        microphone.connect(destination)
        if (primaryOutput !== '') {

          // Set the output device
          await primaryInjector.setSinkId(primaryOutput)

          // set the source to the microphone stream & play
          primaryInjector.srcObject = destination.stream
          primaryInjector.play()
        }

        if (secondaryOutput !== '') {
          await secondaryInjector.setSinkId(secondaryOutput)

          secondaryInjector.srcObject = destination.stream
          secondaryInjector.play()

        }
      })
  }, [directory, primaryOutput])

  useEffect(() => {
    return () => {
      // when the user navigates to another page (e.g. settings), stop the Injector
      // because if the user navigates back to this page, there will be MULTIPLE microphone injectors
      // we don't want 5000 microphone injectors run at once if the user switches between pages multiple times

      primaryInjector.srcObject = null
      primaryInjector.pause()

      secondaryInjector.srcObject = null
      secondaryInjector.pause()
    }
  }, [])

  return (
    <Container>
      <div className='content h-full w-full'>
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
