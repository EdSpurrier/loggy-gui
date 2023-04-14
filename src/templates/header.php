<nav id="header-nav">
    <div class="left-menu">

        <?php if ($_SESSION["user_type"] == 'super_admin'): ?>
            <!-- <div id="side-menu-button">
                <div id="hamburger">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div> -->
        <?php endif; ?>

            <div id="user-menu-button">
                <div id="user-avatar">
                    <img id="avatar-image" src="images/logo/user-avatar-default.jpg" alt="user-avatar">
                </div>
            </div>

            <div id="user-avatar-name">
                Hi, <?php echo $_SESSION["username"]; ?>
            </div>
    </div>  

    <div class="center-menu">
        <!-- CENTER -->
        <div id="company-logo">
            <img src="images/logo/company-logo.png" alt="">
        </div>
        
    </div>
    
    <div class="right-menu">

        <?php if ($_SESSION["user_type"] == 'super_admin'): ?>
            <button id="watchgod-button">
                <i class="icon-eye-1"></i>                     
            </button>
            <button id="debug-button">
                <i class="icon-bug"></i>                     
            </button>
            <button id="comms-button">
                <i class="icon-terminal"></i>                     
            </button>
            <button id="container-detector-button">
                <i class="icon-chart-line"></i>                     
            </button>
            <button id="events-button">
                <i class="icon-calendar"></i>
                <div class="button-count events-count">0</div>                        
            </button>
        <?php endif; ?>
        
        <?php if ($_SESSION["user_type"] == 'super_admin' || $_SESSION["user_type"] == 'admin'): ?>   
            <button id="import-button">
                <i class="icon-upload"></i>                          
            </button>
        <?php endif; ?>

        <input id="search-input" type="text" name="search" placeholder="Search....">
        <button id="search-button">
            <i class="icon-search"></i>                          
        </button> 
        <button id="fullscreen-open-button" class="fullscreen-button">
            <i class="icon-resize-full-1"></i>                          
        </button> 
        <button id="fullscreen-close-button" class="fullscreen-button">
            <i class="icon-resize-small"></i>                          
        </button> 
    </div>

</nav>