import { ExtendedAudioElement } from '@/util/AudioDevices'
import { useStoreState } from 'easy-peasy'
import { Store } from '@/state'
import { useMemo, useEffect } from 'react'

const useMicrophoneInjector = () => {
  const [primaryOutput, secondaryOutput, microphone] = useStoreState(
    (state: Store) => [
      state.outputs.primary,
      state.outputs.secondary,
      state.microphone,
    ]
  )

  const primaryInjector = useMemo(() => new Audio() as ExtendedAudioElement, [])
  const secondaryInjector = useMemo(
    () => new Audio() as ExtendedAudioElement,
    []
  )

  useEffect(() => {
    console.log('Received microphone config', {
      primaryOutput,
      secondaryOutput,
      microphone,
    })

    if (microphone === '') {
      primaryInjector.srcObject = null
      primaryInjector.pause()

      secondaryInjector.srcObject = null
      secondaryInjector.pause()

      console.log(
        'Stopped microphone injector because microphone input is unspecified'
      )
      return
    }

    if (primaryOutput === '') {
      primaryInjector.srcObject = null
      primaryInjector.pause()

      console.log(
        'Stopped primary injector because primary output is unspecified'
      )
    }

    if (secondaryOutput === '') {
      secondaryInjector.srcObject = null
      secondaryInjector.pause()

      console.log(
        'Stopped secondary injector because secondary output is unspecified'
      )
    }

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
          console.log('Injected into primary output')
        }

        if (secondaryOutput !== '') {
          await secondaryInjector.setSinkId(secondaryOutput)

          secondaryInjector.srcObject = destination.stream
          secondaryInjector.play()
          console.log('Injected into secondary output')
        }

        console.log('Injected microphone with config', {
          primaryOutput,
          secondaryOutput,
          microphone,
        })
      })
  }, [primaryOutput, secondaryOutput, microphone])
}

export default useMicrophoneInjector
