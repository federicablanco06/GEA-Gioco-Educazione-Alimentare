//script di gestione del cambiamento di pagina
function clickLinks () {
    window.onpopstate= function () {
        var url= window.location.href;
        
        //estrazione della stringa dopo #
        var args= url.split('#')[1];
        var page= args.split('&')[0];
        
        if (page!='') {
            manager(args);
        }
    };
}