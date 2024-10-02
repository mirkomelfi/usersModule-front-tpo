import { useRef, useEffect } from "react"
import { Mensaje } from "../Mensaje/Mensaje"
import { useState } from "react"
import { useBlocker, useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { validateRol,isRolUser,deleteToken,getToken, isTokenExpired } from "../../utils/auth-utils";
import ImagenPost from "../Imagen/ImagenPOST"

import './PUT.css'; 

export const ProductoPut = () => {

    const [mensaje,setMensaje]=useState(null)
    const [idProducto,setIdProducto]=useState(null)
    const datForm = useRef() //Crear una referencia para consultar los valoresa actuales del form

    //Productos hardcodeados
    const [nombre, setNombre] = useState('');
    const [precio, setPrecio] = useState('');
    const [productoSeleccionado, setProductoSeleccionado] = useState(null);
    const [productosHardcoded, setProductosHardcoded] = useState([]);
    const productos = [
        { id: 1, nombre: "Producto A", precio: 100 },
        { id: 2, nombre: "Producto B", precio: 200 },
        { id: 3, nombre: "Producto C", precio: 300 },
    ];

    useEffect(() => {
        setProductosHardcoded(productos);
    }, []);

    // Manejamos la selección de producto en el dropdown
    const handleProductoChange = (e) => {
        const productoId = parseInt(e.target.value);
        const producto = productosHardcoded.find(p => p.id === productoId);
        setProductoSeleccionado(producto);

        // Actualizamos los valores del formulario con el producto seleccionado
        setNombre(producto.nombre);
        setPrecio(producto.precio);
    };
    
    const navigate=useNavigate()
    const navigateTo=(url)=>{
        navigate(url)
    }

    const consultarForm = async(e) => {
        //Consultar los datos del formulario
        e.preventDefault()

        const datosFormulario = new FormData(datForm.current) //Pasar de HTML a Objeto Iterable
        const noticia = Object.fromEntries(datosFormulario) //Pasar de objeto iterable a objeto simple
        if (noticia.titulo==""){noticia.titulo=null;}
        if (noticia.descripcion==""){noticia.descripcion=null;}
        
        if (!noticia.titulo&&!noticia.descripcion){ setMensaje("No se ingresaron valores")}
        else{
            var url=``;

            console.log(noticia)
 
            url=`${process.env.REACT_APP_DOMINIO_BACK}/admin/noticias`

            console.log(url)

            const response= await fetch(url, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${getToken()}`
                },
                body: JSON.stringify(noticia)
            })
            if (response.status==403){
              if (isTokenExpired(getToken())) {
                alert("Venció su sesión. Vuelva a logguearse")
                navigate("/logout")
              }
            }
            if (response.status==200){
                const data = await response.json()
                setIdProducto(data.id)
                setMensaje(data.msj+" Puede agregar imagenes si lo desea")
            }else{
                
                const data = await response.json()
                setMensaje(data.msj)
            }

            
                
            e.target.reset() //Reset form
                
            }
        }

        return (
            <div className="put-container">
              {!mensaje ? (
                <div className="put-card">
                  <h2 className="put-title">Actualizar producto</h2>
        
                  {/* Dropdown para seleccionar producto */}
                  <div className="put-select-container">
                    <label htmlFor="productoId" className="put-label">Seleccionar Producto:</label>
                    <select
                      id="productoId"
                      className="put-select"
                      onChange={handleProductoChange}
                      defaultValue=""
                    >
                      <option value="" disabled>Seleccione un producto</option>
                      {productosHardcoded.map(producto => (
                        <option key={producto.id} value={producto.id}>
                          {producto.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
        
                  {productoSeleccionado && (
                    <form onSubmit={consultarForm} ref={datForm} className="put-form">
                      <input
                        type="text"
                        className="put-input"
                        placeholder="Nombre"
                        name="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                      />
                      <input
                        type="number"
                        className="put-input"
                        placeholder="Precio"
                        name="precio"
                        value={precio}
                        onChange={(e) => setPrecio(e.target.value)}
                      />
                      <button type="submit" className="put-button">Actualizar Producto</button>
                    </form>
                  )}
                </div>
              ) : (
                <div>
                  <Mensaje msj={mensaje} />
                  <ImagenPost noticia={true} id={idProducto} />
                </div>
              )}
            </div>
          );
}