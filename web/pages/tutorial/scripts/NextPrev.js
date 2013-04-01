

$.Controller("NextPrev", 
{
	
},
{
    init: function( el, options) {

    },
    
    "a click": function (div, ev) {
        var id = div.attr('vid');
        
        if (id == 'next' || id == 'prev'){
        	id = 0;
        }
        
        AD.Comm.Notification.publish("navbar.clicked", { id: id });
    },
    
});
    
    
