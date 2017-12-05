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
    else if (num_gioco=='2') {
        console.log("SONO FINTEEEH(?)");
        sano(diff);
    }
    else 
        tavola(diff);
    
    
    
}

function piramide(diff) {
    //da fare
}


//funzione coordinatrice del gioco2
function sano(diff) {
    //variabili temporaneamente settate, poi saranno estratte da database
    var elm1= 'Immagini/mela.png';
    var elm2= 'Immagini/patatine.png';
    
    //variabili di gioco
    document.getElementById('table').after('<a-image position="4.7 1.5 4.5" material="src:'+ elm1 +'" scale="0.7 0.7 0.7"></a-image>');
    document.getElementById('table').after('<a-image position="5.9 1.5 4.5" material="src:'+ elm2 +'" scale="0.7 0.7 0.7"></a-image>');
    
    //cestino
    document.getElementById('table').after('<a-entity collada-model="url(Immagini/bin/bin.dae)" position="7 0 4.5" scale="2 1.3 2"></a-entity>');
    
}


function tavola(diff) {
    //da fare
}
