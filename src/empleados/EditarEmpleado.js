import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarEmpleado() {
    const urlBase = "http://localhost:8080/rh-app/empleados";
    const urlImage = "http://localhost:8080/react-pictures";
    const urlCargo = "http://localhost:8080/rh-app/cargo";
    let navegacion = useNavigate();

    const { id } = useParams();

    const [empleado, setEmpleado] = useState({
        nombre:"",
        cedula:"",
        departamento:"",
        fechaIngreso: new Date(),
        sueldo:"",
        foto:""
    });
    const {nombre, cedula, departamento, sueldo, foto, fechaIngreso} = empleado;
    const [preview, setPreview] = useState(null);
    const [newFileName, setNewFileName] = useState('');
    const [file, setFile] = useState(null);

    useEffect(() => {
        cargarCargos();
    }, []);

    const [cargos, setCargos] = useState([]); // Cambiado a plural para mayor claridad
    const cargarCargos = async () => {
        const resultado = await axios.get(urlCargo);
        setCargos(resultado.data);
        cargarEmpleado(resultado.data);
    }
    const [selectedCargo, setSelectedCargo] = useState('');

    const cargarEmpleado = async (cargosData) => {
        try {
            const resultado = await axios.get(`${urlBase}/${id}`);
            const empleadoData = resultado.data;
            empleadoData.fechaIngreso = formatearFecha(empleadoData.fechaIngreso);
            setEmpleado(empleadoData);
            setPreview(resultado.data.foto ? `${urlImage}/${resultado.data.foto}` : null);
            setNewFileName(resultado.data.foto ? resultado.data.foto.split('/').pop() : '');
            const cargoEmpleado = cargosData.find(cargo => cargo.idCargo === empleadoData.cargo.idCargo);
            setSelectedCargo(cargoEmpleado ? cargoEmpleado.idCargo : '');
        } catch (error) {
            console.error('Error al cargar datos del empleado:', error);
        }
    };

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0'); // Los meses empiezan desde 0
        const año = date.getFullYear();
        return `${año}-${mes}-${dia}`;
    };

    const onInputChange = (e) => {
        setEmpleado({ ...empleado, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile && (selectedFile.type === 'image/png' || selectedFile.type === 'image/jpeg')) {
            const filePreviewUrl = URL.createObjectURL(selectedFile);
            setPreview(filePreviewUrl);
            setFile(selectedFile);
            setNewFileName(selectedFile.name);
        } else {
            alert('Solo se permiten archivos .png y .jpg');
            setFile(null);
            setPreview(null);
            setNewFileName('');
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
            const fileExtension = file.name.split('.').pop();
            const newFile = new File([file], `${newFileName}.${fileExtension}`, { type: file.type });
            formData.append('foto', newFile);
        }

        try {
            await axios.put(`${urlBase}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navegacion('/');
        } catch (error) {
            console.error('Error al actualizar el empleado:', error);
        }
    };

    const renderImage = () => {
        if (!preview) return null;
        return (
            <div>
                <img src={preview} alt="Preview" style={{ marginTop: '10px', maxHeight: '200px' }} />
            </div>
        );
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
                    <label htmlFor="cedula" className="form-label">Cedula</label>
                    <input type="text" value={cedula} onChange={(e)=> onInputChange(e)} className="form-control" id="cedula" name='cedula'
                    required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="departamento" className="form-label">Departamento</label>
                    <input type="text" value={departamento} onChange={onInputChange} className="form-control" id="departamento" name='departamento' required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaIngreso" className="form-label">Fecha De Ingreso</label>
                    <input type="date" step="any"  disabled value={fechaIngreso} onChange={(e)=> onInputChange(e)} className="form-control" id="fechaIngreso" name='fechaIngreso'
                    required={true}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="sueldo" className="form-label">Sueldo</label>
                    <input type="number" step="any" value={sueldo} onChange={onInputChange} className="form-control" id="sueldo" name='sueldo' required={true} />
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
                    <label htmlFor="foto" className="form-label">Foto</label>
                    <input type="file" accept=".png, .jpg" onChange={handleFileChange} className="form-control" id="foto" name='foto' />
                </div>
                <div className="mb-3">
                    {renderImage()}
                </div>
                <div className="mb-3">
                    <label htmlFor="newFileName" className="form-label">Nombre del Archivo</label>
                    <input type="text" value={newFileName} onChange={handleFileNameChange} className="form-control" id="newFileName" name='newFileName' required />
                </div>
                <div className='text-center'>
                    <button className="btn btn-warning btn-sm me-3">Actualizar Empleado</button>
                    <a href='/' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
