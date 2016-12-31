
// Update Movie Price
function updateCinema() {
    objId = $('#updateCinema').attr('name');
    objName = $('#cinemaUpdate').val();
    objLatitude = $('#latitudeUpdate').val();
    objLongitude = $('#longitudeUpdate').val();
    validateCinema(objId, objName, objLatitude, objLongitude);
}

// Load Cinemas
function loadCinemas(results) {
    var currentCinemas = document.getElementById('currentCinemas');
    currentCinemas.innerHTML = ""
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objName = results[i].get("Name");
        var objLatitude = results[i].attributes.GeoLocation.latitude;
        var objLongitude = results[i].attributes.GeoLocation.longitude;

        currentCinemas.innerHTML += "<div class='row' align='cneter'><button style='margin: 5px' onclick='interestCinema(&quot;" + objId + "&quot;,&quot;" + objName + "&quot;,&quot;" + objLatitude + "&quot;,&quot;" + objLongitude + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + objName + " | <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></div>  ";
    }
    if (results.length == 0) {
        currentCinemas.innerHTML += "<h4>None</h4>";
    }
}

// Focus on Cinema
function interestCinema(objId, objName, objLatitude, objLongitude) {
    document.getElementById('cinemaUpdate').value = objName;
    document.getElementById('latitudeUpdate').value = objLatitude;
    document.getElementById('longitudeUpdate').value = objLongitude;
    document.getElementById('updateCinema').setAttribute("name", objId);
}

// Saves Cinemas
function saveCinema(objId, objName, objLatitude, objLongitude) {

    var Cinema = Parse.Object.extend("Cinemas");
    var point = new Parse.GeoPoint({ latitude: parseFloat(objLatitude), longitude: parseFloat(objLongitude) });

    // If objId is not null then it is an update
    if (objId) {
        // Get the Concerned Object                
        var query = new Parse.Query(Cinema);
        query.get(objId, {
            success: function (obj) {
                // Save 
                obj.set("Name", objName);
                obj.set("GeoLocation", point);
                obj.save().then(function () {
                    fetchCinemas();
                });
                success("Saved");
            }, error: function () {
                err("Something went wrong :(")
            }
        });
    }
    else {
        var cinema = new Cinema();
        cinema.set("Name", objName);
        cinema.set("GeoLocation", point);
        cinema.save().then(function () {
            fetchCinemas();
            success('Created');
        });
    }
}

// Check if Object exists
function validateCinema(objId, objName, objLatitude, objLongitude) {
    if (objName) {
        // Validation
        warn("Saving");
        var cinema = Parse.Object.extend("Cinemas");
        var query = new Parse.Query(cinema);
        query.equalTo("Name", objName);
        query.notEqualTo("objectId", objId);
        query.find({
            success: function (results) {
                if (results.length == 0) {
                    saveCinema(objId, objName, objLatitude, objLongitude)
                } else {
                    err("Duplication detected.")
                }

            },
            error: function () {
                err("Could not validate");
            }
        })
    } else {
        err("Nothing");
    }
}

// Creates new Cineam
function newCinema() {
    objName = $('#name').val();
    objLatitude = $('#latitude').val();
    objLongitude = $('#longitude').val();
    validateCinema(null, objName, objLatitude, objLongitude);
}