var num_gioco, diff; //variabili globali gioco
var pos1, pos2;
var alt;
var allergyHandler;
var corrDifficultyArray = [];
var sbaDifficultyArray = [];
var alreadyUsedIds = [];
var livello = "1";
var sanoPts = [];
var piramidePts = [];
var tavolaPts = [];
var allergyPts = [];
var tot;
var count=10;
var timeout=0;
var iter;

function gameSetter(Gioco, Diff) {
    //settaggio variabili globali di gioco
    num_gioco = Gioco;
    diff = Diff;  
}

function starterDelayerEnter() {
    console.log('ho iniziato a schiacchiare play ' + timeout);
    timeout = setTimeout(function() {
        gameStarter();
    }, 3000);
}

function starterDelayerExit() {
    console.log('ho smesso di schiacchiare play ' + timeout);
    clearTimeout(timeout);
    timeout = 0;
}

function gameStarter() {
    
    //evito che play venga cliccato due volte
    document.getElementById('playbutton').removeAttribute('onmouseenter');
    
    //quando premo play nascondo la descrizione del gioco e il tasto stesso (dopo 1 sec)
    document.getElementById('gioco' + num_gioco).setAttribute("visible", false);
    document.getElementById('playbutton').setAttribute("visible", false);
    
    //successivamente carico gli elementi del gioco stesso
    if (num_gioco == '1')
        piramide(livello);
    else if (num_gioco == '2') 
        sano();
    else if (num_gioco == '3') 
        atavola();
    else allergia();
        
}



//funzione coordinatrice del gioco1
function piramide(live) {   
    var time = 2500;
    
    //appaiono a scala i piani della piramide sul muro, apparizione SOLO la prima volta
    if(piramidePts.length == 0) {
        //spostamento del tavolo per rendere visibile la piramide
        var tablePosition = document.getElementById("table").getAttribute("position");
        document.getElementById("table").setAttribute("position", {x: tablePosition.x + 1.3, y: tablePosition.y, z: tablePosition.z});
        $('#table').after('<a-image class="piramide" id="lev1" position="3.5 1 0.1" material="src: Immagini/piramide/piano1.png" rotation="0 0 0" scale="6 0.8 2" visible="false"></a-image>');
        $('#table').after(' <a-image class="piramide" id="lev2" position="3.5 1.8 0.1" material="src: Immagini/piramide/piano2.png" rotation="0 0 0" scale="5.9 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev3" position="3.45 2.6 0.1" material="src: Immagini/piramide/piano3.png" rotation="0 0 0" scale="5.8 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev4" position="3.62 3.4 0.1" material="src: Immagini/piramide/piano4.png" rotation="0 0 0" scale="5.75 0.8 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="lev5" position="3.53 4.5 0.1" material="src: Immagini/piramide/piano5.png" rotation="0 0 0" scale="5.75 1.3 2" visible="false"></a-image>');
        $('#table').after('<a-image class="piramide" id="cursore" position="0.6 \'y\' 0.2" material="src: Immagini/arrow.png" scale="0.5 0.5 0.5" visible="false"></a-image>');

        setTimeout(function(){
           document.getElementById("lev1").setAttribute("visible", true);
        }, 500);
        setTimeout(function(){
            document.getElementById("lev2").setAttribute("visible", true);
        }, 1000);
        setTimeout(function(){
            document.getElementById("lev3").setAttribute("visible", true);
        }, 1500);
        setTimeout(function(){
            document.getElementById("lev4").setAttribute("visible", true);
        }, 2000);
        setTimeout(function(){
            document.getElementById("lev5").setAttribute("visible", true);
        }, 2500);
        
        setTimeout(function() {
            var y = document.getElementById("lev"+livello).getAttribute("position").y;
            document.getElementById("cursore").setAttribute("visible", true);
            document.getElementById("cursore").setAttribute("position", {x: "0.6", y: parseFloat(y), z: "0.2"} );
            document.getElementById("table").setAttribute("visible", true);
        }, 2500);
    
    }
    
    else {
        time = 500;
        //cursore indicante livello in oggetto la sua coordinata y dipende dal livello in considerazione
        setTimeout(function() {
            var y = document.getElementById("lev"+livello).getAttribute("position").y;
            document.getElementById("cursore").setAttribute("visible", true);
            document.getElementById("cursore").setAttribute("position", {x: "0.6", y: parseFloat(y), z: "0.2"} );
        }, 500);
        
    }
    
    setTimeout(function(){
         $.getScript('Script/ajaxCallVr.js', function() {
        //risultati contiene tre elementi random, uno corretto e due sbagliati presi dal database con la giusta difficoltà
        var risultati;
        var pir1, pir2, pir3;
        
        //gestore di estrazione e posizionamento immagini
        getPiramideAjax(livello, function(risultati) {
            pir1 = risultati[0];
            pir2 = risultati[1]; 
            pir3 = risultati[2]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: pir1, graphicid: 'pir1'},
                {dbelement: pir2, graphicid: 'pir2'},
                {dbelement: pir3, graphicid: 'pir3'}
            ];
        });
    });
    },time);
   
}

