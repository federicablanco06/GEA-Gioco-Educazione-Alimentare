//extraction of the url
function clickLinks () {
    window.onpopstate= function () {
        var url= window.location.href;
        
        //extraction of string after #
        var args= url.split('#')[1];
        var page= args.split('&')[0];
        
        if (page!='') {
            manager(args);
        }
    };
}

//page change manager
function manager (args) {
    var page= args.split('&')[0];
    
    $(".contenitore").load(page+".html");
}
