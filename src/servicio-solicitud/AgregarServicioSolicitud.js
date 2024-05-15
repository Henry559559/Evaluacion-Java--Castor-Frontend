import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarServicioSolicitud() {
    let navegacion = useNavigate();
    const urlBase = "http://localhost:8080/rh-app/servicio-solicitudes";
    const [servicioSolicitud, setServicioSolicitud] = useState({
        descripcionServicio:""
    })
   
    const {descripcionServicio} = servicioSolicitud;
  
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setServicioSolicitud({ ...servicioSolicitud, [name]: value });
    } 
     

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('descripcionServicio', descripcionServicio);
        try {
            const response = await axios.post(urlBase, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Si la respuesta es exitosa, redirigimos
            navegacion('/listadoServicioSolicitud');
        } catch (error) {
            console.error('Error al agregar persona:', error);
            alert('Error al agregar persona');
        }
        
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin:"30px"}}>
            <h3>Agregar Servicio Solicitud</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="descripcionServicio" className="form-label">descripcion</label>
                <input type="text" value={descripcionServicio} onChange={(e)=> onInputChange(e)} className="form-control" id="descripcionServicio" name='descripcionServicio'
                 required={true}/>
            </div>
            <div className='text-center'>
                <button  className="btn btn-warning btn-sm me-3">Agregar Persona</button>
                <a href='/listadoPersonas' className='btn btn-danger btn-sm'>Regresar</a>
            </div>
        </form>
    </div>
  )
}