//funzione per la gestione della scelta in piramide
function choicePiramide(id){
    document.getElementById('pir1').removeAttribute('onclick');
    document.getElementById('pir2').removeAttribute('onclick');
    document.getElementById('pir3').removeAttribute('onclick');
    //variabili per id non selezionati
    var aelem1;
    var aelem2;
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));
    
    if(num == 1){
        aelem1 = 'pir2';
        aelem2 = 'pir3';
    }
    else{
        if(num == 2){
            aelem1 = 'pir1';
            aelem2 = 'pir3';
        }
        else{
            aelem1 = 'pir1';
            aelem2 = 'pir2';
        }
    }
    setTimeout(function() {
       /* document.getElementById(id).setAttribute("visible", false);
        document.getElementById(aelem1).setAttribute("visible", false);
        document.getElementById(aelem2).setAttribute("visible", false);*/
        document.getElementById("cursore").setAttribute("visible",false);
        }, 1000);
    
    feedbackPiramide(id); 
}

//funzione controllore del risultato di piramide
function feedbackPiramide(id){
     //faccio sparire le scelte prima di dare feedback
    var element;
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            element=alt[i].dbelement;
            break;
        }        
    }
    
    //ripesco l'id dell'immagine giusta
    var idcorr;
    for (var i=0; i< alt.length; i++) {
        if(alt[i].dbelement.livello == livello) {
            idcorr = alt[i].graphicid;
            break;
        }            
    }
    
    if(element.livello==livello){
        //prendo la posizione della mia immagine, se è giusta, un bel green tick
        var xi = parseFloat(document.getElementById(id).getAttribute("position").x);
        var yi = parseFloat(document.getElementById(id).getAttribute("position").y);
        var zi = parseFloat(document.getElementById(id).getAttribute("position").z);
        $('#table').after('<a-image class="tick currentpiramide piramide" id="tick_'+id+'" material="src: Immagini/green-tick.png" scale="0.5 0.5 0.1" visible="false"></a-image>');
        document.getElementById("tick_"+id+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 
        console.log("giusto " + id + " giusto " + idcorr);

        $('#table').after('<a-image class="currentpiramide piramide" id="feedcorrpir"  position="8.2 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedcorrpir").setAttribute("visible", true);
            document.getElementById("tick_"+id).setAttribute("visible", true);
            
            
        }, 2000);
        
        setTimeout(function() {
            document.getElementById("lev"+ livello).setAttribute("material", 'src: Immagini/piramide/piano'+livello+'g.png');
        }, 3000);
        
        //aggiungo il punteggio 1
        piramidePts.push('1');
        
    }
    else{
        //prendo la posizione della mia immagine, è sbagliata, quindi red tick
        var xi = parseFloat(document.getElementById(id).getAttribute("position").x);
        var yi = parseFloat(document.getElementById(id).getAttribute("position").y);
        var zi = parseFloat(document.getElementById(id).getAttribute("position").z);
        console.log("sbagliato " + id + " giusto " + idcorr);
        $('#table').after('<a-image class="tick currentpiramide piramide" id="tick_'+id+'" material="src: Immagini/wrong.png" scale="0.5 0.5 0.1" visible="false"></a-image>');
        document.getElementById("tick_"+id+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 
        
        //e poi metto un green tick sull'immagine giusta
        var xi = parseFloat(document.getElementById(idcorr).getAttribute("position").x);
        var yi = parseFloat(document.getElementById(idcorr).getAttribute("position").y);
        var zi = parseFloat(document.getElementById(idcorr).getAttribute("position").z);
        $('#table').after('<a-image class="tick currentpiramide piramide" id="tick_'+idcorr+'" material="src: Immagini/green-tick.png" scale="0.5 0.5 0.1" visible="false"></a-image>');
        document.getElementById("tick_"+idcorr+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 
        
        
        $('#table').after('<a-image class="currentpiramide piramide" id="feedsbapir"  position="8.2 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedsbapir").setAttribute("visible", true);
            document.getElementById("tick_"+id).setAttribute("visible", true);
            document.getElementById("tick_"+idcorr).setAttribute("visible", true);

        }, 2000);
        
        setTimeout(function() {
            document.getElementById("lev"+ livello).setAttribute("material", 'src: Immagini/piramide/piano'+livello+'s.png');
        }, 3000);
        
        //aggiungo il punteggio 0
        piramidePts.push('0');
        
    }
    
     //cinque turni di gioco
    if(piramidePts.length<5) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
            $('.currentpiramide').remove();
            var numero = parseInt(livello) + 1;
            livello = numero.toString();
            piramide(livello);
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(piramidePts, num_gioco);
    
}


