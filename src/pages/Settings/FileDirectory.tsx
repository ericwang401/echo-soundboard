import { ChangeEvent } from 'react'
import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import { createTypedHooks, useStoreState } from 'easy-peasy'
import { Store } from '@/state'
import { ipcRenderer } from 'electron'

const { useStoreActions } = createTypedHooks<Store>()

const FileDirectory = () => {
  const fileDirectory = useStoreState((state: Store) => state.fileDirectory)
  const setFileDirectory = useStoreActions(
    (actions) => actions.setFileDirectory
  )

  const soundTrackVolume = useStoreState((state: Store) => state.soundTrackVolume)
  const setSoundTrackVolume = useStoreActions(
    (actions) => actions.setSoundTrackVolume
  )

  const getNewFolder = () => {
    let directory = ipcRenderer.sendSync('get-new-folder')
    if (!directory.canceled) {
      setFileDirectory(directory.filePaths[0])
    }
  }

  const onVolumeChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSoundTrackVolume(Number(e.currentTarget.value) / 100)
  }
  return (
    <FormSection
      title='Audio Directory'
      form={
        <>
          <p className='text-sm'>
            Click below to select the folder containing the sound tracks.
          </p>
          <Button onClick={() => getNewFolder()} isOutlined={true}>
            {fileDirectory === '' ? 'Set a directory' : fileDirectory}
          </Button>

          <p className='text-sm pt-4'>
            Sound Effect Volume
          </p>
          <input className="w-80" onChange={(e: ChangeEvent<HTMLInputElement>) => onVolumeChange(e)} type="range" min="1" max="100" value={soundTrackVolume * 100} />
        </>
      }
    />
  )
}

export default FileDirectory
