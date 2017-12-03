$(function vrprimary() {
    //prendo l'url
    var url = window.location.search;
    //elimino ?
    var url1 = url.split("?")[1];
    //separo i due parametri
    var gioco = url1.split("&")[0];
    var diff = url1.split("&")[1];
    //estraggo i valori dei due parametri
    var Gioco = gioco.split("=")[1];
    var Diff = diff.split("=")[1];
        
    //abilito la scritta di spiegazione in base al gioco selezionato	
    switch(Gioco) {
        case "1":
            document.getElementById("gioco1").setAttribute("visible",true);
            break;
        case "2":
            document.getElementById("gioco2").setAttribute("visible",true);            
            break;
        case "3":
            document.getElementById("gioco3").setAttribute("visible",true);
            break;            
    }
    
});
