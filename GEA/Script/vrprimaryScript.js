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
        case "4":
            document.getElementById("gioco4").setAttribute("visible",true);
            break;
    }
    
    //frammento per l'estrazione anticipata dei dati da db
    $.getScript('Script/ajaxCallVr.js', function() {
        getData(Diff, Gioco);
    });
    //frammento di script per passare al game master il contesto gioco-difficoltà da eseguire
    $.getScript('Script/gameMasterVr.js', function() {
        gameSetter(Gioco, Diff);
    });
    
});

AFRAME.registerComponent('camera-fix', {
    schema: {
    },

    init: function () {
        if(AFRAME.utils.device.isMobile()) {
        this.onEnterVR = AFRAME.utils.bind(this.onEnterVR, this);
        this.el.sceneEl.addEventListener('enter-vr', this.onEnterVR);
        }
    },
    //fix camera height that sums 1.6 every time we enter in VR mode

    onEnterVR: function () {
    this.el.setAttribute("position", "0 0 0");
    }

});
