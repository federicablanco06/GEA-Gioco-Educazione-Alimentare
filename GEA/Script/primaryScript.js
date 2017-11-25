$(function primary() {
// default behaviour: load homepage
	$(".contenitore").load( "home.html");/*, function() {
		
		// after loading the page we should load the page manager for links
		$.getScript('script/pageManager.js', function() {
			// load dynamic links (index.html)
			clickPageLinks();
		});
	});	*/
    
});

/*$(function difficulty(int game) {
    if (game==1)
        $(".contenitore").load("diff_piramide.html");
    else if(game==2)
        $(".contenitore").load("diff_sano.html");
    else if(game==3)
        $(".contenitore").load("diff_tavola.html");
});*/