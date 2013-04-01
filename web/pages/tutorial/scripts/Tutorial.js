//// Template Replace:
//   tutorial     : the name of this interface's module: (lowercase)
//   tutorial  : the name of this interface :  (lowercase)
//   Tutorial  : the name of this interface :  (Uppercase)
/**
 *  The setup script for the tutorial Interface container. 
 *
 *  The job of this code is to perform all the setup steps on the existing
 *  HTML DOM items now.  Add Events, actions, etc... 
 *
 *  This file will be generated 1x by the RAD tool and then left alone.
 *  It is safe to put all your custom code here.
 */
//path: interfaces/Tutorial/scripts/

  (function() {
  
  
  
  ////[appRad] --  setup object definitions here:
  var tutorialTutorialSetup = function (topic, data) {
  
  
      //// Setup Your Page Data/ Operation Here
	  $('#navBar').nav_bar();
	  $('#tutorialMain div[vid]').tutorial_main();
	  $('#nextPrev').next_prev();
	  $('#bottomNextPrev').next_prev();
	  $('#logoImg').logo_img();
  

  
  } // end tutorialTutorialSetup()
  AD.Comm.Notification.subscribe('ad.tutorial.tutorial.setup',tutorialTutorialSetup);
  
  
  
  
  $(document).ready(function () {
  
      //// Do you need to do something on document.ready() before the above
      //// tutorialTutorialSetup() script is called?
    
  	
  
  }); // end ready()
  
}) ();