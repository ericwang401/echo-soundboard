import App from '@/App'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import { store } from '@/state'
import { StoreProvider } from 'easy-peasy'

ReactDOM.render(
  <React.StrictMode>
    <StoreProvider store={store}>
      <App />
    </StoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
