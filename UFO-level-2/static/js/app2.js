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

    // Filter Data with corresponding data to input value for each tag
    var filteredDate = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue);
    var filteredCity = tableData.filter(recordedEvent => recordedEvent.city === inputCityValue);
    var filteredState = tableData.filter(recordedEvent => recordedEvent.state === inputStateValue);
    var filteredCountry = tableData.filter(recordedEvent => recordedEvent.country === inputCountryValue);
    var filteredShape = tableData.filter(recordedEvent => recordedEvent.shape === inputShapeValue);

    // Use D3 to select the dropdown menu to have to multiple filter types
    var dropdownMenu = d3.select("#selFilterType");
    // Assign the value of the dropdown menu option to a variable
    var filterType = dropdownMenu.property("value");


    // Adds all filtered values together (inclusive). Does not filter within filter.
    // Set a missingFilter variable for user clarification
    if (filterType === 'filterInclusive') {
        var filteredData = tableData.filter(recordedEvent => recordedEvent.datetime === inputDateValue ||
            recordedEvent.city === inputCityValue ||
            recordedEvent.state === inputStateValue ||
            recordedEvent.country === inputCountryValue ||
            recordedEvent.shape === inputShapeValue);
        if ((filteredData.length == 0) && (inputDateValue != "" ||
            inputCityValue != "" ||
            inputStateValue != "" ||
            inputCountryValue != "" ||
            inputShapeValue != "")) {
            var missingFilter = 'false';

        } else if ((filteredData.length == 0) && (inputDateValue == "" &&
            inputCityValue == "" &&
            inputStateValue == "" &&
            inputCountryValue == "" &&
            inputShapeValue == "")) {

        } else {
            var missingFilter = 'true';

        }

    }

    // filter search criteria so that it is exclusive
    else if (filterType === 'filterExclusive') {
        // Define variables - going to filter exclusive inputs 
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


        // Pascal's Triangle = n! / (k!(n-k)!) =>  32 possibilities from five possible inputs
        if ((a == "") && (b == "") && (c == "") && (d == "") && (e == "")) {
            var missingFilter = "true"
            var filteredData = ""
        } else if ((a != "") && (b == "") && (c == "") && (d == "") && (e == "")) {
            var filteredData = A
        } else if ((a == "") && (b != "") && (c == "") && (d == "") && (e == "")) {
            var filteredData = B
        } else if ((a == "") && (b == "") && (c != "") && (d == "") && (e == "")) {
            var filteredData = C
        } else if ((a == "") && (b == "") && (c == "") && (d != "") && (e == "")) {
            var filteredData = D
        } else if ((a == "") && (b == "") && (c == "") && (d == "") && (e != "")) {
            var filteredData = E
        } else if ((a != "") && (b != "") && (c == "") && (d == "") && (e == "")) {
            var filteredData = A.filter(item => B.includes(item))
        } else if ((a != "") && (b == "") && (c != "") && (d == "") && (e == "")) {
            var filteredData = A.filter(item => C.includes(item))
        } else if ((a != "") && (b == "") && (c == "") && (d != "") && (e == "")) {
            var filteredData = A.filter(item => D.includes(item))
        } else if ((a != "") && (b == "") && (c == "") && (d == "") && (e != "")) {
            var filteredData = A.filter(item => E.includes(item))
        } else if ((a == "") && (b != "") && (c != "") && (d == "") && (e == "")) {
            var filteredData = B.filter(item => C.includes(item))
        } else if ((a == "") && (b != "") && (c == "") && (d != "") && (e == "")) {
            var filteredData = B.filter(item => D.includes(item))
        } else if ((a == "") && (b != "") && (c == "") && (d == "") && (e != "")) {
            var filteredData = B.filter(item => E.includes(item))
        } else if ((a == "") && (b == "") && (c != "") && (d != "") && (e == "")) {
            var filteredData = C.filter(item => D.includes(item))
        } else if ((a == "") && (b == "") && (c != "") && (d == "") && (e != "")) {
            var filteredData = C.filter(item => E.includes(item))
        } else if ((a == "") && (b == "") && (c == "") && (d != "") && (e != "")) {
            var filteredData = D.filter(item => E.includes(item))
        } else if ((a != "") && (b != "") && (c != "") && (d == "") && (e == "")) {
            var preFilteredData = B.filter(item => C.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c == "") && (d != "") && (e == "")) {
            var preFilteredData = B.filter(item => D.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c == "") && (d == "") && (e != "")) {
            var preFilteredData = B.filter(item => E.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b == "") && (c != "") && (d != "") && (e == "")) {
            var preFilteredData = C.filter(item => D.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b == "") && (c != "") && (d == "") && (e != "")) {
            var preFilteredData = C.filter(item => E.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b == "") && (c == "") && (d != "") && (e != "")) {
            var preFilteredData = D.filter(item => E.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a == "") && (b != "") && (c != "") && (d != "") && (e == "")) {
            var preFilteredData = C.filter(item => D.includes(item))
            var filteredData = B.filter(item => preFilteredData.includes(item))
        } else if ((a == "") && (b != "") && (c != "") && (d == "") && (e != "")) {
            var preFilteredData = C.filter(item => E.includes(item))
            var filteredData = B.filter(item => preFilteredData.includes(item))
        } else if ((a == "") && (b != "") && (c == "") && (d != "") && (e != "")) {
            var preFilteredData = D.filter(item => E.includes(item))
            var filteredData = B.filter(item => preFilteredData.includes(item))
        } else if ((a == "") && (b == "") && (c != "") && (d != "") && (e != "")) {
            var preFilteredData = D.filter(item => E.includes(item))
            var filteredData = C.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c != "") && (d != "") && (e == "")) {
            var prePreFilteredData = C.filter(item => D.includes(item))
            var preFilteredData = B.filter(item => prePreFilteredData.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c != "") && (d == "") && (e != "")) {
            var prePreFilteredData = C.filter(item => E.includes(item))
            var preFilteredData = B.filter(item => prePreFilteredData.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c == "") && (d != "") && (e != "")) {
            var prePreFilteredData = D.filter(item => E.includes(item))
            var preFilteredData = B.filter(item => prePreFilteredData.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b == "") && (c != "") && (d != "") && (e != "")) {
            var prePreFilteredData = D.filter(item => E.includes(item))
            var preFilteredData = C.filter(item => prePreFilteredData.includes(item))
            var filteredData = A.filter(item => preFilteredData.includes(item))
        } else if ((a == "") && (b != "") && (c != "") && (d != "") && (e != "")) {
            var prePreFilteredData = D.filter(item => E.includes(item))
            var preFilteredData = C.filter(item => prePreFilteredData.includes(item))
            var filteredData = B.filter(item => preFilteredData.includes(item))
        } else if ((a != "") && (b != "") && (c != "") && (d != "") && (e != "")) {
            var prePrePreFilteredData = D.filter(first => E.includes(first))
            var prePreFilteredData = C.filter(second => prePrePreFilteredData.includes(second))
            var preFilteredData = B.filter(third => prePreFilteredData.includes(third))
            var filteredData = A.filter(fourth => preFilteredData.includes(fourth))
        } else {
            var missingFilter = "uh-oh"
            var filteredData = ""
        };
    }

    // // Attempted to use switch inplace if else however ran into trouble/ out of time
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


    // Show in console searched criteria and corresponding number of sightings
    console.log(`The total number of sightings per search criteria is: ${filteredData.length}`);

    // If functuon to help error processsing and give info to user
    if (filteredData.length != 0) {
        loadData(filteredData)
    } else if ((filteredData.length == 0) && (missingFilter === 'true')) {
        tbody.append("tr").append("td").text("Please enter search criteria")
    } else if ((filteredData.length == 0) && (missingFilter === 'false')) {
        tbody.append("tr").append("td").text(`Intereting.. For some reason I though there was a sighting within these parameters..`)
    } else if ((filteredData.length == 0) && (missingFilter === 'uh-oh')) {
        tbody.append("tr").append("td").text("Something went wrong.. Hopefully the aliens are  kind")
    } else {
        tbody.append("tr").append("td").text("No data found for this query.... Please try to search again")
    };
});

// Time to reset
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

