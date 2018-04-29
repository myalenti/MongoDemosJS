function newDoc(r){
    var doc = {} ;
    var years = [] ;
    for ( var pName in r) {
        if ( /^Y[0-9]/.test(pName)) {
            var entry = {} ; entry[pName] = r[pName];years.push(entry)
        }
    } ;
    doc.years = years;
    doc.country = {};
    doc.product = {} ;
    doc.geo = [] ;
    doc.country.area = r.Area ;
    doc.country.areaCode = r['Area Code'];
    doc.country.abbreviation = r['Area Abbreviation'];
    doc.product.code = r["Item Code"];
    doc.product.itemDescription = r['Item'];
    doc.product.elementCode = r["Element Code"] ;
    doc.product.element = r["Element"];
    doc.product.units = r['Unit'];
    doc.geo.push(r['latitude']);
    doc.geo.push(r['longitude']);
    return doc
}

var connString = "mongodb://localhost:27017,localhost:27018,localhost:27019/?replicaSet=rsDemo"
var assert = require('assert');
var mongoClient = require('mongodb').MongoClient

var dbName = 'food';
var targetCol = 'prod2';
var sourceCol = 'production';

mongoClient.connect(connString, function( err, client){
    assert.equal(null, err);
    console.log("Connected Successfully to ");
    var db = client.db(dbName);
    console.log("Working with handle to DB instance " + db.databaseName)
    var collTo = db.collection(targetCol);
    var collFrom = db.collection(sourceCol);
    var cur = collFrom.find();
    cur.count( function(err, result){ console.log("count is " + result)});

    cur.forEach( function(doc){
        collTo.insert(newDoc(doc), function(err, result) { return result})
    } ,
        function(){
        client.close();
        console.log("done");
    });

});


