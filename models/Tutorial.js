////
//// Tutorial model
////


(function() {

    var onServer = false;
    if (typeof exports !== 'undefined') {
        onServer = true;
    }
    
    var attr = {
        // Client Definitions
        _adModule: 'tutorial',
        _adModel: 'tutorial',
        id: 'vid',
        labelKey: 'vid',
        _isMultilingual: false
    };
    
    if (onServer) {
        // Server Definitions
        attr['__serverModel'] = {
            type: 'custom',
            dbTable: null,
            model: {
            },
            primaryKey: 'vid'
        }
    }
    
    AD.Model.extend("tutorial",
    attr,
    {
        // define instance methods here
    });
    
    if (onServer) {
        var nodeModel = require(__dirname + '/node/Tutorial.js');
        exports.findallFromReq = nodeModel.findall;
        exports.findoneFromReq = nodeModel.findone;
    }


})();

