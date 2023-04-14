<?php 


    if (
        !isset($_POST['container_id']) || 
        !isset($_POST['order_unique_id'])
        ) {
            echo var_dump($_POST);
        die();
    };



    $order_unique_id = $_POST['order_unique_id'];
    $container_id = $_POST['container_id'];

    include("db_connect.php");

    $db_connection = OpenCon();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM containers WHERE `container_id` = '" . $container_id . "' AND `order_unique_id` = '" . $order_unique_id . "'";
    $result = mysqli_query($db_connection, $query);

    $result_array = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    };

    if( !empty($result_array) ){
        echo json_encode('Duplicate Container Id');
        CloseCon($db_connection);
        die();
    }






    //  IF EXISTS THEN UPDATE SO IT IS CONNECTED TO THE UNALLOCATED EVENT DATA
    $query_select = "SELECT * FROM `containers` WHERE `container_id` = '" . $container_id . "' AND `order_unique_id` = '-1' LIMIT 1;";
    $result_select = mysqli_query($db_connection, $query_select);

    $container_unique_id = -1;


    /* If there are results from database push to result array */
    if ($result_select->num_rows > 0) {
        while($row = $result_select->fetch_assoc()) {
            $container_unique_id = $row['container_unique_id'];
        };
    };





    if ($container_unique_id != -1) {
        $query = "UPDATE `containers` SET `order_unique_id`= '" . $order_unique_id . "' WHERE `container_unique_id`= '" . $container_unique_id . "';";
    } else {
        $query = "INSERT INTO `containers`(`order_unique_id`, `container_id`) VALUES ('" . $order_unique_id . "', '" . $container_id . "')";
    };



    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        if (mysqli_errno( $db_connection ) == 1062){
            echo json_encode('Duplicate Order Number');
        } else {
            trigger_error('Invalid query: ' . $db_connection->error);
        };
        CloseCon($db_connection);
        die();
    };


    $query = "SELECT * FROM containers WHERE `container_id` = '" . $container_id . "'";

    $result = mysqli_query($db_connection, $query);


    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    $result_array = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);
        };
    };

    /* send a JSON encded array to client */
    echo json_encode($result_array);

    CloseCon($db_connection);

?>