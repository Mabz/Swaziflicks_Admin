// Add Date Buffer
var buffer = "2014-04-23T";

// Updates Movie ShowDays
function updateMovieShowRanges() {
    objId = $('#saveMovieShowRangesChanges').attr('name');
    objPT = $('#saveMovieShowings').attr('name');
    objStarts = new Date(moment($('#fromUpdate').val()).add(10, 'hours'));
    objEnds = new Date(moment($('#toUpdate').val()).add(10, 'hours'));
    objStartAdvertising = new Date(moment($('#startAdvertisingUpdate').val()).add(10, 'hours'));
    saveShowDay(objPT, objId, objStarts, objEnds, objStartAdvertising)
}

// Update Movie Time
function updateStartTime() {
    objId = $('#saveStartTimeChange').attr('name');
    objPT = $('#saveStartTime').attr('name');
    objStartsEntered = ($('#timeUpdate').val());
    momentObjStarts = moment(buffer + objStartsEntered).add(2, 'hours');
    runTime = $('#currentStartTimes').attr('name');
    objStarts = new Date(momentObjStarts);
    objEnds = new Date(momentObjStarts.add(runTime, 'minutes'));
    saveTime(objPT, objId, objStarts, objEnds)
}

// Load Movie
function loadMovie(results) {
    var movies = document.getElementById('movieData');
    movies.innerHTML = ""
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objTitle = results[i].get('Title');
        var objRuntime = (results[i].get('Runtime').replace('mins', '')).replace('min', '');
        document.getElementById('currentStartTimes').setAttribute("name", objRuntime); // ** Duration Needed
        movies.innerHTML += "<button style='margin: 5px' onclick='interestMovie(&quot;" + objId + "&quot;,&quot;" + objTitle + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + objTitle + " | <span class='glyphicon glyphicon-film' aria-hidden='true'></span></button>";
    }
    if (results.length == 0) {
        movies.innerHTML += "<h4>No movies</h4>";
    }
}

// Saves Show Day
function saveShowDay(objPT, objId, objStarts, objEnds, objStartAdvertising) {
    alert(objStarts);
    alert(objEnds);
    var ShowDay = Parse.Object.extend("ShowDays");

    // If objId is not null then it is an update
    if (objId) {
        // Get the Concerned Object                
        var query = new Parse.Query(ShowDay);
        query.get(objId, {
            success: function (obj) {
                // Save 
                obj.set("Starts", objStarts);
                obj.set("Ends", objEnds);
                obj.set("StartAdvertising", objStartAdvertising);
                obj.save().then(function () {
                    fetchMovieShowings(objPT);
                });
                success("Saved");
            }, error: function () {
                err("Something went wrong :(")
            }
        });
    }
    else {
        // Get the Concerned Pointer  
        var Movies = new Parse.Object.extend("Movies");
        var movie = new Parse.Query(Movies);
        movie.get(objPT, {
            success: function (pT) {
                var ShowDay = new Parse.Object.extend("ShowDays");
                var showday = new ShowDay();
                showday.set("Starts", objStarts);
                showday.set("Ends", objEnds);
                showday.set("StartAdvertising", objStartAdvertising);
                showday.set("Movie", pT);
                showday.save().then(
                    function () {
                        fetchMovieShowings(objPT);
                    })
            }
        })
    }
}


// Focus on Pricing
function interestMovie(objId, objTitle) {
    document.getElementById('currentMovie').innerHTML = objTitle;
    document.getElementById('saveMovieShowings').setAttribute("name", objId);
    fetchMovieShowings(objId);
    $("#levelShowTimes").css('visibility', 'hidden');
    $("#levelShowDays").css('visibility', 'visible');
}

// Fetches the current Movie Showings
function fetchMovieShowings(objId) {
    var Movie = Parse.Object.extend("Movies");
    var query = new Parse.Query(Movie);
    query.get(objId, {
        success: function (obj) {
            var ShowDays = Parse.Object.extend("ShowDays");
            var query = new Parse.Query(ShowDays);
            query.equalTo("Movie", obj);
            query.descending("Starts");
            query.find({
                success: function (results) {
                    loadMovieShowDays(results);
                }
            })
        }
    })
}


// Loads Movie Show Days on Display
function loadMovieShowDays(results) {
    var currentMovieShowRanges = document.getElementById('currentMovieShowRanges');
    currentMovieShowRanges.innerHTML = ""
    var currentStartTimes = document.getElementById('currentStartTimes');
    currentStartTimes.innerHTML = '';
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objStarts = results[i].get('Starts');
        var objEnds = results[i].get('Ends');
        var objStartAdvertising = results[i].get('StartAdvertising');
        document.getElementById('saveStartTime').setAttribute("name", objId);
        currentMovieShowRanges.innerHTML += "<button style='margin: 5px' onclick='interestShowDay(&quot;" + objId + "&quot;, &quot;" + objStarts + "&quot;, &quot;" + objEnds + "&quot;, &quot;" + objStartAdvertising + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + moment(objStarts).format('D MMMM') + " to " + moment(objEnds).format('D MMMM') + " | <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>";
    }
    if (results.length == 0) {
        currentMovieShowRanges.innerHTML += "<h4>No ShowDays</h4>";
    }
}


