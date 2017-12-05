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
            var difficultyArray=[];
            for(var i=0; i<json.length; i++) {
                if(json[i].diff==difficulty) 
                    difficultyArray.push(json[i]);
            }
            
            //smistamento in base a correttezza
            var corretto=[];
            var sbagliato=[];
            for(var j=0; j<difficultyArray.lenght; j++) {
                if(difficultyArray[i].corr==1)
                    coretto.push(difficultyArray[i]);
                else
                    sbagliato.push(difficultyArray[i]);
            }
            console.log(corretto);
            console.log(sbagliato);
            
            //scelgo random le due immagini
            var rdm1=  Math.floor(Math.random() * (corretto.lenght)) + 1;
            var rdm2=  Math.floor(Math.random() * (sbagliato.lenght)) + 1;
            
            var risultati=[];
            risultati.push(corretto[rdm1]);
            risultati.push(sbagliato[rdm2]);
            
            
            //e infine le mando al game master
            return risultati;
            
            
        },
         
         
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
    });
}