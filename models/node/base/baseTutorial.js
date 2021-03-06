//// AppRAD: Tags to Replace:
//  Tutorial : Model name (capitalized)
//  node_tutorial : the DB.table name 
//  label_id : the DB.table.primaryKey name
//  [propertyList ] : the DB.table.fields description here:
//// End Tags to Replace

////
//// baseTutorial
////
//// This model is the interface to the node_tutorial table.
//// This file is generated by our RAD toolz, so don't make
//// any changes to this file.  

//// Make your changes to the Tutorial.js file.  


var properties = {
        dbTable:'node_tutorial',
        model: {
                label_id:"int(11) unsigned",
                language_code:"varchar(10)",
                label_key:"text",
                label_label:"text",
                label_lastMod:"datetime",
                label_needs_translation:"tinyint(1) unsigned",
                label_path:"text",

        },
        primaryKey:'label_id'
    };


function baseTutorial() {

    return new AD.Model.ModelSQL(properties);
}


module.exports = baseTutorial;
