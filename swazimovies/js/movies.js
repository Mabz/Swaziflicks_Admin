// Load Movie
function loadMovie(results) {
    var movies = document.getElementById('movieData');
    var movieDetail = document.getElementById('movieDetail');
    movieDetail.innerHTML = "";
    movies.innerHTML = "";
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objTitle = results[i].get('Title');
        movies.innerHTML += "<div><button style='margin: 5px' onclick='movieDetails(&quot;" + objId + "&quot;,&quot;" + objTitle + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + objTitle + " | <span class='glyphicon glyphicon-film' aria-hidden='true'></span></button>  <button style='margin: 5px' onclick='deleteMovie(&quot;" + objId + "&quot;, &quot;" + objTitle + "&quot;)' class='btn btn-danger'><span class='glyphicon glyphicon-remove' aria-hidden='true'></span></button></div>";
    }
    if (results.length == 0) {
        movies.innerHTML += "<h4>No movies</h4>";
    }
}

// Key details about if the movie is playing or not
function movieDetails(objId, objTitle) {
    var Movie = Parse.Object.extend("Movies");
    var query = new Parse.Query(Movie);
    query.get(objId, {
        success: function (obj) {
            var ShowDays = Parse.Object.extend("ShowDays");
            var query = new Parse.Query(ShowDays);
            query.equalTo("Movie", obj);
            query.descending("Starts");
            query.first({
                success: function (result) {
                    var movieDetail = document.getElementById('movieDetail');
                    if (result) {
                        movieDetail.innerHTML = "<h3><label class='label label-danger'>The last day when movie plays: " + moment(new Date(result.get('Ends'))).fromNow() + "</label></h3>";
                    } else {
                        movieDetail.innerHTML = "<h3><label class='label label-danger'>No days movie is showing found</label></h3>";
                    }
                }, error: function () {
                    err("Something went wrong");
                }
            })
        }
    })
}

// Deletes the movie, days it shows and the times
function deleteMovie(objId, objTitle) {
    if (confirm('Delete ' + objTitle)) {
        var Movie = Parse.Object.extend("Movies");
        var movie = new Parse.Query(Movie);
        movie.get(objId, {
            success: function (objMovie) {
                var ShowDays = Parse.Object.extend("ShowDays");
                var showDay = new Parse.Query(ShowDays);
                showDay.equalTo("Movie", objMovie);
                showDay.find({
                    success: function (resultsShowDays) {
                        if (resultsShowDays.length > 0) {
                            for (var i = 0; i < resultsShowDays.length; i++) {
                                var ShowTimes = Parse.Object.extend("ShowTimes");
                                var showTimes = new Parse.Query(ShowTimes);
                                showTimes.equalTo("ShowDay", resultsShowDays[i]);
                                showTimes.find({
                                    success: function (resultsShowTimes) {
                                        Parse.Object.destroyAll(resultsShowTimes).then(function () {
                                            Parse.Object.destroyAll(resultsShowDays).then(function () {
                                                objMovie.destroy({
                                                    success: function () {
                                                        success("Deleted");
                                                        fetchMovies();
                                                    }, erorr: function () {
                                                        err("Failed to Delete Movie");
                                                    }
                                                })
                                            })
                                        })
                                    }, error: function () {
                                        err("Failed to Delete Show Times");
                                    }
                                })
                            }
                        } else {
                            objMovie.destroy({
                                success: function () {
                                    success("Deleted");
                                    fetchMovies();
                                }, erorr: function () {
                                    err("Failed to Delete Movie");
                                }
                            })
                        }
                    }, error: function () {
                        alert("Something went wrong");
                    }
                })
            }
        })
    }
}
