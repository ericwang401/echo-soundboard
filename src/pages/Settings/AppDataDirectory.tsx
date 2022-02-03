import Button from '@/components/Button'
import FormSection from '@/components/FormSection'
import { ipcRenderer } from 'electron'
import { useEffect, useState } from 'react'
import storage from 'electron-json-storage'

const AppDataDirectory = () => {
  const [fileDirectory, setFileDirectory] = useState<string>('')

  const getNewFolder = () => {
    let directory = ipcRenderer.sendSync('get-new-folder')
    if (!directory.canceled) {
      setFileDirectory(directory.filePaths[0])
      storage.setDataPath(directory.filePaths[0])
      localStorage.setItem('app-config-dir', directory.filePaths[0])
      window.location.reload()
    }
  }

  useEffect(() => {
    let appConfigDir = localStorage.getItem('app-config-dir')
    if (!appConfigDir) return

    setFileDirectory(appConfigDir)
  }, [])

  return (
    <FormSection
      title='App Config Directory'
      form={
        <>
          <p className='text-sm'>
            Click below to select the folder to store the app configuration.
            <br />
            <strong>
              Note: this soundboard's config file is named{' '}
              <code>%5BEasyPeasyStore%5D%5B0%5D.json</code> ONLY. Do not rename
            </strong>
          </p>
          <Button onClick={() => getNewFolder()} isOutlined={true}>
            {fileDirectory === '' ? 'Set a directory' : fileDirectory}
          </Button>
        </>
      }
    />
  )
}

export default AppDataDirectory
