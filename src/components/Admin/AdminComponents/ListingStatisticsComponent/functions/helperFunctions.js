// Helper function to convert applications object into graph-readable format for collegs
export function parseCollegeData(arr) {
    var collegesObj = {};
    arr.forEach((data) => {
        const colleges = data["college"];
        colleges.forEach(college => {
            if (college in collegesObj) {
                collegesObj[college] += 1;
            } else {
                collegesObj[college] = 1;
            }
        })
    })
    var collegeData = [];
    for (var key of Object.keys(collegesObj)) {
        collegeData.push({
            "name": key,
            "count": collegesObj[key]
        })
    }
    return collegeData;
}
