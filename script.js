// localStorage.setItem('nota1', 'Juan');
// localStorage.setItem('nota2', 'Pepe');




let notas = [];

function leerNotasDelAlmacenamiento() {
    for(let i = 0;i<=localStorage.length;i++) {
        notas[i] = localStorage.getItem('nota'+i);
    }
    console.log(notas);
}


let botonAgregarNota = document.getElementById("boton-agregar-nota");
botonAgregarNota.addEventListener("click", function(e) {
    let textoActual = document.getElementById("text");          //Obtenemos el elemento HTML
    textoActual = textoActual.value;                            //Reemplazamo directamente por el valor del elemento

    if(textoActual === "borrar") {
        console.log("borrando");
        localStorage.clear();
        notas = [];
    }
    else {
        if(textoActual.length >= 1) {
            localStorage.setItem("nota" + notas.length, textoActual);
            notas.push(textoActual);                                    //Además de guardarlo en el localstorage hay que agregarlo al array para poder usarlo en esta sesión
            console.log("Nueva nota: "+textoActual);
        }
    }

    cargarNotasAlDOM();                                   //Lo llamamos acá para actualizar el contenido al momento de agregar la nota nueva.
});


function cargarNotasAlDOM () {
    let divNotas = document.getElementById("notasContainer");
    divNotas.innerHTML = "";


    for(let i=0;i<=notas.length;i++) {
        // let idActual = "nota" + i;
        // if(notas[i] != null && notas[i] != undefined)
        //     divNotas.innerHTML += "<div id=\""+idActual+"\"class=\"notas\">"+notas[i]+"</div>"
        let templateString = `  <div id=\"nota${i}\" class=\"notas\">
                                <h3> Nota : ${i+1}</h3>
                                <span>${notas[i]}</span>
                                </div>`;
        if(notas[i] != null && notas[i] != undefined) {
            //document.body.main.appendChild(templateString);
            divNotas.innerHTML += templateString;
        }
    }
}


leerNotasDelAlmacenamiento();
cargarNotasAlDOM();

