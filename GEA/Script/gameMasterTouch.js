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
    document.getElementById('touch-play').removeAttribute('onclick');
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    $('#giocot' + num_gioco).hide();
    setTimeout(function () {
        $("#touch-play").hide();
        }, 1000);
    
    
    //successivamente carico gli elementi del gioco stesso
    if (num_gioco == '1')
        piramide(livello);
    else if (num_gioco == '2') 
        sano();
    else 
        atavola();
        
}



//funzione coordinatrice del gioco1
function piramide(live) {   
    
    
    if(piramidePts.length == 0) {
        var time = 2500;
        //mostro la piramide
        
        console.log("costruzione piramide");
        setTimeout(function(){
            $("#pyr5").show();
            //$("#arrow").show();
        
        }, 500);
        setTimeout(function(){
            $("#pyr4").show();
        }, 1000);
        setTimeout(function(){
            $("#pyr3").show();
        }, 1500);
        setTimeout(function(){
            $("#pyr2").show();
        
        }, 2000);
        setTimeout(function(){
            $("#pyr1").show();
        }, 2500);
        
        setTimeout(function() {
            $("#cursor").css('margin-top', "58%");
           $("#arrow").show();
            
        }, 2500);
              
       /* setTimeout(function() {
            var y = document.getElementById("pyr"+livello).getAttribute("position").y;
            document.getElementById("cursore").setAttribute("visible", true);
            document.getElementById("cursore").setAttribute("position", {x: "0.6", y: parseFloat(y), z: "0.2"} );
            document.getElementById("table").setAttribute("visible", true);
        }, 2500);*/
    
    }
    
    else {
        time = 500;
        //cursore indicante livello in oggetto la sua coordinata y dipende dal livello in considerazione
        setTimeout(function() {
            switch (livello) {
                case '2':
                    $("#cursor").css('margin-top', "48%");
                    $("#arrow").show();
                    break;
                case '3':
                    $("#cursor").css('margin-top', "36%");
                    $("#arrow").show();
                    break;
                case '4':
                    $("#cursor").css('margin-top', "25%");
                    $("#arrow").show();
                    break;
                case '5':
                    $("#cursor").css('margin-top', "8%");
                    $("#arrow").show();
                    break;
            }
        }, 500);
        
    }
    console.log("things3");

    setTimeout(function(){
        console.log("things1");
         $.getScript('Script/ajaxCallTouch.js', function() {
        //risultati contiene tre elementi random, uno corretto e due sbagliati presi dal database con la giusta difficoltà
        var risultati;
        var pir1, pir2, pir3;
        
        console.log("things2");
        //gestore di estrazione e posizionamento immagini
        getPiramideAjax(livello, function(risultati) {
            pir1 = risultati[0];
            pir2 = risultati[1]; 
            pir3 = risultati[2]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: pir1, graphicid: 'choice1'},
                {dbelement: pir2, graphicid: 'choice2'},
                {dbelement: pir3, graphicid: 'choice3'}
            ];
        });
    });
    },time);
   
}

//funzione per la gestione della scelta in piramide
function choicePiramide(id){
    
    console.log("Ho cliccato l'elemento " + id);
    //variabili per id non selezionati    
    setTimeout(function() {
        $(".choice").hide();
        $("#arrow").hide();
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

        $('.feedbk').attr("src", "Immagini/happy.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);
        
        setTimeout(function() {
            $("#pyr"+livello).attr("src", "Immagini/piramide/piano"+livello+"g.png");
        }, 3000);
        
        //aggiungo il punteggio 1
        piramidePts.push('1');
        
    }
    else{
         $('.feedbk').attr("src", "Immagini/sad.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);
        
        setTimeout(function() {
            $("#pyr"+livello).attr("src", "Immagini/piramide/piano"+livello+"s.png");
        }, 3000);
        
        //aggiungo il punteggio 0
        piramidePts.push('0');
        
    }
    
     //cinque turni di gioco
    if(piramidePts.length<5) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
            $('.feedbk').hide();
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
     //cestino
    if(sanoPts.length==0) {
        setTimeout(function() {
            $("#bin").show();
        }, 1000);
    }
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCallTouch.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
        var risultati;
        var elm1, elm2;
        
        getSanoAjax(function(risultati) {
            elm1 = risultati[0];
            elm2 = risultati[1]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: elm1, graphicid: 'choice1'},
                {dbelement: elm2, graphicid: 'choice2'}
            ];

        });
    });
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//funzione per la gestione della scelta in Sano
function choiceSano(id) {  
    
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));

    //se l'altro elemento è stato spostato torna alla sua posizione originaria
   /* if(num==1) {
        document.getElementById("elm2").setAttribute("position", {x: parseFloat(pos2[0]), y: parseFloat(pos2[1]), z: parseFloat(pos2[2])});
        aelem = 'elm2';
    }
    else if(num=2) {
        document.getElementById("elm1").setAttribute("position", {x: parseFloat(pos1[0]), y: parseFloat(pos1[1]), z: parseFloat(pos1[2])});
        aelem = 'elm1';
    }
    else 
        console.log('errore');*/
       
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
    setTimeout(function() {
        document.getElementById("daytime_container").style.visibility='visible';
        document.getElementById("choice1").style.visibility='visible';
        document.getElementById("choice3").style.visibility='visible';
    }, 1000);
    
    $.getScript('Script/ajaxCallTouch.js', function() {        
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



//funzione per il calcolo del punteggio finale
function finalPoints(arrayPts, game) {   
    //rimuovo il contesto del gioco in considerazione    
    if(game == '1'){
        setTimeout(function() {
        $('.removable').hide();
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
        $("#mask").show();     
        $("#result").append('<p id="finalptstouch">Hai realizzato: \n' +parseInt(totPts) + ' punti su ' + maxPts + '; </p>');
    }, 5000);
    
    //fine del gioco
    setTimeout(function() {
        
        $("#result").empty();
        location.href='index.html';
    }, 10000);
    
    
}