import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Networking from "./components/Networking/Networking.tsx"
import Organizador from './components/Organizador/organizador.tsx'
import PaginaPrincipal from './components/PaginaPrincipal/PaginaPrincipal.tsx'
import { ErroProvider } from './Contexts/ModalErroContext'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <ErroProvider>
        <Routes>
          <Route path='/' element={<App/>}>
            <Route path='/Networking' element={<Networking/>}></Route>
            <Route path='/Organizador' element={<Organizador/>}></Route>
            <Route path='/' element={<PaginaPrincipal/>}></Route>
          </Route>
        </Routes>
      </ErroProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
