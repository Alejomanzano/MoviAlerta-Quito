import {BrowserRouter, Routes, Route, Link} from 'react-router-dom'

import './App.css'

function Inicio(){

  return(
    <div className='home'>
      <header className='header'>
        <Link to="/" className="brand">
          <span className='brand-icon'>M</span>
          <span className="brand-name">
            MoviAlerta 
            <small>Quito</small>
          </span>
        </Link>

        <nav className="navigation">
          <Link to= "/" className='nav-active'>Inicio</Link>
          <Link to= "/planificar-viaje" >Planificar Viaje</Link>
          <Link to= "/incidencias" >Incidencias</Link>
        </nav>

        <Link to="/planificar-viaje" className="header-button">Comenzar</Link>
      </header>
    </div>
  )
}

export default Inicio