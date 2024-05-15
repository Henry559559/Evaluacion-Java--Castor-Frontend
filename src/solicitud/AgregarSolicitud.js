import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarSolicitud() {

    let navegacion = useNavigate();
    const urlBase = "http://localhost:8080/rh-app/solicitudes";
    const urlServicioSolicitante = "http://localhost:8080/rh-app/servicio-solicitudes";
    const urlPersona = "http://localhost:8080/rh-app/personas";
    const [solicitud, setSolicitud] = useState({
        estadoSolicitud:"",
        fechaSolicitud:""
    })
    useEffect(() => {
        cargarServicioSolicitud();
        cargarPersona();
    }, []);

    const {estadoSolicitud, fechaSolicitud} = solicitud;
    const [servicioSolicitud, setServicioSolicitud] = useState([]); // Cambiado a plural para mayor claridad
    const [persona, setPersona] = useState([]); // Cambiado a plural para mayor claridad

    const cargarServicioSolicitud = async () => {
        const resultado = await axios.get(urlServicioSolicitante);
        setServicioSolicitud(resultado.data);
    }
    const cargarPersona = async () => {
        const resultado = await axios.get(urlPersona);
        setPersona(resultado.data);
    }
    const [selectedServicioSolicitud, setSelectedServicioSolicitud] = useState('');
    const [selectedPersona, setSelectedPersona] = useState('');
    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setSolicitud({...solicitud, [e.target.name]: e.target.value})
    } 

    const handleServicioSolicitudChange = (e) => {
        const selectedId = e.target.value;
        setSelectedServicioSolicitud(selectedId);
    };

    const handlePersonaChange = (e) => {
        const selectedId = e.target.value;
        setSelectedPersona(selectedId);
    };
      

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const integerNumber = Number(selectedServicioSolicitud);
        const integerNumber1 = Number(selectedPersona);
        formData.append('estadoSolicitud', estadoSolicitud);
        formData.append('fechaSolicitud', fechaSolicitud);
        formData.append('idServicioSolicitud', integerNumber);
        formData.append('idPersona', integerNumber1);
        try {
            const response = await axios.post(urlBase, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Si la respuesta es exitosa, redirigimos
            navegacion('/listadoSolicitud');
        } catch (error) {
            console.error('Error al agregar solicitud:', error);
            alert('Error al agregar solicitud');
        }
        
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin:"30px"}}>
            <h3>Agregar Empleado</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="estadoSolicitud" className="form-label">Estado Solicitud</label>
                <select value={estadoSolicitud} onChange={(e) => onInputChange(e)} className="form-select mb-3" id="estadoSolicitud" name="estadoSolicitud" required>
                    <option value="">Seleccione un estado</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobado">Aprobado</option>
                    <option value="rechazado">Rechazado</option>
                </select>
            </div>
            <div className="mb-3">
                <label htmlFor="fechaSolicitud" className="form-label">Fecha De Ingreso</label>
                <input type="date" step="any"  value={fechaSolicitud} onChange={(e)=> onInputChange(e)} className="form-control" id="fechaSolicitud" name='fechaSolicitud'
                 required={true}/>
            </div>
            <div className="mb-3">
                    <label htmlFor="servicioSolicitud" className="form-label">Servicio Solicitud</label>
                    <select className="form-select  mb-3" value={selectedServicioSolicitud} onChange={handleServicioSolicitudChange} required>
                        <option value="">Seleccione un cargo</option>
                        {servicioSolicitud.map((elemento, index) => (
                           <option key={index} value={elemento.idServicioSolicitud}>
                                {elemento.descripcionServicio}
                           </option>
                        ))}
                    </select>
            </div>
            <div className="mb-3">
                    <label htmlFor="persona" className="form-label">Persona</label>
                    <select className="form-select mb-3" value={selectedPersona} onChange={handlePersonaChange} required>
                        <option value="">Seleccione un cargo</option>
                        {persona.map((elemento, index) => (
                           <option key={index} value={elemento.idPersona}>
                                {elemento.nombre} - {elemento.identificacion}
                           </option>
                        ))}
                    </select>
            </div>
            <div className='text-center'>
                <button  className="btn btn-warning btn-sm me-3">Agregar Empleado</button>
                <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
            </div>
        </form>
    </div>
  )
}