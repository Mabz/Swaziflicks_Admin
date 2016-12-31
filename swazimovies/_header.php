<!DOCTYPE html>
<html>
<head>

<meta charset="UTF-8">
<title>Administrative Console</title>
    <link href="css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/toastr.min.css" rel="stylesheet" />
    <link href="css/jquery-ui.min.css" rel="stylesheet" />
    <link href="css/jquery-ui.structure.css" rel="stylesheet" />
    <link href="css/jquery-ui.theme.css" rel="stylesheet" />
    <link href="css/jquery-ui-timepicker-addon.min.css" rel="stylesheet" />
    <link rel="icon" href="images/theSwazi.ico"  type="image/x-icon" />

    <!-- Scripts-->
    <script type="text/javascript" src="js/jquery-1.11.2.min.js"></script>    
    <script type="text/javascript" src="js/bootstrap.min.js"></script>
    <script type="text/javascript" src="js/moment.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui.min.js"></script>
    <script type="text/javascript" src="js/toastr.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-timepicker-addon.min.js"></script>
    <script type="text/javascript" src="js/jquery-ui-sliderAccess.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/parse/1.6.14/parse.min.js"></script> 
    <script type="text/javascript" src="js/parse.js"></script> 
    <script type="text/javascript" src="js/security.js"></script>
    <script type="text/javascript">
      $(document).ready( function () {  
        var currentUser = Parse.User.current();
        if (currentUser) {
            
        } else {
            alert("Logged out");
        }
      })
        // Determine if device is a mobile one
        var isMobile = false;
        if (navigator.userAgent.match(/Android/i)
         || navigator.userAgent.match(/webOS/i)
         || navigator.userAgent.match(/iPhone/i)
         || navigator.userAgent.match(/iPad/i)
         || navigator.userAgent.match(/iPod/i)
         || navigator.userAgent.match(/BlackBerry/i)
         || navigator.userAgent.match(/Windows Phone/i)
         ) {isMobile = true;}
    </script>

    <script type="text/javascript" src="js/global.js"></script>

</head>
   
<body>

<nav class="navbar navbar-default">
  <div class="container-fluid">
    <!-- Brand and toggle get grouped for better mobile display -->
    <div class="navbar-header">
      <button type="button" class="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1">
        <span class="sr-only">Toggle navigation</span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="index.php"><img alt="Brand" src="images/theSwazi.png"></a>
    </div>

    <!-- Collect the nav links, forms, and other content for toggling -->
    <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <ul class="nav navbar-nav">
        <li><a href="showings.php">Showings</a></li>
        <li><a href="movies.php">Movies</a></li>
        <li><a href="prices.php">Prices</a></li>
        <li><a href="cinemas.php">Cinemas / Companies</a></li>  
        <li><a href="admin.html">Admin</a></li>
      </ul>
    </div><!-- /.navbar-collapse -->
  </div><!-- /.container-fluid -->
</nav>
<div style="margin-top:5px"></div>