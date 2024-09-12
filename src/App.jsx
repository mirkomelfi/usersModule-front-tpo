import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import {Register} from  './components/Register/Register'  
import { OlvidoContraseña } from './components/OlvidoContraseña/OlvidoContraseña';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import UsuarioListContainer from './components/UsuarioListContainer/UsuarioListContainer';
import { Usuario } from './components/Usuario/Usuario';
import { UsuarioPut } from './components/Usuario/UsuarioPUT';
import { Logout } from './components/Logout/Logout';
import { SuperAdmin } from './components/SuperAdmin/SuperAdmin';
import { Noticias } from './components/Noticias/Noticias';
import {Contactos} from './components/Contactos/Contactos';
import {Productos} from './components/Productos/Productos';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/olvidoContraseña' element={<OlvidoContraseña />} />
          <Route path='/superAdmin' element={<SuperAdmin />} />
          <Route path='/noticias' element={<Noticias />} />
          <Route path='/contactos' element={<Contactos />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/' element={<Home />} />
          <Route path="/usuarios" element={<UsuarioListContainer greeting="Listado de Usuarios"/>}/>
          <Route path="/usuarios/:dni" element={<Usuario />}/> 
          <Route path="/updateUsuario/:dni" element={<UsuarioPut />}/> 
          <Route path="/usuario/current" element={<Usuario />}/> 
          <Route path="/updateUsuario" element={<UsuarioPut  fromPerfil={true}  />}/>

          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}