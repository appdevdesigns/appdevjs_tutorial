

$.Controller("tutorialMain", 
{
	showhide: function(id, self) 
	{    		
		
    	if (id == self.personalid)
    	{
            if (!self.isload)
           	{
   	            tutorial.findOne(
    	            { 'vid': id },
    	            // success
    	            function(data) {
    	                // Set the name
    	                self.tutorialName = data['name'];
                        $('.main .main-title').text(self.tutorialName);
    	                
    	                // Set the content
    	                var tutorialHTML = data['html'];
            	        self.element.empty().append(tutorialHTML);
            	        self.isload = true;
            	        
            	        if ($('#logoImg').length!=0)
            	        	$('#logoImg').logo_img();
            	    }, 
            	    // error
            	    function(err) {
    	                self.element.innerHTML += err.statusText;
    	                self.isload = true;
    	            }
   	            );
           	}
           	
            if (self.tutorialName) {
                $('.main .main-title').text(self.tutorialName);
            }
            self.element.show();
    	} 
    	else
        {
    		self.element.hide();
        }
        
	}
},
{
	
	init: function(el, options) {
        
        var self = this;
        
        self.isload = false;
        self.personalid = self.element.attr("vid");
        self.element.append('<div style="text-align:center; margin: 10em; opacity: .7;">Loading...</div>');
    },
    
    'navbar.clicked subscribe': function(called, data) {
        
        var id = data.id;
        var self = this;
        
        var maxID = $('#tutorialMain').attr('max_id');
        
        tutorialMain.showhide(id, self);
        
        // Update the next/prev links
        if (id == maxID) {
            // wrap around
            $("#nextPrev a.next").attr("vid", '0'); 
            $("#bottomNextPrev a.next").attr("vid",'0');
        } else {
            // normal
            $("#nextPrev a.next").attr("vid", parseInt(id)+1); 
            $("#bottomNextPrev a.next").attr("vid",parseInt(id)+1);
        }
        if (id == 0) {
            // wrap around
            $("#nextPrev a.prev").attr("vid", maxID); 
            $("#bottomNextPrev a.prev").attr("vid", maxID);
        } else {
            // normal
            $("#nextPrev a.prev").attr("vid", id-1); 
            $("#bottomNextPrev a.prev").attr("vid", id-1);
        }

    }
});
    
