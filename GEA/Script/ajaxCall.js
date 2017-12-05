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
        data: {id:diff},
         
        //trasmissione dati riuscita
        success: function(response) {
            var json=JSON.parse(response);
            var content = '';
            $.each(json[0], function(key, value){
                content += value;
            });
            
            //in base alla difficoltà richiesta, avrò estrazioni differenti all'array json            
            //smistamento in base a difficoltà
            var difficultyArray;
            for(var i=0; i<json.length; i++) {
                if(json[i].diff==difficulty) 
                    difficultyArray.push(json[i]);
            }
            
            //smistamento in base a correttezza
            var corretto, sbagliato;
            for(var j=0; j<difficultyArray.lenght; j++) {
                if(difficultyArray[i].corr==1)
                    coretto.push(difficultyArray[i]);
                else
                    sbagliato.push(difficultyArray[i]);
            }
            
        },
         
         
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}