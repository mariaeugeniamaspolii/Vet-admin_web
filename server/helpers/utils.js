export function buildUrl(url, params) {
    const urlObj = new URL(url);
    if (params !== undefined) {
        urlObj.search = new URLSearchParams(params).toString();
    }
    console.log("PARAMS" ,params)
    console.log("OBJ" ,urlObj)
    return urlObj;
}