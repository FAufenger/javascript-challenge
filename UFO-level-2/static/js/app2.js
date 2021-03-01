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
    var inputDateValue = inputDateElement.property("value").toLowerCase();
    // City
    var inputCityElement = d3.select("#cityName");
    var inputCityValue = inputCityElement.property("value").toLowerCase();
    // State
    var inputStateElement = d3.select("#stateName");
    var inputStateValue = inputStateElement.property("value").toLowerCase();
    // Country
    var inputCountryElement = d3.select("#countryName");
    var inputCountryValue = inputCountryElement.property("value").toLowerCase();
    // Shape
    var inputShapeElement = d3.select("#shapeType");
    var inputShapeValue = inputShapeElement.property("value").toLowerCase();

    // Console log searched variable input(s)
    function recordSearchLog(searchCriteria) {
        if (searchCriteria !== "") {
            console.log(`User selected search value(s): ${searchCriteria}`);
        }
    }
    var possibleSearchList = [inputDateValue, inputCityValue, inputStateValue, inputCountryValue, inputShapeValue];
    for (i = 0; i < possibleSearchList.length; i++) {
        recordSearchLog(possibleSearchList)
    }
 
    // Filter Data with corresponding data to input value
    // || operator adds all filtered values together. Does not filter both within.
    // var filteredData = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue ||
    //                                                      recordedEvent.city === inputCityValue ||
    //                                                      recordedEvent.state === inputStateValue ||
    //                                                      recordedEvent.country === inputCountryValue ||
    //                                                      recordedEvent.shape === inputShapeValue);
        
    var filteredData =  tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue &&
                                                          recordedEvent.city === inputCityValue &&
                                                          recordedEvent.state === inputStateValue &&
                                                          recordedEvent.country === inputCountryValue &&
                                                          recordedEvent.shape === inputShapeValue);


    //console.log(filteredData);

    loadData(filteredData);
    //Show in console date tried and number of sightings
    console.log(`The total number of sightings per search criteria is: ${filteredData.length}`);
    // If functuon to help error processsing and give info to user
    if (filteredData.length != 0) {
        loadData(filteredData);
    } else {
        tbody.append("tr").append("td").text("No data found for this query.... Please try to search again");
    }
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

