// Client side model

// Replace These Tags:
//  Tutorial : the name of the Model (capital)
//  Tutorial    : the name of the module this resides in
//  label_id : the name of the primary Key for this object

//path: Tutorial/models/client/


steal('//appDev/model/model.js').then(function() {

    
    AD.Model.extend("tutorial",
    {
        _adModule:'tutorial',
        _adModel:'tutorial',
        id:'vid',
        labelKey:'none',
        _isMultilingual:false
                 
    },
    {});


});