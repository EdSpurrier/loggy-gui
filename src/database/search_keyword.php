<?php 

    $search_keyword = $_POST['search_keyword'];

    include("db_connect.php");

    $db_connection = OpenCon();

    //  QUERY ORDERS
    $query = "SELECT * FROM orders WHERE order_number LIKE '%" . $search_keyword . "%' OR customer_name LIKE '%" . $search_keyword . "%'";

    
    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    $result_array = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $row['type'] = 'orders';
            array_push($result_array, $row);
        }
    };



    //  QUERY CONTAINERS
    $query = "SELECT * FROM containers WHERE container_id LIKE '%" . $search_keyword . "%'";

        
    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $row['type'] = 'containers';
            array_push($result_array, $row);
        }
    };



    //  QUERY LOGS
    $query = "SELECT * FROM logs WHERE log_id LIKE '%" . $search_keyword . "%'";

        
    //$query = "SELECT * FROM `containers` WHERE 1";
    $result = mysqli_query($db_connection, $query);

    if (!$result) {
        trigger_error('Invalid query: ' . $db_connection->error);
    };

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {
        while($row = $result->fetch_assoc()) {
            $row['type'] = 'logs';
            array_push($result_array, $row);
        }
    };


    /* send a JSON encded array to client */
    echo json_encode($result_array);

    CloseCon($db_connection);

?>