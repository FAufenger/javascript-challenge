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
        columns.forEach(function (column) {
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
            console.log(`Total user selected search value(s): ${searchCriteria}`);
        }
    }
    var possibleSearchList = [inputDateValue, inputCityValue, inputStateValue, inputCountryValue, inputShapeValue];

    for (i = 0; i < possibleSearchList.length; i++) {
        recordSearchLog(possibleSearchList);
    }

    // // Filter Data with corresponding data to input value
    // // || operator adds all filtered values together. Does not filter both within.
    // var filteredData = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue ||
    //                                                      recordedEvent.city === inputCityValue ||
    //                                                      recordedEvent.state === inputStateValue ||
    //                                                      recordedEvent.country === inputCountryValue ||
    //                                                      recordedEvent.shape === inputShapeValue);



    // // Filter Data with corresponding data to input value
    // // This && method one must enter ALL search criterial to have any result
    // var filteredData =  tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue &&
    //                                                       recordedEvent.city === inputCityValue &&
    //                                                       recordedEvent.state === inputStateValue &&
    //                                                       recordedEvent.country === inputCountryValue &&
    //                                                       recordedEvent.shape === inputShapeValue);


   // if ((filteredCity.length = 0 || inputCityValue != "")) {
    //     var filteredData = filteredDate.filter(item => filteredCity.includes(item))
    // } else {
    //     var filteredData = filteredDate
    // };


    // Filter Data with corresponding data to input value
    var filteredDate = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue);
    var filteredCity = tableData.filter(recordedEvent => recordedEvent.city === inputCityValue);
    var filteredState = tableData.filter(recordedEvent => recordedEvent.state === inputStateValue);
    var filteredCountry = tableData.filter(recordedEvent => recordedEvent.country === inputCountryValue);
    var filteredShape = tableData.filter(recordedEvent => recordedEvent.shape === inputShapeValue);

    // // Pascal's Triangle = n! / (k!(n-k)!) =>  32 possibilities 

    var a = inputDateValue;
    var b = inputCityValue;
    var c = inputStateValue;
    var d = inputCountryValue;
    var e = inputShapeValue; 
    var A = filteredDate;
    var B = filteredCity;
    var C = filteredState;
    var D = filteredCountry;
    var E = filteredShape; 
    var missingFilter = 'false';

    if ((a != "") && (b == "") && (c == "") && (d == "") && (e == "")) {
        var filteredData = A
    } else if((a == "") && (c == "") && (d == "") && (e== "")) {
        var filteredData = B
    } else if((a == "") && (b == "") && (d == "") && (e == "")) {
        var filteredData = C
    } else if((a == "") && (b == "") && (c == "") && (e == "")) {
        var filteredData = D
    } else if((a == "") && (b == "") && (c == "") && (d == "")) {
        var filteredData = E
    } else if((a != "") && (b != "")  && (c == "") && (d == "") && (e == "")) {
        var filteredData = A.filter(item => B.includes(item))
    } else if((a != "") && (b == "")  && (c != "") && (d == "") && (e == "")) {
        var filteredData = A.filter(item => C.includes(item))
    } else if((a != "") && (b == "")  && (c == "") && (d != "") && (e == "")) {
        var filteredData = A.filter(item => D.includes(item))
    } else if((a != "") && (b == "")  && (c == "") && (d == "") && (e != "")) {
        var filteredData = A.filter(item => E.includes(item))
    } else if((a == "") && (b != "")  && (c != "") && (d == "") && (e == "")) {
        var filteredData = B.filter(item => C.includes(item))
    } else if((a == "") && (b != "")  && (c == "") && (d != "") && (e == "")) {
        var filteredData = B.filter(item => D.includes(item))
    } else if((a == "") && (b != "")  && (c == "") && (d == "") && (e != "")) {
        var filteredData = B.filter(item => E.includes(item))
    } else if((a == "") && (b == "")  && (c != "") && (d != "") && (e == "")) {
        var filteredData = C.filter(item => D.includes(item))
    } else if((a == "") && (b == "")  && (c != "") && (d == "") && (e != "")) {
        var filteredData = C.filter(item => E.includes(item))
    } else if((a == "") && (b == "")  && (c == "") && (d != "") && (e != "")) {
        var filteredData = D.filter(item => E.includes(item))
    } else if((a != "") && (b != "")  && (c != "") && (d == "") && (e == "")) {
        var preFilteredData = B.filter(item => C.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))
    } else if((a != "") && (b != "")  && (c == "") && (d != "") && (e == "")) {
        var preFilteredData = B.filter(item => D.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))
    } else if((a != "") && (b != "")  && (c == "") && (d == "") && (e != "")) {
        var preFilteredData = B.filter(item => E.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))
    } else if((a != "") && (b == "")  && (c != "") && (d != "") && (e == "")) {
        var preFilteredData = C.filter(item => D.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))
    } else if((a != "") && (b == "")  && (c != "") && (d == "") && (e != "")) {
        var preFilteredData = C.filter(item => E.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))
    } else if((a != "") && (b == "")  && (c == "") && (d != "") && (e != "")) {
        var preFilteredData = D.filter(item => E.includes(item))
        var filteredData = A.filter(item => preFilteredData.includes(item))




    } else if((a == "") && (b == "") && (c == "") && (d == "") && (e == "")) {
        var missingFilter = true
    } else{
        var missingFilter = !missingFilter
    };



    // ((filteredCity.length = 0 || inputCityValue != "") &&
    //              + (filteredState.length = 0 || inputStateValue != "") &&
    //              + (filteredCountry.length = 0 || inputCountryValue != "") &&
    //              + (filteredShape.length = 0 || inputShapeValue != ""))
    /////////////////////////////////////////////// Switch ///////////////////////////////////
    // var a = (filteredDate || filteredCity|| filteredState || filteredCountry || filteredShape)

    // switch (a) {
    //     case ((filteredCity.length = 0 || inputCityValue != "") &&
    //             + (filteredCity.length = 0 || inputCityValue != "") &&
    //             + (filteredCity.length = 0 || inputCityValue != "") &&
    //             + (filteredCity.length = 0 || inputCityValue != "")):
    //         var filteredData = filteredDate;
    //         break;
    //     default:
    //         return filteredData = tableData;
    // };
 

    //console.log(filteredData);

    //Show in console searched criteria and corresponding number of sightings
    console.log(`The total number of sightings per search criteria is: ${filteredData.length}`);
    // If functuon to help error processsing and give info to user
    if  (missingFilter === true) {
        tbody.append("tr").append("td").text("Please enter search criteria");
    } else if (filteredData.length != 0) {
        loadData(filteredData);
    } else {
        tbody.append("tr").append("td").text("No data found for this query.... Please try to search again");
    };
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

