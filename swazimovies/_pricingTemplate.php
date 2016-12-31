<div>
    <div class="input-group">        
        <span class="input-group-btn">
            <button id="buttonNewPricingTemplate" class="btn btn-primary" type="button" onclick="createPricingTemplate(document.getElementById('pricingTemplateName'))"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New</button>
        </span>
        <input id="pricingTemplateName" type="text" class="form-control" placeholder="Pricing template">
    </div>    
    <div class="row">
        <h3><label>Current Templates</label></h3>
        <div id="pricingTemplateData">

        </div>
    </div>
    <hr />
    <div class="row">
        <label for="templateName">Selected Template</label>
        <div class="input-group">
            <input type="text" class="form-control" id="templateName" placeholder="Template Name">
            <span class="input-group-btn">
                <button onclick="updatePricingTemplate()" id="saveTemplateChanges" type="submit" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Change</button>
            </span>
        </div>
    </div>
    <div id="prices" style="visibility: hidden" class="row">
        <div class="col-md-4">
            <div class="row">
                <h3><label>New Movie Price</label></h3>
            </div>
            <div>
                <div class="form-group">
                    <label for="day">Day</label>
                    <input type="text" class="form-control" id="day" placeholder="Monday or Tuesday etc.">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="ticket">Ticket</label>
                    <input type="text"  class="form-control" id="ticket" placeholder="Standard, VIP etc.">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="price">Price</label>
                    <input type="text"  class="form-control" id="price" placeholder="Price">
                </div>                
            </div>
            <div>
                <div class="form-group">
                    <button onclick="newMoviePrice()" id="saveMoviePrice" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New</button>
                </div>
            </div>
        </div>        
        <div class="col-md-4">
            <div class="row">
                <h3><label>Current Movie Price</label></h3>
            </div>
            <div id="currentMoviePrices">

            </div>
        </div>
    <div class="row">
        <div class="col-md-4 ">
            <div>
                <h3><label>Update Movie Price</label></h3>
            </div>
            <div>
                <div class="form-group">
                    <label for="dayUpdate">Day</label>
                    <input type="text" class="form-control" id="dayUpdate" placeholder="Monday or Tuesday etc.">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="ticketUpdate">Ticket</label>
                    <input type="text"  class="form-control" id="ticketUpdate" placeholder="Standard, VIP etc.">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="priceUpdate">Price</label>
                    <input type="text"  class="form-control" id="priceUpdate" placeholder="Price">
                </div>                
            </div>   
            <div>
                <div class="form-group">
                    <button onclick="updateMoviePrice()" id="saveMoviePriceChanges" type="submit" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Update</button>
                </div>
            </div>                     
        </div>
    </div>
</div>
</div>
