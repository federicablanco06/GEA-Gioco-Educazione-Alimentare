var num_gioco, diff; //variabili globali gioco
var pos1, pos2;
var alt;
var corrDifficultyArray = [];
var sbaDifficultyArray = [];
var alreadyUsedIds = [];
var livello = "1";
var sanoPts = [];
var piramidePts = [];
var tavolaPts = [];


function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;  
}

function gameStarter() {
    
    //evito che play venga cliccato due volte
    document.getElementById('playbutton').removeAttribute('onmouseenter');
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    document.getElementById('gioco' + num_gioco).setAttribute("visible", false);
    setTimeout(function () {
        document.getElementById('playbutton').setAttribute("visible", false);
    }, 1000);
    
    //successivamente carico gli elementi del gioco stesso
    if (num_gioco == '1')
        piramide(livello);
    else if (num_gioco == '2') 
        sano();
    else if (num_gioco == '3') 
        atavola();
    else allergia();
        
}



//funzione coordinatrice del gioco1
function piramide(live) {   
    var time = 2500;
    
    //appaiono a scala i piani della piramide sul muro, apparizione SOLO la prima volta
    if(piramidePts.length == 0) {
        //spostamento del tavolo per rendere visibile la piramide
        var tablePosition = document.getElementById("table").getAttribute("position");
        document.getElementById("table").setAttribute("position", {x: tablePosition.x + 1.3, y: tablePosition.y, z: tablePosition.z});
        $('#table').after('<a-image class="piramide" id="lev1" position="3.5 1 0.1" material="src: Immagini/piramide/piano1.png" rotation="0 0 0" scale="6 0.8 2" visible="false"></a-image>');
        $('#table').after(' <a-image class="piramide" id="lev2" position="3.5 1.8 0.1" material="src: Immagini/piramide/piano2.png" rotation="0 0 0" scale="5.9 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev3" position="3.45 2.6 0.1" material="src: Immagini/piramide/piano3.png" rotation="0 0 0" scale="5.8 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev4" position="3.62 3.4 0.1" material="src: Immagini/piramide/piano4.png" rotation="0 0 0" scale="5.75 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev5" position="3.53 4.5 0.1" material="src: Immagini/piramide/piano5.png" rotation="0 0 0" scale="5.75 1.3 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="cursore" position="0.6 \'y\' 0.2" material="src: Immagini/arrow.png" scale="0.5 0.5 0.5" visible="false"></a-image>');

        setTimeout(function(){
           document.getElementById("lev1").setAttribute("visible", true);
        }, 500);
        setTimeout(function(){
            document.getElementById("lev2").setAttribute("visible", true);
        }, 1000);
        setTimeout(function(){
            document.getElementById("lev3").setAttribute("visible", true);
        }, 1500);
        setTimeout(function(){
            document.getElementById("lev4").setAttribute("visible", true);
        }, 2000);
        setTimeout(function(){
            document.getElementById("lev5").setAttribute("visible", true);
        }, 2500);
        
        setTimeout(function() {
            var y = document.getElementById("lev"+livello).getAttribute("position").y;
            document.getElementById("cursore").setAttribute("visible", true);
            document.getElementById("cursore").setAttribute("position", {x: "0.6", y: parseFloat(y), z: "0.2"} );
            document.getElementById("table").setAttribute("visible", true);
        }, 2500);
    
    }
    
    else {
        time = 500;
        //cursore indicante livello in oggetto la sua coordinata y dipende dal livello in considerazione
        setTimeout(function() {
            var y = document.getElementById("lev"+livello).getAttribute("position").y;
            document.getElementById("cursore").setAttribute("visible", true);
            document.getElementById("cursore").setAttribute("position", {x: "0.6", y: parseFloat(y), z: "0.2"} );
        }, 500);
        
    }
    
    setTimeout(function(){
         $.getScript('Script/ajaxCallVr.js', function() {
        //risultati contiene tre elementi random, uno corretto e due sbagliati presi dal database con la giusta difficoltà
        var risultati;
        var pir1, pir2, pir3;
        
        //gestore di estrazione e posizionamento immagini
        getPiramideAjax(livello, function(risultati) {
            pir1 = risultati[0];
            pir2 = risultati[1]; 
            pir3 = risultati[2]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: pir1, graphicid: 'pir1'},
                {dbelement: pir2, graphicid: 'pir2'},
                {dbelement: pir3, graphicid: 'pir3'}
            ];
        });
    });
    },time);
   
}

