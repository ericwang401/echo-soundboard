import { ExtendedAudioElement } from '@/util/AudioDevices'
import ReactGA from '@/util/AnalyticsWrapper'

interface PlayProps {
  name: string
  path: string
}

export const play = async (
  props: PlayProps,
  primaryOutput: string,
  secondaryOutput: string,
  soundTrackVolume: number
) => {
  let primary = new Audio() as ExtendedAudioElement
  let secondary = new Audio() as ExtendedAudioElement
  primary.volume = soundTrackVolume
  secondary.volume = soundTrackVolume
  primary.src = props.path
  secondary.src = props.path
  await primary.setSinkId(primaryOutput)
  await secondary.setSinkId(secondaryOutput)
  if (primaryOutput !== '') {
    primary.play()
  }

  if (secondaryOutput !== '') {
    secondary.play()
  }

  document.addEventListener('muteAll', () => {
    primary.src = ''
    secondary.src = ''
    primary.remove()
    secondary.remove()
    primary.pause()
    secondary.pause()
  })

  primary.addEventListener('ended', () => {
    primary.src = ''
    secondary.src = ''
    primary.remove()
  })
  secondary.addEventListener('ended', () => {
    primary.src = ''
    secondary.src = ''
    secondary.remove()
  })

  ReactGA.event({
    category: 'activity',
    action: 'use_soundboard',
    label: 'play_soundtrack',
    value: 1,
  })
}

// How to play an audio file using AudioContext
// This is useful if you want to increase the decibels with createGain
// However, the reason why I didn't use this is because for some reason, if you play multiple of the same soundtrack, the audio
// actually "stacks" up. Like the pitch would increase the more of the same audio clip was playing at the same time
// And also you couldn't just spam the same audio clip because then it would stop playing after 30 clips are playing simultaneously. You would have to wait
// about 4 seconds for the cleanup function to clean up all the audio clips
// export const play = async (props: PlayProps, primaryOutput: string, secondaryOutput: string, soundTrackVolume: number) => {
//   let primary = new Audio() as ExtendedAudioElement
//   let secondary = new Audio() as ExtendedAudioElement

//   let aCtx = new AudioContext()
//   let destination = aCtx.createMediaStreamDestination()
//   let source = aCtx.createBufferSource()

//   source.buffer = await fetch(props.path)
//     .then(response => response.arrayBuffer())
//     .then(buffer => aCtx.decodeAudioData(buffer))

//   source.connect(destination)

//   await primary.setSinkId(primaryOutput)
//   primary.srcObject = destination.stream
//   source.start()
//   primary.play()

//   console.log('play')

//   source.addEventListener('ended', () => {
//     primary.srcObject = null
//     primary.remove()
//     aCtx.close()
//     console.log('cleanup')
//   })

//   /* primary.volume = soundTrackVolume
//   secondary.volume = soundTrackVolume
//   primary.src = props.path
//   secondary.src = props.path
//   await primary.setSinkId(primaryOutput)
//   await secondary.setSinkId(secondaryOutput)
//   if (primaryOutput !== '') {
//     primary.play()
//   }

//   if (secondaryOutput !== '') {
//     secondary.play()
//   }

//   document.addEventListener('muteAll', () => {
//     primary.src = ''
//     secondary.src = ''
//     primary.remove()
//     secondary.remove()
//     primary.pause()
//     secondary.pause()
//   })

//   primary.addEventListener('ended', () => {
//     primary.src = ''
//     secondary.src = ''
//     primary.remove()
//   })
//   secondary.addEventListener('ended', () => {
//     primary.src = ''
//     secondary.src = ''
//     secondary.remove()
//   }) */

//   ReactGA.event({
//     category: 'activity',
//     action: 'use_soundboard',
//     label: 'play_soundtrack',
//     value: 1,
//   })
// }