//funzione coordinatrice del gioco2
function sano() {   
    $('#table').after('<a-image class="sano" id="sanospieg" position="4 4 0.5" scale="5 4 3" material="src:Immagini/sanospieg.png" visible="false"></a-image>');
     //cestino e spiegazione visiva
    if(sanoPts.length==0) {
        setTimeout(function() {
            $('#table').after('<a-entity class="sano" id="cestino" collada-model="url(Immagini/bin/bin.dae)" position="8.7 0 4.5" scale="2 1.3 2"></a-entity>');
           document.getElementById("sanospieg").setAttribute("visible", true);
            document.getElementById("table").setAttribute("visible", true);
        }, 1000);
    }
    
    
    //chiamata allo script gestore di php
    $.getScript('Script/ajaxCallVr.js', function() {  
        //risultati contiene due elementi random, uno corretto e uno sbagliato presi dal database con la giusta difficoltà
        var risultati;
        var elm1, elm2;
        
        getSanoAjax(function(risultati) {
            elm1 = risultati[0];
            elm2 = risultati[1]; 


            //oggetto contenente l'elemento e il suo identificativo grafico, necessario per il feedback
            alt = [
                {dbelement: elm1, graphicid: 'elm1'},
                {dbelement: elm2, graphicid: 'elm2'}
            ];

            //setto le posizioni originali come variabili globali (array pos1=[x, y, z])
            pos1= document.getElementById("elm1").getAttribute('position').split(' ');
            pos2= document.getElementById("elm2").getAttribute('position').split(' ');
        });
    });
}

//funzione per la gestione della scelta in Sano
function choiceSano(id) {  
    
    //recupero coordinata x del cestino e dell'elemento cliccato
    var posizione = document.getElementById(id).getAttribute('position');
    var xCestino = document.getElementById("cestino").getAttribute("position").x;
    var xImg = posizione.x;
    var aelem;
    
    //recupero il numero dell'id che ha generato il click
    var num = parseInt(id.charAt(id.length-1));

    //se l'altro elemento è stato spostato torna alla sua posizione originaria
    if(num==1) {
        document.getElementById("elm2").setAttribute("position", {x: parseFloat(pos2[0]), y: parseFloat(pos2[1]), z: parseFloat(pos2[2])});
        aelem = 'elm2';
    }
    else if(num=2) {
        document.getElementById("elm1").setAttribute("position", {x: parseFloat(pos1[0]), y: parseFloat(pos1[1]), z: parseFloat(pos1[2])});
        aelem = 'elm1';
    }
    else 
        console.log('errore');
       
    //sposto se non arriva al cestino, fase di scelta iniziata
    if(xImg < xCestino+0.2)
        document.getElementById(id).setAttribute("position", {x:xImg+0.2, y:2.5, z:posizione.z});
    
    //butto nel cestino (si avvicina al cestino e sparisce dopo timeout) nonappena raggiungo il cestino stesso e parte la valutazione per feedback
    else {
        document.getElementById(id).setAttribute("position", {x: xCestino+0.2, y: 1.5, z: posizione.z});
        document.getElementById(id).removeAttribute('onmouseenter');
        document.getElementById(aelem).removeAttribute('onmouseenter');
        setTimeout(function() {
            document.getElementById(id).setAttribute("visible", false);
            document.getElementById(aelem).setAttribute("visible", false);
        }, 1000);
        
        feedbackSano(id); 
    } 
 
}


