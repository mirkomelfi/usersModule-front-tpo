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
import { NoticiasPost } from './components/Post/NoticiasPOST';
import { Noticia } from './components/Noticia/Noticia';
import { PerfilUsuario } from './components/Usuario/PerfilUsuario';
import { ProductoPost } from './components/Post/ProductoPOST';
import EventsCalendar from './components/Agenda/Agenda';
import { Producto } from './components/Producto/Producto';
import { Deportes } from './components/Deportes/Deportes';
import { DeportesPost } from './components/Post/DeportesPOST';
import { PropuestasPost } from './components/Post/PropuestasPOST';
import { Asociarse } from './components/Asociarse/Asociarse';
import { Feedback } from './components/Feedback/Feedback';
import { Deporte } from './components/Deporte/Deporte';
import { Propuestas } from './components/Propuestas/Propuestas';
import { Campañas } from './components/Campañas/Campañas';
import { Campaña } from './components/Campaña/Campaña';
import { CampañaPost } from './components/Post/CampañaPost';
import { ForoFeedback } from './components/ForoFeedback/ForoFeedback';
import { Usuarios } from './components/Usuarios/Usuarios';
import { Historia } from './components/Historia/Historia';
import { Directivo } from './components/Directivo/Directivo';

import { NoticiasPut } from './components/Put/NoticiasPUT';
import { DeportesPut } from './components/Put/DeportesPUT'; 
import { ProductoPut } from './components/Put/ProductoPUT';
import { PropuestasPut } from './components/Put/PropuestasPUT';
import { CampañaPut } from './components/Put/CampañaPUT';
import { UsuariosPut } from './components/Put/UsuarioPUT';
import { Pedidos } from './components/Pedidos/Pedidos';


export const App = () => {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
                   
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/olvidoContraseña' element={<OlvidoContraseña />} />
          <Route path='/logout' element={<Logout />} />
          <Route path='/superAdmin' element={<SuperAdmin />} />
          <Route path='/agenda' element={<EventsCalendar />} />

          <Route path='/perfilUsuario' element={<PerfilUsuario />} />
          <Route path='/usuarios/:dni' element={<PerfilUsuario />} />

          <Route path='/usuarios' element={<Usuarios />} />

          <Route path='/' element={<Home />} />
          <Route path='/asociarse' element={<Asociarse />} />

          <Route path='/feedback' element={<Feedback />} />
          <Route path='/foroFeedback' element={<ForoFeedback />} />
 
          
          <Route path='/noticias' element={<Noticias />} />
          <Route path='/noticias/:id' element={<Noticia />} />

          <Route path='/deportes' element={<Deportes />} />
          <Route path='/deportes/:id' element={<Deporte />} />
          {//<Route path='/deportes/:id' element={<Deporte />} />
          }

          <Route path='/propuestas' element={<Propuestas />} />

          <Route path='/campañas' element={<Campañas />} />
          <Route path='/campañas/:id' element={<Campaña />} />
          
          <Route path='/contactos' element={<Contactos />} />

          <Route path='/productos' element={<Productos />} />
          <Route path='/producto' element={<Producto />} />
          <Route path='/listaCarrito' element={<ListaCarrito />} />
          
          <Route path='/pedidos' element={<Pedidos />} />

          <Route path='/autoridades' element={<Directivo />} />

          <Route path='/historia' element={<Historia />} />
          
          <Route path='/deportes/add' element={<DeportesPost />} />
          <Route path='/noticias/add' element={<NoticiasPost />} />
          <Route path='/campañas/add' element={<CampañaPost />} />
          <Route path='/propuestas/add' element={<PropuestasPost />} />
          <Route path='/productos/add' element={<ProductoPost />} />

          <Route path='/deportes/update/:id' element={<DeportesPut />} />
          <Route path='/noticias/update/:id' element={<NoticiasPut />} />
          <Route path='/campañas/update/:id' element={<CampañaPut />} />
          <Route path='/propuestas/update/:id' element={<PropuestasPut />} />

          <Route path="/usuarios" element={<UsuarioListContainer greeting="Listado de Usuarios"/>}/>
          <Route path="/usuarios/:dni" element={<UsuarioViejo />}/> 
          <Route path="/updateUsuario/:dni" element={<UsuariosPut />}/> 
          <Route path="/usuario/current" element={<UsuarioViejo />}/> 
          <Route path="/updateUsuario" element={<UsuariosPut  fromPerfil={true}  />}/>

          <Route path='*' element={<h1>404 Not Found</h1>} />
        </Routes>
        
      </BrowserRouter>

    </>

  )
}