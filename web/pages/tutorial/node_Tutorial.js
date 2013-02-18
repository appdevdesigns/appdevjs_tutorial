//// Template Replace:
//   tutorial     : the name of this interface's module: (lowercase)
//   tutorial  : the name of this interface :  (lowercase)
//   Tutorial  : the name of this interface :  (Uppercase)
//path: interfaces/Tutorial

////
//// Tutorial
////
//// This is the Interface level definition for the Tutorial page.
////
//// An "interface" is usually a new page displayed in the browser, 
//// requiring a full page load.  
////
//// An interface is required to load:
////    listJavascripts :  all the javascript files required for this page
////    listCSS : any css files required for this page
////    pathTemplate: the path from the site root to the template file to 
////                  use to render the page content
////    templateData: an object representing all the data to use to render 
////                  the template for this page content



var tutorialInterface = new AD.App.Interface({
	pathPage: __dirname,

//    pathModules: __dirname + '/containers',
//    pathScripts: __dirname+'/scripts',
//    pathServices: __dirname+'/services',

    listWidgets: [ 
// AppRAD: WIDGET DEPENDENCY //    
                 ]
    });
module.exports = tutorialInterface;    

var app = tutorialInterface.app;

////
//// View Routes
////



////
//// setup any /tutorial/tutorial specific routes
////

/*
//// this route is for returning the javascript dependencies for this page
app.get('/init/tutorial/tutorial/tutorial.js', function(req, res, next) {

    //// We are returning our dependencies to our dependency manager (steal)
    //// We need to return 
    ////    listJavascripts:  our javascript functions 
    ////    listCSS:          our css dependencies
    ////    nameSetupFunction: the name of our client side javascript setup
    ////                      function.
    //// 
    req.aRAD.response.pathLabels = 'labels/tutorial/tutorial/labels.js';
    req.aRAD.response.nameSetupFunction = 'ad.tutorial.tutorial.radsetup';
    AD.App.Page.addJavascripts( req, tutorialInterface.getJavascripts() );
    AD.App.Page.returnStealData(req, res);
});



//// this route is for returning the labels this page
app.get('/labels/tutorial/tutorial/labels.js', AD.Lang.loadLabelsByPath, function(req, res, next) {

    //// We are initializing a set of labels associated with this 
    //// Interface.
    ////
    //// load the req object with this interface's path
    //// and let the app.js -> returnLabelData() handle the response.
    //// 
    req.aRAD.response.pathInterface = 'test/viewer/';
    
    
    //// gather a list of all the label paths for this interface:
    var listLabelPaths = [];
    
    // Our basic page interface set:
    listLabelPaths.push('/page/tutorial/tutorial');
    
    // gather all the labels required by our included widgets:
    for (var iLw = 0; iLw < tutorialInterface.listWidgets.length; iLw++) {
        
        var key = tutorialInterface.listWidgets[iLw];
        
        // if a site widget then pull label info from ListWidgets
        if (typeof ListWidgets[key] != 'undefined') {
            
            var widget = ListWidgets[key];  // defined in app.js
            for (var i=0; i < widget.listLabels.length; i++) {
                var labelPath = widget.listLabels[i];
                listLabelPaths.push(labelPath);
            }
            
        } else {
            
            // look locally for a widget
        
        }
    }
    req.aRAD.response.listLabelPaths = listLabelPaths;
    AD.App.Page.returnLabelData(req, res);
});



app.get('/page/tutorial/tutorial', AD.Lang.loadLabelsByPath, function (req, res, next) {

    //// We are displaying our interface page.  We need to define the 
    //// following:
    ////    pathTemplate : the template to display in the 'content' portion
    ////                   of our siteContent.ejs template
    ////    templateData : any data to send to our template.
    ////                   {
    ////                        key1:value1,
    ////                        key2:value2,
    ////                        ....
    ////                        keyN:valueN
    ////                    }
    ////                    can be referenced in our pathTemplate.ejs file 
    ////                    as <%= data.keyN %>
    ////    listJavascripts : list any javascripts that can be loaded 
    ////                    outside of the steal dependency manager.  
    ////                    (eg only javascripts that do not need to be 
    ////                    loaded before your siteInterfaceRADSetup() is 
    ////                    called.)
    ////    listCSS :       list any css files that can be loaded outside of
    ////                    the steal dependency manager.
    ////    pathSteal:      the url to use for the steal dependency manager.
    ////                    the data returned should be a list of all the 
    ////                    javascript files necessary to load before your
    ////                    setup() routine is called.
    
    req.aRAD.response.pathTemplate = __dirname+'/views/tutorial.ejs';
    req.aRAD.response.themePageStyle = 'empty';  // display the login on an empty page style
    
    var viewer = AD.Viewer.currentViewer(req);
    req.aRAD.response.labels.langKey = viewer.language_code;
    
    //var tutorialModule = listModules['tutorial'];
    //var tutorialModel = tutorialModule.listModels['tutorial'];
    var tutorialModel = require(__dirname + '/../../models/node/Tutorial.js');
    tutorialModel.findAllInner(function( pathList ) {

        req.aRAD.response.templateData = { 
            title: 'tutorial', 
            labels: req.aRAD.response.labels ,
            navlist: pathList
        };
        
        // if we need to add javascripts to the page 
        // (that don't already get included via the steal system)
        // then do: 
        // req.aRAD.response.listJavascripts.push('path/to/script.js');
        req.aRAD.response.pathSteal = '/init/tutorial/tutorial';
        
        
        // make sure we load our CSS information
        AD.App.Page.addCSS( req, tutorialInterface.getCSS() );
        
        
        // Manually render the Tutorial interface so it doesn't get messed
        // up by the default site theme.
        var ejs = require('ejs');
        ejs.renderFile( 
            req.aRAD.response.pathTemplate,
            { locals: { data: req.aRAD.response.templateData } },
            function(err, html) {
            
                req.aRAD.response.body = html;
                ejs.renderFile(
                    __appdevPath+'/views/layout.ejs',
                    { locals: req.aRAD.response },
                    function(err, html) {
                        res.send(html);
                    }
                );
            
            }
        );
        
        return;
        
        // The routine below renders the interface using the site theme.
        
        //// The app.js -> returnPage() routine is responsible for taking this 
        //// interface's data and wrapping it in our Site Template.  The 
        //// response is returned there.
        // if (typeof req.aRAD.returnPage != 'undefined') {
        //     req.aRAD.returnPage( req, res );
        // } else {
        //     AD.App.Page.returnPage( req, res );
        // }
        
    
    });
    
    
});

/*

////
////For serving up image files in tutorial sub-directories
////
app.get('/page/tutorial/:vID/:resourcePath', function(req, res, next) {

    var parts = req.url.split('/tutorial/');
    var urlParts = parts[1].split('/');
    var vid = urlParts[0]; 
    var pathpart = urlParts[1]; // without any additional params
    
    if (vid) {
        //var tutorialModule = listModules['tutorial'];
        //var tutorialModel = tutorialModule.listModels['tutorial'];
        var tutorialModel = require(__dirname + '/../../models/node/Tutorial.js');
        tutorialModel.findAllInner(function( pathList ) {
                    
            var dirpath = pathList[vid]['path'] + pathpart;
            console.log('serving tutorial image: ' + dirpath);
            res.sendfile(path.normalize(dirpath));

        });
	}
});
*/

