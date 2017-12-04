var num_gioco, diff;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;    
    
}

function gameStarter() {
   document.getElementById('gioco'+num_gioco).setAttribute("visible", false);
    
}
