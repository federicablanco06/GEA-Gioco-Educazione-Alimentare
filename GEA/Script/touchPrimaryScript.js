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
    
    $('body').css('background', 'url(Immagini/touch/background.png)');
    $('body').css('background-size', 'cover');
    $('body').css('background-attachment', 'scroll');
    $('body').css('max-height', '100%');
    $('body').css('height', 'auto');
    $('body').css('background-repeat', 'no-repeat');
    $('body').css('background-position', 'center');
        
    //abilito la scritta di spiegazione in base al gioco selezionato	
    switch(Gioco) {
        case "1":
            $("#giocot1").show();
            break;
        case "2":
            $("#giocot2").show();
            break;
        case "3":
            $("#giocot3").show();
            break;            
    }
    document.getElementById('touch-play').style.cursor='pointer';
    //frammento per l'estrazione anticipata dei dati da db
    $.getScript('Script/ajaxCallTouch.js', function() {
        getData(Diff, Gioco);
    });
    //frammento di script per passare al game master il contesto gioco-difficoltà da eseguire
    $.getScript('Script/gameMasterTouch.js', function() {
        gameSetter(Gioco, Diff);
    });
    
});