//funzione controllore del risultato di sano
function feedbackSano(id) {    
    //faccio sparire le scelte prima di dare feedback
    var element;
    
    //innanzitutto ripesco l'elemento associato alla scelta grazie alla variabile alt
    for(var i=0; i< alt.length; i++) {
        if (alt[i].graphicid == id) {
            element=alt[i].dbelement;
            break;
        }        
    }
    
    if(element.corr=='0'){

        $('#table').after('<a-image class="currentsano sano" id="feedcorr"  position="8.2 3.5 2" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedcorr").setAttribute("visible", true);
        }, 2000);
        
        //aggiungo il punteggio 1
        sanoPts.push('1');
        
    }
    else{
        $('#table').after('<a-image class="currentsano sano" id="feedsba"  position="8.2 3.5 2" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById("feedsba").setAttribute("visible", true);
        }, 2000);
        
        //aggiungo il punteggio 0
        sanoPts.push('0');
        
    }
    //tre turni di gioco
    if(sanoPts.length<3) {
        //prima di partire con un altro turno rimuovo gli elementi
       setTimeout(function() {
            $('.currentsano').remove();
            sano();
       }, 5000); 
    }
    //calcolo punteggio finale
    else
        finalPoints(sanoPts, num_gioco);
    
}


//funzione coordinatrice del gioco 3
function atavola() {    
    //aggiungo i poster delle scelte
    $('#table').after('<a-image class="atavola clickable" id="tav1" material="src: Immagini/atavola/colazione.png" position="2 4.5 0.3" scale="2.2 2.2 0.1" onclick="choiceTavola(\'1\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav2" material="src: Immagini/atavola/pranzo.png" position="4.5 4.5 0.3" scale="2.2 2.2 0.1" onclick="choiceTavola(\'2\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav3" material="src: Immagini/atavola/merenda.png" position="7 4.5 0.3" scale="2.2 2.2 0.5" onclick="choiceTavola(\'3\')" visible="false"></a-image>');
    $('#table').after('<a-image class="atavola clickable" id="tav4" material="src: Immagini/atavola/cena.png" position="9.5 4.5 0.3" scale="2.2 2.2 0.7" onclick="choiceTavola(\'4\')" visible="false"></a-image>');
    setTimeout(function() {
        document.getElementById("tav1").setAttribute("visible", true);
        document.getElementById("tav2").setAttribute("visible", true);
        document.getElementById("tav3").setAttribute("visible", true);
        document.getElementById("tav4").setAttribute("visible", true);
        document.getElementById("table").setAttribute("visible", true);
    }, 1000);
    
    $.getScript('Script/ajaxCallVr.js', function() {        
        var elm;
        getTavolaAjax(function(results) {
            elm = results;
            alt = [
                {dbelement: elm, graphicid: 'elem'}
            ];

        });
        
    }); 
}

function choiceTavola(momento) {
    
    //rimozione della cliccabilità delle immagini
    document.getElementById('tav1').removeAttribute('onclick');
    document.getElementById('tav2').removeAttribute('onclick');
    document.getElementById('tav3').removeAttribute('onclick');
    document.getElementById('tav4').removeAttribute('onclick');
    
   /* setTimeout(function() {
        document.getElementById('tav1').setAttribute('visible', false);
        document.getElementById('tav2').setAttribute('visible', false);
        document.getElementById('tav3').setAttribute('visible', false);
        document.getElementById('tav4').setAttribute('visible', false);
        document.getElementById('elem').setAttribute('visible', false);
    }, 1000);*/
    
    feedbackTavola(momento);
    
    
}

