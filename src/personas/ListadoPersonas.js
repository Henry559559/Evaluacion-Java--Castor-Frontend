import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
export default function ListadoPersonas() {
 
    const urlBase ="http://localhost:8080/rh-app/personas";

    const [personas, setPersonas] = useState([]);

    useEffect(() => {
        cargarPersonas();
    }, []);

    const cargarPersonas = async () => {
        const resultado = await axios.get(urlBase);
        setPersonas(resultado.data);
    }

    const eliminarEmpleado = async (id) =>{
        await axios.delete(`${urlBase}/${id}`)
        cargarPersonas();
    }

  return (
    <div className='container'>
        <div className="container text-center" style={{margin:"30px"}}>
                <h3>Listado de Persona</h3>
        </div>
        <table className="table table-striped table-hover aling-middle ">
            <thead className='table-dark'>
                <tr>
                <th scope="col">identificacion</th>
                <th scope="col">Nombre</th>
                <th scope="col">correo</th>    
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    //Iteramos el Arreglo De personas
                    personas.map((persona, indice)=> (
                        <tr key={indice}>
                            <th scope="row">{persona.identificacion}</th>
                            <td>{persona.nombre}</td>
                            <td>{persona.correo}</td>
                            <td className='text-center'>
                                <div>
                                    <Link to={`/editarPersonas/${persona.idPersona}`} 
                                    className='btn btn-warning btn-sm me-2'>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(persona.idPersona)} className='btn btn-danger btn-sm'>Eliminar</button>
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