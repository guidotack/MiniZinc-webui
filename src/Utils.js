export const API_ROOT = "http://localhost:5000/";
export const API_MODELS = API_ROOT + "models";
export const API_ARGUMENTS = API_ROOT + "models/";
export const API_DATA = API_ROOT + "data/";
//API_MODEL_SOLVE = API_ROOT + "solve/";
export const API_SAVE_TEMPLATE = API_ROOT + "save_template";
export const API_GET_TEMPLATE = API_ROOT + "get_template/";

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
