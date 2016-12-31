<?php 
    include '_header.php';
?>
<script type="text/javascript" src="js/prices.js"></script>
<div class="container">    
    <div class="row well">
        <?php require '_pricingTemplate.php'; ?>
    </div><!-- /.row -->
</div>
    <script type="text/javascript">
        $(document).ready(function () {
            fetchPricingTemplate();
        });
    </script>

<?php
include '_footer.php';
?>
