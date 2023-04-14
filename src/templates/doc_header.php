

<!DOCTYPE html>

    <html lang="en">

        <head>
            <title>Loggy V2.0</title>

            <meta http-equiv="pragma" content="no-cache">
            <meta http-equiv="expires" content="-1">
            <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0' />
            
            <link rel="shortcut icon" type="image/png" href="images/icons/favicon.png"/>
            <link rel="shortcut icon" type="image/png" href="images/icons/favicon.png"/>

            <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Bree+Serif" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Alegreya+Sans+SC|PT+Sans+Narrow" rel="stylesheet">
            <link href="https://fonts.googleapis.com/css?family=Lato" rel="stylesheet">
            
            <link rel="stylesheet" type="text/css" href="css/style.css">

            <script src="js/vendor/jquery-3.3.1.min.js"></script>

            <script src="js/vendor/moment.js"></script>
            <script src="js/vendor/TweenMax.js"></script>
            <script src="js/vendor/xls.min.js"></script>
            <script src="js/vendor/xlsx.full.min.js"></script>
            <script src="js/vendor/ContainerValidator.js"></script>
            <script src="js/vendor/jquery.touchSwipe.min.js"></script>
            <script src="js/vendor/jquery.popmenu.js"></script>
            <script src="js/vendor/datepicker.min.js"></script>


        </head>
        <body data-user-type="<?php 
            if(isset($_SESSION["user_type"])) {
                echo $_SESSION["user_type"];
            } else {
                echo "logged_out";
            }; ?>">