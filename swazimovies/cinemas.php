<?php 
    include '_header.php';
?>

<script type="text/javascript" src="js/cinemas.js"></script>
<div class="container">
    <div class="row well">
        <?php require '_cinemas.php'; ?>
    </div><!-- /.row -->
</div>
    <script type="text/javascript">
        $(document).ready(function () {
            fetchCinemas();
        });
    </script>

<?php
include '_footer.php';
?>
