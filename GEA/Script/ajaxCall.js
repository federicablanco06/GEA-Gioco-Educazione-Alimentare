/*
 * GEA - AUI project 2017-2018
 * ajaxCall.js
 * Script smistamento database
 * Authors: Pennati Giulia, Blanco Federica
 */

var alreadyUsedIds = [];

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
            var ok = false;
            var corr, sba;
          //  do {
                //scelgo random le due immagini
                function getRandomInt(min, max) {
                    return Math.floor(Math.random() * (max - min + 1)) + min;
                }
                
                //estrazione valore corretto
                var rand1= getRandomInt(0,corrdifficultyArray.length-1);
                corr = corrdifficultyArray[rand1];

                if(corr.idcoppia == null){
                    var rand2= getRandomInt(0,sbadifficultyArray.length-1);
                    sba = sbadifficultyArray[rand2];
                }
                else{
                    for (var t = 0; t<sbadifficultyArray.length; t++) {
                    if(sbadifficultyArray[t].idcoppia == corr.idcoppia){ 
                        var sba = sbadifficultyArray[t];
                        break;
                        }
                    }
                }
                
               /* //controllo id su corr
                var allOkCorr = 0;
                var allOkSba = 0;
                for (var i=0; i<alreadyUsedIds.length; i++) {
                    if(corr.id != alreadyUsedIds[i])
                        allOkCorr++;
                    if(sba.id != alreadyUsedIds[i])
                        allOkSba++;                        
                }
                if(allOkCorr==alreadyUsedIds.length && allOkSba==alreadyUsedIds.length)
                    ok = true;
                    */
                
          //  }   
           // while(ok);
            
            //array dei risultati estratti da database
            var rst=[corr, sba];
            //array degli elementi mescolati
            var selms= shuffle(rst);
            //memorizzo gli id usati per il giro successivo
            alreadyUsedIds.push(corr.id);
            alreadyUsedIds.push(sba.id);

            //variabili di gioco
            $('#table').after('<a-image class="currentsano sano elms" id="elm1" onclick="choiceSano(\'elm1\')" position="6.7 1.5 4.5" material="src:http://gea.altervista.org/'+selms[0].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
            $('#table').after('<a-image class="currentsano sano elms" id="elm2" onclick="choiceSano(\'elm2\')" position="7.9 1.5 4.5" material="src:http://gea.altervista.org/'+selms[1].img+'" scale="0.7 0.7 0.7" crossorigin></a-image>');
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


