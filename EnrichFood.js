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

var db = 'food';
var targetCol = 'prod';
var sourceCol = 'production';
var cur = db.production.find()
while (cur.hasNext){
    db.prod.insert( newDoc(cur.next()))
}
