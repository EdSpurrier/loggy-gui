<?php 

    include("db_connect.php");


    
    $db_connection = OpenCon();


    //  CHECK IF CONTAINER EXISTS UNDER THAT ORDER ID
    $query = "SELECT * FROM events WHERE `event_reference_id` IS NULL AND `event_status` = 'unassigned' AND `parent_alarm_unique_id` != 'this'";
    $result = mysqli_query($db_connection, $query);

    $result_array = array();

    $row_number = 0;

    //echo "Number Of Rows = " . $result->num_rows . "<br>";

    $return_results = array();

    /* If there are results from database push to result array */
    if ($result->num_rows > 0) {

        //echo "Row Number = " . $row_number . "<br>";

        while($row = $result->fetch_assoc()) {
            array_push($result_array, $row);

            $event_unique_id = $row["event_unique_id"];
            $parent_alarm_unique_id = $row["parent_alarm_unique_id"];

            $this_query = "SELECT `event_reference_id` FROM `events` WHERE `alarm_unique_id` = '" . $parent_alarm_unique_id . "'";
        
            //echo $this_query . "<br>";

            //$query = "SELECT * FROM `containers` WHERE 1";
            $this_result = mysqli_query($db_connection, $this_query);

            

            $result_event_reference_id_array = array();

            if ($this_result->num_rows > 0) {     
                while($this_row = $this_result->fetch_assoc()) {
                    array_push($result_event_reference_id_array, $this_row);
                };
            } else {
                echo json_encode('No Event Reference Id Was Found!');
                CloseCon($db_connection);
                die();
            };

            $event_reference_id = $result_event_reference_id_array[0]['event_reference_id'];

            
            if ($event_reference_id == null) {
                //echo "Event Reference Id = NULL<br>";

                $return_row = 'Event Reference Not Found Yet For  [' . $event_unique_id . ']';

                array_push($return_results, $return_row);

            } else {
                //echo "Found: " . $event_reference_id . "<br>";

                $this_query = "UPDATE `events` SET `event_reference_id` = '" . $event_reference_id . "', `event_status` = 'assigned' WHERE `event_unique_id` = '" . $event_unique_id . "'";
            
                //$query = "SELECT * FROM `containers` WHERE 1";
                $this_result = mysqli_query($db_connection, $this_query);

                if (!$this_result) {
                    echo json_encode('Invalid query: ' . $db_connection->error);
                    CloseCon($db_connection);
                    die();
                };
            

                $return_row = 'Updated Event  [' . $event_unique_id . ']> event_reference_id=' . $event_reference_id;


                array_push($return_results, $return_row);

            };
        };

        $row_number++;
    };

    if (!$result) {
        echo json_encode('Invalid query: ' . $db_connection->error);
    } else {
        echo json_encode($return_results);
    };




    CloseCon($db_connection);

?>