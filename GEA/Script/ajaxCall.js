/*
 * GEA - AUI project 2017-2018
 * ajaxCall.js
 * Script smistamento database
 * Authors: Pennati Giulia, Blanco Federica
 */


function getSanoAjax(difficulty, callback) {
     $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        //estrazione elementi chiamati dalla query del database
        url: "http://gea.altervista.org/PHP/getSano.php", //Relative or absolute path to file.php file
        data: {id: diff},
         
        //trasmissione dati riuscita
        success: function (response) {
            var json = JSON.parse(response);
            var content = '';
            $.each(json[0], function (key, value) {
                content += value;
            });
            
            
            //in base alla difficoltà richiesta, avrò estrazioni differenti all'array json            
            //smistamento in base a difficoltà e correttezza
            var corrdifficultyArray = [];
            var sbadifficultyArray = [];
            for (var i = 0; i<json.length; i++) {
                if(json[i].diff == difficulty && json[i].corr == '1') 
                    corrdifficultyArray.push(json[i]);
                else{
                    if(json[i].diff == difficulty && json[i].corr == '0')
                        sbadifficultyArray.push(json[i]);
                }
            }
            
            for (var i=0; i<alreadyUsedIds.length; i++) console.log("ALREADY PRIMA"+alreadyUsedIds[i]);
            usedIdRemover(corrdifficultyArray);
            usedIdRemover(sbadifficultyArray);
            
            var rand1= 0;            
            //check su null
            do {
                console.log("ENTRATO IN CORR!");
                rand1= getRandomInt(0,corrdifficultyArray.length-1);
            }
            while (corrdifficultyArray[rand1]==null);
            
            //estraggo il valore dall'array e pusho il suo id in quelli già usati
            var corr = corrdifficultyArray[rand1];
            console.log("pusho " + corr.id);
            alreadyUsedIds.push(corr.id);
            
            //caso in cui non ci sono coppie predefinite
            if(corr.idcoppia == '0'){
                var rand2 = 0;
                do {
                    console.log("ENTRATO IN SBA!");
                    rand2= getRandomInt(0, sbadifficultyArray.length-1);
                 }
                while (sbadifficultyArray[rand2]==null);
                var sba = sbadifficultyArray[rand2];
                console.log("pusho sba " + sba.id);
                alreadyUsedIds.push(sba.id);
            }
            
            //caso coppie predefinite
            else{
                for (var t = 0; t<sbadifficultyArray.length; t++) {
                if(sbadifficultyArray[t]!= null && sbadifficultyArray[t].idcoppia == corr.idcoppia){ 
                    var sba = sbadifficultyArray[t];
                    console.log("pusho sba " + sba.id);
                    alreadyUsedIds.push(sba.id);
                    break;
                    }
                }
            }
            
            //array dei risultati estratti da database
            var rst=[corr, sba];
            //array degli elementi mescolati
            var selms= shuffle(rst);

            //variabili di gioco
            $('#table').after('<a-image class="currentsano sano elms" id="elm1" onmouseenter="choiceSano(\'elm1\')" position="6.7 1.5 4.5" material="src:'+selms[0].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            $('#table').after('<a-image class="currentsano sano elms" id="elm2" onmouseenter="choiceSano(\'elm2\')" position="7.9 1.5 4.5" material="src:'+selms[1].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            document.getElementById('elm1').setAttribute("visible", true);
            document.getElementById('elm2').setAttribute("visible", true);
            
            //e infine le mando al game master
            callback(selms);
            
        },
         
         
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}

//funzione per la gestione dei valori estratti da database per la piramide
function getPiramideAjax(diff, livello, callback) {
     $.ajax({
        method: "POST",
        crossDomain: true, //localhost purposes
        //estrazione elementi chiamati dalla query del database
        url: "http://gea.altervista.org/PHP/getPiramide.php", //Relative or absolute path to file.php file
        data: {id: diff},
         
        //trasmissione dati riuscita
        success: function (response) {
            var json = JSON.parse(response);
            var content = '';
            $.each(json[0], function (key, value) {
                content += value;
            });
            
            
            //in base alla difficoltà richiesta, avrò estrazioni differenti all'array json            
            //smistamento in base a difficoltà e livello in considerazione
            var corrArray = [];
            var sbaArray = [];
            for (var i = 0; i<json.length; i++) {
                if(json[i].diff == diff && json[i].livello == livello) 
                    corrArray.push(json[i]);
                else{
                    if(json[i].diff == diff && json[i].livello != livello)
                        sbaArray.push(json[i]);
                }
            }
            
           //estraggo risposta corretta
            var rand1 = getRandomInt(0,corrArray.length-1);
            var corr = corrArray[rand1];
            
            //estraggo i due risultati errati
            var rand2 = getRandomInt(0,sbaArray.length-1);
            var sba1 = sbaArray[rand2];
            var rand3 = getRandomInt(0,sbaArray.length-1);
            while(rand3 == rand2){
                rand3 = getRandomInt(0,sbaArray.length-1);
            }
            var sba2 = sbaArray[rand3];
            
            //array dei risultati estratti da database
            var rst=[corr, sba1, sba2];
            //array degli elementi mescolati
            var mesco= shuffle(rst);

            //variabili di gioco
            document.getElementById("mobile").setAttribute("visible",true);
            $('#table').after('<a-image class="currentpiramide piramide scelta" id="scelta1" onmouseenter="choicePiramide(\'scelta1\')" position="7.9 1.5 4.5" material="src:'+mesco[0].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            $('#table').after('<a-image class="currentpiramide piramide scelta" id="scelta2" onmouseenter="choicePiramide(\'scelta2\')" position="7.9 2.5 4.5" material="src:'+mesco[1].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            $('#table').after('<a-image class="currentpiramide piramide scelta" id="scelta3" onmouseenter="choicePiramide(\'scelta3\')" position="7.9 3.5 4.5" material="src:'+mesco[2].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            document.getElementById('scelta1').setAttribute("visible", true);
            document.getElementById('scelta2').setAttribute("visible", true);
            document.getElementById('scelta3').setAttribute("visible", true);
            
            //e infine le mando al game master
            callback(mesco);
            
        },
         
         
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
    });
    
}

//scelgo random le due immagini
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(array) {
    let counter = array.length;

    // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);

        // Decrease counter by 1
        counter--;

        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }

    return array;
}

//funzione che setta a null gli elementi già utilizzati in una precedente interazione della stessa partita
function usedIdRemover(array) {    
for(var j=0; j<array.length; j++) {
        for(k=0; k<alreadyUsedIds.length; k++){
            if(array[j].id == alreadyUsedIds[k]) {
                array[j]=null;
                break;
            }
        }
    }    
}