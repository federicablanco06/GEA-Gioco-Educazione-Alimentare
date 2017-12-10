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
            
           // for (var i=0; i<corrdifficultyArray.length; i++) console.log("CORR PRIMA"+corrdifficultyArray[i].id);
           // for (var i=0; i<sbadifficultyArray.length; i++) console.log("SBA PRIMA"+sbadifficultyArray[i].id);
           // for (var i=0; i<alreadyUsedIds.length; i++) console.log("ALREADY PRIMA"+alreadyUsedIds[i]);
           
            usedIdRemover(corrdifficultyArray);
            usedIdRemover(sbadifficultyArray);
          /*  for (var i=0; i<alreadyUsedIds.length; i++) {
                console.log("ALREADY"+alreadyUsedIds[i]);
                var index = corrdifficultyArray.map(function(x) {return x.id; }).indexOf(alreadyUsedIds[i]);
               if(index != -1){
                    console.log("INDICE"+index);
                    corrdifficultyArray.splice(index,1);
                    for (var i=0; i<corrdifficultyArray.length; i++) 
                    {console.log("CORR DOPO"+corrdifficultyArray[i].id);}
                }
            }
            
            for (var f=0; f<alreadyUsedIds.length; f++) {
                console.log("ALREADY2"+alreadyUsedIds[f]);
             var index1 = sbadifficultyArray.map(function(x) {return x.id; }).indexOf(alreadyUsedIds[f]);
                if(index1 != -1){
                    console.log("INDICE"+index1);
                    sbadifficultyArray.splice(index1,1);
                    for (var i=0; i<sbadifficultyArray.length; i++) console.log("SBA DOPO"+sbadifficultyArray[i].id);
                }
            }*/
            
            //Invoco la funzione per estrarre le immagini in base a idcoppia
            estrazione();
                        
            //array dei risultati estratti da database
            var rst=[corr, sba];
            //array degli elementi mescolati
            var selms= shuffle(rst);
            
             //variabili di gioco
            $('#table').after('<a-image class="currentsano sano elms" id="elm1" onmouseenter="choiceSano(\'elm1\')" position="6.7 1.5 4.5" material="src:'+selms[0].img+'" scale="0.7 0.7 0.7" crossorigin="anonymous"></a-image>');
            $('#table').after('<a-image class="currentsano sano elms" id="elm2" onmouseenter="choiceSano(\'elm2\')" position="7.9 1.5 4.5" material="src:'+selms[1].img+'" scale="0.7 0.7 0.7" crossorigin="anonymous"></a-image>');
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
//0 estraggo a caso anche sbagliata altrimenti estraggo quella con idcoppia uguale;
function estrazione(){
    var rand1 = 0;
    do {
        console.log("ENTRATO IN CORR!");
        rand1= getRandomInt(0,corrdifficultyArray.length-1);
    }
    while (corrdifficultyArray[rand1]==null);
    
    corr = corrdifficultyArray[rand1];
    console.log("CORR ESTRATTO"+corr.id);
    console.log("pusho " + corr.id);
    alreadyUsedIds.push(corr.id);
    if(corr.idcoppia == '0'){
        var rand2 = 0;
        do {
            console.log("ENTRATO IN SBA!");
            rand2= getRandomInt(0, sbadifficultyArray.length-1);
        }
        while (sbadifficultyArray[rand2]==null);
        
        sba = sbadifficultyArray[rand2];
        console.log("SBA ESTRATTO "+sba.id);
        console.log("pusho sba " + sba.id);
        alreadyUsedIds.push(sba.id);
    }
    else{
        console.log("entro qui ")
        for (var t = 0; t<sbadifficultyArray.length; t++) {
            
        if(sbadifficultyArray[t]!= null && sbadifficultyArray[t].idcoppia == corr.idcoppia){ 
            sba = sbadifficultyArray[t];
            console.log("SBA ESTRATTO "+sba.id);
            alreadyUsedIds.push(sba.id);
            }
        }
    }
}

//funzione che setta a null gli elementi già utilizzati in una precedente interazione della stessa partita
function usedIdRemover(array) {    
for(var j=0; j<array.length; j++) {
    console.log("ma ci entri qui o no1");
        for(k=0; k<alreadyUsedIds.length; k++){
            if(array[j].id == alreadyUsedIds[k]) {
                console.log("HO TROVATO UN ID GIA' USATO MANNAGGIA NUMERO " + array[j].id);
                array[j]=null;
                console.log("ORA E' " + array[j]);
                break;
            }
        }
    }    
}