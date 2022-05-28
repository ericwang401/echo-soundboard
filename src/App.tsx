import {
  HashRouter as Router,
  Routes,
  Route,
  useLocation,
} from 'react-router-dom'
import ReactGA from '@/util/AnalyticsWrapper'
import Overview from './pages/Overview'
import NavigationBar from './components/NavigationBar'
import Settings from '@/pages/Settings/SettingsContainer'
import { useEffect } from 'react'
import { ipcRenderer } from 'electron'
import register from '@/util/registerAdditionalBindings'
import useMicrophoneInjector from '@/util/useMicrophoneInjector'

const Analytics = () => {
  const location = useLocation()

  useEffect(() => {
    ReactGA.event({
      category: 'other',
      action: 'app_version',
      label: ipcRenderer.sendSync('get-version'),
      value: 1,
    })
  }, [])

  useEffect(() => {
    ReactGA.send({ hitType: 'pageview', page: location.pathname })
  }, [location])

  useEffect(() => {
    ipcRenderer.send('set-loading-done')
  }, [])

  return <></>
}

const App = () => {

  register()

  useMicrophoneInjector()

  return (
    <Router>
      <Analytics />
      <NavigationBar />

      <Routes>
        <Route path='/' element={<Overview />} />
        <Route path='/settings' element={<Settings />} />
      </Routes>
    </Router>
  )
}

export default App
