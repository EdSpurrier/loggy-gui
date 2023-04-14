<?php 


    if (
        !isset($_POST['order_number']) || 
        !isset($_POST['customer_name'])
        ) {
            echo var_dump($_POST);
        die();
    };



    $order_number = $_POST['order_number'];
    $customer_name = $_POST['customer_name'];

    include("db_connect.php");

    $db_connection = OpenCon();




    $query = "INSERT INTO `orders`(`order_number`, `customer_name`) VALUES ('" . $order_number . "', '" . $customer_name . "')";



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


    $query = "SELECT * FROM orders WHERE `order_number` = '" . $order_number . "'";

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