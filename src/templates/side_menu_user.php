<nav id="user-menu-nav">

    <div id="menu-stack">
        <div class="menu-item">
            <?php echo $_SESSION["actual_name"]; ?>
        </div>
        <div class="menu-item">
            <?php 
                if ($_SESSION["user_type"] == "super_admin") {
                    echo "Super Admin";
                } else if ($_SESSION["user_type"] == "admin") {
                    echo "Administrator";
                } else if ($_SESSION["user_type"] == "passive") {
                    echo "Passive User";
                };
            ?>
        </div>
        <a href="logout.php">
            <div class="menu-item">
                Sign Out
            </div>
        </a>
    </div>
</nav>