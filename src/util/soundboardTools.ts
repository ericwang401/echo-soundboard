import { ExtendedAudioElement } from '@/util/AudioDevices'
import ReactGA from '@/util/AnalyticsWrapper'

interface PlayProps {
    name: string
    path: string
}

export const play = async (props: PlayProps, primaryOutput: string, secondaryOutput: string, soundTrackVolume: number) => {
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
