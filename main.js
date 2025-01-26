const contenedorProdDest = document.querySelector(".productos");
//botones de filtrado
const btnCargarProdDest = document.getElementById("btnCargProdDest");
const btnCargarProdNorm = document.getElementById("btnCargProdNorm");
const btnCargarTdProd =document.getElementById("btnCargTdProd");
let cartaProducto
let btnComprar
let objCompr
let carrito
let arrProductos =[]
let arrCarrito=[]
let prodMostr=[]
let prodSubir =[]

const obtenerProductos  = async () =>{
    if(!localStorage.getItem("productos")){
    const respuesta = fetch(`./productos.json`)
    .then(respuesta => respuesta.json())
    .then(productos =>{
        arrProductos=productos
        console.log(arrProductos)

    })
    .catch(error => console.log("ERROR"))
}
else{
    arrProductos = JSON.parse(localStorage.getItem("productos"))
}
console.log(arrProductos)
}
const obtenerCarrito = async () =>{
    if(!localStorage.getItem("carrito")){
    const respuesta = fetch(`./carrito.json`)
    .then(respuesta => respuesta.json())
    .then(productos =>{
        arrCarrito=productos
    })
    .catch(error => console.log("ERROR"))
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
    console.log("destacado");
    prodMostr=[];
    prodMostr = arrProductos.filter(producto => producto.tipo === 'destacado' && producto.stock >0);
    return mostrar();
}
btnCargarProdNorm.onclick =() =>{
    console.log("normal");
    
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
return obtenerBtns ();
}
const obtenerBtns =() =>{
    btnComprar = Array.from(document.getElementsByClassName("btnAgregar"));
    cartaProducto = document.querySelector(".producto");
    console.log("botones", btnComprar)
console.log("cartas",cartaProducto);
}

console.log("botones", btnComprar)
console.log("cartas",cartaProducto);

contenedorProdDest.onclick = (e) =>{
    console.log(e);
    objCompr = btnComprar.find((boton) => boton.id == e.target.id)
    console.log("objetivo",objCompr)
    if(objCompr !="" && objCompr != undefined){
        console.log(objCompr.id);
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

                    console.log("compra realizada")
                }
            })
            console.log(arrCarrito)
            return cargarEnLocalStorage();
            
        }

    })

}
mostrarInicio();