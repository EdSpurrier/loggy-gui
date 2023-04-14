<?php
/* Database credentials. Assuming you are running MySQL
server with default setting (user 'root' with no password) */


/* define('DB_SERVER', "localhost");
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'idsidsidsids');
define('DB_NAME', 'loggy'); 
 
define('DB_SERVER', "101.187.190.242");
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'idsidsidsids');
define('DB_NAME', 'loggy');
*/
 
define('DB_SERVER', "edspurrier.com");
define('DB_USERNAME', 'edspurri_vision');
define('DB_PASSWORD', 'idsidsidsids');
define('DB_NAME', 'edspurri_vision_gui');

/* Attempt to connect to MySQL database */
$link = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
 
// Check connection
if($link === false){
    die("ERROR: Could not connect. " . mysqli_connect_error());
}
?>