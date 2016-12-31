// Toast Messages
function warn(message) { clear(); toastr.warning(message) }
function success(message) { clear(); toastr.success(message) }
function err(message) { clear(); toastr.error(message) }
function clear() { toastr.clear() }

// Shared Functions

// Fetches Cinemas
function fetchCinemas() {
    var Cinema = Parse.Object.extend("Cinemas");
    var query = new Parse.Query(Cinema);
    query.find({
        success: function (results) {
            loadCinemas(results);
        },
        error: function (error) {
            err("Error: " + error.code + " " + error.message);
        }
    });
}

// Fetches the Pricing Template
function fetchPricingTemplate() {

    var pricingTemplates = Parse.Object.extend("PricingTemplate");
    var query = new Parse.Query(pricingTemplates);
    query.find({
        success: function (results) {
            loadPricingTemplateData(results);
        },
        error: function (error) {
            err("Error: " + error.code + " " + error.message);
        }
    });
}

// Fetches the Movie Prices
function fetchMovies() {
    var Movies = Parse.Object.extend("Movies");
    var query = new Parse.Query(Movies);
    query.find({
        success: function (results) {
            loadMovie(results);
        }
    })
}