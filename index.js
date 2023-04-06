




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
    while (usuarioNuevo3.nombre !== checkNombre) {
        alert("Usuario incorrecto. Por favor intente con un usuario correcto");
        checkNombre = prompt("Ingrese nombre de usuario");
    }

    let checkEmail = prompt("ingrese email: ");
    while (usuarioNuevo3.email !== checkEmail) {
        alert("Email incorrecto. Intento nuevamente")
        checkEmail = prompt("ingrese email: ");
    }

    let checkPass = parseInt(prompt("ingrese contraseña: "));
    while (usuarioNuevo3.contraseña !== checkPass) {
        alert("Contraseña incorrecta. Intenta nuevamente")
        checkPass = parseInt(prompt("ingrese contraseña: "));
    }

    return true;
}



class Producto {
    constructor(id, nombre, precio, imagen) {
        this.id = id,
        this.nombre = nombre,
        this.precio = precio,
        this.imagen = imagen
    }
}

//creamos 4 productos

const panIntegral = new Producto(1, 'Pan integral', 600, `./img/panIntegral.jfif`);
const panBlanco = new Producto(2, 'Pan blanco', 550, './img/panBlanco.jfif');
const budines = new Producto(3, 'Budines', 800, './img/budines.jfif');
const alfajores = new Producto(4, 'Alfajores', 150,'./img/alfajores.jfif');

//Guardamos los productos en un arreglo

const productos = [panIntegral, panBlanco, budines, alfajores];


//agregar productos al select desde js, se puede hacer desde el html pero si mañana son 1 millon de productos hacer eso manual es muchisimo.

const selectNode = document.querySelector('#listaProds');

productos.forEach((prod) => {
    const optionProd = document.createElement('option');
    optionProd.innerText = `${prod.nombre}: ${prod.precio}`;
    optionProd.setAttribute(`id`, `${prod.id}`);
    selectNode.append(optionProd);
}
);


//boton añadir producto

const btnNode = document.querySelector(`#añadirProd`);

btnNode.onclick = () => {

    alert("Debe crearse un usuario")
    const crearseUsuario = prompt(`Desea crearselo?
    
    -Si
    -No
    
    `);

    //se agrega un condicional para que si el usuario decide crearse un usuario te solicite los datos, sino se sale y puedes continuar en la pagina sin usuario.

    if (crearseUsuario === "no") {
        crearseUsuario = prompt("Esta bien, puede continuar sin un usuario ");
    } else if (crearseUsuario === "si") {

        const nombre = prompt("Ingrese nombre de usuario")
        const email = prompt("ingrese email: ")
        const contraseña = parseInt(prompt("ingrese contraseña numerica: "));

        while (contraseña < 10000000) {
            alert("Contraseña demasiado corta. Por favor ingrese una contraseña mas larga");
            contraseña = parseInt(prompt("ingrese contraseña: "));
        }


        //se crea un nuevo usuario

        usuarioNuevo3 = new Usuario(nombre, email, contraseña);

        alert("Usuario creado con exito.")
        alert("Ingrese ahora su cuenta")

        //se llama a la funcion checkUsersi
        checkUser();

        users.push(usuarioNuevo3)


        alert(`Bienvenido a Paradisi, tu nombre de usuario es "${usuarioNuevo3.nombre}" y el email con el que te creaste la cuenta "${usuarioNuevo3.email}" `)
    } else {
        alert("Entrada invalida")
    }


    const index = selectNode.selectedIndex;
    const prodSeleccionado = productos[index];
    carrito.push(prodSeleccionado);
};

//carrito

const carrito = [];

const indexProductos = document.getElementById('index__productos');

//FORMA MAS REDUCIDA DE HACERLO EN VEZ DE AGREGAR DE NUEVO EL divProductos.innerHTML solo ponemos un mas.

productos.forEach((prod) => {
    indexProductos.innerHTML +=
`<div class='index__producto'>
    <div class='card-body'>
        <h2 class ='card-title'>${prod.nombre}</h2>
        <p class='card-text'>Precio: $${prod.precio}</p>
        <img src="${prod.imagen}" alt="">
        <button id=${prod.id} class='btn btn-primary'>AGREGAR</button>
    </div>
</div>`
})




const botonesAgregar = document.querySelectorAll('.btn-primary');



arrayBotones.forEach((boton) => {
    boton.onclick = () => {
        const producto = productos.find(p => p.id === parseInt(boton.id));
        const prodCarrito = {
            id: producto.nombre,
            precio: producto.precio,
            cantidad: 1
        }
        const prodEnCarrito = carrito.find(prod => prod.id === prodCarrito.id)

        if (!prodEnCarrito) {
            carrito.push(prodCarrito);
        } else {
            prodEnCarrito.cantidad++;
        }
    }

})



//finalizar compra

const finalizarBtnNode = document.querySelector('#finalizarCompra');

finalizarBtnNode.onclick = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio;
    })
    alert(`El total de tu compra es ${totalCompra}`);
};




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
    titulo.innerText = `Bienvenido ${infoUsuario.nombre}`
}


//mirar si en storage existe infoUsuario

const infoUsuario = localStorage.getItem('infoUsuario');
const infoUsuarioJS = JSON.parse(infoUsuario);

if (infoUsuario) {
    formulario.remove();
    titulo.innerText = `Bienvenido ${infoUsuarioJS.nombre}`
}




