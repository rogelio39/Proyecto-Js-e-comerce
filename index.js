// //se crea la clase usuario para que cada usuario que se cree lo haga bajo estos parametros.
class Usuario {
    constructor(nombre, email, contraseña) {
        this.nombre = nombre;
        this.email = email;
        this.contraseña = contraseña;
    }
}

// //creamos un arreglo donde iremos almacenando los usuarios
const users = [];

//creamos nuevos usuarios

let usuarioNuevo1 = new Usuario("Juan", "Galvan@gmail.com", "juan123456");
let usuarioNuevo2 = new Usuario("Pedro", "Gabo@gmail.com", "pascal171217");

//cargamos los nuevos usuarios al arreglo users
users.push(usuarioNuevo1, usuarioNuevo2);


// //se crea la variable para la creacion de un nuevo usuario

let usuarioNuevo3

//funcion que chequea si los datos ingresados para la creacion de un nuevo usuario coinciden al momento de ingresar a la cuenta. Si coinciden te da la bienvenida y sino te da usuario incorrecto y te pide ingresar nuevamente los datos.
function checkUser() {
    let checkNombre = prompt("Ingrese nombre de usuario");
    while (usuarioNuevo3?.nombre !== checkNombre) {
        swal.fire("Usuario incorrecto. Por favor intente con un usuario correcto");
        checkNombre = prompt("Ingrese nombre de usuario");
    }

    let checkEmail = prompt("ingrese email: ");
    while (usuarioNuevo3?.email !== checkEmail) {
        Swal.fire('Email incorrecto. Intento nuevamente')
        checkEmail = prompt("ingrese email: ");
    }

    let checkPass = parseInt(prompt("ingrese contraseña: "));
    while (usuarioNuevo3?.contraseña !== checkPass) {
        swal.fire("Contraseña incorrecta. Intenta nuevamente")
        checkPass = parseInt(prompt("ingrese contraseña: "));
    }

    return true;
}



class Producto {
    constructor(id, title, price, image, stock) {
        this.id = id,
            this.title = title,
            this.price = price,
            this.image = image,
            this.stock = stock
    }
}


//carrito

const carrito = [];

//creamos 4 productos

const panIntegral = new Producto(21, 'Pan integral', 600, `./img/panIntegral.jfif`, 20);
const panBlanco = new Producto(22, 'Pan blanco', 550, './img/panBlanco.jfif', 10);
const budines = new Producto(23, 'Budines', 800, './img/budines.jfif', 5);
const alfajores = new Producto(24, 'Alfajores', 150, './img/alfajores.jfif', 10);

//Guardamos los productos en un arreglo

const productos = [panIntegral, panBlanco, budines, alfajores];

//agregar productos al select desde js, se puede hacer desde el html pero si mañana son 1 millon de productos hacer eso manual es muchisimo.

const selectNode = document.querySelector('#listaProds');

productos.forEach((prod) => {
    const optionProd = document.createElement('option');
    optionProd.innerText = `${prod?.title}: ${prod?.price}`;
    optionProd.setAttribute(`id`, `${prod?.id}`);
    selectNode.append(optionProd);
}
);


//boton añadir producto

const btnNode = document.querySelector(`#añadirProd`);

btnNode.onclick = () => {

    if (usuarioNuevo3) {
        const index = selectNode.selectedIndex;
        const prodSeleccionado = productos[index];
        const prodCarrito = {
            id: prodSeleccionado.id,
            title: prodSeleccionado.title,
            price: prodSeleccionado.price,
            cantidad: 1
        }

        const prodEnCarrito = carrito.find(prod => prod.id === prodCarrito.id)

        !prodEnCarrito ? carrito.push(prodCarrito) : prodEnCarrito.cantidad++;

    } else if (!usuarioNuevo3) {
        swal.fire("Debe crearse un usuario")
        const crearseUsuario = prompt(`Desea crearselo?
        
        -Si
        -No
        
        `);

        if (crearseUsuario === "no") {
            crearseUsuario = prompt("Esta bien, puede continuar sin un usuario ");
        } else if (crearseUsuario === "si") {

            const nombre = prompt("Ingrese nombre de usuario")
            const email = prompt("ingrese email: ")
            const contraseña = parseInt(prompt("ingrese contraseña numerica: "));

            while (contraseña < 10000000) {
                swal.fire({
                    title: "Contraseña demasiado corta. Por favor ingrese una contraseña mas larga"})
                contraseña = parseInt(prompt("ingrese contraseña: "));
            }


            //se crea un nuevo usuario

            usuarioNuevo3 = new Usuario(nombre, email, contraseña);

            swal.fire({
                title: "Usuario creado con exito."})
            swal.fire("Ingrese ahora su cuenta")

            //se llama a la funcion checkUsersi
            checkUser();

            users.push(usuarioNuevo3)


            swal.fire({
                title: `Bienvenido a Paradisi, tu nombre de usuario es "${usuarioNuevo3.nombre}" y el email con el que te creaste la cuenta "${usuarioNuevo3.email}" `})
        } else {
            swal.fire("Entrada invalida");
        }



    }

    //se agrega un condicional para que si el usuario decide crearse un usuario te solicite los datos, sino se sale y puedes continuar en la pagina sin usuario.




};







