var num_gioco, diff; //variabili globali gioco
var pos1, pos2;
var alt;
var allergyHandler;
var corrDifficultyArray = [];
var sbaDifficultyArray = [];
var alreadyUsedIds = [];
var livello = "1";
var sanoPts = [];
var piramidePts = [];
var tavolaPts = [];
var allergyPts = [];
var tot;
var count=10;
var iter;

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
    else if (num_gioco == '3') 
        atavola();
    else allergia();
        
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
        $(".choice").remove();
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


//funzione per la gestione della scelta in Sano
function choiceSano(id) {  
    $(id).hide();
    setTimeout(function(){
        $(".choice").remove();
    }, 1000); 
   
        
        feedbackSano(id); 
 
}

//funzione controllore del risultato di sano
function feedbackSano(id) {    
    //faccio sparire le scelte prima di dare feedback
    var element;
    
    console.log(id);
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            console.log("elm" +alt[i].graphicid);
            element=alt[i].dbelement;
            break;
        }        
    }
    
    if(element.corr=='0'){

       $('.feedbk').attr("src", "Immagini/happy.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);

        
        //aggiungo il punteggio 1
        sanoPts.push('1');
        
    }
    else{
         $('.feedbk').attr("src", "Immagini/sad.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);

        
        //aggiungo il punteggio 0
        sanoPts.push('0');
    }
    //tre turni di gioco
    if(sanoPts.length<3) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
           $('.feedbk').hide();
            sano();
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(sanoPts, num_gioco);
    
}


//funzione coordinatrice del gioco 3
function atavola() {   
    $("#day1").attr("onclick", "choiceTavola(1)");
    $("#day2").attr("onclick", "choiceTavola(2)");
    $("#day3").attr("onclick", "choiceTavola(3)");
    $("#day4").attr("onclick", "choiceTavola(4)");
    
    setTimeout(function() {
        $("#daytime_container").show();
    }, 1000);
    
    $.getScript('Script/ajaxCallTouch.js', function() {        
        var elm;
        getTavolaAjax(function(results) {
            elm = results;
            console.log("elm in gamemaster "+ elm.id);
            alt = [
                {dbelement: elm, graphicid: 'choice1'}
            ];

        });
        
    }); 
}

function choiceTavola(momento) {
    
    //rimozione della cliccabilità delle immagini
    $("#day1").removeAttr("onclick");
    $("#day2").removeAttr("onclick");
    $("#day3").removeAttr("onclick");
    $("#day4").removeAttr("onclick");
    
    setTimeout(function() {
        $("#daytime_container").hide();
        $("#choice1").remove();
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
        $('.feedbk').attr("src", "Immagini/happy.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);

        
        //aggiungo il punteggio 1
        tavolaPts.push('1');
        
    }
    else{
         $('.feedbk').attr("src", "Immagini/sad.png");
        
        setTimeout(function() {
             $('.feedbk').show();
        }, 2000);

        
        //aggiungo il punteggio 0
        tavolaPts.push('0');
    }
    
    //controllo numero giri fatti
    if (tavolaPts.length<3)
        setTimeout(function() {
            $('.feedbk').hide();
            atavola();
        }, 5000);
    else
        finalPoints(tavolaPts, num_gioco);
}

//funzione coordinatrice del gioco 4
function allergia(){
    if(allergyPts.length == 0) {
        setTimeout(function() {
            //default allergies in every level
            $('#milk').show();
            $('#egg').show();
            $('#fish').show();
            $('#wheat').show();
        
            //specific allergies of other levels
            switch(diff) {
                case '2':
                    $('#nuts').show();
                    $('#soy').show();
                    break;
                case '3':
                    $('#nuts').show();
                    $('#soy').show();
                    $('#shellfish').show();
                    $('#clam').show();
                    $('#peanuts').show();
                    $('#celery').show();
                    break;
            }
            
        }, 1000);
        }
    
    console.log("test1");
    //chiamo l'immagine
    $.getScript('Script/ajaxCallTouch.js', function() {                
                var elm;
                
                getAllergyAjax(function(risultati) {
                    elm = risultati;                    
                    alt = [
                        {dbelement: elm, graphicid: 'choice1'}
                    ];
                    
                    //mappa di riferimento che contiene tutte le corrispondenze
                    allergyHandler = [
                        {graphicId: 'milk', selected: false, elementValue: elm.latticini},
                        {graphicId: 'fish', selected: false, elementValue: elm.pesce},
                        {graphicId: 'wheat', selected: false, elementValue: elm.glutine},
                        {graphicId: 'egg', selected: false, elementValue: elm.uova},
                        {graphicId: 'nuts', selected: false, elementValue: elm.guscio},
                        {graphicId: 'soy', selected: false, elementValue: elm.soia},
                        {graphicId: 'peanuts', selected: false, elementValue: elm.arachidi},
                        {graphicId: 'celery', selected: false, elementValue: elm.sedano},
                        {graphicId: 'clam', selected: false, elementValue: elm.molluschi},
                        {graphicId: 'shellfish', selected: false, elementValue: elm.crostacei}
                    ];
                    console.log('inizializzato handler ' + allergyHandler[0]);
                    
                    ////conto il numero di allergeni nel cibo in base alla difficoltà
                    tot = 0;
                    switch (diff) {
                        case '1':
                             for (var i=0; i<4; i++) {
                                 if (allergyHandler[i].elementValue == '1') {
                                        tot++;
                                    }
                                 }
                            
                             break;
                        case '2':  
                            for (var i=0; i<6; i++) {
                                 if (allergyHandler[i].elementValue == '1') {
                                     tot++;
                                }
                             }
                         
                             break;
                        case '3':
                            for (var i=0; i<allergyHandler.length; i++) {
                                if (allergyHandler[i].elementValue == '1')
                                tot++;
                            
                            }
                            break;
                            
                    }
                    
                    
                    count = tot;
                    
                    setTimeout(function() {
                        $('#counter').empty();
                        $("#counter").append(count);
                        $("#counter_container").show();
                    }, 1000);
                    
                });
                
        
        });
}



window.oncontextmenu = function(event) {
     event.preventDefault();
     event.stopPropagation();
     return false;
};

//gestore pressione sulle immagini delle allergie
$( ".allergy_choice" ).on( "taphold", function( event ){
    event.preventDefault();
    $.event.special.tap.tapholdThreshold = 1000;
    $.event.special.swipe.durationThreshold = 999;
    var id = $(this).attr('id');
    console.log("test1 " + id);
    for(var i=0; i< allergyHandler.length; i++) {
        if(allergyHandler[i].graphicId == id) {
            //cambio colore bordo, decremento il contatore e aggiorno il count visuale
            if(!allergyHandler[i].selected) {
                $('#'+id).css('border-color', '#41fb00');
                //$(id).css('border-color', "#41fb00");
                allergyHandler[i].selected = true;
                count--;
                $("#counter").empty();
                $("#counter").append(count);
                
            }
            else {
                $('#'+id).css('border-color', '#ffe192');
                allergyHandler[i].selected = false;
                count++;
                $("#counter").empty();
                $("#counter").append(count);
                
            }
            
            verifyCount();
            break;
        }
    }
    
});

//CONFIRM è visibile SOLO se counter arriva a 0 (decrementato ogni selezione, incrementato se deseleziono)
//va chiamata ogni volta che cambia count
function verifyCount() {    
    if(count == 0) 
        $("#confirm").show();
    
    else
        $("#confirm").hide();
    
}

function choiceAllergy() {
    //rendo gli elementi non cliccabili
    $(".allergy_choices").unbind('longclick');
    $(".allergy_choices").css('pointer-events', 'none');
    
    //faccio sparire il contatore, confirm e la scelta
   setTimeout(function() {
       $("#counter_container").hide();
       $("#confirm").hide();
       $("#choice1").remove();
       
   }, 1000); 
    
    feedbackAllergy();    
    
}

function feedbackAllergy() {
    var points=0;
    
    //calcolo i punti in base alle risposte corrette o sbagliate e cambio il bordo in rosso se sbagliate (o mancanti)
    switch (diff) {
        case '1': iter =4;
            break;
        case '2': iter=6;
            break;
        case '3': iter=10;
            break;            
    }
    
    //ciclo con un numero di iterazioni basato sul livello in quanto i miei elementi nell'handler sono ordinati
    //possiamo ottenere un numero di punti che va da -iter a +iter, a seconda che sia tutto sbagliato o tutto giusto
    for (var i=0; i<iter; i++) {
        if(allergyHandler[i].selected) {
            if(allergyHandler[i].elementValue == '1')
                points++;
            else {
                points--;
                $('#'+allergyHandler[i].graphicId).css('border-color', 'red');
            }
        }

        else {
            if(allergyHandler[i].elementValue == '0')
                points++;
            else {
                points--;
                $('#'+allergyHandler[i].graphicId).css('border-color', 'red');
            }

        }
    }
    
    //se il punteggio è negativo, lo converto a 0 (per evitare di deprimere troppo i pazienti ahah) 
    if(points<0) 
        points = 0;
    
    //calcolo il feedback: gea triste se punti <= a iter/2
    if(points < iter/2) {
        $(".feedbk").attr('src', 'Immagini/sad.png');
        
        setTimeout(function() {
            $(".feedbk").show();
        }, 2000);
        
    }
    else {
        $(".feedbk").attr('src', 'Immagini/happy.png');
        
        setTimeout(function() {
            $(".feedbk").show();
        }, 2000);
        
    }    
    //aggiungo i punti fatti questo giro
    allergyPts.push(points);
    console.log(allergyPts[0]);
    
    //3 iterazioni, come gli altri giochi
    if(allergyPts.length<3) {
        //feedback di 5 secondi per far vedere gli errori
        setTimeout(function() {
            $(".feedbk").hide();
            //reimposto il colore dei bordi a quello standard
            $("#milk").css('border-color', '#ffe192');
            $("#soy").css('border-color', '#ffe192');
            $("#wheat").css('border-color', '#ffe192');
            $("#egg").css('border-color', '#ffe192');
            $("#fish").css('border-color', '#ffe192');
            $("#shellfish").css('border-color', '#ffe192');
            $("#nuts").css('border-color', '#ffe192');
            $("#peanuts").css('border-color', '#ffe192');
            $("#celery").css('border-color', '#ffe192');
            $("#clam").css('border-color', '#ffe192');
            //faccio partire un altro giro
            allergia();
        }, 7000);
    }
    
    else
        finalPoints(allergyPts, num_gioco);
    
    
}


//funzione per il calcolo del punteggio finale
function finalPoints(arrayPts, game) {   
    //rimuovo il contesto del gioco in considerazione  
    
    $('.removable').hide();    
    
    
    // calcolo il punteggio totale
    var totPts = 0;
    for(var i=0; i<arrayPts.length; i++) 
        totPts = totPts+parseInt(arrayPts[i]);
    //poi vedo il punteggio massimo in base al gioco
    var maxPts;
    switch(game) {
        case '1': 
            maxPts = 5;
            break;
        case '2':
        case '3':
            maxPts = 3;
            break;
        case '4':
            maxPts = iter*3;
            break;
    }

    //poi appare la mascotte indicante i punti finali
    setTimeout(function() {
        $("#mask").show();     
        $("#result").append('<p id="finalptstouch">Hai realizzato: \n' + parseInt(totPts) + ' punti <br>su ' + maxPts + '</p>');
    }, 4000);
    
    //fine del gioco
    setTimeout(function() {
        
        $("#result").empty();
        location.href='index.html';
    }, 10000);
    
    
}