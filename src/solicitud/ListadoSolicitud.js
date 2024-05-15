import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoSolicitud() {
    const urlBase ="http://localhost:8080/rh-app/solicitudes";

    const [solicitudes, setSolicitudes] = useState([]);

    useEffect(() => {
        cargarSolicitudes();
    }, []);

    const cargarSolicitudes = async () => {
        const resultado = await axios.get(urlBase);
        setSolicitudes(resultado.data);
    }

    const eliminarEmpleado = async (id) =>{
        await axios.delete(`${urlBase}/${id}`)
        cargarSolicitudes();
    }
    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const año = date.getFullYear();
        return `${dia}/${mes}/${año}`;
    };

  return (
    <div className='container'>
        <div className="container text-center" style={{margin:"30px"}}>
                <h3>Sitema De Recursos Humanos</h3>
        </div>
        <table className="table table-striped table-hover aling-middle ">
            <thead className='table-dark'>
                <tr>
                <th scope="col">Id</th>
                <th scope="col">Estado Solicitud</th>
                <th scope="col">Fecha Solicitud</th>
                <th scope="col">Descripcion Servicio Solicitud</th>
                <th scope="col">Nombre Solicitante</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    //Iteramos el Arreglo De solicitudes
                    solicitudes.map((solicitud, indice)=> (
                        <tr key={indice}>
                            <th scope="row">{solicitud.idSolicitud}</th>
                            <td>{solicitud.estadoSolicitud}</td>
                            <td>{formatearFecha(solicitud.fechaSolicitud)}</td>
                            <td>{solicitud.servicioSolicitud ? solicitud.servicioSolicitud.descripcionServicio : 'Sin cargo'}</td>
                            <td>{solicitud.persona ? solicitud.persona.nombre : 'Sin cargo'}</td>
                            <td className='text-center'>
                                <div>
                                    <Link to={`/editarSolicitud/${solicitud.idSolicitud}`} 
                                    className='btn btn-warning btn-sm me-2'>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(solicitud.idSolicitud)} className='btn btn-danger btn-sm'>Eliminar</button>
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