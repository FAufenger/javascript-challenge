// import data from data.js
var tableData = data;
// Check
//console.log(tableData);

// Add names for columns
var columns = ["datetime", "city", "state", "country", "shape", "durationMinutes", "comments"]

// Reference the html table-(table body)
var tbody = d3.select("tbody");

// Connect values to columns 
var loadData = (startData) => {
    startData.forEach(function (ufoSighting) {
        //console.log(ufoSighting);
        var row = tbody.append("tr");
        columns.forEach(function(column) {
            row.append("td").text(ufoSighting[column])
        });
    });
}
// Show whole table at start (before filtering)
loadData(tableData);

// Create button
var button = d3.select("#filter-btn");
// Tell event listener what to do 
button.on("click", function () {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Empty table if already populated
    tbody.html("");
    //  Select the input date get the raw HTML nodes
    var inputElement = d3.select("#datetime");
    // Get the value property of the input date
    var inputValue = inputElement.property("value");
    //console.log(inputValue);
    // Filter Data with datetime equal to input value
    var filteredData = tableData.filter(recordedEvent => recordedEvent.datetime === inputValue);
    // Show in console date tried and number of sightings
    console.log(`The total number of sightings on ${inputValue} is: ${filteredData.length}`);
    // If functuon to help error processsing and give info to user
    if (filteredData.length != 0) {
        loadData(filteredData);
    } else {
        tbody.append("tr").append("td").text("No data found for this date.... Please try to search between 1/1/2010 -> 1/13/2010");
    }
});

var buttonReset = d3.select("#reset-btn");
// Tell event listener what to do 
buttonReset.on("click", function () {
    // Prevent the page from refreshing
    d3.event.preventDefault();
    // Empty table if already populated
    tbody.html("");
    // Reload entire table
    loadData(tableData);
    // Show in console number of sightings
    console.log(`The total number of sightings currently in the database: ${data.length}`);
});