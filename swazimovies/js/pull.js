function convertImgToBase64URL(url, callback, outputFormat) {
    var canvas = document.createElement('CANVAS'),
        ctx = canvas.getContext('2d'),
        img = new Image;
    img.crossOrigin = 'Anonymous';
    img.onload = function () {
        var dataURL;
        canvas.height = img.height;
        canvas.width = img.width;
        ctx.drawImage(img, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}

// Saves the movie
function saveMovie() {
    // Get variables
    imdbID = $("#imdbID").val();
    title = $("#title").val();
    cinema = $("#cinemas").val();
    pricingTemplate = $("#pricingTemplates").val();
    plot = $("#plot").val();
    rated = $("#rated").val();
    released = $("#released").val();
    runtime = $("#runtime").val();
    year = parseInt($("#year").val());
    imdbRating = $("#imdbRating").val();
    metascore = $("#metascore").val();
    genres = $("#genre").val();
    actors = $("#actors").val();
    director = $("#director").val();
    writers = $("#writer").val();
    languages = $("#languages").val();
    awards = $("#awards").val();
    posterUrl = $("#posterUrl").val();


    var isValid = false

    // Check for critical information
    if (title) {
        if (plot) {
            if (runtime) {
                if (year) {
                    if (genres) {
                        if (posterUrl) {
                            isValid = true
                        }
                    }
                }
            }
        }
    }

    // Check for critical information
    if (isValid || $("#genre").val() == "Advert") {

        // check if imdbID exists in database
        if (imdbID) {
            // Validation
            warn("Saving");
            var Movies = Parse.Object.extend("Movies");
            var query = new Parse.Query(Movies);
            query.equalTo("ImdbID", imdbID);
            query.find({
                success: function (results) {
                    if (results.length == 0) {

                        // Get the Pricing Template Pointer
                        var query = Parse.Object.extend("PricingTemplate");
                        var object = new Parse.Query(query);
                        object.get(pricingTemplate, {
                            success: (function (ptrPricingTemplate) {

                                // Get the Cinema Pointer
                                var query = Parse.Object.extend("Cinemas");
                                var object = new Parse.Query(query);
                                object.get(cinema, {
                                    success: (function (ptrCinema) {

                                        // Save the movie
                                        var movie = new Movies();
                                        movie.set("Title", title);
                                        movie.set("ImdbID", imdbID);
                                        movie.set("Plot", plot);
                                        movie.set("Rated", rated);
                                        movie.set("Released", released);
                                        movie.set("Runtime", runtime);
                                        movie.set("Year", year);
                                        movie.set("ImdbRating", imdbRating);
                                        movie.set("Metascore", metascore);
                                        movie.set("Award", awards);
                                        movie.set("Writer", writers);
                                        movie.set("Director", director);
                                        movie.set("PricingTemplate", ptrPricingTemplate);
                                        movie.set("Cinema", ptrCinema);
                                        movie.set("Languages", languages);
                                        movie.set("Poster", posterUrl)
                                        if ($("#genre").val() == "Advert") {
                                            movie.set("Ad", true);
                                        } else {
                                            movie.set("Ad", false);
                                        }
                                        movie.save();

                                        // Link Actors
                                        Array = actors.split(", ");
                                        linkRelation("Actors", "Actor", Array, movie);

                                        // Link Genres
                                        Array = genres.split(", ");
                                        linkRelation("Genres", "Genre", Array, movie);

                                        success("Saved");

                                        // Initialize variables
                                        $("#imdbID").val("");
                                        $("#title").val("");
                                        $("#plot").val("");
                                        $("#rated").val("");
                                        $("#released").val("");
                                        $("#runtime").val("");
                                        $("#year").val();
                                        $("#imdbRating").val("");
                                        $("#metascore").val("");
                                        $("#genre").val("");
                                        $("#actors").val("");
                                        $("#director").val("");
                                        $("#writer").val("");
                                        $("#languages").val("");
                                        $("#awards").val("");
                                        $("#posterUrl").val("");
                                        // $("#buttonSaveMovie").css('visibility', 'hidden');
                                        try {
                                            $("#posterImage").remove();
                                        } catch (err) {

                                        }
                                    })
                                })
                            })
                        })
                    } else { err("Duplication detected.") }
                }
            })
        } else { err("No Imdb ID or any ID entered"); }
    } else { err("Some critical information missing") }
}

// Begin Link Relation
function linkRelation(className, fieldName, arrayName, movie) {
    for (i = 0; i < arrayName.length; ++i) {
        getObjectId(className, fieldName, arrayName[i], movie);
    }
}

// Checks if object exists and creates if it doesn't
function getObjectId(className, fieldName, objName, movie) {
    var thisClass = Parse.Object.extend(className);
    var query = new Parse.Query(thisClass);
    query.equalTo(fieldName, objName);
    query.find({
        success: function (results) {
            if (results.length == 0) {
                var newObj = new thisClass();
                newObj.set(fieldName, objName);
                newObj.save(null, {
                    success: function (newObj) {
                        performRelation(className, newObj.id, movie);
                    }
                })
            } else {
                objId = results[0].id;
                performRelation(className, objId, movie);
            }


        },
        error: function () {
            err("Could not validate");
        }
    })
}

// Perform Relation
function performRelation(className, objId, movie) {
    // Make the relationship
    var Obj = new Parse.Object.extend(className);
    var obj = new Parse.Query(Obj);
    obj.get(objId, {
        success: function (thisObject) {
            var relation = movie.relation(className);
            relation.add(thisObject);
            movie.save();
        }
    })
}
// Fetches the movie from OMDB
function fetchMovie(title, imdbID) {
    // Toast
    warn("Pulling");

    // Get the movie Url
    var movieUrl = false;

    if (imdbID.value) {
        movieUrl = "http://www.omdbapi.com/?i=" + imdbID.value + "&plot=short&r=json"
    } else if (title.value) {
        movieUrl = "http://www.omdbapi.com/?t=" + title.value + "&y=&plot=short&r=json"
    }

    if (movieUrl) {
        $.ajax({
            type: "GET",
            url: movieUrl,
            datatype: "jsonp",
            success: function (data) {
                $movie = data;
                if ($movie['Response'] == 'False') {
                    err($movie['Error']);
                } else {
                    setMovieAttributes($movie);
                    success("Movie Pulled");
                    $("#buttonSaveMovie").css('visibility', 'visible');

                }
            },
            error: function (request, status, error) {
                err(status + ", " + error);
            }
        })
    } else {
        err("No ImdbID or Title ")
    }
}

// Sets the attributes from the API Movie Request
function setMovieAttributes($movie) {
    $("#imdbID").val($movie['imdbID']);
    $("#title").val($movie['Title']);
    $("#plot").val($movie['Plot']);
    $("#rated").val($movie['Rated']);
    $("#year").val($movie['Year']);
    $("#released").val($movie['Released']);
    $("#runtime").val($movie['Runtime']);
    $("#genre").val($movie['Genre']);
    $("#writer").val($movie['Writer']);
    $("#director").val($movie['Director']);
    $("#actors").val($movie['Actors']);
    $("#imdbRating").val($movie['imdbRating']);
    $("#metascore").val($movie['Metascore']);
    $("#languages").val($movie['Language']);
    $("#awards").val($movie['Awards']);
    getMoviePoster($movie['imdbID']);
}

// Fetches the Image
function getMoviePoster(imdbID) {

    var bestUrl;
    var baseURL = "http://image.tmdb.org/t/p/";
    var bestPosterSize = "w300"
    var posterUrl;

    $.ajax({
        type: "GET",
        url: "http://api.themoviedb.org/3/movie/" + imdbID + "/images?api_key=def7b4e01fd51325dfafea6bd3c2e90a",
        datatype: "json",
        success: function (data) {
            $.each(data.posters, function (i, poster) {
                if (poster.iso_639_1 = "en") {
                    if (poster.aspect_ratio < 0.7) {
                        bestUrl = poster.file_path;
                        return false;
                    };
                }
            });

            // Assign Poster Url
            posterUrl = baseURL + bestPosterSize + bestUrl;

            if (!isMobile) {
                // Check if the element was already created
                if (document.getElementById("posterImage")) {
                    // Element was already created
                    document.getElementById("posterImage").setAttribute('src', posterUrl);
                } else {
                    // If it was not (First time), then Create Poster
                    var img = $('<img id="posterImage" class="img img-thumbnail">');
                    img.attr('src', posterUrl);
                    img.appendTo('#divImage');
                }
            }

            $("#posterUrl").val(posterUrl);
        },
        error: function () {
            err("Image not found");
        }
    });
}

// Load Cinemas
function loadCinemas(results) {
    var cinemas = document.getElementById('cinemas');
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objName = results[i].get("Name");
        if (i == 0) {
            cinemas.innerHTML += "<option value='" + objId + "'>" + objName + "</option>";
        } else {
            cinemas.innerHTML += "<option selected value='" + objId + "'>" + objName + "</option>";
        }
    }
}

// Load Pricing Templates
function loadPricingTemplateData(results) {
    var pricingTemplates = document.getElementById('pricingTemplates');
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objName = results[i].get('Name');        
        if (objName !== "MovieZone 2D") {
            pricingTemplates.innerHTML += "<option value='" + objId + "'>" + objName + "</option>";
        } else {
            pricingTemplates.innerHTML += "<option selected value='" + objId + "'>" + objName + "</option>";
        }
    }

}

// Execute
$(document).ready(function () {
    fetchCinemas();
    fetchPricingTemplate();
});