//funzione per la gestione della scelta in piramide
function choicePiramide(id){
    //variabili per id non selezionati
    var aelem1;
    var aelem2;
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));
    
    if(num == 1){
        aelem1 = 'pir2';
        aelem2 = 'pir3';
    }
    else{
        if(num == 2){
            aelem1 = 'pir1';
            aelem2 = 'pir3';
        }
        else{
            aelem1 = 'pir1';
            aelem2 = 'pir2';
        }
    }
    setTimeout(function() {
        document.getElementById(id).setAttribute("visible", false);
        document.getElementById(aelem1).setAttribute("visible", false);
        document.getElementById(aelem2).setAttribute("visible", false);
        document.getElementById("cursore").setAttribute("visible",false);
        }, 1000);
    
    feedbackPiramide(id); 
}

//funzione controllore del risultato di piramide
function feedbackPiramide(id){
     //faccio sparire le scelte prima di dare feedback
    var element;
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            element=alt[i].dbelement;
            break;
        }        
    }
    
    if(element.livello==livello){

        $('#table').after('<a-image class="currentpiramide piramide" id="feedcorrpir"  position="8.2 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedcorrpir").setAttribute("visible", true);
        }, 2000);
        
        setTimeout(function() {
            document.getElementById("lev"+ livello).setAttribute("material", 'src: Immagini/piramide/piano'+livello+'g.png');
        }, 3000);
        
        //aggiungo il punteggio 1
        piramidePts.push('1');
        
    }
    else{
        $('#table').after('<a-image class="currentpiramide piramide" id="feedsbapir"  position="8.2 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedsbapir").setAttribute("visible", true);
        }, 2000);
        
        setTimeout(function() {
            document.getElementById("lev"+ livello).setAttribute("material", 'src: Immagini/piramide/piano'+livello+'s.png');
        }, 3000);
        
        //aggiungo il punteggio 0
        piramidePts.push('0');
        
    }
    
     //cinque turni di gioco
    if(piramidePts.length<5) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
            $('.currentpiramide').remove();
           var numero = parseInt(livello) + 1;
            livello = numero.toString();
            piramide(livello);
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(piramidePts, num_gioco);
    
}


//funzione coordinatrice del gioco2
function sano() {   
    $('#table').after('<a-image class="sano" id="sanospieg" position="4 4 0.5" scale="5 4 3" material="src:Immagini/sanospieg.png" visible="false"></a-image>');
     //cestino e spiegazione visiva
    if(sanoPts.length==0) {
        setTimeout(function() {
            $('#table').after('<a-entity class="sano" id="cestino" collada-model="url(Immagini/bin/bin.dae)" position="8.7 0 4.5" scale="2 1.3 2"></a-entity>');
           document.getElementById("sanospieg").setAttribute("visible", true);
            document.getElementById("table").setAttribute("visible", true);
        }, 1000);
    }
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCallVr.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
        var risultati;
        var elm1, elm2;
        
        getSanoAjax(function(risultati) {
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
        document.getElementById(id).removeAttribute('onmouseenter');
        document.getElementById(aelem).removeAttribute('onmouseenter');
        setTimeout(function() {
            document.getElementById(id).setAttribute("visible", false);
            document.getElementById(aelem).setAttribute("visible", false);
        }, 1000);
        
        feedbackSano(id); 
    } 
 
}

//funzione controllore del risultato di sano
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
            sano();
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(sanoPts, num_gioco);
    
}


