import './App.css'
import Menu from './components/Menu/menu'
import Networking from './components/Networking/Networking'
import Login from './components/Login/Login'
import Organizador from './components/Organizador/organizador'
import { Outlet } from 'react-router-dom'


function App() {
  

  return (
    <>
      <Login/>
      <div className='h-screen flex flex-col relative'>
        <Menu/>
        <Outlet/>
      </div>
    </>
  )
}

export default App
