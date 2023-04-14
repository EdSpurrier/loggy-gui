<?php 
    include("db_connect.php");

    if (
        !isset($_POST['comms_datetime']) || 
        !isset($_POST['destination']) ||
        !isset($_POST['destination_id']) || 
        !isset($_POST['target_id']) ||
        !isset($_POST['comm']) || 
        !isset($_POST['comm_data']) ) {
        echo json_encode( var_dump($_POST) );
        die();
    };



    $comms_datetime = $_POST['comms_datetime'];
    $destination = $_POST['destination'];
    $destination_id = $_POST['destination_id'];
    $target_id = $_POST['target_id'];
    $comm = $_POST['comm'];
    $comm_data = $_POST['comm_data'];



    $db_connection = OpenCon_LoggyVision();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "INSERT INTO `comms`(`comms_datetime`, `destination`, `destination_id`, `target_id`, `comm`, `comm_data`, `status`) VALUES ('" .
        $comms_datetime . "', '" .
        $destination . "', '" .
        $destination_id . "', '" .
        $target_id . "', '" .
        $comm . "', '" .
        $comm_data . "'," .
        "'Created');";



    $result = mysqli_query($db_connection, $query);

    if (mysqli_errno( $db_connection ) == 1062){
        echo json_encode('Error In DB!!');
        CloseCon($db_connection);
        die();
    };


    CloseCon($db_connection);



    /* send a JSON encded array to client */
    echo json_encode("success");

?>