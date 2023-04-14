<?php 


    if (
        !isset($_POST['container_unique_id']) || 
        !isset($_POST['event_unique_id'])
        ) {
            echo json_encode( var_dump($_POST) );
        die();
    };



    $container_unique_id = $_POST['container_unique_id'];
    $event_unique_id = $_POST['event_unique_id'];


    include("db_connect.php");


    $db_connection = OpenCon();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM containers WHERE `container_unique_id` = '" . $container_unique_id . "'";
    $result = mysqli_query($db_connection, $query);

    $result_array = array();

    $container_id = 0;

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
            $container_id = $row['container_id'];
        };
    };

    if( empty($result_array) ){
        echo json_encode('Container Id Does Not Exist');
        CloseCon($db_connection);
        die();
    }


    
    $query = "UPDATE `containers` SET `event_unique_id` = '" . $event_unique_id . "' WHERE `container_unique_id` = '" . $container_unique_id . "'";


    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        echo json_encode('Invalid query: ' . $db_connection->error);
        CloseCon($db_connection);
        die();
    };




     $query = "UPDATE `container_chain_events` SET `container_unique_id` = '" . $container_unique_id . "', `status` = 'assigned', `container_id` = '" . $container_id ."' WHERE `event_unique_id` = '" . $event_unique_id . "'";


    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        echo json_encode('Invalid query: ' . $db_connection->error);
        CloseCon($db_connection);
        die();
    } else {
        echo json_encode('Assigned Successfully.');
        CloseCon($db_connection);
        die();
    };



    


    ////////////////////
    /////////////////////
    //////////////////////
    

    $db_connection2 = OpenCon_LoggyVision();


    $query = "UPDATE `alarms` SET `reference_type` = 'container_down', `reference_unique_id` = '" . $event_unique_id . "' WHERE `alarm_unique_id` = '" . $alarm_unique_id . "'";

    $result = mysqli_query($db_connection2, $query);

    if (!$result) {
        echo json_encode('Invalid query: ' . $db_connection2->error);
        CloseCon($db_connection2);
        die();
    } else {
        echo json_encode('Assigned Successfully.');
        CloseCon($db_connection2);
        die();
    };

?>