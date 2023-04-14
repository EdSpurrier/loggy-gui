<?php 


    if (
        !isset($_POST['container_unique_id'])
        ) {
            echo json_encode( var_dump($_POST) );
        die();
    };

    $container_unique_id = $_POST['container_unique_id'];

    

    include("db_connect.php");

    $db_connection = OpenCon();


    //  GET EVENT_UNIQUE_ID FROM THE CONTAINER_U_ID

    $query = "SELECT * FROM container_chain_events WHERE `container_unique_id` = '" . $container_unique_id . "'";
    $result = mysqli_query($db_connection, $query);

    $result_array = array();

    $event_unique_id = -1;

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
            $event_unique_id = $row['event_unique_id'];
        };
    };


    $query = "SELECT p.*, c.* " .
    "FROM video_files AS p " .
    "LEFT JOIN container_chain_events AS c ON p.event_unique_id = c.event_unique_id " .
    "WHERE p.event_unique_id = '" . $event_unique_id . "' " .
    "GROUP BY p.video_unique_id";


    $result = mysqli_query($db_connection, $query);

    $result_array = array();


    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    };

    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    /* send a JSON encded array to client */
    echo json_encode($result_array);

    CloseCon($db_connection);

?>