import './App.css'
import { useState, useContext, useEffect } from 'react'
import Menu from './components/Menu/menu'
import Networking from './components/Networking/Networking'
import Login from './components/Login/Login'
import Organizador from './components/Organizador/organizador'
import { Outlet, useNavigate } from 'react-router-dom'
import ModalError from './components/ModalError/ModalError'
import { ErroProvider, ErroContext } from './Contexts/ModalErroContext'
import ModalCarregando from './components/ModalCarregando/ModalCarregando'

 
function App() {

  const navigate = useNavigate()

  
  const {temErro, carregando, logged, setLogged, setUsuario, setTemErro, setTamTela} = useContext(ErroContext)

  useEffect(() => {
    const {innerWidth: width} = window
    setTamTela(width)
    fetch("http://localhost:3000/confereToken", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => {
      if(data[0] == "erro"){
        setLogged(false)
        localStorage.setItem("authToken", "")
      }else{
        setLogged(true)
        navigate("/")
        fetch("http://localhost:3000/Usuario", {headers: {"authorization": localStorage.getItem("authToken")? `Bearer ${localStorage.getItem("authToken")}` : ""}}).then(res => res.json()).then(data => setUsuario(data[0])).catch(() => setTemErro(true))
      }
    }).catch(() => setTemErro(true))
  }, [])
  

  return ( 
    <>
      {
        logged ?
        <div className='h-screen flex flex-col relative'>
          <Menu/>
          <Outlet/>
          {
            temErro &&
            <ModalError/>
          }
          {
            carregando &&
            <ModalCarregando/>
          }
        </div>
      :
        <Login/>
      }
    </>
  )
}

export default App
