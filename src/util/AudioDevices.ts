export interface ExtendedAudioElement extends HTMLAudioElement {
  setSinkId(id: string): void
}

export const getDevices = async (showInputs?: boolean) => {
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => (!showInputs ? device.kind === 'audiooutput' : device.kind === 'audioinput')
  )
}
