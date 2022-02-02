import React, { useEffect, useRef } from 'react'
import { getDevices, ExtendedAudioElement } from './util/AudioDevices'
import { ipcRenderer } from 'electron'

function App() {
  const output = useRef<ExtendedAudioElement>(null)

  useEffect(() => {
    console.log(ipcRenderer.sendSync('synchronous-message', 'ping'))

    ;(async function () {
      let devices = await getDevices()

      console.log(devices)
      await output.current?.setSinkId(devices[0].deviceId)

      output.current?.play()

    })()
  }, [])

  return (
    <div>
      <audio
        ref={output}
        src='https://www.myinstants.com/media/sounds/discord-notification.mp3'
      ></audio>
      <h1 className='text-7xl'>s</h1>
    </div>
  )
}

export default App