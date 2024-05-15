import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
export default function AgregarPersonas() {
    let navegacion = useNavigate();
    const urlBase = "http://localhost:8080/rh-app/personas";
    const [persona, setPersona] = useState({
        nombre:"",
        correo:"",
        identificacion:"",
    })
   
    const {nombre, correo, identificacion} = persona;
    const [isCorreoValid, setIsCorreoValid] = useState(true);
  
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });
        if (name === 'correo') {
            setIsCorreoValid(e.target.checkValidity());
        }
    } 
     

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('nombre', nombre);
        formData.append('correo', correo);
        formData.append('identificacion', identificacion);
        try {
            const response = await axios.post(urlBase, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Si la respuesta es exitosa, redirigimos
            navegacion('/listadoPersonas');
        } catch (error) {
            console.error('Error al agregar persona:', error);
            alert('Error al agregar persona');
        }
        
    }

  return (
    <div className='container'>
        <div className='container text-center' style={{margin:"30px"}}>
            <h3>Agregar Empleado</h3>
        </div>

        <form onSubmit={(e) => onSubmit(e)}>
            <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre</label>
                <input type="text" value={nombre} onChange={(e)=> onInputChange(e)} className="form-control" id="nombre" name='nombre'
                 required={true}/>
            </div>
            <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input type="email" value={correo} onChange={onInputChange} className={`form-control ${!isCorreoValid ? 'is-invalid' : ''}`} 
                        id="correo" name='correo' required pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" />
                    {!isCorreoValid && (
                        <div className="invalid-feedback">
                            Por favor ingresa un correo electrónico válido.
                        </div>
                    )}
            </div>
            <div className="mb-3">
                <label htmlFor="identificacion" className="form-label">identificacion</label>
                <input type="text" value={identificacion} onChange={(e)=> onInputChange(e)} className="form-control" id="identificacion" name='identificacion'
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