import React from 'react'
import { Link } from 'react-router-dom';

export default function Navegacion() {
    const estilo1 = { display: "flex", justifyContent: "center" };
    const estilo2 = { alignItems: "center", padding: "10px" };
  return (
    
        <nav className="navbar navbar-expand-lg navbar-dark bg-black bg-gradient">
            <div className='container'>
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Sistema De Recursos Humanos</a>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="/">Inico</a>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/agregar">Agregar Empleado</Link>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Persona
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/listadoPersonas">Listado De Persona</Link></li>
                                <li><Link className="dropdown-item" to="/agregarPersonas">Agregar Personas</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Servicio Solicitud
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/listadoServicioSolicitud">Listado De  Servicio Solicitud</Link></li>
                                <li><Link className="dropdown-item" to="/agregarServicioSolicitud">Agregar  Servicio Solicitud</Link></li>
                            </ul>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Solicitud
                            </a>
                            <ul className="dropdown-menu">
                                <li><Link className="dropdown-item" to="/listadoSolicitud">Listado De Solicitud</Link></li>
                                <li><Link className="dropdown-item" to="/agregarSolicitud">Agregar Solicitud</Link></li>
                            </ul>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </nav>
  )
}
