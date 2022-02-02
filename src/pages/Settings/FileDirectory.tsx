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

  const getNewFolder = () => {
    let directory = ipcRenderer.sendSync('get-new-folder')
    if (!directory.canceled) {
      setFileDirectory(directory.filePaths[0])
    }
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
        </>
      }
    />
  )
}

export default FileDirectory
