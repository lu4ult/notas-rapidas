// localStorage.setItem('nota1', 'Juan');
// localStorage.setItem('nota2', 'Pepe');

class Notas {
    constructor(texto,fecha,prioridad,color) {
        this.texto = texto;
        this.fecha = fecha;
        this.prioridad = parseInt(prioridad);
        this.color = color.toUpperCase();
    }
}
let notasArray = [];

let indiceLocalStorage = "asfasdfaaaa";

function guardarEnLocal() {
    let enJson = JSON.stringify(notasArray);
    localStorage.setItem(indiceLocalStorage,enJson);
    console.log("guardado:");
    console.log(enJson);
    console.log("fin");
}

let hora = new Date().getHours();
let body = document.getElementById("body");

let botonAlternarTemaOscuro = document.getElementById("alternarTemaOscuro");
botonAlternarTemaOscuro.addEventListener("click",cambiarTemaOscuro);

function cambiarTemaOscuro() {
    if(body.className == "temaOscuro") {
        console.log("pasar a claro");
        body.classList.remove("temaOscuro");
        body.classList.add("temaClaro");
        botonAlternarTemaOscuro.classList.remove("temaOscuro");
        botonAlternarTemaOscuro.innerText = "Cambiar a tema Oscuro";

        //let botones = document.querySelectorAll("button");
        //botones.forEach((el)=>{el.classList.remove("botonTemaOscuro")});
    }//

    else {
        console.log("pasar a oscuro");
        body.classList.remove("temaClaro");
        body.classList.add("temaOscuro");
        botonAlternarTemaOscuro.classList.add("temaOscuro");
        botonAlternarTemaOscuro.innerText = "Cambiar a modo Claro";
        //let botones = document.querySelectorAll("button");
        //console.log(botones);
        //botones.forEach((el)=>{el.classList.add("letraClara")});
    }
}

if(hora>=20 || hora <=7) {
    body.classList.remove("temaClaro");
    body.classList.add("temaOscuro");
    botonAlternarTemaOscuro.classList.add("oscuro");
    botonAlternarTemaOscuro.innerText = "Cambiar a modo Claro";
}





let notasArrayPapelera = [];


