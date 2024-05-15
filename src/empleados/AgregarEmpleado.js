import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgregarEmpleado() {
    let navegacion = useNavigate();
    const urlBase = "http://localhost:8080/rh-app/empleados";
    const urlCargo = "http://localhost:8080/rh-app/cargo";
    const [empleado, setEmpleado] = useState({
        nombre:"",
        cedula:"",
        departamento:"",
        fechaIngreso:"",
        sueldo:"",
        foto:""
    })
    useEffect(() => {
        cargarCargos();
    }, []);

    const {nombre, cedula, departamento, sueldo, foto, fechaIngreso} = empleado;
    const [preview, setPreview] = useState(null);
    const [newFileName, setNewFileName] = useState('');
    const [file, setFile] = useState(null);
    const [cargos, setCargos] = useState([]); // Cambiado a plural para mayor claridad
    

    const cargarCargos = async () => {
        const resultado = await axios.get(urlCargo);
        setCargos(resultado.data);
    }
    const [selectedCargo, setSelectedCargo] = useState('');

    const onInputChange = (e) => {
        //spread operator ... (expandir los atributos)
        setEmpleado({...empleado, [e.target.name]: e.target.value})
    } 
    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg')) {
            setFile(selectedFile);
            setPreview(URL.createObjectURL(selectedFile));
        } else {
            alert('Solo se permiten archivos .png y .jpg');
        }
    };

    const handleCargoChange = (e) => {
        const selectedId = e.target.value;
        setSelectedCargo(selectedId);
    };
    const handleFileNameChange = (e) => {
        setNewFileName(e.target.value);
    };

   

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const integerNumber = Number(selectedCargo);
        formData.append('nombre', nombre);
        formData.append('cedula', cedula);
        formData.append('departamento', departamento);
        formData.append('sueldo', sueldo);
        formData.append('fechaIngreso', fechaIngreso);
        formData.append('idCargo', integerNumber);
        if (file) {
            formData.append('foto', file, newFileName || file.name);
        }
        try {
            const response = await axios.post(urlBase, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            // Si la respuesta es exitosa, redirigimos
            navegacion('/');
        } catch (error) {
            console.error('Error al agregar empleado:', error);
            alert('Error al agregar empleado');
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
                <label htmlFor="cedula" className="form-label">Cedula</label>
                <input type="text" value={cedula} onChange={(e)=> onInputChange(e)} className="form-control" id="cedula" name='cedula'
                 required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="departamento" className="form-label">Departamento</label>
                <input type="text" value={departamento} onChange={(e)=> onInputChange(e)} className="form-control" id="departamento" name='departamento'
                 required={true}/>
            </div>
            <div className="mb-3">
                <label htmlFor="sueldo" className="form-label">Sueldo</label>
                <input type="number" step="any"  value={sueldo} onChange={(e)=> onInputChange(e)} className="form-control" id="sueldo" name='sueldo'
                 required={true}/>
            </div>
            <div className="mb-3">
                    <label htmlFor="cargo" className="form-label">Cargo</label>
                    <select className="form-select" value={selectedCargo} onChange={handleCargoChange} required>
                        <option value="">Seleccione un cargo</option>
                        {cargos.map((elemento, index) => (
                           <option key={index} value={elemento.idCargo}>
                                {elemento.cargo}
                           </option>
                        ))}
                    </select>
            </div>
            <div className="mb-3">
                <label htmlFor="fechaIngreso" className="form-label">Fecha De Ingreso</label>
                <input type="date" step="any"  value={fechaIngreso} onChange={(e)=> onInputChange(e)} className="form-control" id="fechaIngreso" name='fechaIngreso'
                 required={true}/>
            </div>
            <div className="mb-3">
                    <label htmlFor="foto" className="form-label">Foto</label>
                    <input type="file" accept=".png, .jpg" onChange={handleFileChange} className="form-control" id="foto" name='foto' />
                    {preview && (
                        <div>
                            <img src={preview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />
                        </div>
                    )}
            </div>
            <div className="mb-3">
                    <label htmlFor="newFileName" className="form-label">Nuevo nombre del archivo</label>
                    <input type="text" value={newFileName} onChange={handleFileNameChange} className="form-control" id="newFileName" name='newFileName' required/>
            </div>
            <div className='text-center'>
                <button  className="btn btn-warning btn-sm me-3">Agregar Empleado</button>
                <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
            </div>
        </form>
    </div>
  )
}
