//
//	POPUP
//

function Popup() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;


	var Init = function() {
        Bug('Popups Initiated.');

        CacheEl();

        CreatePopup();
        
        loaded = true;

    }


    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
    };

    var CreatePopup = function () {
        $el.body.append(
            "<div id='system-popup' class='popup-blackout'>" +
                "<div id='popup-window' class='window'>" +
                    "<div class='window-header'>System Output</div>" +
                    "<div class='content'>" +
                        "<div id='popup-output'>Hello World!</div>" +
                        "<button id='cancel-popup' class='close-button'>Cancel</button>" +
                        "<button id='close-popup' class='close-button'>Close</button>" +
                        "<button id='agree-popup'>Continue</button>" +
                    "</div>" +
                "</div>" +
            "</div>"
        );

        $el.popup = $('#system-popup');
        $el.popupOutput = $('#popup-output');
        $el.popupCloseButton = $('#popup-window .close-button');
        $el.popupAgreeButton = $('#agree-popup');

        $el.popupCloseButton.click(ClosePopup);
    }

    var Popup = function($output) {
        $el.popupOutput.html($output);
        $el.popup.addClass('active');
    }

    var PopupError = function($output) {
        $el.popupOutput.html($output);
        $el.popup.addClass('active');
        $el.popup.addClass('error');
    }

    var PopupQuestion = function($output, callback,  parameter_1,  parameter_2) {
        $el.popupOutput.html($output);
        $el.popup.addClass('active');
        $el.popup.addClass('action');
        $el.popupAgreeButton.unbind('click');
        //alert(parameter_1);
        $el.popupAgreeButton.click({param1: parameter_1, param2: parameter_2}, callback);
    }

    var PopupQuestionImportant = function($output, callback,  parameter_1,  parameter_2) {
        $el.popupOutput.html($output);
        $el.popup.addClass('active');
        $el.popup.addClass('error');
        $el.popup.addClass('action');
        $el.popupAgreeButton.unbind('click');
        //alert(parameter_1);
        $el.popupAgreeButton.click({param1: parameter_1, param2: parameter_2}, callback);
    }

    var ClosePopup = function($output) {
        $el.popup.removeClass('active');
        $el.popup.removeClass('error');
        $el.popup.removeClass('action');
    }


    var IsActive = function() {
        return $el.popup.hasClass('active');
    }

    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {

        PopupError: function($output) {
            PopupError($output);
        },

        PopupQuestion: function($output, callback, parameter_1, parameter_2) {
            PopupQuestion($output, callback, parameter_1, parameter_2);
        },
    
        PopupQuestionImportant: function($output, callback, parameter_1, parameter_2) {
            PopupQuestionImportant($output, callback, parameter_1, parameter_2);
        },

        Popup: function($output) {
            Popup($output);
        },

        Loaded: function() {
            return loaded;
        },

        ClosePopup : function() {
            ClosePopup();
        },

        IsActive : function() {
            return IsActive();
        }

    }
}



