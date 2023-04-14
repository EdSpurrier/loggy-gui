<?php

    $search_date = $_POST['search_date'];

    include("db_connect.php");

    $db_connection = OpenCon_LoggyVision();


    //$query = "SELECT related_data, event_datetime, confidence FROM `event_alarms` GROUP BY related_data";

    $query = "SELECT * FROM `event_alarms` WHERE `event_datetime` LIKE '%" . $search_date . "%'";

    $result = mysqli_query($db_connection, $query);


    $result_array = array();

    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    };

    if (!$result) {
        echo $db_connection->error;
        CloseCon($db_connection);
        die();
    } else {
        echo json_encode($result_array);
        CloseCon($db_connection);
        die();
    };

?>