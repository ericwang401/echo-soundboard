import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import NavigationBar from './components/NavigationBar'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <NavigationBar />

      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/test' />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
)
