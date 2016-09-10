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
