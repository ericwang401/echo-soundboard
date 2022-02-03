import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import './index.css'
import App from './App'
import NavigationBar from './components/NavigationBar'
import { store } from '@/state'
import Settings from '@/pages/settings/SettingsContainer'


ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <HashRouter>
        <NavigationBar />

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </HashRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
