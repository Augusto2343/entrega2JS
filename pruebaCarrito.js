const contenedorCarrito = document.querySelector(".productos");
const precios=document.querySelector(".costo");
let arrProductos =[]
let arrCarrito=[]
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
}