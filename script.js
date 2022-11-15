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

let hora = new Date().getHours();
let body = document.getElementById("body");

let botonAlternarTemaOscuro = document.getElementById("alternarTemaOscuro");
botonAlternarTemaOscuro.addEventListener("click",cambiarTemaOscuro);

function cambiarTemaOscuro() {
    if(body.className == "temaOscuro") {
        console.log("pasar a claro");
        body.classList.remove("temaOscuro");
        body.classList.add("temaClaro");
        //botonAlternarTemaOscuro.classList.remove("temaOscuro");
        //botonAlternarTemaOscuro.classList.add("temaClaro");
        //botonAlternarTemaOscuro.innerText = "Cambiar a tema Oscuro";
        botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--! Font Awesome Pro 6.2.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2022 Fonticons, Inc. --><path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"/></svg> Modo Oscuro';
        let todosBotones = document.querySelectorAll("button");
        todosBotones.forEach((b)=>{b.classList.remove("temaOscuro"); b.classList.add("temaClaro");});
    }

    else {
        console.log("pasar a oscuro");
        body.classList.remove("temaClaro");
        body.classList.add("temaOscuro");
        //botonAlternarTemaOscuro.classList.add("temaOscuro");
        //botonAlternarTemaOscuro.classList.remove("temaClaro");
        //botonAlternarTemaOscuro.innerText = "Cambiar a modo Claro";
        botonAlternarTemaOscuro.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path d="M112.1 454.3c0 6.297 1.816 12.44 5.284 17.69l17.14 25.69c5.25 7.875 17.17 14.28 26.64 14.28h61.67c9.438 0 21.36-6.401 26.61-14.28l17.08-25.68c2.938-4.438 5.348-12.37 5.348-17.7L272 415.1h-160L112.1 454.3zM192 0C90.02 .3203 16 82.97 16 175.1c0 44.38 16.44 84.84 43.56 115.8c16.53 18.84 42.34 58.23 52.22 91.45c.0313 .25 .0938 .5166 .125 .7823h160.2c.0313-.2656 .0938-.5166 .125-.7823c9.875-33.22 35.69-72.61 52.22-91.45C351.6 260.8 368 220.4 368 175.1C368 78.8 289.2 .0039 192 0zM288.4 260.1c-15.66 17.85-35.04 46.3-49.05 75.89h-94.61c-14.01-29.59-33.39-58.04-49.04-75.88C75.24 236.8 64 206.1 64 175.1C64 113.3 112.1 48.25 191.1 48C262.6 48 320 105.4 320 175.1C320 206.1 308.8 236.8 288.4 260.1zM176 80C131.9 80 96 115.9 96 160c0 8.844 7.156 16 16 16S128 168.8 128 160c0-26.47 21.53-48 48-48c8.844 0 16-7.148 16-15.99S184.8 80 176 80z"/></svg> Modo Claro';
        let todosBotones = document.querySelectorAll("button");
        todosBotones.forEach((b)=>{b.classList.remove("temaClaro"); b.classList.add("temaOscuro");});
    }
}

if(hora>=20 || hora <=7) {
    cambiarTemaOscuro();
    // body.classList.remove("temaClaro");
    // body.classList.add("temaOscuro");
    // botonAlternarTemaOscuro.classList.add("temaOscuro");
    // botonAlternarTemaOscuro.classList.remove("temaClaro");
   // botonAlternarTemaOscuro.innerText = "Cambiar a modo Claro";
}



/************************************************************** */



let notasArrayPapelera = [];


/*Dado un objeto fecha retornamos un string en formato dd/mm/aaaa para simplificar la lectura cuando no queremos ver la fecha completa con hora y todos los chiches.*/
function obtenerFechaFormateada(fecha) {
    return fecha.getDate()+"/"+(fecha.getMonth() +1)+"/"+fecha.getFullYear()+" "+fecha.getHours()+":" + (fecha.getMinutes()<10?"0":"") + fecha.getMinutes();
}


console.log("hola");


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
    botonPapelera.classList.remove("ocultar");
    notasArrayPapelera.push(notasArray[indice]);
    notasArray.splice(indice,1);
    //console.log(notasArrayPapelera);

    mostrarNotas();

}

let botonGuardarNota = document.getElementById("guardarNota");
let textoUsuario = document.getElementById("textoEntrada");

botonGuardarNota.addEventListener("click",agregarNota);
textoUsuario.addEventListener("focus", limpiarContenidoInput); //To-Do: chequear que se presione el enter
function limpiarContenidoInput() {
    //alert("hola")
    textoUsuario.value = "";
}

function agregarNota() {
    let crearNota = new Notas(textoUsuario.value,new Date(),notasArray.length,"Y");
    notasArray.push(crearNota);
    mostrarNotas();
}

