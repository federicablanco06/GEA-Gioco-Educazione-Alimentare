var num_gioco, diff; //variabili globali gioco
var pos1, pos2;
var alt;
var sanoPts=[];

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
    if(sanoPts.length==0) {
        setTimeout(function() {
            $('#table').after('<a-entity class="sano" id="cestino" collada-model="url(Immagini/bin/bin.dae)" position="8.7 0 4.5" scale="2 1.3 2"></a-entity>');
            $('#table').after('<a-image class="sano" position="4 4 0.5" scale="5 4 3" material="src:Immagini/sanospieg.png"></a-image>');
        }, 1000);
    }
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCall.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
        var risultati;
        var elm1, elm2;
        
        getSanoAjax(diff, function(risultati) {
            elm1 = risultati[0];
            elm2 = risultati[1]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: elm1, graphicid: 'elm1'},
                {dbelement: elm2, graphicid: 'elm2'}
            ];

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
    var aelem;
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));

    //se l'altro elemento è stato spostato torna alla sua posizione originaria
    if(num==1) {
        document.getElementById("elm2").setAttribute("position", {x: parseFloat(pos2[0]), y: parseFloat(pos2[1]), z: parseFloat(pos2[2])});
        aelem = 'elm2';
    }
    else if(num=2) {
        document.getElementById("elm1").setAttribute("position", {x: parseFloat(pos1[0]), y: parseFloat(pos1[1]), z: parseFloat(pos1[2])});
        aelem = 'elm1';
    }
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
            document.getElementById(aelem).setAttribute("visible", false);
        }, 1000);
        
        feedbackSano(id); 
    } 
 
}

//funzione controllore del risultato
function feedbackSano(id) {    
    //faccio sparire le scelte prima di dare feedback
    var element;
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            element=alt[i].dbelement;
            break;
        }        
    }
    
    if(element.corr=='0'){

        $('#table').after('<a-image class="currentsano sano" id="feedcorr"  position="8.2 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedcorr").setAttribute("visible", true);
        }, 2000);
        
        //aggiungo il punteggio 1
        sanoPts.push('1');
        
    }
    else{
        $('#table').after('<a-image class="currentsano sano" id="feedsba"  position="8.2 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedsba").setAttribute("visible", true);
        }, 2000);
        
        //aggiungo il punteggio 0
        sanoPts.push('0');
        
    }
    //tre turni di gioco
    if(sanoPts.length<3) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
            $('.currentsano').remove();
            sano(diff);
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(sanoPts, num_gioco);
    
}

//funzione per il calcolo del punteggio finale
function finalPoints(arrayPts, game) {   
    //rimuovo il contesto di sano
    setTimeout(function() {
        $('.sano').remove();
    }, 4500); 
    
    // calcolo il punteggio totale
    var totPts = 0;
    for(var i=0; i<arrayPts.length; i++) 
        totPts = totPts+parseInt(arrayPts[i]);
    
    //poi vedo il punteggio massimo in base al gioco
    var maxPts;
    if(game=='1')
        maxPts=5;
    else
        maxPts=3;
    
    //poi appare la mascotte indicante i punti finali
    setTimeout(function() {
        $('#table').after(' <a-image id="finalpts" position="4 3 2" material="src:Immagini/geamasc.png" scale="3 4.5 1"></a-image>');
        $('#table').after(' <a-entity id="finalpts" text="value: Hai realizzato: \n' + parseInt(totPts) + ' punti su ' + maxPts + ';" position="10.5 4 2" scale="10 10 10"></a-entity>');
    }, 5000);
    
    //fine del gioco
    setTimeout(function() {
        location.href='index.html';
    }, 10000);
    
    
}

function tavola(diff) {
    //da fare
}


