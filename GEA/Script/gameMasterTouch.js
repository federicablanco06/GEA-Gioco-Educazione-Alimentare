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


    






/*function allowDrop(ev) {
    ev.preventDefault();

}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
    draggedId = ev.target.id;
    
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    
    choiceSano(draggedId);
}*/



		// just a little helper function
		function removeClass(e,c) {
			e.className = e.className.replace(
				new RegExp('(?:^|\\s)'+c+'(?!\\S)') ,'');
		}

//funzione per la gestione della scelta in Sano
function choiceSano(id) {  
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
            $('.removable').hide();
        }, 4500); 
    }
    else{
        setTimeout(function() {
            $('.removable').hide();
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
        $("#result").append('<p id="finalptstouch">Hai realizzato: \n' +parseInt(totPts) + ' punti su ' + maxPts + '</p>');
    }, 5000);
    
    //fine del gioco
    setTimeout(function() {
        
        $("#result").empty();
        location.href='index.html';
    }, 10000);
    
    
}