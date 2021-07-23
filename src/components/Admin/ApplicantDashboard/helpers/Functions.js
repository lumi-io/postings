// Parses out colleges array and converts into readable string format
export function parseAndConvertCollegesArr(colleges){
    var collegesString = "";
    for (var i = 0; i < colleges.length - 1; i++) {
        collegesString = collegesString.concat(colleges[i] + ", ");
    }
    return collegesString.concat(colleges.slice(-1)[0]);
}