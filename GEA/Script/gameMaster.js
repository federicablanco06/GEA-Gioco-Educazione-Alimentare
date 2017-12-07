var num_gioco, diff; //variabili globali gioco
var elem1, elem2; //variabili globali scelta di sano
var pos1, pos2;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;
    
    
}

function gameStarter() {
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    document.getElementById('gioco'+num_gioco).setAttribute("visible", false);
    setTimeout(function() {
        document.getElementById('playbutton').setAttribute("visible", false);
    }, 1000);
    
    //successivamente carico gli elementi del gioco stesso
    if(num_gioco=='1')
        piramide(diff);
    else if (num_gioco=='2') 
        sano(diff);
    else 
        tavola(diff);
    
    
    
}

function piramide(diff) {
    //da fare
}


//funzione coordinatrice del gioco2
function sano(diff) {    
     //cestino
    $('#table').after('<a-entity class="sano" id="cestino" collada-model="url(Immagini/bin/bin.dae)" position="8.7 0 4.5" scale="2 1.3 2"></a-entity>');
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCall.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
       // var risultati  = getSano(diff); //per ora non funziona
      
        //variabili temporaneamente settate, poi saranno estratte da database
        var elm1= 'Immagini/mela.png';
        var elm2= 'Immagini/patatine.png';
        elem1=elm1;
        elem2=elm2;
        
        console.log("ELEMENTI " + elem1 + " " + elem2);
        
        //variabili di gioco
        $('#table').after('<a-image class="sano" id="elm1" onclick="gameSano(\'elm1\')" position="6.7 1.5 4.5" material="src:'+ elm1 +'" scale="0.7 0.7 0.7"></a-image>');
        $('#table').after('<a-image class="sano" id="elm2" onclick="gameSano(\'elm2\')" position="7.9 1.5 4.5" material="src:'+ elm2 +'" scale="0.7 0.7 0.7"></a-image>');
        
        console.log("DOPO INSERIMENTO " + document.getElementById("elm1").getAttribute("class"));
        
        //setto le posizioni originali come variabili globali (array pos1=[x, y, z])
        pos1= document.getElementById("elm1").getAttribute('position').split(' ');
        pos2= document.getElementById("elm2").getAttribute('position').split(' ');
        
        console.log("POSIZIONE QUINDIH " + pos1[0]);
        
                
        
    });
}


function gameSano(id) {  
    
    var posizione = document.getElementById(id).getAttribute('position');
    console.log("posizione da gameSano " + posizione);
    var xCestino = document.getElementById("cestino").getAttribute("position").x;
    var xImg = posizione.x;
    
    //se l'altro elemento è stato spostato torna alla sua posizione originaria
   /* if(document.getElementById("elm2").getAttribute("position").y != pos2.y){
        document.getElementById("elm2").setAttribute("position", {x:pos2.x, y: pos2.y, z: pos2.z});
    }*/
    
    //sposto se non arriva al cestino
    if(xImg < xCestino+0.2) {
        document.getElementById(id).setAttribute("position", {x:xImg+0.2, y:2.5, z:posizione.z});
    }
    
    
    
    
}

/*FUNZIONE CONTROLLER*/



/*FINE FUNZIONE CONTROLLER*/

function tavola(diff) {
    //da fare
}


