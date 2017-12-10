/*
 * GEA - AUI project 2017-2018
 * ajaxCall.js
 * Script smistamento database
 * Authors: Pennati Giulia, Blanco Federica
 */

var corrdifficultyArray = [];
var sbadifficultyArray = [];
var ok = false;
var corr, sba;

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
            for (var i = 0; i<json.length; i++) {
                if(json[i].diff == difficulty && json[i].corr == '1') 
                    corrdifficultyArray.push(json[i]);
                else{
                    if(json[i].diff == difficulty && json[i].corr == '0')
                        sbadifficultyArray.push(json[i]);
                }
            }
            //Invoco la funzione per estrarre le immagini in base a idcoppia
            estrazione();
                        
            //array dei risultati estratti da database
            var rst=[corr, sba];
            //array degli elementi mescolati
            var selms= shuffle(rst);
            
             //variabili di gioco
            $('#table').after('<a-image class="currentsano sano elms" id="elm1" onmouseenter="choiceSano(\'elm1\')" position="6.7 1.5 4.5" material="src:http://gea.altervista.org/'+selms[0].img+'" scale="0.7 0.7 0.7" crossorigin="anonymous"></a-image>');
            $('#table').after('<a-image class="currentsano sano elms" id="elm2" onmouseenter="choiceSano(\'elm2\')" position="7.9 1.5 4.5" material="src:http://gea.altervista.org/'+selms[1].img+'" scale="0.7 0.7 0.7" crossorigin="anonymous"></a-image>');
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

//Funzione per mescolare la posizione della immagine corretta ed errata random
function shuffle(array) {
    let counter = array.length;
 // While there are elements in the array
    while (counter > 0) {
        // Pick a random index
        let index = Math.floor(Math.random() * counter);
        counter--;
        // And swap the last element with it
        let temp = array[counter];
        array[counter] = array[index];
        array[index] = temp;
    }
 return array;
}

//Funzione per numero intero random
function getRandomInt(min, max) {
     return Math.floor(Math.random() * (max - min + 1)) + min;
}


//Funzione che estrae immagine corretta e errata: estraggo random la corretta, se ha idcoppia
//null estraggo a caso anche sbagliata altrimenti estraggo quella con idcoppia uguale; quando
//estraggo la sbagliata invoco controllo() per verificare
function estrazione(){
    var rand1= getRandomInt(0,corrdifficultyArray.length-1);
    corr = corrdifficultyArray[rand1];
    if(corr.idcoppia == ""){
        var rand2= getRandomInt(0,sbadifficultyArray.length-1);
        sba = sbadifficultyArray[rand2];
        controllo();
    }
    else{
        for (var t = 0; t<sbadifficultyArray.length; t++) {
        if(sbadifficultyArray[t].idcoppia == corr.idcoppia){ 
            sba = sbadifficultyArray[t];
            controllo();
            }
        }
    }
}


//Funzione che controlla l'id delle immagini estratte in modo che durante
//la partita non si abbiano mai le stesse immagini: se array è vuoto vanno
//sicuramente bene, se non lo è faccio check e nel caso in cui trovo un doppione
//invoco la funzione estrazione() per fare una nuova estrazione
function controllo(){
    if(alreadyUsedIds.length == "0"){
        alreadyUsedIds.push(corr.id);
        alreadyUsedIds.push(sba.id);
        ok = true;
        return ok;
        }
    else{
        for (var i=0; i<alreadyUsedIds.length; i++) {
            if(corr.id == alreadyUsedIds[i])
                estrazione();
            if(sba.id == alreadyUsedIds[i])
                estrazione();                        
        }
        alreadyUsedIds.push(corr.id);
        alreadyUsedIds.push(sba.id);
        ok = true;
        return ok;
    }
} 


