import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { StoreProvider } from 'easy-peasy'
import './index.css'
import App from './App'
import NavigationBar from './components/NavigationBar'
import { store } from '@/state'
import Settings from '@/pages/Settings/SettingsContainer'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <BrowserRouter>
        <NavigationBar />

        <Routes>
          <Route path='/' element={<App />} />
          <Route path='/settings' element={<Settings />} />
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
