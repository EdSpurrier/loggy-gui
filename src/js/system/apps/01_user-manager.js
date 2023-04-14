//
//	MODULE: USER MANAGER
//

var userManager = new UserManager();


function UserManager() {


	//  CREATE ELEMENTS ARRAY
    var $el = {};
    
    var logged_in = false;
    var user_type = "None";


	var Init = function() {
        Bug('UserManager Module Initiated.');


        CacheEl();

        SetupUser();

    }

    var CacheEl = function() {
        $el.body = $('body');
    }

    var SetupUser = function() {
        user_type = $el.body.attr('data-user-type');
        if (user_type == 'logged_out') {
            logged_in = false;
        } else {
            logged_in = true;
        };


    }


    Init();


    //  EXTERNAL FUNCTIONS
    return {

        IsLoggedIn: function() {
            return logged_in;
        },

        GetUserType: function() {
            return user_type;
        }
    }
}


