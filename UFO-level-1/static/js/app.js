// import data from data.js
var tableData = data;
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]
// Check
//console.log(tableData);

// Reference the html table-(table body)
var tbody = d3.select("tbody");

// Connect values to columns 
var loadData = (newdata) => {
    newdata.forEach(function (ufoSighting) {
        console.log(ufoSighting);
        var row = tbody.append("tr");
        columns.forEach(column => row.append("td").text(ufoSighting[column])
        )
    });
}

loadData(tableData);

// Create event listener / select button
var button = d3.select("#filter-btn");

button.on("click", function() {

    // Empty table if already populated
    tbody.html("");
    //  Select the input date get the raw HTML nodes
    var inputElement = d3.select("#datetime");
    // Get the value property of the input date, state, shape
    var inputValue = inputElement.property("value");
    // console.log input value
    console.log(inputValue);
    // Filter Data with datetime equal to input value
    var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    // console.log filter values
    console.log(filteredData);
});
