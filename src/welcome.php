<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>
 
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Welcome</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.css">
    <style type="text/css">
        body{ font: 14px sans-serif; text-align: center; }
    </style>
</head>
<body>
    <div class="page-header">
        <h1>Hi, <b><?php echo htmlspecialchars($_SESSION["username"]); ?></b>.</h1>
    </div>
    <p>

        <a href="http://101.187.190.242:5005/loggy/" class="btn btn-default">Loggy GUI</a>
        <a href="http://101.187.190.242:5005/phpmyadmin/" class="btn btn-default">Loggy SQL</a>
        <a href="http://101.187.190.242:1001/" class="btn btn-default">Loggy Core</a>
        
        <a href="http://101.187.190.242:5005/loggy/reset-password.php" class="btn btn-warning">Reset Your Password</a>
        <a href="http://101.187.190.242:5005/loggy/logout.php" class="btn btn-danger">Sign Out of Your Account</a>
    </p>
</body>
</html>