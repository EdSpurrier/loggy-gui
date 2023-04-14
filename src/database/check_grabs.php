<?php 

    include("db_connect.php");

    $db_connection = OpenCon();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM grabs WHERE `container_unique_id` IS NULL";
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