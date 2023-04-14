<?php

    
    
    $search_date = $_POST['search_date'];

    include("db_connect.php");

    $db_connection = OpenCon_LoggyVision();

    $update_query = "";
    $copy_query = "";
    $delete_query = "";

    if (!empty($_POST['trashed']))
    {
        $trashed = $_POST['trashed'];

        foreach($trashed as $item)
        {

            $update_query .= "UPDATE `event_alarms` SET `process_status`='DELETED' WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $copy_query .= "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $delete_query .= "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";

           /*  $trash_query = "UPDATE `event_alarms` SET `process_status`='DELETED' WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $trash_result = mysqli_query($db_connection, $assigned_query);

            $copy_ready_query = "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $copy_ready_result = mysqli_query($db_connection, $copy_ready_query);

            $delete_query = "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $delete_result = mysqli_query($db_connection, $delete_query); */
        }

    }

    if (!empty($_POST['unassigned']))
    {
        $unassigned = $_POST['unassigned'];
        foreach($unassigned as $item)
        {
            $copy_query .= "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $delete_query .= "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";


/*             $copy_ready_query = "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $copy_ready_result = mysqli_query($db_connection, $copy_ready_query);
    
            $delete_query = "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $delete_result = mysqli_query($db_connection, $delete_query); */
        }
    }

   
    if (!empty($_POST['assigned']))
    {
        $assigned = $_POST['assigned'];
        foreach($assigned as $item)
        {


            $update_query .= "UPDATE `event_alarms` SET `related_data`='" . $item['container_id'] . "', `confidence`='12', `owner` = '" . $_POST['owner'] . "' WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $copy_query .= "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $copy_query .= "INSERT INTO matched_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";
            $delete_query .= "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'; ";


/* 
            $assigned_query = "UPDATE `event_alarms` SET `related_data`='" . $item['container_id'] . "', `confidence`='12' WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $assigned_result = mysqli_query($db_connection, $assigned_query);

            $copy_ready_query = "INSERT INTO ready_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $copy_ready_result = mysqli_query($db_connection, $copy_ready_query);
            
            $copy_query = "INSERT INTO matched_event_alarms SELECT * FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $copy_result = mysqli_query($db_connection, $copy_query);

            $delete_query = "DELETE FROM event_alarms WHERE `alarm_unique_id` = '" . $item['alarm_unique_id'] . "'";
            $delete_result = mysqli_query($db_connection, $delete_query); */
        }
    }


    $full_query = $update_query . $copy_query . $delete_query;

    $full_result = mysqli_multi_query($db_connection, $full_query);
    //$copy_result = mysqli_query($db_connection, $copy_query);
    //$delete_result = mysqli_query($db_connection, $delete_query);


    $queries = array();

    array_push($queries, $full_query);
    array_push($queries, $update_query);
    array_push($queries, $copy_query);
    array_push($queries, $delete_query);

    $result_array = array();
    array_push($result_array, "Success");

/*     $query = "SELECT * FROM `ready_event_alarms` WHERE `event_datetime` LIKE '%" . $search_date . "%'";

    $result = mysqli_query($db_connection, $query);


    $result_array = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    }; */

    if (!$full_result) {
        echo $db_connection->error;
        CloseCon($db_connection);
        die();
    } else {
        echo json_encode($result_array);
        CloseCon($db_connection);
        die();
    };

?>