import { BrowserRouter, Route, Routes } from "react-router-dom";
import ListadoEmpleados from "./empleados/ListadoEmpleados";
import Navegacion from "./plantilla/Navegacion";
import AgregarEmpleado from "./empleados/AgregarEmpleado";
import EditarEmpleado from "./empleados/EditarEmpleado";
import ListadoPersonas from "./personas/ListadoPersonas";
import AgregarPersonas from "./personas/AgregarPersonas";
import EditarPersona from "./personas/EditarPersona";
import ListadoServicioSolicitud from "./servicio-solicitud/ListadoServicioSolcitud";
import AgregarServicioSolicitud from "./servicio-solicitud/AgregarServicioSolicitud";
import EditarServicioSolicitud from "./servicio-solicitud/EditarServicioSolicitud";
import ListadoSolicitud from "./solicitud/ListadoSolicitud";
import AgregarSolicitud from "./solicitud/AgregarSolicitud";
import EditarSolicitud from "./solicitud/EditarSolicitud";

function App() {
  return (
    <div className="container">
      <BrowserRouter>
        <Navegacion/>
        <Routes>
          <Route exact path='/' element={<ListadoEmpleados/>}/>
          <Route exact path="/agregar" element={<AgregarEmpleado/>}/>
          <Route exact path="/editar/:id" element={<EditarEmpleado/>}/>
          <Route exact path="/listadoPersonas" element={<ListadoPersonas/>}/>
          <Route exact path="/agregarPersonas" element={<AgregarPersonas/>}/>
          <Route exact path="/editarPersonas/:id" element={<EditarPersona/>}/>
          <Route exact path="/listadoServicioSolicitud" element={<ListadoServicioSolicitud/>}/>
          <Route exact path="/agregarServicioSolicitud" element={<AgregarServicioSolicitud/>}/>
          <Route exact path="/editarServicioSolicitud/:id" element={<EditarServicioSolicitud/>}/>
          <Route exact path="/listadoSolicitud" element={<ListadoSolicitud/>}/>
          <Route exact path="/agregarSolicitud" element={<AgregarSolicitud/>}/>
          <Route exact path="/editarSolicitud/:id" element={<EditarSolicitud/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