let botonPapelera = document.getElementById("deshacer");
botonPapelera.addEventListener("click",recuperarNota);

function recuperarNota() {

    if(notasArrayPapelera.length)
        notasArray.push(notasArrayPapelera.pop());              //Recuperamos el último elemento de la papelera con pop al mismo tiempo que lo eliminamos, y lo recuperamos con push

    mostrarNotas();

    botonPapelera.classList.add("ocultar");                     //Ocultamos el botón de papelera, pero si sigue teniendo elementos lo volvemos a activar.
    if(notasArrayPapelera.length) {
        botonPapelera.classList.remove("ocultar");
    }
}

function guardarEnLocal() {
    let enJson = JSON.stringify(notasArray);
    localStorage.setItem("notas-rapidas-data",enJson);
    // console.log("guardado:");
    // console.log(enJson);
    // console.log("fin");
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
                                <div class="controlesSuperiores">
                                    <div class="nota_fecha">${obtenerFechaFormateada(notas.fecha)}</div>
                                    <div class="nota_controles">
                                        <input type="number" id="inputPrioridad${indice}" value=${notas.prioridad} onchange="selectorPrioridad(${indice});" min="0" max="10">
                                        <select id="select${indice}" onChange="selectorColor(${indice})">
                                            <option value="C" ${notas.color=="C"?"selected":""}>C</option>
                                            <option value="M" ${notas.color=="M"?"selected":""}>M</option>
                                            <option value="Y" ${notas.color=="Y"?"selected":""}>Y</option>
                                            <option value="K" ${notas.color=="K"?"selected":""}>K</option>
                                            <option value="W" ${notas.color=="W"?"selected":""}>W</option>
                                        </select>
                                        <div class="delete" onClick="borrarNota(${indice});">${closeSVG}</div>
                                    </div>
                                </div>
                                <div class="principal">${notas.texto}</div>
                            </div>`;
        notasContainer.innerHTML += notaNueva;
        //console.log(notaNueva);
        indice++;
    }
    guardarEnLocal();
}


/* Compatibilidad hacia atrás para reemplazar la key del local storage y no perder la data*/
if(localStorage.getItem("usuario") != null) {
    console.log("compatibilidad hacia atrás...")
    localStorage.setItem("notas-rapidas-data",localStorage.getItem("usuario"));
    localStorage.removeItem("usuario");
}

let localData = localStorage.getItem("notas-rapidas-data");
if(localData != null) {
//if(local == null || notasArray.length == 0) {

    let parsedData = JSON.parse(localData);
    //console.log(parsedData);
     for(let i=0;i<parsedData.length;i++) {
         console.log("item "+i+" - "+parsedData[i].texto);
         notasArray.push(new Notas(parsedData[i].texto,new Date(parsedData[i].fecha),parsedData[i].prioridad,parsedData[i].color));
     }
     console.log(notasArray);
     mostrarNotas();
}

else {
    //console.log("no había nada!");
    //localStorage.clear();
    notasArray.push(new Notas("<strong>INSTRUCCIONES</strong><br><ul><li>Escriba el texto de una nota y presione \"GUARDAR\"; aparecerá su nuevo post-it.</li><li>Cambie el color con el selector CMYKW</li><li>Puede indicar \"prioridad\" del 1 al 10 para que aparezca primero.</li><li>Al eliminar una nota aparecerá el botón papelera para restaurarla.</li></ul>",new Date(),0,"M"));
    mostrarNotas();
}



let botonDescargar = document.getElementById("descargarCsv");
botonDescargar.addEventListener("click",botonDescargarCsvPresionado);

function botonDescargarCsvPresionado() {
    let textosDeNotas = [];
    for(let el of notasArray) {
        let nuevoArray = [el.texto,el.color,el.fecha,el.prioridad];             //Creamos el array de arrays como se fuera una matriz bidimensional
        textosDeNotas.push(nuevoArray);
    }

    let csvContent = "data:text/csv;charset=utf-8,";                            //https://stackoverflow.com/questions/14964035
    textosDeNotas.forEach(function(rowArray) {
        let row = rowArray.join(",");                                           //Transformamos esa matriz bidimensional en algo tipo CSV
        csvContent += row + "\r\n";
    });

    let encodedUri = encodeURI(csvContent);
    let anchorDescarga = document.getElementById("anchorDescargar");
    anchorDescarga.setAttribute("href", encodedUri);                            //Para poder descargar el archivo creado hay que "adjuntarlo" a un anchor, el cuál no está visible en el DOM.
    anchorDescarga.setAttribute("download", "mis_notas_en_excel.csv");
    anchorDescarga.click(); // This will download the data file named "my_data.csv".
}





console.log("adios");
