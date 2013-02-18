
$.Controller("LogoImg", 
{
	
},
{
    init: function( el, options) {
        var self = this;
        self.personalid = self.element.attr("vid");

    },
    
    "img click": function (div, ev) {

    	var imgsrc = $("#logoImg img").attr("src");
    	var newimg = imgsrc.indexOf('logo.png') == -1 ? imgsrc.replace('anim.gif', 'logo.png') : imgsrc.replace('logo.png','anim.gif');
    	$("#logoImg img").attr("src", newimg);
    },
    
});
    
    