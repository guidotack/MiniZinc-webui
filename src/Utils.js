export function GetURL(url, cb) {
    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (http.readyState === XMLHttpRequest.DONE) {
            cb(http);
        }
    }

    http.open( "GET", url, true);
    http.send(null);
}

export function GetTypeDimensionString(inObj) {
    if (inObj.dim != null) {
        var type = inObj.dim;
        type = inObj.type + "-" + type + "D";
        return type
    }
    
    return inObj.type;
}
