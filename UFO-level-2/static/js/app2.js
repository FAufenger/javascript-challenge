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
var buttonFilter = d3.select("#filter-btn");
// Tell event listener what to do 
buttonFilter.on("click", function () {
    // Empty table if already populated
    tbody.html("");

    //  Select the inputs and get the raw HTML nodes
    // Date
    var inputDateElement = d3.select("#datetime");
    var inputDateValue = inputDateElement.property("value");
    // City
    var inputCityElement = d3.select("#cityName");
    var inputCityValue = inputCityElement.property("value");
    // State
    var inputStateElement = d3.select("#stateName");
    var inputStateValue = inputStateElement.property("value");
    // Country
    var inputCountryElement = d3.select("#countryName");
    var inputCountryValue = inputCountryElement.property("value");
    // Shape
    var inputShapeElement = d3.select("#shapeType");
    var inputShapeValue = inputShapeElement.property("value");

    // Consle log check variable inputs functioning
    var recordSearchLog = (searchCriteria) => {
        if (searchCriteria != "") {
            console.log(`Search Criteria: ${searchCriteria}`);}
    }
    recordSearchLog(inputDateValue);
    recordSearchLog(inputCityValue);
    recordSearchLog(inputStateValue);
    recordSearchLog(inputCountryValue);
    recordSearchLog(inputShapeValue);

    // Filter Data with datetime equal to input value
  
    var filteredData = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue ||
                                                         recordedEvent.city === inputCityValue ||
                                                         recordedEvent.state === inputStateValue ||
                                                         recordedEvent.country === inputCountryValue ||
                                                         recordedEvent.shape === inputShapeValue);
        

    console.log(filteredData);
    loadData(filteredData);
        // Show in console date tried and number of sightings
        // console.log(`The total number of sightings on ${inputDateValue} is: ${filteredData.length}`);
        // // If functuon to help error processsing and give info to user
        // if (filteredData.length != 0) {
        //     loadData(filteredData);
        // } else {
        //     tbody.append("tr").append("td").text("No data found for this query.... Please try to search again");
        // }
});

var buttonReset = d3.select("#reset-btn");
// Tell event listener what to do 
buttonReset.on("click", function () {
    // Empty table if already populated
    tbody.html("");
    // Reload entire table
    loadData(tableData);
    // Show in console number of sightings
    console.log(`The total number of sightings currently in the database: ${data.length}`);
});
