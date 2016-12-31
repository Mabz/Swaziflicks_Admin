<div>
    <div class="row">
        <div class="col-md-4">
            <div class="row">
                <h3><label>New Cinema</label></h3>
            </div>
            <div>
                <div class="form-group">
                    <label for="cinema">Name</label>
                    <input type="text" class="form-control" id="name" placeholder="Cinema name">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="latitude">Latitude</label>
                    <input type="text"  class="form-control" id="latitude" placeholder="Latitude coordinate">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="longitude">Longitude</label>
                    <input type="text"  class="form-control" id="longitude" placeholder="Longitude coordinate">
                </div>                
            </div>
            <div>
                <div class="form-group">
                    <button onclick="newCinema()" id="newCinema" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New</button>
                </div>
            </div>
        </div>        
        <div class="col-md-4">
            <div class="row">
                <h3><label>Current Cinemas</label></h3>
            </div>
            <div id="currentCinemas">

            </div>
        </div>
    <div class="row">
        <div class="col-md-4 ">
            <div>
                <h3><label>Update Cinema</label></h3>
            </div>
            <div>
                <div class="form-group">
                    <label for="cinemaUpdate">Name</label>
                    <input type="text" class="form-control" id="cinemaUpdate" placeholder="Cinema name">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="latitudeUpdate">Latitude</label>
                    <input type="text"  class="form-control" id="latitudeUpdate" placeholder="Latitude coordinate">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="longitudeUpdate">Longitude</label>
                    <input type="text"  class="form-control" id="longitudeUpdate" placeholder="Longitude coordinate">
                </div>                
            </div>   
            <div>
                <div class="form-group">
                    <button onclick="updateCinema()" id="updateCinema" type="submit" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Update</button>
                </div>
            </div>                     
        </div>
    </div>
</div>
</div>
