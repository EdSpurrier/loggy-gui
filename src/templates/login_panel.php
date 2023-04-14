
<div id='system-popup' class='popup-blackout login-panel'>
    <div id='popup-window' class='window'>
        <div class='window-header'>
            Welcome To BTA Vision
        </div>
        <div id="login-panel" class=''>
            <form class="data-input" action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">

                <div class="data-input-line input-line mandatory form-group <?php echo (!empty($username_err)) ? 'has-error' : ''; ?>">
                    <input type="text" name="username" placeholder="Username" value="<?php echo $username  ?>">
                    <div class="help-block">
                        <?php echo $username_err; ?>
                    </div>
                </div>

                <div class="data-input-line input-line mandatory form-group <?php echo (!empty($password_err)) ? 'has-error' : ''; ?>">
                    <input type="password" name="password" placeholder="Password" value="<?php echo $password  ?>" >
                    <div class="help-block">
                        <?php echo $password_err; ?>
                    </div>
                </div>
                
                <div class="form-group">
                    <input type="submit" class="login-button btn btn-primary" value="Log In">
                </div>
                <?php
                    //$register_html = '<p>Register an account? <a href="register.php">Sign up now</a>.</p>';
                ?>
            </form>
        </div>
    </div>
</div>