//funzione coordinatrice del gioco 3
function atavola() {    
    //aggiungo i poster delle scelte
    $('#table').after('<a-image class="atavola clickable" id="tav1" material="src: Immagini/atavola/colazione.png" position="2 4 0.3" scale="2.2 2.2 0.1" onclick="choiceTavola(\'1\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav2" material="src: Immagini/atavola/pranzo.png" position="4.5 4 0.3" scale="2.2 2.2 0.1" onclick="choiceTavola(\'2\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav3" material="src: Immagini/atavola/merenda.png" position="7 4 0.3" scale="2.2 2.2 0.5" onclick="choiceTavola(\'3\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav4" material="src: Immagini/atavola/cena.png" position="9.5 4 0.3" scale="2.2 2.2 0.7" onclick="choiceTavola(\'4\')" visible="false"></a-image>');
    setTimeout(function() {
        document.getElementById("tav1").setAttribute("visible", true);
        document.getElementById("tav2").setAttribute("visible", true);
        document.getElementById("tav3").setAttribute("visible", true);
        document.getElementById("tav4").setAttribute("visible", true);
        document.getElementById("table").setAttribute("visible", true);
    }, 1000);
    
    $.getScript('Script/ajaxCallVr.js', function() {        
        var elm;
        getTavolaAjax(function(results) {
            elm = results;
            alt = [
                {dbelement: elm, graphicid: 'elem'}
            ];

        });
        
    }); 
}

function choiceTavola(momento) {
    
    //rimozione della cliccabilità delle immagini
    document.getElementById('tav1').removeAttribute('onclick');
    document.getElementById('tav2').removeAttribute('onclick');
    document.getElementById('tav3').removeAttribute('onclick');
    document.getElementById('tav4').removeAttribute('onclick');
    
    setTimeout(function() {
        document.getElementById('tav1').setAttribute('visible', false);
        document.getElementById('tav2').setAttribute('visible', false);
        document.getElementById('tav3').setAttribute('visible', false);
        document.getElementById('tav4').setAttribute('visible', false);
        document.getElementById('elem').setAttribute('visible', false);
    }, 1000);
    
    feedbackTavola(momento);
    
    
}

function feedbackTavola(momentog) {
    var element = alt[0].dbelement;
    
    //estrazione momenti della giornata associati all'immagine
    var mom = [];   
    mom.push(element.momento);    
    if(element.momento2 != '') 
        mom.push(element.momento2);
    
    //controllo correttezza risposta
    var corr = false;
    for(var i=0; i<mom.length; i++)
        if(momentog == mom[i]) { 
            corr = true;
            break;
        }
    
    //feedback
    if(corr) {        
        $('#table').after('<a-image class="atavola" id="feed"  position="8.2 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
        }, 2000);             
        tavolaPts.push('1');
    }
    
    else {
        $('#table').after('<a-image class="atavola" id="feed" position="8.2 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
        }, 2000);             
        tavolaPts.push('0');
    }
    
    //controllo numero giri fatti
    if (tavolaPts.length<3)
        setTimeout(function() {
            $('.atavola').remove();
            atavola();
        }, 5000);
    else
        finalPoints(tavolaPts, num_gioco);
}


//funzione coordinatrice del gioco 4
function allergia(){}

//funzione per il calcolo del punteggio finale
function finalPoints(arrayPts, game) {   
    $('#table').after(' <a-image id="finalpts" position="4 3 2" material="src:Immagini/geamasc.png" scale="3 4.5 1" visible= "false"></a-image>');
    
    //rimuovo il contesto del gioco in considerazione    
    if(game == '1'){
        setTimeout(function() {
        $('.piramide').remove();
        }, 4500); 
     }
    else if(game == '2'){
        setTimeout(function() {
            $('.sano').remove();
        }, 4500); 
    }
    else{
        setTimeout(function() {
            $('.atavola').remove();
        }, 4500); 
    }
    
    
    
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
        document.getElementById("finalpts").setAttribute("visible", true);
        $('#table').after(' <a-entity id="finalpts" text="value: Hai realizzato: \n' + parseInt(totPts) + ' punti su ' + maxPts + ';" position="10.5 4 2" scale="10 10 10"></a-entity>');
    }, 5000);
    
    //fine del gioco
    setTimeout(function() {
        location.href='index.html';
    }, 10000);
    
    
}