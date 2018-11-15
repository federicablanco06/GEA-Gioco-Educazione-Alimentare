/*
 * GEA - AUI project 2017-2018
 * ajaxCall.js
 * Script smistamento database
 * Authors: Pennati Giulia, Blanco Federica
 */

//estrattore di dati dal database
function getData(difficulty, num_gioco) {
    console.log("entri");
    var gameName;
    switch(num_gioco) {
        case '1': gameName="Piramide";
            break;
        case '2': gameName="Sano";
            break;
        case '3': gameName="Tavola";
    }
    $.ajax({
        method: "POST",
        crossDomain: true,
        url: 'http://gea.altervista.org/PHP/get'+gameName+'.php',
        data: {id: diff},
        
        success: function(response) {
            var json = JSON.parse(response);
            var content = '';
            $.each(json[0], function (key, value) {
                content += value;
            });
            
            //gestore dati estratti per gioco
            switch (num_gioco){
                case '1':
                case '3':
                    for (var i = 0; i<json.length; i++) 
                        if(json[i].diff == diff) 
                            corrDifficultyArray.push(json[i]);            
                   break;
                    
                case '2': 
                    for (var i = 0; i<json.length; i++) {
                        if(json[i].diff == difficulty && json[i].corr == '1') 
                            corrDifficultyArray.push(json[i]);
                        else if(json[i].diff == difficulty && json[i].corr == '0')
                                sbaDifficultyArray.push(json[i]);                    
                    }
                    break;

            }
        },
        
        //trasmissione dati fallita
        error: function(request,error)
        {
            console.log("Error");
        }
        
        
    });
}

function getSanoAjax(callback) {            
    usedIdRemover(corrDifficultyArray);
    usedIdRemover(sbaDifficultyArray);

    var rand1= 0;            
    //check su null
    do {
        rand1= getRandomInt(0,corrDifficultyArray.length-1);
    }
    while (corrDifficultyArray[rand1]==null);

    //estraggo il valore dall'array e pusho il suo id in quelli già usati
    var corr = corrDifficultyArray[rand1];
    alreadyUsedIds.push(corr.id);

    //caso in cui non ci sono coppie predefinite
    if(corr.idcoppia == '0'){
        var rand2 = 0;
        do {
            rand2= getRandomInt(0, sbaDifficultyArray.length-1);
         }
        while (sbaDifficultyArray[rand2]==null);
        var sba = sbaDifficultyArray[rand2];
        alreadyUsedIds.push(sba.id);
    }

    //caso coppie predefinite
    else{
        for (var t = 0; t<sbaDifficultyArray.length; t++) {
        if(sbaDifficultyArray[t]!= null && sbaDifficultyArray[t].idcoppia == corr.idcoppia){ 
            var sba = sbaDifficultyArray[t];
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
    $(document).ready(function() {
        $("#choice_container").append('<img class="choice" id="choice1" src='+selms[0].img+'/>');
        $("#choice_container").append('<img class="choice" id="choice2" src='+selms[1].img+'/>');
    });

         $("#choice1").attr("draggable", true);
         $("#choice2").attr("draggable", true);
         $("#choice1").attr("ondragstart", "drag(event)");
         $("#choice2").attr("ondragstart", "drag(event)");

            
    setTimeout(function(){
         $("#choice1").show();
            $("#choice2").show();
        
    }, 1000);
           

            //e infine le mando al game master
    callback(selms);

}

//funzione per la gestione dei valori estratti da database per la piramide
function getPiramideAjax(livello, callback) { 
    console.log("things2aj");
        //scrematura oggetti in base al livello corrente
        var corrArray = [];
        var sbaArray = [];
         for (var i = 0; i<corrDifficultyArray.length; i++) {
            if(corrDifficultyArray[i].livello == livello) 
                corrArray.push(corrDifficultyArray[i]);
            else if(corrDifficultyArray[i].livello != livello)
                sbaArray.push(corrDifficultyArray[i]);                        
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
       /* $('#table').after('<a-image class="currentpiramide piramide scelta" id="pir1"  position="7.6 1.5 4.5" material="src:'+mesco[0].img+'" scale="0.7 0.7 0.7" visible="false" onclick="choicePiramide(\'pir1\')" crossorigin></a-image>');
        $('#table').after('<a-image class="currentpiramide piramide scelta" id="pir2"  position="8.4 1.5 4.5" material="src:'+mesco[1].img+'" scale="0.7 0.7 0.7" visible="false" onclick="choicePiramide(\'pir2\')" crossorigin> </a-image>');
        $('#table').after('<a-image class="currentpiramide piramide scelta" id="pir3"  position="9.2 1.5 4.5" material="src:'+mesco[2].img+'" scale="0.7 0.7 0.7" visible="false" onclick="choicePiramide(\'pir3\')" crossorigin> </a-image>');*/

        
            
    $(document).ready(function() {
        $("#choice_container").append('<img class="choice" id="choice1" src='+mesco[0].img+'/>');
        $("#choice_container").append('<img class="choice" id="choice2" src='+mesco[1].img+'/>');
        $("#choice_container").append('<img class="choice" id="choice3" src='+mesco[2].img+'/>');
    });

            $("#choice1").attr("onclick", "choicePiramide('choice1')");
            $("#choice2").attr("onclick", "choicePiramide('choice2')");
            $("#choice3").attr("onclick", "choicePiramide('choice3')");   
            
    setTimeout(function() {
            $("#choice1").show();
            $("#choice2").show();
            $("#choice3").show();
            
            console.log("things");
            
           /*document.getElementById('pir1').setAttribute("visible", true);
           document.getElementById('pir2').setAttribute("visible", true);
           document.getElementById('pir3').setAttribute("visible", true);*/
        }, 1000); 

        //e infine le mando al game master
        callback(mesco);

}

function getTavolaAjax(callback) {

    usedIdRemover(corrDifficultyArray);
    var rand;
    
    //check sul null
    do {
        rand = getRandomInt(0, corrDifficultyArray.length-1);
    }
    while (corrDifficultyArray[rand]==null);

    //estraggo dall'array risultante l'elemento del turno corrente
    var elm = corrDifficultyArray[rand];

    alreadyUsedIds.push(elm.id);
    console.log(alreadyUsedIds);
    console.log(corrDifficultyArray);
    console.log(elm.id +" "+ elm.img);

    $(document).ready(function() {
        $("#choice_container").append('<img class="choice" id="choice1" src='+elm.img+'/>');
    });
    

    setTimeout(function() {
        $("#choice1").show();
    }, 1000);


    //rimando l'elemento al chiamante
    callback(elm);

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
            if(array[j]!= null && array[j].id == alreadyUsedIds[k]) {
                array[j]=null;
                break;
            }
        }
    }    
}