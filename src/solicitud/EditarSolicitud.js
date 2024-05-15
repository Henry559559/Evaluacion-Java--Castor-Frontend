import axios from 'axios';
import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function EditarSolicitud() {
    let navegacion = useNavigate();
    const { id } = useParams();
    const urlBase = "http://localhost:8080/rh-app/solicitudes";
    const urlServicioSolicitante = "http://localhost:8080/rh-app/servicio-solicitudes";
    const urlPersona = "http://localhost:8080/rh-app/personas";
    const [solicitud, setSolicitud] = useState({
        estadoSolicitud: "",
        fechaSolicitud: ""
    });
    const { estadoSolicitud, fechaSolicitud } = solicitud;
    const [servicioSolicitud, setServicioSolicitud] = useState([]);
    const [persona, setPersona] = useState([]);
    const [selectedServicioSolicitud, setSelectedServicioSolicitud] = useState('');
    const [selectedPersona, setSelectedPersona] = useState('');

    const formatearFecha = (fecha) => {
        const date = new Date(fecha);
        const dia = String(date.getDate()).padStart(2, '0');
        const mes = String(date.getMonth() + 1).padStart(2, '0');
        const año = date.getFullYear();
        return `${año}-${mes}-${dia}`;
    };

    const cargarDatosIniciales = useCallback(async () => {
        try {
            const [servicioSolicitudRes, personaRes] = await Promise.all([
                axios.get(urlServicioSolicitante),
                axios.get(urlPersona),
            ]);

            setServicioSolicitud(servicioSolicitudRes.data);
            setPersona(personaRes.data);

            const resultado = await axios.get(`${urlBase}/${id}`);
            const solicitudData = resultado.data;
            solicitudData.fechaSolicitud = formatearFecha(solicitudData.fechaSolicitud);
            setSolicitud(solicitudData);

            const solicitudPersona = personaRes.data.find(persona => persona.idPersona === solicitudData.persona.idPersona);
            const svcSolicitud = servicioSolicitudRes.data.find(svcSolicitud => svcSolicitud.idServicioSolicitud === solicitudData.servicioSolicitud.idServicioSolicitud);
            setSelectedPersona(solicitudPersona ? solicitudPersona.idPersona : '');
            setSelectedServicioSolicitud(svcSolicitud ? svcSolicitud.idServicioSolicitud : '');
        } catch (error) {
            console.error('Error al cargar datos:', error);
        }
    }, [id, urlBase, urlPersona, urlServicioSolicitante]);

    useEffect(() => {
        cargarDatosIniciales();
    }, [cargarDatosIniciales]);

    const onInputChange = (e) => {
        setSolicitud({ ...solicitud, [e.target.name]: e.target.value });
    }

    const handleServicioSolicitudChange = (e) => {
        const selectedId = e.target.value;
        setSelectedServicioSolicitud(selectedId);
    };

    const handlePersonaChange = (e) => {
        const selectedId = e.target.value;
        setSelectedPersona(selectedId);
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        const integerNumber = Number(selectedServicioSolicitud);
        const integerNumber1 = Number(selectedPersona);
        formData.append('estadoSolicitud', estadoSolicitud);
        formData.append('fechaSolicitud', fechaSolicitud);
        formData.append('idServicioSolicitud', integerNumber);
        formData.append('idPersona', integerNumber1);
        try {
            await axios.put(`${urlBase}/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            navegacion('/listadoSolicitud');
        } catch (error) {
            console.error('Error al agregar solicitud:', error);
            alert('Error al agregar solicitud');
        }
    }

    return (
        <div className='container'>
            <div className='container text-center' style={{ margin: "30px" }}>
                <h3>Editar Solicitud</h3>
            </div>

            <form onSubmit={onSubmit}>
                <div className="mb-3">
                    <label htmlFor="estadoSolicitud" className="form-label">Estado Solicitud</label>
                    <select value={estadoSolicitud} onChange={onInputChange} className="form-select mb-3" id="estadoSolicitud" name="estadoSolicitud" required>
                        <option value="">Seleccione un estado</option>
                        <option value="pendiente">Pendiente</option>
                        <option value="aprobado">Aprobado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="fechaSolicitud" className="form-label">Fecha De Ingreso</label>
                    <input type="date" step="any" value={fechaSolicitud} onChange={onInputChange} className="form-control" id="fechaSolicitud" name='fechaSolicitud' required={true} />
                </div>
                <div className="mb-3">
                    <label htmlFor="servicioSolicitud" className="form-label">Servicio Solicitud</label>
                    <select className="form-select mb-3" value={selectedServicioSolicitud} onChange={handleServicioSolicitudChange} required>
                        <option value="">Seleccione un cargo</option>
                        {servicioSolicitud.map((elemento, index) => (
                            <option key={index} value={elemento.idServicioSolicitud}>
                                {elemento.descripcionServicio}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="persona" className="form-label">Persona</label>
                    <select className="form-select mb-3" value={selectedPersona} onChange={handlePersonaChange} required>
                        <option value="">Seleccione una persona</option>
                        {persona.map((elemento, index) => (
                            <option key={index} value={elemento.idPersona}>
                                {elemento.nombre} - {elemento.identificacion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className='text-center'>
                    <button className="btn btn-warning btn-sm me-3">Actualizar Empleado</button>
                    <a href='/listadoSolicitud' className='btn btn-danger btn-sm'>Regresar</a>
                </div>
            </form>
        </div>
    );
}