var step1 = function(req, res, next) {
	
	var guid = req.aRAD.viewer.viewer_globalUserID;
    

	// data being passed to your template should be stored in req.aRAD.response.templateData
	req.aRAD.response.templateData['token'] = guid;
	
	req.aRAD.response.pathTemplate = __dirname+'/views/tutorial.ejs';
    req.aRAD.response.themePageStyle = 'empty';  // display the login on an empty page style
    
    var viewer = AD.Viewer.currentViewer(req);
    req.aRAD.response.labels.langKey = viewer.language_code;
    
    //var tutorialModule = listModules['tutorial'];
    //var tutorialModel = tutorialModule.listModels['tutorial'];
    var tutorialModel = require(__dirname + '/../../../models/node/Tutorial.js');
    
    
    tutorialModel.findAllInner(function( pathList ) {

        req.aRAD.response.templateData = { 
            title: 'Tutorial', 
            testinglist: 'test',
            labels: req.aRAD.response.labels ,
            navlist: pathList
        };
        
        next();
        
    
    });
	// they can be accessed in your template as <%- data.token %>

	
}

tutorialInterface.pageStack = [step1];  // make sure this gets called after our page/unitViewer gets loaded:

tutorialInterface.setup = function(callback) 
{
    var $ = AD.jQuery;
    var dfd = $.Deferred();

    //// 
    //// Scan any sub containers to gather their routes
    ////
    var dfdContainers = tutorialInterface.loadContainers();
    
    
    //// 
    //// Scan for any services and load them
    ////
    var dfdPages = tutorialInterface.loadServices();
    
    
    // Scan for any .css files registered for this page
    tutorialInterface.loadPageCSS();
    
    // Create our routes : page/css
    tutorialInterface.createRoutes();

    ////
    //// Resolve the deferred when done
    ////
    $.when(dfdContainers, dfdPages).then(function() {
        callback && callback();
        dfd.resolve();
    });
    
    return dfd;
}


