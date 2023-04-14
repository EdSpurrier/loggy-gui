<?php 

    include("db_connect.php");

    $db_connection = OpenCon();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM systems WHERE 1";

/*     $query = "SELECT p.*, c.* " .
    "FROM video_files AS p " .
    "LEFT JOIN container_chain_events AS c ON p.event_unique_id = c.event_unique_id " .
    "WHERE p.event_unique_id = '" . $event_unique_id . "' " .
    "GROUP BY p.video_unique_id"; */


    $result = mysqli_query($db_connection, $query);

    $result_array = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    };

    if (!$result) {
        json_encode('Invalid query: ' . $db_connection->error);
    };

    CloseCon($db_connection);





    $db_connection_core = OpenCon_LoggyVision();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM systems WHERE 1 ORDER BY `external_ip`, `watchgod_id`,  `process_id_number` ASC;";


    $result_core = mysqli_query($db_connection_core, $query);

    $result_array_core = array();

    /* If there are results from database push to result array */
    if ($result_core->num_rows > 0) {
        while($row = $result_core->fetch_assoc()) {
            array_push($result_array_core, $row);
        };
    };

    if (!$result_core) {
        json_encode('Invalid query: ' . $db_connection_core->error);
    };


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM system_settings WHERE 1;";


    $result_system_settings = mysqli_query($db_connection_core, $query);

    $result_system_settings_array = array();

    /* If there are results from database push to result array */
    if ($result_system_settings->num_rows > 0) {
        while($row = $result_system_settings->fetch_assoc()) {
            array_push($result_system_settings_array, $row);
        };
    };

    if (!$result_system_settings) {
        json_encode('Invalid query: ' . $db_connection_core->error);
    };



    CloseCon($db_connection_core);


    $result_array_dual = array();
    array_push($result_array_dual, $result_array_core);
    array_push($result_array_dual, $result_array);
    array_push($result_array_dual, $result_system_settings_array);

    

    /* send a JSON encded array to client */
    echo json_encode($result_array_dual);

    
?>