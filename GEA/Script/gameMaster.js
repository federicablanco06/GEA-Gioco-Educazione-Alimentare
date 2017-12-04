var gioco, diff;

function gameSetting(Gioco, Diff) {
    //global game variables settings
    gioco=Gioco;
    diff=Diff;    
    
}

function gameStarter() {
    document.getElementById('gioco'+diff).setAttribute("visible", false);
}
