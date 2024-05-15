import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function ListadoServicioSolicitud() {
    
    const urlBase ="http://localhost:8080/rh-app/servicio-solicitudes";

    const [servicioSolicitudes, setServicioSolicitud] = useState([]);

    useEffect(() => {
        cargarServicioSolicitud();
    }, []);

    const cargarServicioSolicitud = async () => {
        const resultado = await axios.get(urlBase);
        setServicioSolicitud(resultado.data);
    }

    const eliminarEmpleado = async (id) =>{
        await axios.delete(`${urlBase}/${id}`)
        cargarServicioSolicitud();
    }

  return (
    <div className='container'>
        <div className="container text-center" style={{margin:"30px"}}>
                <h3>Listado Servicio Solicitud</h3>
        </div>
        <table className="table table-striped table-hover aling-middle ">
            <thead className='table-dark'>
                <tr>
                <th scope="col">id</th>
                <th scope="col">Descripcion</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    //Iteramos el Arreglo De servicioSolicitud
                    servicioSolicitudes.map((servicioSolicitud, indice)=> (
                        <tr key={indice}>
                            <th scope="row">{servicioSolicitud.idServicioSolicitud}</th>
                            <td>{servicioSolicitud.descripcionServicio}</td>
                            <td className='text-center'>
                                <div>
                                    <Link to={`/editarServicioSolicitud/${servicioSolicitud.idServicioSolicitud}`} 
                                    className='btn btn-warning btn-sm me-2'>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(servicioSolicitud.idServicioSolicitud)} className='btn btn-danger btn-sm'>Eliminar</button>
                                </div>
                            </td>
                        </tr>
                     ))
                }
            </tbody>
        </table>
    </div>
  )
}