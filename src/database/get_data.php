<?php 

    if (
        !isset($_POST['unique_id_name']) || 
        !isset($_POST['table_id']) || 
        !isset( $_POST[ $_POST['unique_id_name'] ])
        ) {

            echo var_dump($_POST);
            
            $output_string = "ERROR = Variables Not Set >><br>";

            $output_string = $output_string . "[unique_id_name]=" . $_POST['origin'] . "<br>";

            if ( isset($_POST['unique_id_name']) ) {
                $output_string = $output_string . "[unique_id_name]=" . $_POST['unique_id_name'] ."<br>";
            } else {
                $output_string = $output_string . "[unique_id_name]=" . "]= ERROR<br>";
            };

            if ( isset($_POST['table_id']) ) {
                $output_string = $output_string . "[table_id]=" . $_POST['table_id'] . "<br>";
            } else {
                $output_string = $output_string . "[table_id]=" . "]= ERROR<br>";
            };

            if ( isset( $_POST[ $_POST['unique_id_name'] ]) ) {
                $output_string = $output_string . "[" . $_POST['unique_id_name'] . "]=" . $_POST[ $_POST['unique_id_name'] ] . "<br>";
            } else {
                $output_string = $output_string . "[" . $_POST['unique_id_name'] . "]= NOT SET<br>";
            };

            echo $output_string;

        die();
    };



    $unique_id_name = $_POST['unique_id_name'];
    $unique_id = $_POST[$unique_id_name];
    $table_id = $_POST['table_id'];

    include("db_connect.php");

    $db_connection = OpenCon();


    $query = NULL;


    if ( $unique_id != "*" ) {
        $query = "SELECT * FROM " . $table_id  . " WHERE `" . $unique_id_name  . "` = '" .$unique_id . "' ORDER BY 2 DESC";
        //$query = "SELECT * FROM " . $table_id  . " WHERE `" . $unique_id_name  . "` = '" .$unique_id . "'  LIMIT 1";
    } else {
        $query = "SELECT * FROM " . $table_id  . " WHERE 1" ;
    };


    //$query = "SELECT * FROM `containers` WHERE 1";
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