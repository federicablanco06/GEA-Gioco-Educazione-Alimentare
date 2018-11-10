$(function primary() {
// default behaviour: load gametpe for choose if vr or touch
	$(".contenitore").load( "gametype.html", function() {
		
		// after loading the page we should load the page manager for links
		$.getScript('Script/pageManager.js', function() {
			// load dynamic links (index.html)
			clickLinks();
		});
	});
    
});
