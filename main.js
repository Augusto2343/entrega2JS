
const contenedorProd = document.querySelector(".productos");
const productosLocal = JSON.parse(localStorage.getItem('productos'));
const carritoLocal = JSON.parse(localStorage.getItem('carrito'));

const comprar = (prod) =>{
    productosLocal.forEach((producto) =>{
        if(producto.id == prod & producto.stock >0 ){
            producto.stock -= 1;
            Swal.fire({
                icon:"success",
                title:"Producto agregado al carrito",
                
            })
            console.log(producto.stock)
            carritoLocal.forEach((producto)=>{
                if(producto.id == prod){
                    producto.enCarro +=1;
                }
            })
            carritoLocal.forEach((producto) =>{
                console.log(`Nombre:${producto.nombre} en carro: ${producto.enCarro}`)
            })
            localStorage.setItem('productos',JSON.stringify(productosLocal))
            localStorage.setItem('carrito',JSON.stringify(carritoLocal))
            return actualizarProductos();
        }
    })
}
const sinProductos= () =>{
    let productosEncontrados=0
    productosLocal.forEach((prod) =>{
        if(prod.stock >0){
            productosEncontrados+=1}
     })
    if(productosEncontrados<=0){
        contenedorProd.innerHTML += `
        <div class="pantallaSinProd">
        <h2 class="informe">No hay productos disponibles</h2>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR_0sFRH4yVvQI88wdwhC8topZE2xVCQH1FLg&s">
        </div>`
     }
     console.log(productosEncontrados)
}
const actualizarProductos = () =>{
    contenedorProd.innerHTML="";

    productosLocal.forEach((producto) =>{
        if (producto.stock > 0) {
            contenedorProd.innerHTML +=`
            <div class="producto">
                <img src="${producto.imagen}" alt="imagenProducto" class="imagenProducto">

                <h2 class="tituloProducto">${producto.nombre}</h2>

                <p class="descripcionProducto">${producto.descripcion}</p>

                <p class="precioProducto">precio: ${producto.precio}$</p>

                <h3 class="stock">stock: ${producto.stock}</h3>

                 <button class="btnAgregar" id="${producto.id}">Agregar al carrito</button>

            </div>
            `
        }
})

 btnComprar = Array.from(document.getElementsByClassName("btnAgregar"));
 sinProductos()
 console.log(contenedorProd);  

}
const mostrarProductos = () => {

    productosLocal.forEach((element) => {

        if (element.stock > 0) {

            contenedorProd.innerHTML += `

             <div class="producto">

                    <img src="${element.imagen}" alt="imagenProducto" class="imagenProducto">

                    <h2 class="tituloProducto">${element.nombre}</h2>

                    <p class="descripcionProducto">${element.descripcion}</p>

                    <p class="precioProducto">precio: ${element.precio}$</p>

                    <h3 class="stock">stock: ${element.stock}</h3>

                    <button class="btnAgregar" id="${element.id}">Agregar al carrito</button>

            </div>

            `;

        }

    });
     btnComprar = Array.from(document.getElementsByClassName("btnAgregar")); // Convertir a array

};

let btnComprar = Array.from(document.getElementsByClassName("btnAgregar")); // Convertir a array


mostrarProductos();



contenedorProd.onclick = (e) => {

    console.log(e.target);

    let btnLocalizado = 0;


    btnComprar.forEach((btn) => {

        console.log("click");

        if (btn=== e.target) {

            btnLocalizado = btn.id; // O cualquier otra acción que desees realizar

            console.log(`Botón localizado: ${btnLocalizado}`);

            return comprar(btnLocalizado); // Salir del bucle forEach

        }
    });

};


console.log(btnComprar);
sinProductos();