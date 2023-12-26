import './App.css'
import Menu from './components/Menu/menu'
import Organizador from './components/Organizador/organizador'

function App() {


  return (
    <div className='h-screen flex flex-col relative'>
      <Menu/>
      <Organizador/>
    </div>
  )
}

export default App
