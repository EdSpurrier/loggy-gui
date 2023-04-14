<?php

/*     $db_setup_local = {
        "db"        :   "loggy",
        "username"  :   "root",
        "password"  :   "",
        "server"    :   "localhost",
        "port"      :   "3306"
    };

    $db_setup_arvixe = {
        "db"        :   "edspurri_loggy",
        "username"  :   "edspurri_loggy_u",
        "password"  :   "idsidsidsids",
        "server"    :   "edspurrier.com",
        "port"      :   "3306"
    }
    

    db_setup_local = {
        "db"        :   "loggy",
        "username"  :   "root",
        "password"  :   "ids2019ids2018ids2017ids2016",
        "server"    :   "203.192.77.12",
        "port"      :   "3306"
    }
    $db_setup = $db_setup_local

    $dbhost = "101.187.190.242";
    $dbuser = "root";
    $dbpass = "idsidsidsids";
    $db = "loggy";
 */


    function OpenCon()
    {
        $dbhost = "edspurrier.com";
        $dbuser = "edspurri_vision2";
        $dbpass = "idsidsidsids";
        $db = "edspurri_vision_gui";
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn -> error);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        };


        return $conn;
    }



    function CloseCon($conn)
    {
        $conn -> close();
    }


    function OpenCon_LoggyVision()
    {
        $dbhost = "edspurrier.com";
        $dbuser = "edspurri_vision2";
        $dbpass = "idsidsidsids";
        $db = "edspurri_vision_core";
        $conn = new mysqli($dbhost, $dbuser, $dbpass, $db) or die("Connect failed: %s\n". $conn -> error);

        if (!$conn) {
            die("Connection failed: " . mysqli_connect_error());
        };



        return $conn;
    }






?>