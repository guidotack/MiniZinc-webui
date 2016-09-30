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
    var dimension = "1";
    if (inObj.dim != null) {
        dimension = inObj.dim;
    }

    dimension = inObj.type + "-" + dimension + "D";

    return dimension
}
