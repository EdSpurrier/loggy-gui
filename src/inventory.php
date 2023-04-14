<?php
// Initialize the session
session_start();
 
// Check if the user is logged in, if not then redirect him to login page
if(!isset($_SESSION["loggedin"]) || $_SESSION["loggedin"] !== true){
    header("location: login.php");
    exit;
}
?>

<?php
    $page_template = 'inventory';

    include("templates/doc_header.php");
    include("templates/header.php");
    include("templates/side_menu_system.php");
    include("templates/side_menu_user.php");
?>

<div id="content" data-file-selected="0" data-page-template="<?php echo $page_template; ?>">

    <?php
        include("templates/file_slide_inventory.php");
        include("templates/file_slide_inbound.php");

            
    ?>
</div>

<?php
    include("templates/overlays.php");
    include("templates/container_detector_panel.php");
    include("templates/event_panel.php");
    include("templates/search_panel.php");
    include("templates/importer_panel.php");
/*     include("templates/footer.php"); */
    include("templates/doc_footer.php");
?>