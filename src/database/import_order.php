<?php 


    if (
        !isset($_POST['order_number']) || 
        !isset($_POST['customer_name']) || 
        !isset($_POST['containers'])
        ) {
            echo var_dump($_POST);
        die();
    };


    $order_unique_id = $_POST['order_unique_id'];
    $order_number = $_POST['order_number'];
    $customer_name = $_POST['customer_name'];
    $containers = $_POST['containers'];

    include("db_connect.php");
    
    if ( $order_unique_id == -1 ) {
            
        $db_connection = OpenCon();

        $query = "INSERT INTO `orders`(`order_number`, `customer_name`) VALUES ('" . $order_number . "', '" . $customer_name . "')";

        
        $result = mysqli_query($db_connection, $query);

        $query = "SELECT * FROM orders WHERE `order_number` = '" . $order_number . "'";

        $result = mysqli_query($db_connection, $query);


        if (!$result) {
            trigger_error('Invalid query: ' . $db_connection->error);
        };

        $result_array = array();

        $order_unique_id = -1;

        /* If there are results from database push to result array */
        if ($result->num_rows > 0) {
            while($row = $result->fetch_assoc()) {
                array_push($result_array, $row);
                $order_unique_id = $row['order_unique_id'];
            };
        };

        
        /* send a JSON encded array to client */
        //echo json_encode($result_array);

        CloseCon($db_connection);

    };







    ////////////////////////////
    //  CREATE CONTAINERS
    ////////////////////////////

    $output = "Order [" . $order_number . "] Containers:<br /><br />";

    
    $db_connection = OpenCon();

    $container_status = array();

    foreach ($containers as &$container_id) {

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
            $output = $output . $container_id . " [Already Exists In Order]<br />";
        } else {
            $query = "INSERT INTO `containers`(`order_unique_id`, `container_id`) VALUES ('" . $order_unique_id . "', '" . $container_id . "')";



            $result = mysqli_query($db_connection, $query);
    
            if (!$result) {
                if (mysqli_errno( $db_connection ) == 1062){
                    echo json_encode('Error In DB!!');
                } else {
                    trigger_error('Invalid query: ' . $db_connection->error);
                };
                CloseCon($db_connection);
                die();
            };
            
    
            $output = $output . $container_id . " [Added]<br />";
        };



        
    };

    echo json_encode($output);

    CloseCon($db_connection);


?>