





//================================================EJEMPLO CLASE============================================= 




class Producto {
    constructor(id, nombre, precio){
        this.id = id;
        this.nombre = nombre;
        this.precio = precio;
    }
}

//creamos 4 productos

const panIntegral = new Producto(1, 'Pan integral',  600);
const panBlanco = new Producto(2, 'Pan blanco', 550);
const budines = new Producto(3, 'Budines', 800);
const alfajores = new Producto(4, 'Alfajores', 150);

//Guardamos los productos en un arreglo

const productos = [panIntegral, panBlanco, budines, alfajores];


//agregar productos al select desde js, se puede hacer desde el html pero si mañana son 1 millon de productos hacer eso manual es muchisimo.

const selectNode = document.querySelector('#listaProductos');

productos.forEach((prod) => {
    const optionProd = document.createElement('option');
    optionProd.innerText(`${prod.nombre}: ${prod.precio}`);
    optionProd.setAttribute(`id`, `${prod.id}`);
    selectNode.append(optionProd)
}
);



//carrito

const carrito = [];

//boton añadir producto

const btnNode = document.querySelector(`añadirProd`);

btnNode.onclick = () => {
    const index = selectNode.selectedIndex;
    const prodSeleccionado = productos[index];
    carrito.push(prodSeleccionado);
};





//finalizar compra

const finalizarBtnNode = document.querySelector('#finalizarCompra');

finalizarBtnNode.onclick = () => {
    let totalCompra = 0;
    carrito.forEach((producto) => {
        totalCompra = totalCompra + producto.precio;
    })
    alert(`El total de tu compra es ${totalCompra}`);
};











