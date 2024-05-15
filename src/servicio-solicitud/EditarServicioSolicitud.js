import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
export default function EditarServicioSolicitud() {
    const urlBase = "http://localhost:8080/rh-app/servicio-solicitudes";
    let navegacion = useNavigate();

    const { id } = useParams();

    const [servicioSolicitud, setServicioSolicitud] = useState({
        descripcionServicio:""
    })
   
    const {descripcionServicio} = servicioSolicitud;

    useEffect(() => {
        cargarServicioSolicitud();
    }, []);

    const cargarServicioSolicitud = async () => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            const descripcionServicioData = resultado.data;
            setServicioSolicitud(descripcionServicioData);
        } catch (error) {
            console.error('Error al cargar datos del empleado:', error);
        }
    };

    const onInputChange = (e) => {
        const { name, value } = e.target;
        setServicioSolicitud({ ...descripcionServicio, [name]: value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('descripcionServicio', descripcionServicio);
        try {
            await axios.put(`${urlBase}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navegacion('/listadoServicioSolicitud');
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
        }
    };

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Empleado</h3>
            </div>

            <form onSubmit={onSubmit}>
            <div className="mb-3">
                <label htmlFor="descripcionServicio" className="form-label">descripcion</label>
                <input type="text" value={descripcionServicio} onChange={(e)=> onInputChange(e)} className="form-control" id="descripcionServicio" name='descripcionServicio'
                 required={true}/>
            </div>
                <div className='text-center'>
                    <button className="btn btn-warning btn-sm me-3">Actualizar Empleado</button>
                    <a href='/listadoServicioSolicitud' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}