function feedbackTavola(momentog) {
    var element = alt[0].dbelement;
    
    //estrazione momenti della giornata associati all'immagine
    var mom = [];   
    mom.push(element.momento);    
    if(element.momento2 != '') 
        mom.push(element.momento2);
    
    //controllo correttezza risposta
    var corr = false;
    for(var i=0; i<mom.length; i++)
        if(momentog == mom[i]) { 
            corr = true;
            break;
        }
    
    //feedback
    if(corr) {  
        //tick verde sulla selezione corretta
        var xi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").x);
        var yi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").y);
        var zi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").z);
        $('#table').after('<a-image class="tick atavola" id="tick_tav'+momentog+'" material="src: Immagini/green-tick.png" scale="1.5 1.5 0.1" visible="false"></a-image>');
        document.getElementById("tick_tav"+momentog+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 

        
        $('#table').after('<a-image class="atavola" id="feed"  position="8.5 2 2" material="src:Immagini/happy.png" scale="2.2 2.2 2.2" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
            document.getElementById('tick_tav'+momentog).setAttribute('visible', true);
        }, 2000);             
        tavolaPts.push('1');
    }
    
    else {
        //green tick su quelli giusti
        for(var i = 0; i<mom.length; i++) {
            var xi = parseFloat(document.getElementById('tav'+mom[i]).getAttribute("position").x);
            var yi = parseFloat(document.getElementById('tav'+mom[i]).getAttribute("position").y);
            var zi = parseFloat(document.getElementById('tav'+mom[i]).getAttribute("position").z);
            $('#table').after('<a-image class="tick atavola" id="tick_tav'+mom[i]+'" material="src: Immagini/green-tick.png" scale="1.5 1.5 0.1" visible="false"></a-image>');
            document.getElementById("tick_tav"+mom[i]+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 
        }
        
        //red tick su quello selezionato sbagliato
        var xi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").x);
        var yi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").y);
        var zi = parseFloat(document.getElementById('tav'+momentog).getAttribute("position").z);
        $('#table').after('<a-image class="tick atavola" id="tick_tav'+momentog+'" material="src: Immagini/wrong.png" scale="1.5 1.5 0.1" visible="true"></a-image>');
        document.getElementById("tick_tav"+momentog+"").setAttribute("position", {x: xi, y: yi, z: zi+0.1} ); 
        $("#tick_tav"+momentog).hide();
        
        $('#table').after('<a-image class="atavola" id="feed" position="8.5 2 2" material="src:Immagini/sad.png" scale="2.2 2.2 2.2" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
            document.getElementById('tick_tav'+momentog).setAttribute('visible', true);
            for(var i = 0; i<mom.length; i++)
                document.getElementById('tick_tav'+mom[i]).setAttribute('visible', true);
        }, 2000);             
        tavolaPts.push('0');
    }
    
    //controllo numero giri fatti
    if (tavolaPts.length<3)
        setTimeout(function() {
            $('.atavola').remove();
            atavola();
        }, 5000);
    else
        finalPoints(tavolaPts, num_gioco);
}


