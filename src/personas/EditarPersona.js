import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function EditarPersona(){
    const urlBase = "http://localhost:8080/rh-app/personas";
    let navegacion = useNavigate();

    const { id } = useParams();

    const [persona, setPersona] = useState({
        nombre:"",
        correo:"",
        identificacion:"",
    })
   
    const {nombre, correo, identificacion} = persona;
    const [isCorreoValid, setIsCorreoValid] = useState(true);

    useEffect(() => {
        cargarPersona();
    }, []);

    const cargarPersona = async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            const personaData = resultado.data;
            setPersona(personaData);
        } catch (error) {
            console.error('Error al cargar datos del empleado:', error);
        }
    };
    const validateCorreo = (correo) => {
        const correoRegex = /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/;
        setIsCorreoValid(correoRegex.test(correo));
    };
    const onInputChange = (e) => {
        const { name, value } = e.target;
        setPersona({ ...persona, [name]: value });

        if (name === 'correo') {
            validateCorreo(value);
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        if (isCorreoValid) {
            const formData = new FormData();
            formData.append('nombre', nombre);
            formData.append('correo', correo);
            formData.append('identificacion', identificacion);
            try {
                await axios.put(`${urlBase}/${id}`, formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                navegacion('/listadoPersonas');
            } catch (error) {
                console.error('Error al actualizar el empleado:', error);
            }
                console.log('Formulario enviado', persona);
        } else {
            console.log('Formulario no enviado, correo no válido');
        }
        
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Empleado</h3>
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="nombre" className="form-label">Nombre</label>
                    <input type="text" value={nombre} onChange={onInputChange} className="form-control" id="nombre" name='nombre' required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="correo" className="form-label">Correo</label>
                    <input 
                        type="email" 
                        value={correo} 
                        onChange={onInputChange} 
                        className={`form-control ${!isCorreoValid ? 'is-invalid' : ''}`} 
                        id="correo" 
                        name="correo" 
                        required 
                        pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" 
                    />
                    {!isCorreoValid && (
                        <div className="invalid-feedback">
                            Por favor ingresa un correo electrónico válido.
                        </div>
                    )}
                </div>
                <div className="mb-3">
                    <label htmlFor="identificacion" className="form-label">Identificacion</label>
                    <input type="text" value={identificacion} onChange={onInputChange} className="form-control" id="identificacion" name='identificacion' required={true} />
                </div>
                <div className='text-center'>
                    <button className="btn btn-warning btn-sm me-3">Actualizar Empleado</button>
                    <a href='/listadoPersonas' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}