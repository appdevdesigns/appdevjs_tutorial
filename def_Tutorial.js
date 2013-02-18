// Replace These Tags:
//  tutorial  : <-- the name of this module (lowercase)
//  Tutorial  : <-- the name of this module (uppercase)
 
////
//// Tutorial Module
////

var tutorialModule = new AD.App.Module({
    nameModule: 'tutorial',
    pathModule: __dirname,

    // change the default paths like this:
//    pathInterfaces:    __dirname + '/interfaces',
//    pathServerModels:  __dirname + '/models/node',
//    pathClientModels:  __dirname + '/models/client',
//    pathModuleScripts: __dirname + '/data/scripts'

    
    });
    
tutorialModule.createRoutes();
tutorialModule.initialize();
//exports.listModels = tutorialModule.listModels;
module.exports = tutorialModule;

var app = tutorialModule.app;
/*

////
//// setup any Tutorial specific routes here
////

//### If you want to override the default Route Handling then
//### remove tutorialModule.createRoutes(); and uncomment this section.  
//### Make your changes here:

////
//// On any /tutorial/* route, we make sure our Client Models are loaded:
//// 
app.get('/init/tutorial/*', function(req, res, next) {

        AD.Util.Log(req,' init/' + tutorialModule.nameModule + '/*  : adding model dependencies.');

        AD.App.Page.addJavascripts( req, tutorialModule.moduleScripts );
        AD.App.Page.addJavascripts( req, tutorialModule.listModelPaths );

        next();
});





////
//// Return any Module defined resources
////
app.get('/tutorial/data/:resourcePath', function(req, res, next) {

    AD.Util.Log(req,' /' + tutorialModule.nameModule + '/data/ being processed.');

    var parts = req.url.split('/'+tutorialModule.nameModule+'/');
    var urlParts = parts[1].split('?');
    var path = urlParts[0]; // without any additional params

    res.sendfile( tutorialModule.pathModule+'/'+path);
});







//### If you want to change/prevent any of the automatic directory 
//### scanning, then remove the tutorialModule.initialize()  and 
//### uncomment these lines :




//// 
//// Scan any sub interfaces to gather their routes
////

tutorialModule.loadInterfaces();



////
//// The Model objects 
////
//// Load the Server side model objects to handle incoming model actions.
////

tutorialModule.loadServerModels();
exports.listModels=tutorialModule.listModels;



////
//// 
//// Load the Client Side models and be sure they are included in the page
//// dependencies.

tutorialModule.loadClientModels();

*/

////
//// 
//// Load the shared scripts that need to be used on each interface.

//tutorialModule.loadModuleScripts();

