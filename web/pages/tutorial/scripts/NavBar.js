
$.Controller("NavBar", 
{
	
},
{
    init: function( el, options) {
        var self = this;

    },
    
    "click" : function (){
    
    },
    
    "table tr td a click": function (div, ev) {
        var id = div.attr('vid');
        
        AD.Comm.Notification.publish("navbar.clicked", { id: id });
    },
    
});
    
    