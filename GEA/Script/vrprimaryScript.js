$(function vrprimary() {
    var url = window.location.search;
    var url1= url.split("?")[1];
    var gioco= url1.split("&")[0];
    var diff= url1.split("&")[1];
    
    var Gioco = gioco.split("=")[1];
    var Diff = diff.split("=")[1];
    window.alert("ciao" Gioco Diff);
    
    	
    switch(Gioco) {
        case 1:
            $.get("gioco1.html?Diff="+ Diff);
            break;
        case 2:
            $.get("gioco2.html?Diff="+ Diff);
            break;
        case 3:
            $.get("gioco3.html?Diff="+ Diff);
            break;            
    }
    
});
