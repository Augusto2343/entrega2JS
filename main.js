const contenedorProdDest = document.querySelector(".productos");
//botones de filtrado
const btnDrop = document.querySelector(".btnDrop");
const contenedorFiltros=document.querySelector(".seccionBtnFiltr")
const btnCargarProdDest = document.getElementById("btnCargProdDest");
const btnCargarProdNorm = document.getElementById("btnCargProdNorm");
const btnCargarTdProd =document.getElementById("btnCargTdProd");
//input busqueda
const inputBusqueda = document.querySelector(".inputBusqueda");
const btnBuscar = document.querySelector(".btnBuscar");
let cartaProducto
let btnComprar
let objCompr
let carrito
let arrProductos =[]
let arrCarrito=[]
let prodMostr=[]
let prodSubir =[]

btnDrop.onclick =() =>{
    
    contenedorFiltros.classList.toggle("ocultar")
    btnDrop.classList.toggle("activado")
    
}

btnBuscar.onclick = (e) =>{
    e.preventDefault();
    

    if(inputBusqueda.value !=""){
     
     
       prodMostr=arrProductos.filter( (producto) =>  producto.nombre.toLowerCase().includes(inputBusqueda.value.toLowerCase()) && producto.stock>0)
        return mostrar();
    }
    if(inputBusqueda.value ==""){
        Swal.fire({
            icon:"error",
            title:"Tiene que ingresar algo para buscar."
        })
    }
}
const obtenerProductos  = async () =>{
    if(!localStorage.getItem("productos")){
    const respuesta = fetch(`./productos.json`)
    .then(respuesta => respuesta.json())
    .then(productos =>{
        arrProductos=productos
        

    })
    .catch(error => Swal.fire({
        icon:"error",
        title:"Algo salió mal"
    }))
}
else{
    arrProductos = JSON.parse(localStorage.getItem("productos"))
}

}
const obtenerCarrito = async () =>{
    if(!localStorage.getItem("carrito")){
    const respuesta = fetch(`./carrito.json`)
    .then(respuesta => respuesta.json())
    .then(productos =>{
        arrCarrito=productos
    })
    .catch(error => Swal.fire({
        icon:"error",
        title:"Algo salió mal"
    }))
}
else{
    arrCarrito = JSON.parse(localStorage.getItem("carrito"));
}
}
const cargarEnLocalStorage = () => {
    localStorage.setItem('carrito',JSON.stringify(arrCarrito));
    localStorage.setItem('productos',JSON.stringify(arrProductos));
    return mostrar();
}  
obtenerProductos();
obtenerCarrito();


btnCargarProdDest.onclick =()=>{
    
    prodMostr=[];
    prodMostr = arrProductos.filter(producto => producto.tipo === 'destacado' && producto.stock >0);
    return mostrar();
}
btnCargarProdNorm.onclick =() =>{
    
    
    prodMostr=[];
    prodMostr = arrProductos.filter(producto => producto.tipo === 'normal' && producto.stock >0);
    return mostrar();
}
btnCargarTdProd.onclick =() =>{
    prodMostr=[];
    prodMostr = arrProductos;
    return mostrar();
}

const mostrarInicio =() =>{
    prodMostr=[];
    prodMostr =arrProductos;
    return mostrar();
}

const mostrar = () =>{
    contenedorProdDest.innerHTML ="";
    prodMostr.forEach(producto=> {
        if(producto.stock >0){
        contenedorProdDest.innerHTML +=`
                    <div class="producto">
            <img src="${producto.imagen}" alt="imagenProducto" class="imagenProducto">

            <h2 class="tituloProducto">${producto.nombre}</h2>

            <p class="descripcionProducto">${producto.descripcion}</p>

            <p class="precioProducto">precio: ${producto.precio}$</p>

            <h3 class="stock">stock: ${producto.stock}</h3>

             <button class="btnAgregar" id="${producto.id}">Agregar al carrito</button>

        </div>
        `}
});
if(prodMostr.length ==0){
    contenedorProdDest.innerHTML += `
    <div class="pantallaSinProd">
    <h2 class="informe">No hay nada en el carrito</h2>
    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0sFRH4yVvQI88wdwhC8topZE2xVCQH1FLg&s">
    </div>`
 } 
return obtenerBtns ();
}
const obtenerBtns =() =>{
    btnComprar = Array.from(document.getElementsByClassName("btnAgregar"));
    cartaProducto = document.querySelector(".producto");
    
}



contenedorProdDest.onclick = (e) =>{
    
    objCompr = btnComprar.find((boton) => boton.id == e.target.id)
    
    if(objCompr !="" && objCompr != undefined){
        
        return descontarStock();
    }
}
const descontarStock = () =>{
    arrProductos.forEach((producto) =>{
        if(producto.id == objCompr.id && producto.stock>0){
            producto.stock--;
            arrCarrito.forEach(productoCarrito => {
                if(producto.id == productoCarrito.id){
                    Swal.fire({
                        icon:"success",
                        title: "producto agregado con éxito",
                    })
                    productoCarrito.unidad++;

                
                }
            })
        
            return cargarEnLocalStorage();
            
        }

    })

}
setTimeout(()=>{
    mostrarInicio();
},100)
