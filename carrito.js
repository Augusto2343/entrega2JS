const contenedorCarrito = document.querySelector(".productos");
const precios=document.querySelector(".costo");
let total=0;
let iva = 0;
let subtotal = 0;
let cartaProducto
let btnComprar
let objCompr
let carrito
let arrProductos =[]
let arrCarrito=[]
let arrMostr =[]
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
            return comprobar();
    })
    .catch(error => Swal.fire({
        icon:"error",
        title:"Algo salió mal"
    }))
}
else{
    arrCarrito = JSON.parse(localStorage.getItem("carrito"));
    setTimeout(()=>{
        return comprobar()
    },250)
}
}
const cargarEnLocalStorage = () => {
    localStorage.setItem('carrito',JSON.stringify(arrCarrito));
    localStorage.setItem('productos',JSON.stringify(arrProductos));
    return mostrarCarrito();
}  
obtenerCarrito();
obtenerProductos();

const calcularTotalIva = (subtotal) =>{
    total=subtotal+(subtotal*0.21);
    iva=subtotal*0.21
}
const sinProductos= () =>{

    if(arrMostr.length ==0){
        contenedorCarrito.innerHTML += `
        <div class="pantallaSinProd">
        <h2 class="informe">No hay nada en el carrito</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0sFRH4yVvQI88wdwhC8topZE2xVCQH1FLg&s">
        </div>`
     }

}
const comprobar = () =>{
    arrMostr= arrCarrito.filter(producto => producto.unidad >0);
    
    if(arrMostr.length >0){
        return mostrarCarrito();
   }
   else{
    return sinProductos();
   }
}
const mostrarCarrito = () =>{
    subtotal=0
    contenedorCarrito.innerHTML ="";
    arrMostr.forEach(producto=> {
        if(producto.unidad >0){
        contenedorCarrito.innerHTML +=`
                    <div class="producto">
            <img src="${producto.imagen}" alt="imagenProducto" class="imagenProducto">

            <h2 class="tituloProducto">${producto.nombre}</h2>

            <p class="descripcionProducto">${producto.descripcion}</p>

            <p class="precioProducto">precio: ${producto.precio*producto.unidad}$</p>

            <h3 class="stock">stock: ${producto.unidad}</h3>

                <div class="dismAgr">
                 <button class="btnDism btn" id="${producto.id}">-</button>
                 <button class="btnAgr btn" id="${producto.id}">+</button>
                </div>

        </div>
        `}
    subtotal += producto.precio*producto.unidad ;
        });
        sinProductos();
    calcularTotalIva(subtotal);
    precios.innerHTML=`        
            <h2 id="tituloCarrito">Resumen de costo de carrito</h2>
        <p class="costoPrec" id="subtotal">Subtotal: <strong >$${subtotal}</strong></p>
        <p class="costoPrec" id="iva">IVA: <strong >$${iva}</strong></p>
        <p class="costoPrec" id="costoTotal"><strong>Total a pagar:</strong> <strong class="total" >$${total}</strong></p>`
    const precTot=document.querySelector(".total");    
}

let btnAgr = Array.from(document.getElementsByClassName("btnAgr"));
let btnDism = Array.from(document.getElementsByClassName("btnDism"));

contenedorCarrito.onclick = (e) => {


    if(e.target.classList.contains("btnDism") ){
    arrCarrito.forEach((producto) => {
        if (producto.id == e.target.id ) {
            producto.unidad--;
            subtotal -=producto.precio
           arrProductos.forEach((producto) => {

                if (producto.id == e.target.id ) {
                    producto.stock++;
                }

            });
            cargarEnLocalStorage();
            Toastify({
                text:"Eliminado del carrito ._.",
                duration:"2500",
                gravity:"bottom",
                backgroundColor:"#FE0000",
                ariaLive:"polite"
            }).showToast();

        }

    });
    
}
if(e.target.classList.contains("btnAgr")){

            arrProductos.forEach((producto) => {
                if(producto.stock ==0){
                    Swal.fire({
                        icon:"error",
                        title: "Lo sentimos no tenemos stock"
                    })
                }
                if (producto.id == e.target.id && producto.stock >0) {
                    producto.stock--;
                    arrCarrito.forEach((producto) => {
                        if (producto.id == e.target.id ) {
                            producto.unidad++;
                            mostrarCarrito();
                            Toastify({
                                text:"Agregado al carrito :D",
                                   duration:"2500",
                                gravity:"bottom",
                                backgroundColor:"#16423C",
                            }).showToast();

                }
            });
        }


    });
}
}