//RECUPERAMOS el div index__productos del html

const indexProductos = document.getElementById('index__productos');

//Se realiza un forEach de productos y por cada producto se crea unas card y se agrega al DOM. Siempre manteniendo lo que ya esta asi se van concatenando y no sobreescribiendo.

productos.forEach((prod) => {
    indexProductos.innerHTML +=
        `<div class='index__producto'>
    <div class='card-body'>
        <h2 class ='card-title'>${prod?.title}</h2>
        <p class='card-text'>Precio: $${prod?.price}</p>
        <img src="${prod?.image}" alt="">
        <button id=${prod?.id} class='btn btn-primary'>AGREGAR</button>
    </div>
</div>`
})



//agregando productos utilizando async y una appi

//funcion que ejecute el fetch





//Se recupera cada uno de los botones agregar

const botonesAgregar = document.querySelectorAll('.btn-primary');

//se hace un forEach de cada boton y por cada boton encontrado se escucha el atento onclick, ante ese evento se busca el producto cuyo id sea igual al del boton.id y se crea un prodcarrito donde se guardara nombre, precio y cantidad del producto. luego si el producto no existe lo suma al carrito con push, si si existe solo aumenta la propiedad cantidad dentro de cada prodCarrito.

botonesAgregar.forEach((boton) => {
    boton.onclick = () => {
        const producto = productos.find(p => p.id === parseInt(boton.id));
        const prodCarrito = {
            id: producto.id,
            title: producto.title,
            price: producto.price,
            cantidad: 1
        }
        const prodEnCarrito = carrito.find(prod => prod.id === prodCarrito.id)

        !prodEnCarrito ? carrito.push(prodCarrito) : prodEnCarrito.cantidad++;

    }

})






//boton finalizar compra


//primero recuperamos el boton de finalizar compra:

const botonFinalizar = document.querySelector('#finalizarCompra');

//recuperamos las tablas

const thead = document.querySelector('#thead');
const tbody = document.querySelector('#tbody');
const total = document.querySelector('#parrafoTotalCompra');

botonFinalizar.onclick = () => {
    indexProductos.remove();
    botonFinalizar.remove();

    thead.innerHTML = `
    <tr>
        <th scope="col">PRODUCTO</th>
        <th scope="col">CANTIDAD</th>
        <th scope="col">TOTAL</th>
    </tr>`


    let totalCompra = 0;


    carrito.forEach((prod) => {
        totalCompra += prod.cantidad * prod.price;
        tbody.innerHTML += `
    <tr>
        <td>${prod?.title}</td>
        <td>${prod?.cantidad}</td>
        <td>${prod?.cantidad * prod.price}</td>
    </tr>
    `
        total.innerText = `El total de tu compra es: ${totalCompra} `

    });

}



//==============FORMULARIO CONTACTO========================

const formulario = document.getElementById("formulario");

const inputNombre = document.getElementById("usuario__nombre");

const inputEmail = document.getElementById("usuario__email");

const inputContraseña = document.getElementById("usuario__contraseña");

const titulo = document.getElementById('tituloForm');

//evento click en boton submit
formulario.onsubmit = (e) => {
    e.preventDefault();
    const infoUsuario = {
        nombre: inputNombre.value,
        email: inputEmail.value
    }

    localStorage.setItem('infoUsuario', JSON.stringify(infoUsuario));
    formulario.remove();
    titulo.innerText = `Bienvenido ${infoUsuario?.nombre} `
}


//mirar si en storage existe infoUsuario

const infoUsuario = localStorage.getItem('infoUsuario');
const infoUsuarioJS = JSON.parse(infoUsuario);

if (infoUsuario) {
    formulario.remove();
    titulo.innerText = `Bienvenido ${infoUsuarioJS?.nombre} `
}


