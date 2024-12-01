import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster, toast } from 'react-hot-toast'
import { Analytics } from "@vercel/analytics/react"

createRoot(document.getElementById('root')).render(
  
  // <StrictMode>
    <BrowserRouter>
      <Analytics/>
      <App className='bg-gradient-to-r from-blue-950 to-black'/>
      <Toaster />
    </BrowserRouter>
  // </StrictMode>
)