/*Dado un objeto fecha retornamos un string en formato dd/mm/aaaa para simplificar la lectura cuando no queremos ver la fecha completa con hora y todos los chiches.*/
function obtenerFechaFormateada(fecha) {
    return fecha.getDate()+"/"+(fecha.getMonth() +1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+":" + (fecha.getMinutes()<10?"0":"") + fecha.getMinutes();
}


// const fechaFormateada(fecha => {fecha.month()})

console.log("hola");



//let coloresCMYK = ["C","M","Y","K"];




function selectorColor(indice) {
    let letraSeleccionada = document.getElementById("select"+indice);   //Obtenemos el valor que seleccionó el usuario
    notasArray[indice].color = letraSeleccionada.value;
    mostrarNotas();
    guardarEnLocal();
}

function selectorPrioridad(indice) {
    let prioridadSeleccionada = document.getElementById("inputPrioridad"+indice);
    notasArray[indice].prioridad = prioridadSeleccionada.value;
    console.log("ok, cambiar "+indice + " a " + prioridadSeleccionada.value);
    mostrarNotas();
}




function borrarNota(indice) {
    //alert("no me borres "+indice);
    botonPapelera.classList.remove("ocultar")

    notasArrayPapelera.push(notasArray[indice]);
    notasArray.splice(indice,1);
    //console.log(notasArrayPapelera);
    mostrarNotas();

}

let botonGuardarNota = document.getElementById("guardarNota");
let textoUsuario = document.getElementById("textoEntrada");

botonGuardarNota.addEventListener("click",agregarNota);
textoUsuario.addEventListener("change", agregarNota); //To-Do: chequear que se presione el enter


function agregarNota() {
    let crearNota = new Notas(textoUsuario.value,new Date(),10,"Y");
    notasArray.push(crearNota);
    mostrarNotas();
}

let botonPapelera = document.getElementById("deshacer");
botonPapelera.addEventListener("click",recuperarNota);

function recuperarNota() {
    if(notasArrayPapelera.length)
        notasArray.push(notasArrayPapelera.pop());              //Recuperamos el último elemento de la papelera con pop al mismo tiempo que lo eliminamos, y lo recuperamos con push
    else
        botonPapelera.classList.add("ocultar");

    mostrarNotas();
}




let notasContainer = document.getElementById("notasContainer");
let closeSVG = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M175 175C184.4 165.7 199.6 165.7 208.1 175L255.1 222.1L303 175C312.4 165.7 327.6 165.7 336.1 175C346.3 184.4 346.3 199.6 336.1 208.1L289.9 255.1L336.1 303C346.3 312.4 346.3 327.6 336.1 336.1C327.6 346.3 312.4 346.3 303 336.1L255.1 289.9L208.1 336.1C199.6 346.3 184.4 346.3 175 336.1C165.7 327.6 165.7 312.4 175 303L222.1 255.1L175 208.1C165.7 199.6 165.7 184.4 175 175V175zM512 256C512 397.4 397.4 512 256 512C114.6 512 0 397.4 0 256C0 114.6 114.6 0 256 0C397.4 0 512 114.6 512 256zM256 48C141.1 48 48 141.1 48 256C48 370.9 141.1 464 256 464C370.9 464 464 370.9 464 256C464 141.1 370.9 48 256 48z"/></svg>';

function mostrarNotas() {
    notasContainer.innerHTML = "";
    notasArray.sort((a,b) => a.prioridad - b.prioridad);
    notasArray.reverse();
    let indice = 0;
    for(let notas of notasArray) {
        //console.log(notas.texto);
        let notaNueva =     `<div class="nota nota-${notas.color}" id="nota${indice}">
                                <div class="controlesSuperiores"><div>${obtenerFechaFormateada(notas.fecha)}</div><div class="delete" onClick="borrarNota(${indice});">${closeSVG}</div></div>
                                <div class="controlesSuperioresDos">
                                    <input type="number" id="inputPrioridad${indice}" value=${notas.prioridad} onchange="selectorPrioridad(${indice});" min="0" max="10">
                                    <select id="select${indice}" onChange="selectorColor(${indice})">
                                        <option value="C" ${notas.color=="C"?"selected":""}>C</option>
                                        <option value="M" ${notas.color=="M"?"selected":""}>M</option>
                                        <option value="Y" ${notas.color=="Y"?"selected":""}>Y</option>
                                        <option value="K" ${notas.color=="K"?"selected":""}>K</option>
                                        <option value="W" ${notas.color=="W"?"selected":""}>W</option>
                                    </select>
                                    </div>
                                <div class="principal">${notas.texto}</div>
                            </div>`;
        notasContainer.innerHTML += notaNueva;
        //console.log(notaNueva);
        indice++;
    }
    guardarEnLocal();
}



let local = localStorage.getItem(indiceLocalStorage);


if(local != null) {
//if(local == null || notasArray.length == 0) {

    let parsedData = JSON.parse(local);
    //notasArray = local;
    
    console.log(parsedData);
     for(let i=0;i<parsedData.length;i++) {
         console.log("item "+i+" - "+parsedData[i].texto);
         notasArray.push(new Notas(parsedData[i].texto,new Date(parsedData[i].fecha),parsedData[i].prioridad,parsedData[i].color));
    
         //notasArray.push(new parseData[i]);
     }
     console.log(notasArray);
     mostrarNotas();
}

else {
    //localStorage.clear();
    //notasArray = [];
    console.log("no había nada!");
    //crear arreglo de notas aleatorio
   // notasArray.push(new Notas("<strong>INSTRUCCIONES</strong><br><ul><li>Escriba el texto de una nota y presiones guardar, aparecerá su nuevo post-it.</li><li>Cambie el color con el selector CMYKW</li><li>Puede indicar \"prioridad\" del 1 al 10 para que aparezca primero.</li><li>Al eliminar una nota aparecerá el botón papelera para restaurarla.</li></ul>",new Date(),0,"Y"));
    notasArray.push(new Notas("Hola primer nota",new Date(),0,"Y"));
    notasArray.push(new Notas("Hola segunda nota",new Date(),1,"M"));
    notasArray.push(new Notas("Hola tercera nota",new Date(),1,"K"));
    
    guardarEnLocal();
    mostrarNotas();
}



// class Notas {
//     constructor(texto,fecha,prioridad,color) {
//         this.texto = texto;
//         this.fecha = fecha;
//         this.prioridad = parseInt(prioridad);
//         this.color = color.toUpperCase();
//     }
// }
//mostrarNotas();
console.log("adios");
//localStorage.clear();