// Places Show Day button on focus
function interestShowDay(objId, objStarts, objEnds, objStartAdvertising) {
    $('#toUpdate').datepicker("option", "defaultDate", new Date(objEnds));
    $('#toUpdate').datepicker("option", "minDate", new Date(objStarts));
    $('#toUpdate').val(new Date(objEnds));
    $('#fromUpdate').datepicker("option", "defaultDate", new Date(objStarts));
    $('#fromUpdate').datepicker("option", "maxDate", new Date(objEnds));
    $('#fromUpdate').val(new Date(objStarts));
    $('#startAdvertisingUpdate').datepicker("setDate", new Date(objStartAdvertising));
    document.getElementById('saveMovieShowRangesChanges').setAttribute("name", objId);
    fetchTimes(objId);
    $("#levelShowTimes").css('visibility', 'visible');
}

// Fetches Times associated with ShowDay
function fetchTimes(objId) {
    var ShowDays = Parse.Object.extend("ShowDays");
    var query = new Parse.Query(ShowDays);
    query.get(objId, {
        success: function (obj) {
            var ShowDays = Parse.Object.extend("ShowTimes");
            var query = new Parse.Query(ShowDays);
            query.equalTo("ShowDay", obj);
            query.ascending("StartTime");
            query.find({
                success: function (results) {
                    loadTimes(results);
                }
            })
        }
    })
}

// Loads times
function loadTimes(results) {
    var currentStartTimes = document.getElementById('currentStartTimes');
    currentStartTimes.innerHTML = ""
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objStarts = moment(results[i].get('StartTime')).subtract(2, 'hours');
        var objEnds = moment(results[i].get('EndTime')).subtract(2, 'hours');
        currentStartTimes.innerHTML += "<button style='margin: 5px' onclick='interestTimes(&quot;" + objId + "&quot;, &quot;" + objStarts + "&quot;, &quot;" + objEnds + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + moment(objStarts).format('H:mm') + " to " + moment(objEnds).format('H:mm') + " | <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button> <button style='margin: 5px' onclick='deleteTime(&quot;" + objId + "&quot;)' class='btn btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button>";
    }
    if (results.length == 0) {
        currentStartTimes.innerHTML += "<h4>No ShowDays</h4>";
    }
}

// Deletes time
function deleteTime(objId) {
    var ShowTime = Parse.Object.extend("ShowTimes");
    var showTime = new Parse.Query(ShowTime);
    showTime.get(objId, {
        success: function (obj) {
            obj.destroy({
                success: function () {
                    fetchTimes($('#saveMovieShowRangesChanges').attr("name"));
                }, error: function (obj, error) {
                    err("Error deleting Time");
                }
            })
        }
    })

}

// Focus is on Time
function interestTimes(objId, objStarts, objEnds) {
    document.getElementById('saveStartTimeChange').setAttribute("name", objId);
    $('#timeUpdate').val(new Date(objStarts));
    $('#timeUpdate').datepicker("setDate", objStarts);
}

// Introduces a new movie showing
function newMovieShowings() {
    objId = null;
    objPT = $('#saveMovieShowings').attr('name');
    objStarts = new Date(moment($('#fromNew').val()).add(10, 'hours'));
    objEnds = new Date(moment($('#toNew').val()).add(10, 'hours'));
    objStartAdvertising = new Date(moment($('#startAdvertisingNew').val()).add(10, 'hours'));
    saveShowDay(objPT, objId, objStarts, objEnds, objStartAdvertising)
}

// Introduces a new movie showing time
function newStartTime() {
    objId = null;
    objPT = $('#saveMovieShowRangesChanges').attr('name');
    objStartsEntered = ($('#timeNew').val());
    momentObjStarts = moment(buffer + objStartsEntered).add(2, 'hours');
    runTime = $('#currentStartTimes').attr('name');
    objStarts = new Date(momentObjStarts);
    objEnds = new Date(momentObjStarts.add(runTime, 'minutes'));
    saveTime(objPT, objId, objStarts, objEnds)
}

// Saves Show Time
function saveTime(objPT, objId, objStarts, objEnds) {
    var ShowTime = Parse.Object.extend("ShowTimes");
    // If objId is not null then it is an update
    if (objId) {
        // Get the Concerned Object                
        var query = new Parse.Query(ShowTime);
        query.get(objId, {
            success: function (obj) {
                // Save 
                obj.set("StartTime", objStarts);
                obj.set("EndTime", objEnds)
                obj.save().then(function () {
                    fetchTimes(objPT);
                });
                success("Saved");
            }, error: function () {
                err("Something went wrong :(")
            }
        });
    }
    else {
        // Get the Concerned Pointer  
        var ShowDay = new Parse.Object.extend("ShowDays");
        var showday = new Parse.Query(ShowDay);
        showday.get(objPT, {
            success: function (pT) {
                var ShowTime = new Parse.Object.extend("ShowTimes");
                var showTime = new ShowTime();
                showTime.set("StartTime", objStarts);
                showTime.set("EndTime", objEnds)
                showTime.set("ShowDay", pT);
                showTime.save().then(
                    function () {
                        fetchTimes(objPT);
                    })
            }
        })
    }
}