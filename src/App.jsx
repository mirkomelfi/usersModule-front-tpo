import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import {Register} from  './components/Register/Register'  
import { OlvidoContraseña } from './components/OlvidoContraseña/OlvidoContraseña';
import { Login } from './components/Login/Login';
import { Home } from './components/Home/Home';
import UsuarioListContainer from './components/UsuarioListContainer/UsuarioListContainer';
import { UsuarioViejo } from './components/VIEJO_Usuario/UsuarioViejo';
import { UsuarioPut } from './components/VIEJO_Usuario/UsuarioPUT';
import { Logout } from './components/Logout/Logout';
import { SuperAdmin } from './components/SuperAdmin/SuperAdmin';
import { Noticias } from './components/Noticias/Noticias';
import {Contactos} from './components/Contactos/Contactos';
import {Productos} from './components/Productos/Productos';
import { ListaCarrito } from './components/Productos/ListaCarrito';
import { NoticiasPost } from './components/Noticias/NoticiasPOST';
import { Noticia } from './components/Noticia/Noticia';
import { PerfilUsuario } from './components/Usuario/PerfilUsuario';
import { ProductoPost } from './components/Productos/ProductoPOST';
import EventsCalendar from './components/Agenda/Agenda';
import { Producto } from './components/Producto/Producto';

export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/agenda' element={<EventsCalendar />} />

          <Route path='/' element={<Home />} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/olvidoContraseña' element={<OlvidoContraseña />} />
          <Route path='/superAdmin' element={<SuperAdmin />} />
          <Route path='/perfilUsuario' element={<PerfilUsuario />} />
          <Route path='/noticias' element={<Noticias />} />
          <Route path='/noticia' element={<Noticia />} />
          <Route path='/contactos' element={<Contactos />} />
          <Route path='/productos' element={<Productos />} />
          <Route path='/producto' element={<Producto />} />
          <Route path='/listaCarrito' element={<ListaCarrito />} />
          
          <Route path='/logout' element={<Logout />} />
          <Route path='/noticias/add' element={<NoticiasPost />} />
          <Route path='/productos/add' element={<ProductoPost />} />
          <Route path="/usuarios" element={<UsuarioListContainer greeting="Listado de Usuarios"/>}/>
          <Route path="/usuarios/:dni" element={<UsuarioViejo />}/> 
          <Route path="/updateUsuario/:dni" element={<UsuarioPut />}/> 
          <Route path="/usuario/current" element={<UsuarioViejo />}/> 
          <Route path="/updateUsuario" element={<UsuarioPut  fromPerfil={true}  />}/>

          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}