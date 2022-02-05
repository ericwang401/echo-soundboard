import { HashRouter, Routes, Route } from 'react-router-dom'
import Overview from './pages/Overview'
import NavigationBar from './components/NavigationBar'
import Settings from '@/pages/settings/SettingsContainer'
import { useEffect } from 'react'
import { ExtendedAudioElement } from '@/util/AudioDevices'
import { useStoreState, useStoreRehydrated } from 'easy-peasy'
import { Store } from '@/state'

const App = () => {
  const isRehydrated = useStoreRehydrated()

  const [primaryOutput, secondaryOutput, microphone] = useStoreState(
    (state: Store) => [
      state.outputs.primary,
      state.outputs.secondary,
      state.microphone,
    ]
  )

  const primaryInjector = new Audio() as ExtendedAudioElement
  const secondaryInjector = new Audio() as ExtendedAudioElement

  useEffect(() => {
    console.log('Received microphone config', {
      primaryOutput,
      secondaryOutput,
      microphone,
    })

    if (microphone === '') {
      console.log('did not pass')
      return
    }

    console.log('passed empty microphone check')

    navigator.mediaDevices
      .getUserMedia({
        audio: {
          deviceId: { exact: microphone },
          // to reduce latency
          echoCancellation: false,
          noiseSuppression: false,
        },
      })
      .then(async function (stream) {
        // if the outputs are empty, the AudioContext plays to the speakers by default
        // we don't want that, we only want to play on the audio device the user SPECIFIED
        // if the user didn't specify an audio device, then just don't play-simple
        if (primaryOutput === '' && secondaryOutput === '') return

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

        console.log('Injected microphone with config', {
          primaryOutput,
          secondaryOutput,
          microphone,
        })
      })
  }, [primaryOutput, secondaryOutput, microphone])

  useEffect(() => {
    if (microphone !== '') return

    setTimeout(() => {
      console.log(
        'before',
        primaryInjector.srcObject,
        secondaryInjector.srcObject
      )
      primaryInjector.srcObject = null
      primaryInjector.pause()

      secondaryInjector.srcObject = null
      secondaryInjector.pause()

      console.log(
        'after',
        primaryInjector.srcObject,
        secondaryInjector.srcObject
      )
      console.log(
        'Stopped microphone injector because microphone input is unspecified'
      )
    }, 500)
  }, [primaryOutput, secondaryOutput, microphone])

  /* useEffect(() => {
    return () => {
      // when the user navigates to another page (e.g. settings), stop the Injector
      // because if the user navigates back to this page, there will be MULTIPLE microphone injectors
      // we don't want 5000 microphone injectors run at once if the user switches between pages multiple times
    }
  }, []) */
  return (
    <HashRouter>
      <NavigationBar />

      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </HashRouter>
  )
}

export default App
