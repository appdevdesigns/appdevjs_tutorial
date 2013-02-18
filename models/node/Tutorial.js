// Server side model

//// Tags to Replace:
//  Tutorial : Capitalized

////
//// Tutorial
////
//// This model is the interface to the site_viewer table.
////   

//path: Tutorial/models/node/


//// Make your changes to the Tutorial.js file.  

var BaseTutorial = require('./base/baseTutorial');


var tutorial = BaseTutorial();


tutorial.isDataValid = function ( values ) {

    // values is an object with column=>value fields:
    
    // this.required = ['name1', 'name2', 'name3',...,'nameN'];
    // this.stringValue = ['name1', 'name2',...,'nameN'];
    
}

var listDir =  function(callback) 
{  
    var toppath = __dirname + '/../../NJSTutorials/';
    var allPaths = [];
    var pathcounter = 1;
    
    var statstat = function (thedirpath, filename) {
		
    	fs.stat(thedirpath + filename, function(err, stats) {
    		
    		if (err)
    			throw err;
    		else {			
    			if (stats.isDirectory())
    				{					
    					if (filename.indexOf('.svn') == -1) {
	    					var newdirpath = thedirpath + filename + '/';
	    					allPaths.push(newdirpath);
	    					pathcounter++;
	    					listDirInner(newdirpath);
    					}
    				} 
    		}         
    		
    		pathcounter--;
    		if (pathcounter==0)
    		{
    			callback(allPaths);
    		}
    	});
    	    	
    };

    
    var listDirInner = function (dirpath) {
    	
    	fs.readdir(dirpath, function(err, files) {
            if (err) 
            	throw err;
            else {
                for (var i=0; i<files.length; i++) {
                	pathcounter++;
                	statstat(dirpath, files[i]);
                }                
            }
            pathcounter--;
            if (pathcounter==0)
    		{
    			callback(allPaths);
    		}
        });
    };
    
    
    listDirInner(toppath);
    
};


var parseDir = function (rawPaths, callback) 
{
	var parsedPaths = [];
	var strarray = rawPaths.sort();
	for (var i=0; i<strarray.length; i++)
	{
		var strpath = strarray[i];
		var strmatch = strarray[i].match(/\/([^\/]+?)\/$/)[1];
		var strmatchlength = strarray[i].match(/(\/[^\/]*)/g).length;
		
		parsedPaths.push({
		  'path': strpath, 
		  'name': strmatch, 
		  'levels': strmatchlength
        });
		//console.log(parsedPaths[i]);
	}
	callback(parsedPaths);
};



/**
 * Fetch a numerically indexed array of all directories.
 * @param {callback} function(parsedPaths)
 * where parsedPaths is--
 *  [ { path: '/abc/foo', name: 'foo', 'levels': 2 },
 *    { path: '/abc/foo/bar', name: 'bar', 'levels': 3 },
 *    ... ]
 */
tutorial.findAllInner = function(callback) 
{
    listDir(function(allPaths) {
        parseDir(allPaths, function(parsedPaths) {
            callback(parsedPaths);
        });
    });
};



/**
 * Fetch a numerically indexed array of all directories
 * and returns it through a callback function.
 * @param {object} params
 *     params['callback']: {fn}
 */
tutorial.findall = function(params) 
{
    var callback = params['callback'];
    
    tutorial.findAllInner(function(parsedPaths) {
        callback(undefined, parsedPaths);
    });
};




/**
 * Fetch the contents of one tutorial.
 *
 * '/query/tutorial/findOne/{id}'
 *
 * @param {object} req
 * @param {object} res
 * @param {object} id
 *      This is the index of the desired tutorial from the array of
 *      results returned by findAll().
 */
tutorial.findone = function(params) 
{
    var req = params['req'];
    var id = params['id'];
    var callback = params['callback'];

    var self = this;
    tutorial.findAllInner(function(parsedPaths) {
        //console.log('finaAllInner completed');
        if (parsedPaths[id]) {
            // read the requested file's content
            fs.readFile(
                parsedPaths[id]['path']+'/layout.ejs',
                'utf8',
                // see app.js appModelHandler() for callback info
                function(err, fileData) {
                    // render the file and return it via callback
                    var result = {
                        'html': '',
                        'name': parsedPaths[id]['name']
                    }
                    if (fileData) {
                        var tutorialPath = '/page/tutorial/' + id;
                        result.html = ejs.render(fileData, { 
                            locals:{
                                'tutorialPath': tutorialPath
                            }
                        }, 'utf8');
                    }
                    callback(err, [ result ]);
                }
            );
        } else {
            // no such path
            console.log('no such path');
            // ???
        }
        
    });
};



tutorial.trim = function (str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
};


module.exports = tutorial;