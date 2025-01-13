const contenedorCarrito = document.querySelector(".productos");
const carritoLocal = JSON.parse(localStorage.getItem('carrito'));
const productosLocal=JSON.parse(localStorage.getItem('productos'));
const precios=document.querySelector(".costo");
let total=0;
let iva = 0;
let subtotal = 0;
console.log(carritoLocal)
const calcularTotalIva = (subtotal) =>{
    total=subtotal+(subtotal*0.21);
    iva=subtotal*0.21
}
const sinProductos= () =>{
    let productosEncontrados=0
    carritoLocal.forEach((prod) =>{
        if(prod.enCarro >0){
            productosEncontrados+=1}
     })
    if(productosEncontrados<=0){
        contenedorCarrito.innerHTML += `
        <div class="pantallaSinProd">
        <h2 class="informe">No hay nada en el carrito</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0sFRH4yVvQI88wdwhC8topZE2xVCQH1FLg&s">
        </div>`
     }
     console.log(productosEncontrados)
}
const mostrarCarrito = () =>{
    contenedorCarrito.innerHTML="";
    subtotal=0
    sinProductos();
    carritoLocal.forEach(producto => {
        if(producto.enCarro>0){

        contenedorCarrito.innerHTML +=` 
                <div class="producto carrito" >
                <img src="${producto.imagen}" alt="imagenProducto" class="imagenProducto">

                <h2 class="tituloProducto">${producto.nombre}</h2>

                <p class="descripcionProducto">${producto.descripcion}</p>

                <p class="precioProducto">precio: ${producto.precio*producto.enCarro}$</p>

                <h3 class="carro">En carrito: ${producto.enCarro}</h3>
                <div class="dismAgr">
                 <button class="btnDism btn" id="${producto.id}">-</button>
                 <button class="btnAgr btn" id="${producto.id}">+</button>
                </div>
            </div>
            
    `
    subtotal += producto.precio*producto.enCarro;
}


    });
    calcularTotalIva(subtotal);
    precios.innerHTML=`        
            <h2 id="tituloCarrito">Resumen de costo de carrito</h2>
        <p class="costoPrec" id="subtotal">Subtotal: <strong >$${subtotal}</strong></p>
        <p class="costoPrec" id="iva">IVA: <strong >$${iva}</strong></p>
        <p class="costoPrec" id="costoTotal"><strong>Total a pagar:</strong> <strong class="total" >$${total}</strong></p>`
    const precTot=document.querySelector(".total");    
    
    console.log(subtotal,"  ",iva,"  ",total)

}

mostrarCarrito();
let btnAgr = Array.from(document.getElementsByClassName("btnAgr"));
let btnDism = Array.from(document.getElementsByClassName("btnDism"));
console.log(btnAgr);

contenedorCarrito.onclick = (e) => {
    console.log(e.target.classList);

    if(e.target.classList.contains("btnDism") ){
    carritoLocal.forEach((producto) => {
        if (producto.id == e.target.id ) {
            producto.enCarro--;

            productosLocal.forEach((producto) => {

                if (producto.id == e.target.id ) {
                    producto.stock++;
                }

            });

            localStorage.setItem('carrito', JSON.stringify(carritoLocal));

            localStorage.setItem('productos', JSON.stringify(productosLocal));
            mostrarCarrito();
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

            productosLocal.forEach((producto) => {
                if(producto.stock ==0){
                    Swal.fire({
                        icon:"error",
                        title: "Lo sentimos no tenemos stock"
                    })
                }
                if (producto.id == e.target.id && producto.stock >0) {
                    producto.stock--;
                    carritoLocal.forEach((producto) => {
                        if (producto.id == e.target.id ) {
                            producto.enCarro++;
                            localStorage.setItem('carrito', JSON.stringify(carritoLocal));

                            localStorage.setItem('productos', JSON.stringify(productosLocal));
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


