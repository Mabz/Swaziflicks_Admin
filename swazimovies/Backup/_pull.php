<div class="row" align="center">
    <label for="buttonFetchImdb">Pull Movie</label>
    <br />
    <div class="col-md-3">
        <div class="input-group"  style="padding: 5px">
            <span class="input-group-btn">
                <button id="buttonFetchImdb" class="btn btn-success" type="button" onclick="fetchMovie(false, document.getElementById('imdbID'))">IMDB ID</button>
            </span>
            <input id="imdbID" type="text" class="form-control" placeholder="IMDB ID">
        </div><!-- /By IMDB ID -->
    </div>
    <div class="col-md-7">
        <div class="input-group"  style="padding: 5px">
            <span class="input-group-btn">
                <button id="buttonSearchTitle" class="btn btn-success" type="button" onclick="fetchMovie(document.getElementById('title'), false)">Title</button>
            </span>
            <input id="title" type="text" class="form-control" placeholder="Title of the movie or the event">
        </div><!-- /input-group -->
    </div>
    <div class="col-md-2" style="padding: 5px">
        <button id="buttonSaveMovie" onclick="saveMovie()" type="submit" class="btn btn-primary"><span class="glyphicon glyphicon-floppy-disk" aria-hidden="true"></span> Save Movie</button>
    </div>
</div>
<div class="row">
    <form class="form"> 
        <div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="cinemas">Cinema</label>
                    <select id="cinemas" class="form-control">

                    </select>
                </div>
            </div>
            <div class="col-md-6">
                <div class="form-group">
                    <label for="pricingTemplates">Pricing Template</label>
                    <select id="pricingTemplates" class="form-control">

                    </select>
                </div>
            </div>      
        </div>                              
        <div class="form-group">
            <label for="plot">Plot</label>
            <input type="text" class="form-control" id="plot" placeholder="Plot of the movie or event">
        </div>    
        <div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="rated">Parental Rating</label>
                    <input type="text" class="form-control" id="rated" placeholder="Rated">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="released">Released</label>
                    <input type="text"  class="form-control" id="released" placeholder="Release Date">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="runtime">Runtime</label>
                    <input type="text"  class="form-control" id="runtime" placeholder="Runtime">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="year">Year Released</label>
                    <input type="text"  class="form-control" id="year" placeholder="Year Released">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="imdbRating">IMDB Rating</label>
                    <input type="text"  class="form-control" id="imdbRating" placeholder="IMDB Rating">
                </div>
            </div>
            <div class="col-md-2">
                <div class="form-group">
                    <label for="metascore">Metascore</label>
                    <input type="text"  class="form-control" id="metascore" placeholder="Metascore">
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-9">
                <div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="genre">Genres</label>
                            <input type="text"  class="form-control" id="genre" placeholder="Genres">
                    </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <label for="actor">Actors</label>
                            <input type="text"  class="form-control" id="actors" placeholder="Actors">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col-md-3">
                        <div class="form-group">
                            <div class="form-group">
                                <label for="director">Director</label>
                                <input type="text"  class="form-control" id="director" placeholder="Director">
                            </div>
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">
                            <label for="writer">Writers</label>
                            <input type="text"  class="form-control" id="writer" placeholder="Writers">
                        </div>
                    </div>
                </div>
                <div>
                    <div class="col-md-3">
                        <div class="form-group">        
                            <label for="languages">Languages</label>
                            <input type="text"  class="form-control" id="languages" placeholder="Languages">
                        </div>
                    </div>
                    <div class="col-md-9">
                        <div class="form-group">   
                            <label for="awards">Awards</label>
                            <input type="text"  class="form-control" id="awards" placeholder="Awards">
                        </div>
                    </div>
                </div>
                    <div>
                        <div class="col-md-12">
                            <div class="form-group"> 
                            <label for="posterUrl">Poster Url</label>
                            <input type="text"  class="form-control" id="posterUrl" placeholder="Poster Url">
                            </div>
                    </div>
                </div>
            </div>
            <div class="col-md-3">
                <div class="row">
                    <div class="form-group">
                        <div id="divImage" align="center">

                        </div>
                    </div>
                </div>
            </div> 
        </div>
    </form> 
</div>    
