<?php 
include '_header.php';
?>
<script type="text/javascript" src="js/movies.js"></script>
<div class="container">
    <div class="row well well">
        <?php require '_movies.php'; ?>
    </div><!-- /.row -->
</div>
    <script type="text/javascript">
        $(document).ready(function () {
            fetchMovies();
        });
    </script>


<?php
include '_footer.php';
?>
