var num_gioco, diff; //variabili globali gioco
var pos1, pos2;
var alt;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;
    
    
}

function gameStarter() {
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    document.getElementById('gioco' + num_gioco).setAttribute("visible", false);
    setTimeout(function () {
        document.getElementById('playbutton').setAttribute("visible", false);
    }, 1000);
    
    //successivamente carico gli elementi del gioco stesso
    if (num_gioco == '1')
        piramide(diff);
    else if (num_gioco == '2') 
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
        //var dfd = $.Deferred();
        var risultati;
        var elm1, elm2;
        //dfd.resolve;
        
        getSanoAjax(diff, function(risultati) {
            elm1 = risultati[0];
            elm2 = risultati[1]; 

            console.log("FATTO GET PRIMA SISISIS ");
            console.log("ELMS " + elm1 + elm2);

            //variabili temporaneamente settate, poi saranno estratte da database
            //var elm1= ['Immagini/mela.png', '1'];
           // var elm2= ['Immagini/patatine.png', '0'];

            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: elm1, graphicid: 'elm1'},
                {dbelement: elm2, graphicid: 'elm2'}
            ];

            //variabili di gioco
            /*$('#table').after('<a-image class="sano" id="elm1" onclick="choiceSano(\'elm1\')" position="6.7 1.5 4.5" material="src:'+ elm1[0] +'" scale="0.7 0.7 0.7"></a-image>');
            $('#table').after('<a-image class="sano" id="elm2" onclick="choiceSano(\'elm2\')" position="7.9 1.5 4.5" material="src:'+ elm2[0] +'" scale="0.7 0.7 0.7"></a-image>');*/

            //setto le posizioni originali come variabili globali (array pos1=[x, y, z])
            pos1= document.getElementById("elm1").getAttribute('position').split(' ');
            pos2= document.getElementById("elm2").getAttribute('position').split(' ');
        });
    });
}


//funzione per la gestione della scelta in Sano
function choiceSano(id) {  
    
    //recupero coordinata x del cestino e dell'elemento cliccato
    var posizione = document.getElementById(id).getAttribute('position');
    var xCestino = document.getElementById("cestino").getAttribute("position").x;
    var xImg = posizione.x;
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));

    //se l'altro elemento è stato spostato torna alla sua posizione originaria
    if(num==1)
        document.getElementById("elm2").setAttribute("position", {x: parseFloat(pos2[0]), y: parseFloat(pos2[1]), z: parseFloat(pos2[2])});
    else if(num=2)
        document.getElementById("elm1").setAttribute("position", {x: parseFloat(pos1[0]), y: parseFloat(pos1[1]), z: parseFloat(pos1[2])});
    else 
        console.log('errore');
       
    //sposto se non arriva al cestino, fase di scelta iniziata
    if(xImg < xCestino+0.2)
        document.getElementById(id).setAttribute("position", {x:xImg+0.2, y:2.5, z:posizione.z});
    
    //butto nel cestino (si avvicina al cestino e sparisce dopo timeout) nonappena raggiungo il cestino stesso e parte la valutazione per feedback
    else {
        document.getElementById(id).setAttribute("position", {x: xCestino+0.2, y: 1.5, z: posizione.z});
        setTimeout(function() {
            document.getElementById(id).setAttribute("visible", false);
        }, 1000);
        
        feedbackSano(id); 
    } 
 
}

//funzione controllore del risultato
function feedbackSano(id) {    
    //faccio sparire le scelte prima di dare feedback
    $('.elms').css("display", "none");
    var element;
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            element=alt[i].dbelement;
            break;
        }        
    }
    console.log("ELEMENTO " + element + " " + element.img + element.corr);
    
    if(element.corr=='0'){
        console.log("VEROOOO");
        $('#table').after('<a-image class="feedbackcorr" id="feedcorr"  position="5.5 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedcorr").setAttribute("visible", true);
        }, 2000);
        
    }
    else{
        console.log("FALSOOOO");
        $('#table').after('<a-image class="feedbacksba" id="feedsba"  position="5.5 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedsba").setAttribute("visible", true);
        }, 2000);
        
    }
    
    
}

function tavola(diff) {
    //da fare
}


