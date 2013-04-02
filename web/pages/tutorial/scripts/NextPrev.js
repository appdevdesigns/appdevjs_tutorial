

$.Controller("NextPrev", 
{
	
},
{
    init: function( el, options) {

    },
    
    "a click": function (div, ev) {
        var id = div.attr('vid');
        
        AD.Comm.Notification.publish("navbar.clicked", { id: id });
    },
    
});
    
    
