// Fetches the Movie Prices
function fetchMoviePrices(objId) {
    var PricingTemplate = Parse.Object.extend("PricingTemplate");
    var query = new Parse.Query(PricingTemplate);
    query.get(objId, {
        success: function (obj) {
            var Prices = Parse.Object.extend("Pricing");
            var query = new Parse.Query(Prices);
            query.equalTo("pT", obj);
            query.find({
                success: function (results) {
                    loadMoviePrices(results);
                }
            })
        }
    })
}

// Saves new Pricing Template
function newMoviePrice() {
    objId = null;
    objPT = $('#saveTemplateChanges').attr('name');
    objDay = $('#day').val();
    objTicket = $('#ticket').val();
    objPrice = $('#price').val();
    savePrice(objPT, objId, objDay, objTicket, objPrice);
}

// Update Movie Price
function updateMoviePrice() {
    objId = $('#saveMoviePriceChanges').attr('name');
    objPT = $('#saveTemplateChanges').attr('name');
    objDay = $('#dayUpdate').val();
    objTicket = $('#ticketUpdate').val();
    objPrice = $('#priceUpdate').val();
    savePrice(objPT, objId, objDay, objTicket, objPrice);
}

// Load Movie Prices
function loadMoviePrices(results) {
    var pricing = document.getElementById('currentMoviePrices');
    pricing.innerHTML = ""
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objDay = results[i].get('Day');
        var objTicket = results[i].get('Ticket');
        var objPrice = results[i].get('Price');
        pricing.innerHTML += "<div class='row' align='center'><button style='margin: 5px' onclick='interestPriceTemplate(&quot;" + objId + "&quot;,&quot;" + objDay + "&quot;,&quot;" + objTicket + "&quot;, &quot;" + objPrice + "&quot;)' class='btn btn-info' aria-label='Left Align' id='" + objId + "'>" + objDay + " - " + objTicket + " - " + objPrice + " | <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button></div>";
    }
    if (results.length == 0) {
        pricing.innerHTML += "<h4>No templates</h4>";
    }
}

// Focus on Pricing
function interestPriceTemplate(objId, objDay, objTicket, objPrice) {
    document.getElementById('dayUpdate').value = objDay;
    document.getElementById('ticketUpdate').value = objTicket;
    document.getElementById('priceUpdate').value = objPrice;
    document.getElementById('saveMoviePriceChanges').setAttribute("name", objId);

}

// Loads Templates on Display
function loadPricingTemplateData(results) {
    var pricingTemplates = document.getElementById('pricingTemplateData');
    pricingTemplates.innerHTML = ""
    for (var i = 0; i < results.length; i++) {
        var objId = results[i].id;
        var objName = results[i].get('Name');
        pricingTemplates.innerHTML += "<button style='margin: 5px' onclick='interestPricingTemplate(&quot;" + objId + "&quot;,&quot;" + objName + "&quot;)' class='btn btn-default' aria-label='Left Align' id='" + objId + "'>" + objName + " | <span class='glyphicon glyphicon-pencil' aria-hidden='true'></span></button>";
    }
    if (results.length == 0) {
        pricingTemplates.innerHTML += "<h4>No templates</h4>";
    }
}

// Saves Pricing Template
function savePricingTemplate(objId, objName) {
    var PricingTemplate = Parse.Object.extend("PricingTemplate");

    // If objId is not null then it is an update
    if (objId) {
        // Get the Concerned Object                
        var query = new Parse.Query(PricingTemplate);
        query.get(objId, {
            success: function (obj) {
                // Save 
                obj.set("Name", objName);
                obj.save().then(function () {
                    fetchPricingTemplate();
                    document.getElementById('templateName').value = "";
                });
                success("Saved");
            }, error: function () {
                err("Something went wrong :(")
            }
        });
    }
    else {
        var pricingTemplate = new PricingTemplate();
        pricingTemplate.save({ Name: objName }).then(function () {
            fetchPricingTemplate();
            success('Created');
        });
    }
}

// Saves Movie Price
function savePrice(objPT, objId, objDay, objTicket, objPrice) {
    var Pricing = Parse.Object.extend("Pricing");

    // If objId is not null then it is an update
    if (objId) {
        // Get the Concerned Object                
        var query = new Parse.Query(Pricing);
        query.get(objId, {
            success: function (obj) {
                // Save 
                obj.set("Day", objDay);
                obj.set("Ticket", objTicket);
                obj.set("Price", objPrice);
                obj.save().then(function () {
                    fetchMoviePrices(objPT);
                });
                success("Saved");
            }, error: function () {
                err("Something went wrong :(")
            }
        });
    }
    else {
        // Get the Concerned Object  
        var PricingTemplate = new Parse.Object.extend("PricingTemplate");
        var pricingTemplate = new Parse.Query(PricingTemplate);
        pricingTemplate.get(objPT, {
            success: function (pT) {
                var Pricing = new Parse.Object.extend("Pricing");
                var pricing = new Pricing();
                pricing.set("Day", objDay);
                pricing.set("Ticket", objTicket);
                pricing.set("Price", objPrice);
                pricing.set("pT", pT);
                pricing.save().then(
                    function () {
                        fetchMoviePrices(objPT);
                    })

            }
        })
    }
}

// Check if Object exists
function validatePricingTemplate(objId, objName) {
    if (objName) {
        // Validation
        warn("Saving");
        var pricingTemplates = Parse.Object.extend("PricingTemplate");
        var query = new Parse.Query(pricingTemplates);
        query.equalTo("Name", objName);
        query.notEqualTo("objectId", objId);
        query.find({
            success: function (results) {
                if (results.length == 0) {
                    savePricingTemplate(objId, objName);
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

// Updates Pricing Template
function updatePricingTemplate() {
    // Objects in Concern
    objId = $('#saveTemplateChanges').attr('name');
    objName = $('#templateName').val();
    validatePricingTemplate(objId, objName);
}

// Changes editable pricing and Assigns
function interestPricingTemplate(objId, objName) {
    document.getElementById('templateName').value = objName;
    document.getElementById('saveTemplateChanges').setAttribute("name", objId);
    fetchMoviePrices(objId);
    $("#prices").css('visibility', 'visible');
}

// Creates new Pricing template
function createPricingTemplate(objName) {
    validatePricingTemplate(null, objName.value);
}