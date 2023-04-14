//
//	NAVIGATION
//

function Navigation() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('Navigation Initiated.');

        CacheEl();


        $el.sideMenu.button.click(ToggleSideMenu);
        $el.userMenu.button.click(ToggleUserMenu);
        
        
        SetupFullScreen();

        loaded = true;
    }



    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');


        $el.sideMenu = {};
        $el.sideMenu.menu = $('#side-menu-nav');
        $el.sideMenu.button = $('#side-menu-button, #watchgod-button');

        $el.userMenu = {};
        $el.userMenu.menu = $('#user-menu-nav');
        $el.userMenu.button = $('#user-menu-button');

        $el.fullscreen = {};
        $el.fullscreen.buttons = $('.fullscreen-button');
        $el.fullscreen.openButton = $('#fullscreen-open-button');
        $el.fullscreen.closeButton = $('#fullscreen-close-button');
    };



    //  FULL SCREEN
    var SetupFullScreen = function() {
        if (fullScreenApi.supportsFullScreen) {
            $el.fullscreen.closeButton.addClass('hide');
            $el.fullscreen.openButton.click(OpenFullScreen);
            $el.fullscreen.closeButton.click(CloseFullScreen);
        } else {
            $el.fullscreen.buttons.addClass('hide');
        };
    }
  
    var OpenFullScreen = function() {
        fullScreenApi.requestFullScreen(document.documentElement);
        $el.fullscreen.closeButton.removeClass('hide');
        $el.fullscreen.openButton.safeAddClass('hide');
    }

    var CloseFullScreen = function() {
        fullScreenApi.cancelFullScreen();
        $el.fullscreen.closeButton.safeAddClass('hide');
        $el.fullscreen.openButton.removeClass('hide');
    }





    var ToggleSideMenu = function() {
        if ( !$el.sideMenu.button.hasClass('active') ) {
            $el.sideMenu.button.addClass('active');

            $el.userMenu.button.removeClass('active');
            $el.userMenu.menu.removeClass('active');

            if ( !$el.sideMenu.menu.hasClass('active') ) {
                $el.sideMenu.menu.addClass('active');
            };

        } else {
            $el.sideMenu.button.removeClass('active');
            $el.sideMenu.menu.removeClass('active');
        };
    };  


    var ToggleUserMenu = function() {
        if ( !$el.userMenu.button.hasClass('active') ) {
            $el.userMenu.button.addClass('active');

            $el.sideMenu.button.removeClass('active');
            $el.sideMenu.menu.removeClass('active');

            if ( !$el.userMenu.menu.hasClass('active') ) {
                $el.userMenu.menu.addClass('active');
            };

        } else {
            $el.userMenu.button.removeClass('active');
            $el.userMenu.menu.removeClass('active');
        };
    };  


    var CloseAllPanels = function(panel_to_open) {
        if (panel_to_open == 'events') {
            system.comms.TogglePanel(null);
            system.containerDetector.TogglePanel(null);
        } else if (panel_to_open == 'comms') {
            system.events.TogglePanel(null);
            system.containerDetector.TogglePanel(null);
        } else if (panel_to_open == 'containerDetector') {
            system.comms.TogglePanel(null);
            system.events.TogglePanel(null);
        };
    }

    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {


        Loaded: function() {
            return loaded;
        },

        CloseAllPanels: function(panel_to_open) {
            CloseAllPanels(panel_to_open);
        }


    }
}