//funzione coordinatrice del gioco 4
function allergia(){
    $('#table').after('<a-entity id="counter_txt" visible="false" position="16 4.7 0.3" scale="10 10 10" text="value: Rimanenti \n;"></a-entity>');
    $('#table').after('<a-entity id="counter" visible="false" position="16.5 4 0.3" scale="10 10 10" text="value:viva;"></a-entity>');
    $('#table').after('<a-plane cursor-listener id="confirm" color="orange" height="0.5" width="1.5" onclick="choiceAllergy()" position="9 2 3.5"  visible="false"></a-plane>');
    $('#table').after('<a-entity id="confirm_txt" position="10.9 2 3.5" text="value:Conferma;" visible="false" scale="5 5 5"></a-entity>');
    $('#table').after('<a-image class="allergy_clickable" id="milk" material="src: Immagini/allergy/milk.png" position="1.3 5.2 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'milk\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="egg" material="src: Immagini/allergy/eggs.png" position="3.3 5.2 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'egg\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="fish" material="src: Immagini/allergy/fish.png" position="5.3 5.2 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'fish\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="wheat" material="src: Immagini/allergy/wheat.png" position="7.3 5.2 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'wheat\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="nuts" material="src: Immagini/allergy/nuts.png" position="9.3 5.2 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'nuts\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="soy" material="src: Immagini/allergy/soybean.png" position="1.3 3.5 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'soy\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="shellfish" material="src: Immagini/allergy/shellfish.png" position="3.3 3.5 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'shellfish\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="clam" material="src: Immagini/allergy/clam.png" position="5.3 3.5 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'clam\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="peanuts" material="src: Immagini/allergy/peanuts.png" position="7.3 3.5 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'peanuts\')" visible="false"></a-image>');
    $('#table').after('<a-image class="allergy_clickable" id="celery" material="src: Immagini/allergy/celery.png" position="9.3 3.5 0.3" scale="1.5 1.5 0.1" onclick="selezionato(\'celery\')" visible="false"></a-image>');
    
    
        setTimeout(function() {
            //default allergies in every level
            document.getElementById("fridge").setAttribute("visible", false);
            document.getElementById("milk").setAttribute("visible", true);
            document.getElementById("egg").setAttribute("visible", true);
            document.getElementById("fish").setAttribute("visible", true);
            document.getElementById("wheat").setAttribute("visible", true);
            document.getElementById("table").setAttribute("visible", true);
                    
            //specific allergies of other levels
            switch(diff) {
                case '2':
                    document.getElementById("nuts").setAttribute("visible", true);
                    document.getElementById("soy").setAttribute("visible", true);
                    break;
                case '3':
                    document.getElementById("nuts").setAttribute("visible", true);
                    document.getElementById("soy").setAttribute("visible", true);
                    document.getElementById("shellfish").setAttribute("visible", true);
                    document.getElementById("clam").setAttribute("visible", true);
                    document.getElementById("peanuts").setAttribute("visible", true);
                    document.getElementById("celery").setAttribute("visible", true);
                    break;
            }
            
        }, 1000);

    console.log("test1");
    //chiamo l'immagine
    $.getScript('Script/ajaxCallVr.js', function() {                
                var elm;
                
                getAllergyAjax(function(results) {
                    elm = results;                    
                    alt = [
                        {dbelement: elm, graphicid: 'elem'}
                    ];
                    
                    //mappa di riferimento che contiene tutte le corrispondenze
                    allergyHandler = [
                        {graphicId: 'milk', selected: false, elementValue: elm.latticini},
                        {graphicId: 'fish', selected: false, elementValue: elm.pesce},
                        {graphicId: 'wheat', selected: false, elementValue: elm.glutine},
                        {graphicId: 'egg', selected: false, elementValue: elm.uova},
                        {graphicId: 'nuts', selected: false, elementValue: elm.guscio},
                        {graphicId: 'soy', selected: false, elementValue: elm.soia},
                        {graphicId: 'peanuts', selected: false, elementValue: elm.arachidi},
                        {graphicId: 'celery', selected: false, elementValue: elm.sedano},
                        {graphicId: 'clam', selected: false, elementValue: elm.molluschi},
                        {graphicId: 'shellfish', selected: false, elementValue: elm.crostacei}
                    ];
                    console.log('inizializzato handler ' + allergyHandler[0]);
                    
                    ////conto il numero di allergeni nel cibo in base alla difficoltà
                    tot = 0;
                    switch (diff) {
                        case '1':
                             for (var i=0; i<4; i++) {
                                 if (allergyHandler[i].elementValue == '1') {
                                        tot++;
                                    }
                                 }
                            
                             break;
                        case '2':  
                            for (var i=0; i<6; i++) {
                                 if (allergyHandler[i].elementValue == '1') {
                                     tot++;
                                }
                             }
                         
                             break;
                        case '3':
                            for (var i=0; i<allergyHandler.length; i++) {
                                if (allergyHandler[i].elementValue == '1')
                                tot++;
                            
                            }
                            break;
                            
                    }
                    
                    
                    count = tot;
                    
                    
                    setTimeout(function() {
                        var count1= String(count);
                        document.getElementById("counter").setAttribute("text", "value:"+count1+";");
                        document.getElementById("counter_txt").setAttribute("visible", true);
                        document.getElementById("counter").setAttribute("visible", true);
                    }, 1000);
                    
                });
                
        
        });
}


