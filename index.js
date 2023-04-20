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
        prompt("Usuario incorrecto. Por favor intente con un usuario correcto");
        checkNombre = prompt("Ingrese nombre de usuario");
    }

    let checkEmail = prompt("ingrese email: ");
    while (usuarioNuevo3?.email !== checkEmail) {
        prompt('Email incorrecto. Intento nuevamente')
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

//recuperando boton listaprods

const selectNode = document.querySelector('#listaProds');


//RECUPERAMOS el div index__productos del html

const indexProductos = document.getElementById('index__productos');

const botonesAgregar = document.querySelectorAll('.btn-primary');

//agregando productos utilizando async y una appi

//funcion que ejecute el fetch

const fetchProducts = async () => {

    const productosApi = await fetch(`https://fakestoreapi.com/products`);
    const productosJSON = await productosApi.json();

    return productosJSON;
}



//funcion que devuelva los productos de la API


const fetchOneProduct = async (id) => {
    const productoApi = await fetch(`https://fakestoreapi.com/products/${id}`);
    const productoJSON = await productoApi.json();
    return productoJSON;

}


//funcion que renderize los productos

const renderProducts = async () => {
    const productosApi = await fetchProducts();

    productosApi.forEach((prod) => {

        const { id, title, price, image } = prod;

        indexProductos.innerHTML += `
<div class='index__producto'>
    <div class='card-body'>
        <h2 class ='card-title'>${title}</h2>
        <p class='card-text'>Precio: $${price}</p>
        <img src="${image}" alt="">
        <button id=${id} onclick="agregarProductoApi(${id})" class='btn btn-primary'>AGREGAR</button>
    </div>
</div>`


        //agregar productos de la Api a lista prods

        const optionProd = document.createElement('option');
        optionProd.innerText = `${title}: ${price}`;
        optionProd.setAttribute(`id`, `${id}`);
        selectNode.append(optionProd);

    })

}


renderProducts();




const agregarProductoApi = async (id) => {
    const productoCarritoApi = await fetchOneProduct(id);
    const busquedaProductoCarrito = carrito.find((prod) => prod.id === productoCarritoApi.id)
    if (!busquedaProductoCarrito) {
        carrito.push({
            id: productoCarritoApi.id,
            title: productoCarritoApi.title,
            cantidad: 1,
            price: productoCarritoApi.price
        })
    } else {
        busquedaProductoCarrito.cantidad++;
    }
}



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

console.log(carrito)


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


