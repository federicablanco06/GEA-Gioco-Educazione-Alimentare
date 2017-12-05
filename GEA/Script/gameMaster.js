var num_gioco, diff;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;    
    
}

function gameStarter() {
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    document.getElementById('gioco'+num_gioco).setAttribute("visible", false);
    setTimeout(function() {
        document.getElementById('playbutton').setAttribute("visible", false);
    }, 1000);
    
    //successivamente carico gli elementi del gioco stesso
    if(num_gioco=='1')
        piramide(diff);
    else if (num_gioco=='2') 
        sano(diff);
    else 
        tavola(diff);
    
    
    
}

function piramide(diff) {
    //da fare
}


//funzione coordinatrice del gioco2
function sano(diff) {    
     //cestino
    $('#table').after('<a-entity class="sano" collada-model="url(Immagini/bin/bin.dae)" position="7 0 4.5" scale="2 1.3 2"></a-entity>');
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCall.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
        var risultati  = getSano(diff); //per ora non funziona
        
        /*console.log(risultati);
        
        //variabili temporaneamente settate, poi saranno estratte da database
        //var elm1= 'Immagini/mela.png';
        //var elm2= 'Immagini/patatine.png';
        var elm1= risultati[0].img;
        var elm2= risultati[1].img;

        //variabili di gioco
        $('#table').after('<a-image class="sano" position="4.7 1.5 4.5" material="src:'+ elm1 +'" scale="0.7 0.7 0.7"></a-image>');
        $('#table').after('<a-image class="sano" position="5.9 1.5 4.5" material="src:'+ elm2 +'" scale="0.7 0.7 0.7"></a-image>');*/
    });
}


function tavola(diff) {
    //da fare
}
