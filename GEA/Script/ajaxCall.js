/*
 * GEA - AUI project 2017-2018
 * ajaxCall.js
 * Script smistamento database
 * Authors: Pennati Giulia, Blanco Federica
 */

function getSano(difficulty) {
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
            
            
          
            console.log("elemento 0 " + corrdifficultyArray[0].img + sbadifficultyArray[0].img);
            console.log("\n correttezza " + corrdifficultyArray[0].corr + sbadifficultyArray[0].corr);
        
                        
            //scelgo random le due immagini
            function getRandomInt(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            }
            var rand1= getRandomInt(0,corrdifficultyArray.length-1);
            var rand2= getRandomInt(0,sbadifficultyArray.length-1);
                
            
            console.log(rand1);
            console.log(rand2);
            
            //var risultati=[];
            var corr = corrdifficultyArray[rand1];
            var sba = sbadifficultyArray[rand2];
            
            console.log(corr.img);
            console.log(sba.img);
            
            var elm1= corr.img;
            var elm2= sba.img;

            //variabili di gioco
         /*   $('#table').after('<a-image class="sano" id="elm1" position="6.7 1.5 4.5" material="src:'+ elm1 +'" scale="0.7 0.7 0.7"></a-image>');
            $('#table').after('<a-image class="sano" id="elm2" position="7.9 1.5 4.5" material="src:'+ elm2 +'" scale="0.7 0.7 0.7"></a-image>');*/
            
            //e infine le mando al game master
            return [corr, sba];
            
            
        },
         
         
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}