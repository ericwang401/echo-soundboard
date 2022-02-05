import { HashRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import Overview from './pages/Overview'
import NavigationBar from './components/NavigationBar'
import { store } from '@/state'
import Settings from '@/pages/settings/SettingsContainer'

const App = () => {
  return (
    <StoreProvider store={store}>
      <HashRouter>
        <NavigationBar />

        <Routes>
          <Route path='/' element={<Overview />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  )
}

export default App
