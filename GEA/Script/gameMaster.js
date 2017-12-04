var num_gioco, diff;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;    
    
}

function gameStarter() {
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso
    document.getElementById('gioco'+num_gioco).setAttribute("visible", false);
    document.getElementById('playbutton').setAttribute("visible", false);
    
    //successivamente carico gli elementi del gioco stesso
    if(num_gioco='1')
        piramide(diff);
    else if (num_gioco='2')
        sano(diff);
    else 
        tavola(diff);
    
    
    
}

function sano(diff) {
    //da fare
}

function piramide(diff) {
    //da fare
}

function tavola(diff) {
    //da fare
}