//gestore pressione sulle immagini delle allergie
function selezionato (id){
    console.log("test1 " + id);
    for(var i=0; i< allergyHandler.length; i++) {
        if(allergyHandler[i].graphicId == id) {
            //cambio colore bordo, decremento il contatore e aggiorno il count visuale
            if(!allergyHandler[i].selected) {
                //$('#'+id).css('border-color', '#41fb00');
                var xi = parseFloat(document.getElementById(id).getAttribute("position").x);
                var yi = parseFloat(document.getElementById(id).getAttribute("position").y);
                var zi = parseFloat(document.getElementById(id).getAttribute("position").z);
                $('#table').after('<a-image class="tick" id="tick_'+id+'" material="src: Immagini/green-tick.png" scale="1.5 1.5 0.1" visible="true"></a-image>');
                document.getElementById("tick_"+id+"").setAttribute("position", {x: xi, y: yi, z: zi} );
                allergyHandler[i].selected = true;
                count--;
                var count1= String(count);
                document.getElementById("counter").setAttribute("text", "value:"+count1+";");
                
            }
            else {
                document.getElementById("tick_"+id+"").setAttribute("visible", false);
                allergyHandler[i].selected = false;
                count++;
                var count1= String(count);
                document.getElementById("counter").setAttribute("text", "value:"+count1+";");
                
            }
            
            verifyCount();
            break;
        }
    }
    
};

//CONFIRM è visibile SOLO se counter arriva a 0 (decrementato ogni selezione, incrementato se deseleziono)
//va chiamata ogni volta che cambia count
function verifyCount() {    
    if(count == 0){
        document.getElementById("confirm").setAttribute("visible", true);
        document.getElementById("confirm_txt").setAttribute("visible", true);
    }
    
    else{
        document.getElementById("confirm").setAttribute("visible", false);
        document.getElementById("confirm_txt").setAttribute("visible", false);
    }
    
}

function choiceAllergy() {
    document.getElementById("confirm").removeAttribute("onclick");
    document.getElementById("milk").removeAttribute("onclick");
    document.getElementById("egg").removeAttribute("onclick");
    document.getElementById("fish").removeAttribute("onclick");
    document.getElementById("wheat").removeAttribute("onclick");
    document.getElementById("nuts").removeAttribute("onclick");
    document.getElementById("soy").removeAttribute("onclick");
    document.getElementById("shellfish").removeAttribute("onclick");
    document.getElementById("peanuts").removeAttribute("onclick");
    document.getElementById("celery").removeAttribute("onclick");
    document.getElementById("clam").removeAttribute("onclick");
    
    //faccio sparire il contatore, confirm e la scelta
   setTimeout(function() {
       document.getElementById("counter_txt").setAttribute("visible", false);
       document.getElementById("counter").setAttribute("visible", false);
       document.getElementById("confirm").setAttribute("visible", false);
       document.getElementById("confirm_txt").setAttribute("visible", false);
       $("#elem").remove();
       
   }, 1000); 
    
    feedbackAllergy();    
    
}

