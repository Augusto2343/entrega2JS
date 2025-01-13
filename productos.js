 const productos = [
     {
         nombre:"Ram DDR4 8GB 3200Mhz",
         imagen:"https://cdn.awsli.com.br/600x450/2740/2740976/produto/295600554/17cac71a80aea66151d8586c4481db12-byujgd1ctc.jpeg",
         descripcion:"Ram DDR4 3500 M/T, 8GB",
         precio:1000,
         stock:2,
         id:2
     },
     {
         nombre:"AMD Ryzen 5 5600X3D",
         imagen:"https://www.adrenaline.com.br/wp-content/uploads/2024/07/AMD-Ryzen-5-5600X3D-1.jpg ",
         descripcion:"Procesador AMD ryzen 5 5600X3D con GPU incluida 3.7Ghz y 8 nucleos.",
         precio:1600,
         stock:3,
         id:1
     },
     {
         nombre:"Intel I9 14600K",
         imagen:"https://assets-prd.ignimgs.com/2023/10/17/14900k-1697576062950.jpg",
         descripcion:"Procesador intel I9 14600K 12 nucleos 4.4Ghz",
          precio:2000,
          stock:1,
          id:3
     },
     {
     nombre:"Ram DDR5 16GB 5200Mhz",
     imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOysnMb83byMvnLTki8gSmdnwTXKMsw0bbG2f4BnLwlOQLokxthxkHQQJ0&s=10",
     descripcion:"Ram DDR5 16GB 5200Mhz",
     precio:1300,
     stock:1,
     id:4
     }
 ]
 const carrito = [
    {
        nombre:"Ram DDR4 8GB 3200Mhz",
        imagen:"https://cdn.awsli.com.br/600x450/2740/2740976/produto/295600554/17cac71a80aea66151d8586c4481db12-byujgd1ctc.jpeg",
        descripcion:"Ram DDR4 3500 M/T, 8GB",
        precio:1000,
        enCarro:0,
        id:2
    },
    {
        nombre:"AMD Ryzen 5 5600X3D",
        imagen:"https://www.adrenaline.com.br/wp-content/uploads/2024/07/AMD-Ryzen-5-5600X3D-1.jpg",
        descripcion:"Procesador AMD ryzen 5 5600X3D con GPU incluida 3.7Ghz y 8 nucleos.",
        precio:1600,
        enCarro:0,
        id:1
    },
    {
        nombre:"Intel I9 14600K",
        imagen:"https://assets-prd.ignimgs.com/2023/10/17/14900k-1697576062950.jpg",
        descripcion:"Procesador intel I9 14600K 12 nucleos 4.4Ghz",
         precio:2000,
         enCarro:0,
         id:3
    },
    {
    nombre:"Ram DDR5 16GB 5200Mhz",
    imagen:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQOysnMb83byMvnLTki8gSmdnwTXKMsw0bbG2f4BnLwlOQLokxthxkHQQJ0&s=10",
    descripcion:"Ram DDR5 16GB 5200Mhz",
    precio:1300,
    enCarro:0,
    id:4
    }
 ]
 if (!localStorage.getItem('productos')) {

    localStorage.setItem('productos', JSON.stringify(productos));

}
if (!localStorage.getItem('carrito')) {

    localStorage.setItem('carrito', JSON.stringify(carrito));

}
