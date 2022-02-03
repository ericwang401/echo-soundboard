export interface ExtendedAudioElement extends HTMLAudioElement {
  setSinkId(id: string): void
}

export const getDevices = async (showInputs?: boolean) => {
  return (await navigator.mediaDevices.enumerateDevices()).filter(
    (device) => (!showInputs ? device.kind === 'audiooutput' : device.kind === 'audioinput')
  )
}

export const amplifyMedia = (mediaElem: ExtendedAudioElement, multiplier: number) => {
  var context = new (window.AudioContext || window.webkitAudioContext),
      result = {
        context: context,
        source: context.createMediaElementSource(mediaElem),
        gain: context.createGain(),
        media: mediaElem,
        amplify: function(multiplier: number) { result.gain.gain.value = multiplier; },
        getAmpLevel: function() { return result.gain.gain.value; }
      };
  result.source.connect(result.gain);
  result.gain.connect(context.destination);
  result.amplify(multiplier);
  return result;
}