function feedbackAllergy() {
    var points=0;
    
    //calcolo i punti in base alle risposte corrette o sbagliate e cambio il bordo in rosso se sbagliate (o mancanti)
    switch (diff) {
        case '1': iter =4;
            break;
        case '2': iter=6;
            break;
        case '3': iter=10;
            break;            
    }
    
    //ciclo con un numero di iterazioni basato sul livello in quanto i miei elementi nell'handler sono ordinati
    //possiamo ottenere un numero di punti che va da -iter a +iter, a seconda che sia tutto sbagliato o tutto giusto
    for (var i=0; i<iter; i++) {
        if(allergyHandler[i].selected) {
            if(allergyHandler[i].elementValue == '1')
                points++;
            else {
                var selid = allergyHandler[i].graphicId;
                points--;
                if(document.getElementById("tick_"+selid+"")== null){
                    var xi = parseFloat(document.getElementById(selid).getAttribute("position").x);
                    var yi = parseFloat(document.getElementById(selid).getAttribute("position").y);
                    var zi = parseFloat(document.getElementById(selid).getAttribute("position").z);
                    $('#table').after('<a-image class="tick" id="tick_'+selid+'" material="src: Immagini/wrong.png" scale="1.5 1.5 0.1" visible="true"></a-image>');
                    document.getElementById("tick_"+selid+"").setAttribute("position", {x: xi, y: yi, z: zi} );
                }
                else
                    document.getElementById("tick_"+selid+"").setAttribute("material","src: Immagini/wrong.png;");
            }
        }

        else {
            if(allergyHandler[i].elementValue == '0')
                points++;
            else {
                points--;
                var selid = allergyHandler[i].graphicId;
                if(document.getElementById("tick_"+selid+"")== null){
                    var xi = parseFloat(document.getElementById(selid).getAttribute("position").x);
                    var yi = parseFloat(document.getElementById(selid).getAttribute("position").y);
                    var zi = parseFloat(document.getElementById(selid).getAttribute("position").z);
                    $('#table').after('<a-image class="tick" id="tick_'+selid+'" material="src: Immagini/wrong.png" scale="1.5 1.5 0.1" visible="true"></a-image>');
                    document.getElementById("tick_"+selid+"").setAttribute("position", {x: xi, y: yi, z: zi} );
                }
                else
                    document.getElementById("tick_"+selid+"").setAttribute("material","src: Immagini/wrong.png;");
            }

        }
    }
    
    //se il punteggio è negativo, lo converto a 0 (per evitare di deprimere troppo i pazienti ahah) 
    if(points<0) 
        points = 0;
    
     //feedback
    if(points < iter/2) {        
        $('#table').after('<a-image class="afeed" id="feed"  position="10 4.7 0.3" material="src:Immagini/sad.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
        }, 2000);             
    }
    
    else {
        $('#table').after('<a-image class="afeed" id="feed" position="10 4.7 0.3" material="src:Immagini/happy.png" scale="3 3 3" visible="false"></a-image>');
        setTimeout(function() {
            document.getElementById('feed').setAttribute('visible', true);
        }, 2000);             
    }
  
    //aggiungo i punti fatti questo giro
    allergyPts.push(points);
    console.log(allergyPts[0]);
    
    //3 iterazioni, come gli altri giochi
    if(allergyPts.length<3) {
        //feedback di 5 secondi per far vedere gli errori
        setTimeout(function() {
            $('.afeed').remove();
            //rimuovo i tick
            $('.tick').remove();
            $('.allergy_clickable').remove();
            //faccio partire un altro giro
            allergia();
        }, 7000);
    }
    
    else
        finalPoints(allergyPts, num_gioco);
}

//funzione per il calcolo del punteggio finale
function finalPoints(arrayPts, game) {   
    $('#table').after(' <a-image id="finalpts" position="4 3 2" material="src:Immagini/geamasc.png" scale="3 4.5 1" visible= "false"></a-image>');
    
    //rimuovo il contesto del gioco in considerazione    
    if(game == '1'){
        setTimeout(function() {
        $('.piramide').remove();
        }, 4500); 
     }
    else if(game == '2'){
        setTimeout(function() {
            $('.sano').remove();
        }, 4500); 
    }
    else{
        if(game == '3'){
            setTimeout(function() {
                $('.atavola').remove();
            }, 4500); 
        }
        else{
            setTimeout(function() {
                $('.afeed').remove();
                $('.tick').remove();
                $('.allergy_clickable').remove();
            }, 4500); 
        }
    }
    
    
    // calcolo il punteggio totale
    var totPts = 0;
    for(var i=0; i<arrayPts.length; i++) 
        totPts = totPts+parseInt(arrayPts[i]);
    
    //poi vedo il punteggio massimo in base al gioco
    var maxPts;
    switch(game) {
        case '1': 
            maxPts = 5;
            break;
        case '2':
        case '3':
            maxPts = 3;
            break;
        case '4':
            maxPts = iter*3;
            break;
    }
    
    //poi appare la mascotte indicante i punti finali
    setTimeout(function() {
        document.getElementById("finalpts").setAttribute("visible", true);
        $('#table').after(' <a-entity id="finalpts" text="value: Hai realizzato: \n' + parseInt(totPts) + ' punti su ' + maxPts + ';" position="10.5 4 2" scale="10 10 10"></a-entity>');
    }, 5000);
    
    //fine del gioco
    setTimeout(function() {
        location.href='index.html';
    }, 10000);
    
    
}