//extraction of the url
function clickLinks () {
    window.onpopstate= function () {
        var url= window.location.href;
        
        //extraction of string after #
        var page= url.split('#')[1];
        
        if (page!='') {
            manager(page);
        }
        
        }
    };


//page change manager
function manager (args) {    
    $(".contenitore").load(args+".html");
}

