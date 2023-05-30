import React from 'react'
import ReactDOM from 'react-dom/client'
import {Prodider} from 'react-redux'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Prodider>
        <App />
    </Prodider> 
  </React.StrictMode>,
)
