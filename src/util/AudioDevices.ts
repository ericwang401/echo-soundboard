export interface ExtendedAudioElement extends HTMLAudioElement {
  setSinkId(id: string): void
}

export const getDevices = async () => {
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => device.kind === 'audiooutput'
  )
}
