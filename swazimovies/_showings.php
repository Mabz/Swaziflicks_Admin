<div>
    <div class="row">
        <h3><label>Movies</label></h3>
        <div id="movieData">

        </div>
    </div>
    <hr /> <!-- Dates -->
    <div class="row" id="levelShowDays" style="visibility: hidden">
        <div align="center">
            <h3><label class="label label-danger" id="currentMovie"></label></h3>
        </div>
        <div class="col-md-4">
            <div class="row">
                <h4><label>New Show Range</label></h4>
            </div>
            <div>
                <div class="form-group">
                    <label for="fromNew">From</label>
                        <input class="form-control" type="text" id="fromNew">                    
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="toNew">To</label>                        
                        <input class="form-control" type="text" id="toNew">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="startAdvertisingNew">Start Advertising</label>
                        <div id="startAdvertisingNew">

                        </div>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <button onclick="newMovieShowings()" id="saveMovieShowings" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New</button>
                </div>
            </div>
        </div>        
        <div class="col-md-4">
            <div class="row">
                <h4><label>Current Show Ranges</label></h4>
            </div>
            <div id="currentMovieShowRanges">

            </div>
        </div>
        <div class="row">
        <div class="col-md-4 ">
            <div>
                <h4><label>Update Show Range</label></h4>
            </div>
            <div>
                <div class="form-group">
                    <label for="fromUpdate">From</label>
                    <input class="form-control" type="text" id="fromUpdate">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <label for="toUpdate">To</label>                        
                    <input class="form-control" type="text" id="toUpdate">                 
                </div>
            </div> 
            <div>
                <div class="form-group">
                    <label for="startAdvertisingUpdate">Start Advertising</label>
                        <div id="startAdvertisingUpdate">

                        </div>
                </div>
            </div>
            <div>
                <div class="form-group">
                    <button onclick="updateMovieShowRanges()" id="saveMovieShowRangesChanges" type="submit" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Update</button>
                </div>
            </div>                     
        </div>
    </div>
    </div>
    <div id="levelShowTimes" style="visibility: hidden">
    <hr /> <!-- Time -->
        <div class="col-md-4">
            <div class="row">
                <h4><label>New Start Time</label></h4>
            </div>
            <div>
                <div class="form-group">
                    <label for="timeNew">From</label>
                        <input class="form-control" type="text" id="timeNew">                    
                </div>
            </div>
            <div>
                <div class="form-group">
                    <button onclick="newStartTime()" id="saveStartTime" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-plus-sign" aria-hidden="true"></span> New</button>
                </div>
            </div>
        </div>        
        <div class="col-md-4">
            <div class="row">
                <h4><label>Current Start Times</label></h4>
            </div>
            <div id="currentStartTimes">

            </div>
        </div>
        <div class="row">
        <div class="col-md-4 ">
            <div>
                <h4><label>Update Start Time</label></h4>
            </div>
            <div>
                <div class="form-group">
                    <label for="timeUpdate">From</label>
                    <input class="form-control" type="text" id="timeUpdate">
                </div>
            </div>
            <div>
                <div class="form-group">
                    <button onclick="updateStartTime()" id="saveStartTimeChange" type="submit" class="btn btn-success"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Update</button>
                </div>
            </div>                     
        </div>
    </div>
    </div>
</div>

<script  type="text/javascript">
    // Defaults for MovieZone
    thisFriday = moment(moment(moment(moment().day(5)).hour(0)).minute(00)).second(00);        
    nextThursday = moment(moment(moment(moment().day(5).add(6, 'days')).hour(22)).minute(59)).second(59);
    
    
    $('#fromNew').val(thisFriday);
    $('#toNew').val(nextThursday);
    

    $('#fromNew').datepicker({
        constrainInput: true,
        defaultDate: new Date(thisFriday),
        maxDate: new Date(nextThursday),
        onSelect: function (selectedDate) {
            $('#toNew').datepicker("option", "minDate", selectedDate)
            }
        })
    
    $('#toNew').datepicker({
        defaultDate: new Date(nextThursday),
        minDate: new Date(thisFriday),
        constrainInput: true,
        onSelect: function (selectedDate) {
            $('#fromNew').datepicker("option", "maxDate", selectedDate)
            }
    })

    $('#startAdvertisingNew').datepicker({
        defaultDate: 0,
    })

    $('#startAdvertisingUpdate').datepicker({
        defaultDate: 0,
    })

    $('#fromUpdate').datepicker({
        constrainInput: true,                
        onSelect: function (selectedDate) {
            var tempDate = $('#toUpdate').val();
            $('#toUpdate').datepicker("option", "minDate", selectedDate);
            $('#toUpdate').datepicker("option", "defaultDate", new Date(tempDate));
            $('#toUpdate').val(tempDate);
        }
    })
    
    $('#timeNew').timepicker({
        hourMin: 8,
        hourMax: 24,
        stepMinute: 15,
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false }
    });
    $('#timeUpdate').timepicker({
        hourMin: 8,
        hourMax: 24,
        stepMinute: 15,
        addSliderAccess: true,
        sliderAccessArgs: { touchonly: false }
    });
</script>