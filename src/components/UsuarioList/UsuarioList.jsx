import { UsuarioDetail } from "../UsuarioDetail/UnidadDetail"
import { Link } from "react-router-dom"

const UsuarioList = ({listaUsuarios})=>{

    return (
        <> 
           {// <Link to={``}>Agregar Usuario</Link>
            }

            <div className="contenedorProductos">
                {listaUsuarios&&listaUsuarios.map(usuario => <UsuarioDetail key={usuario.dni} usuario={usuario}/>)}
            </div>
        </> 
    )
}
export  {UsuarioList}