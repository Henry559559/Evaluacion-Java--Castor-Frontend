import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { NumericFormat } from 'react-number-format';
import { Link } from 'react-router-dom';

export default function ListadoEmpleados() {

    const urlBase ="http://localhost:8080/rh-app/empleados";

    const urlImage ="http://localhost:8080/react-pictures";

    const [empleados, setEmpleados] = useState([]);

    useEffect(() => {
        cargarEmpleados();
    }, []);

    const cargarEmpleados = async () => {
        const resultado = await axios.get(urlBase);
        console.log("Resultado Cargar Empleados");
        console.log(resultado.data);
        setEmpleados(resultado.data);
    }

    const eliminarEmpleado = async (id) =>{
        await axios.delete(`${urlBase}/${id}`)
        cargarEmpleados();
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
                <th scope="col">Nombre</th>
                <th scope="col">cedula</th>
                <th scope="col">Departamento</th>
                <th scope="col">Fecha De Ingreso</th>
                <th scope="col">Sueldo</th>
                <th scope="col">Cargo</th>
                <th scope="col">Foto</th>
                <th></th>
                </tr>
            </thead>
            <tbody>
                {
                    //Iteramos el Arreglo De empleados
                    empleados.map((empleado, indice)=> (
                        <tr key={indice}>
                            <th scope="row">{empleado.idEmpleado}</th>
                            <td>{empleado.nombre}</td>
                            <td>{empleado.cedula}</td>
                            <td>{empleado.departamento}</td>
                            <td>{formatearFecha(empleado.fechaIngreso)}</td>
                            <td><NumericFormat value={empleado.sueldo}
                                displayType={'text'}
                                thousandSeparator=',' prefix={'$'}
                                decimalScale={2} fixedDecimalScale/>
                            </td>
                            <td>{empleado.cargo ? empleado.cargo.cargo : 'Sin cargo'}</td>
                            <td>
                                <img src={`${urlImage}/${empleado.foto}`} alt={empleado.nombre} style={{width: "100px"}}/>
                            </td>
                            <td className='text-center'>
                                <div>
                                    <Link to={`/editar/${empleado.idEmpleado}`} 
                                    className='btn btn-warning btn-sm me-2'>Editar</Link>
                                    <button onClick={() => eliminarEmpleado(empleado.idEmpleado)} className='btn btn-danger btn-sm'>Eliminar</button>
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
