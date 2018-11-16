var p1, p2;
window.onload = function() {
    //selecting element we wanna drag
    var choice1 = document.getElementById('choice1');
    var choice2 = document.getElementById('choice2');
    
    choice1.addEventListener('touchmove', function(ev) {
        console.log("ewww");
        var touchLoc = ev.targetTouches[0];
        p1 = choice1.position();
        choice1.style.left = touchLoc.pageX + 'px';
        choice1.style.top = touchLoc.pageY + 'px';
    });
    
     choice2.addEventListener('touchmove', function(ev) {
        var touchLoc = ev.targetTouches[0];
        
         p2 = choice2.position();
        choice2.style.left = touchLoc.pageX + 'px';
        choice2.style.top = touchLoc.pageY + 'px';
    });
    
    choice1.addEventListener('touchend', function(ev) {
        
        var x = parseInt(choice1.style.left);
        var y = parseInt(choice1.style.top);
        
        if(x < $(document).width*0,63 || x > $(document).width*0,79) {
            choice1.style.left = p1.left;
            choice1.style.top = p1.top;
        }
        
        if (y < $(document).height*0,305 || x > $(document).height*0,435) {
            choice1.style.left = p1.left;
            choice1.style.top = p1.top;
        }
    });
    
    choice2.addEventListener('touchend', function(ev) {
        
        var x = parseInt(choice2.style.left);
        var y = parseInt(choice2.style.top);
        
        if(x < $(document).width*0,63 || x > $(document).width*0,79) {
            choice1.style.left = p2.left;
            choice1.style.top = p2.top;
        }
        
        if (y < $(document).height*0,305 || x > $(document).height*0,435) {
            choice1.style.left = p2.left;
            choice1.style.top = p2.top;
        }
    });
    
    
}