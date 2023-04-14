<?php 
    include("db_connect.php");

    if (!isset($_POST['comms_datetime'])) {
        echo json_encode( var_dump($_POST) );
        die();
    };

    $comms_datetime = $_POST['comms_datetime'];

    $db_connection = OpenCon_LoggyVision();




    if (isset($_POST['comms_unique_id']) && isset($_POST['command']) && isset($_POST['comms_datetime_fulllength'])) {
        $comms_unique_id = $_POST['comms_unique_id'];
        $command = $_POST['command'];
        $comms_datetime_fulllength = $_POST['comms_datetime_fulllength'];

        $query_command = null;

        if ($command == "retry") {
            //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
            $query_command = "UPDATE `comms` SET `status`='Created', `comms_datetime`='" . $comms_datetime_fulllength . "' WHERE `comms_unique_id` = '" . $comms_unique_id . "';";
        } else if ($command == "delete") {
            //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
            $query_command = "DELETE FROM `comms` WHERE `comms_unique_id` = '" . $comms_unique_id . "';";
        };
        

        $result_command = mysqli_query($db_connection, $query_command);

        if (!$result_command) {
            trigger_error('Invalid query: ' . $db_connection->error);
        };

    };



    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM `comms` WHERE `comms_datetime` LIKE '%" . $comms_datetime . "%' ORDER BY `comms_datetime` DESC;";



    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    $result_array = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        }
    }
    /* send a JSON encded array to client */
    echo json_encode($result_array);

    CloseCon($db_connection);

?>