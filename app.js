//--------------------ENTIDAD--------------------------//

class Cafe{
    constructor(marca,tipoCafe,precio,id,img){ 
        this.marca = marca; 
        this.tipoCafe = tipoCafe;  
        this.precio = precio;
        this.id = id;
        this.img= img;
    }
}

//--------------------PRODUCTOS--------------------------//

const cafes = []

const cafe1 = new Cafe ("Rambla", "Nicaragua", 1400, 1, "https://picsum.photos/200/301");
const cafe2 = new Cafe ("Rambla", "Colombia", 1400, 2);
const cafe3 = new Cafe ("Puerto Blest", "Colombia", 1200, 3);
const cafe4 = new Cafe ("Puerto Blest", "Guatemala", 1200, 4);
const cafe5 = new Cafe ("Puerto Blest", "Peru", 1200, 5, "/Users/agustinapanizza/Desktop/Entrega Final JS/Imagenes/Peru.jpeg");
const cafe6 = new Cafe ("Puerto Blest", "El salvador", 1200, 6);


cafes.push(cafe1)
cafes.push(cafe2)
cafes.push(cafe3)
cafes.push(cafe4)
cafes.push(cafe5)
cafes.push(cafe6)

let ObjtoJson = JSON.stringify(cafes)
localStorage.setItem("cafes",ObjtoJson)

let cards =  document.getElementById("listaProductos")

cafes.forEach (e => {
    //VARIEDADED DE CAFES
    let div1 = document.createElement("div")
    div1.setAttribute("class", "card card-body text-center ")

    let img = document.createElement("img")
    img.setAttribute("class", "card-img-top")
    img.src = `${e.img}`
    div1.appendChild(img)
        
    let h5 = document.createElement("h5")
    h5.textContent= e.marca
    div1.appendChild(h5)
    h5.setAttribute("class", "card-title")

    let h6 = document.createElement("h6")
    h6.textContent= e.tipoCafe
    div1.appendChild(h6)
    h6.setAttribute("class", "card-subtitle mb-2 text-muted")

    let p1 = document.createElement("p")
    p1.textContent= `$${e.precio}`
    div1.appendChild(p1)
    p1.setAttribute("class", "card-text")

    let a= document.createElement("a")   
    a.textContent= "Agregar"
    div1.appendChild(a)
    a.setAttribute("class", "btn btn-secondary")
    a.setAttribute("onclick", `añadirCarrito(${e.id})`)

cards.appendChild(div1)
})

//----------------------CARRITO--------------------------//

let carrito = []

const añadirCarrito = (idPorOnclick) => {
    const objetoIdentificado = cafes.find (e => e.id == idPorOnclick)
    if (JSON.parse(localStorage.getItem("carrito")) != null) {
        let carritoNEW = JSON.parse(localStorage.getItem("carrito"))
        carritoNEW.push(objetoIdentificado)
        localStorage.setItem("carrito", JSON.stringify(carritoNEW))
        location.reload()
    } else {
        carrito.push(objetoIdentificado)
        localStorage.setItem("carrito", JSON.stringify(carrito))
        location.reload()
    }
}

//-------------------IMPRIMIR DATOS------------------------//

let carritoID = document.getElementById("carrito")
let tablePrint = document.getElementById("table")
let btnDel = 0

const printCarrito = () => {
    let carritoDelStorage = JSON.parse(localStorage.getItem("carrito"))
    if (carritoDelStorage != null) {
        carritoDelStorage.forEach(e => {
        let table = document.createElement("tr")
        let th1 = document.createElement("th")
        th1.setAttribute("class", "col-2 text-center")
        th1.textContent = `${e.marca}`
        table.appendChild(th1)

        let th2 = document.createElement("th")
        th2.setAttribute("class", "col-2 text-center")
        th2.textContent = `${e.tipoCafe}`
        table.appendChild(th2)

        let th3 = document.createElement("th")
        th3.setAttribute("class", "col-2 text-center")
        th3.textContent = `$${e.precio}`
        table.appendChild(th3)

        let td1 = document.createElement("td")
        td1.setAttribute("class", "col-2")
        table.appendChild(td1)
        let button = document.createElement("button")
        button.setAttribute("class", "btn")
        button.setAttribute("id", `${e.id}`)

        button.setAttribute("onclick", `deleteCafe(${btnDel})`)
        btnDel = btnDel + 1
        button.textContent = "X"
        td1.appendChild(button)
        tablePrint.appendChild(table) 
    })

}
else{document.getElementById("err").textContent = "Tu carrito de compras esta vacío"
}
}

const deleteCafe = (id) => {
    let allCafe = JSON.parse(localStorage.getItem("carrito"))
    allCafe.splice(id, 1)
    localStorage.setItem("carrito", JSON.stringify(allCafe))
    location.reload()
}

printCarrito()

//----------------------PEDIDO--------------------------//
let total= document.getElementById("total")

const precioTotal = () => {
    let carritoDelStorage  = JSON.parse (localStorage.getItem("carrito"))
    let precioTotal = 0;
    if (carritoDelStorage != null) {
    carritoDelStorage.forEach(e=> {
    precioTotal = precioTotal + e.precio
    })
} else{
    document.getElementById("total").textContent = "0"
}
    total.textContent =  `$${precioTotal}`
}

//BTN CLEAR
let btnClear = document.getElementById("clear")
btnClear.addEventListener("click", () => {
    localStorage.clear()
    location.reload()
})

precioTotal()


//----------------------CONSULTA--------------------------//

class Consulta{
    constructor(user,mail,note){ 
    this.user = user;
    this.mail = mail;
    this.note = note;
}
}

let consultas =  []

const imprimirNota = () => {
    let consultas = JSON.parse(localStorage.getItem("consultas"))
    consultas.forEach(element => {
        $("#print"). append (`
        <h2>${element.user}</h2>
        <p>${element.mail}</p>
        <p>${element.note}</p>
        `)
    });
}

$("#btn").on ("click", () => {
    let user = $("#nameUser").val()
    let phone = $("#mail").val()
    let note= $("#text").val()
    console.log($("#text").val());
    consultas.push(new Consulta(user, phone, note))
    localStorage.setItem("consultas", JSON.stringify(consultas))
    console.log(consultas);
    imprimirNota()
})

console.log(JSON.parse(localStorage.getItem("carrito")))

//----------------------AJAX--------------------------//
//------------------Tipo de cambio--------------------//
const url = "https://www.dolarsi.com/api/api.php?type=valoresprincipales"

$.get(url, (respuesta, estado) => {

    if (estado === "success") {

        console.log(respuesta[1])

        respuesta.forEach(e => {
            if(e.casa.agencia  == "349"){
            $(".TC").append(`
            <div class="col-2 container-fluid TC">
            <h1 class="text-center">${e.casa.nombre}</h1>
            <p class="text-center">${e.casa.compra}</p>
            <p class="text-center">${e.casa.venta}</p>
            </div>
        `)
        }
    })
    }
})