//
//	MODULE: INPUT
//
var input = new Input();
    
    input.mouse = {};

    input.mouse.settings = {};

    
    input.mouse.settings.currentTime = 0;
    input.mouse.settings.nextTriggerTime = 0;
    input.mouse.settings.debounceTime = 25;

    input.mouse.swipe = {};

    input.mouse.swipe.status = "inactive";

    input.mouse.swipe.startPosition = {
        x : 0,
        y : 0,
    };

    input.mouse.swipe.endPosition = {
        x : 0,
        y : 0,
    };

    input.mouse.swipe.difference = {
        x : 0,
        y : 0,
    };

    input.drag = {};
    
    input.drag.activeElement = null;
    input.drag.direction = "none";
    
    


    input.mouseDown = false;

function Input() {


	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var debugActive = true;

	var Init = function() {
        Bug('Input Module Initiated.');


		CacheEl();

        CreateVal('mouse-down');

        CreateVal('mouse-x');
        CreateVal('mouse-y');

        
        

        $el.body.on("mousemove", MousePositionUpdate);

        $el.draggable.on("mousedown", Drag);
        $el.body.on("mousedown", MouseDown);
        $el.body.on("mouseup", MouseUp);
        $el.body.on("mouseleave", MouseLeave);


        $el.body.on("touchmove", MousePositionUpdate);
        $el.draggable.on("touchstart", Drag);
        $el.body.on("touchstart", MouseDown);
        $el.body.on("touchend", MouseUp);
        $el.body.on("touchcancel", MouseLeave);

        SetupKeyboardControls();

    };
    


    var DebounceSlide = function() {
        if (input.mouse == undefined) {
            return;
        };
        input.mouse.settings.currentTime = system.core.GetCurrentTime();
        //console.log( input.mouse.settings.currentTime );
        if ( input.mouse.settings.currentTime > input.mouse.settings.nextTriggerTime ) {
            input.mouse.settings.nextTriggerTime = input.mouse.settings.currentTime + input.mouse.settings.debounceTime;
            return true;
        } else {
            return false;
        };
    }

    var SetupKeyboardControls = function() {

        document.onkeypress=function(e){
            GetKeyDown(e);

            if( debugActive && e.which == 92) {
                //debug.core.InputAction('toggle-console');
            };

            if( debugActive && e.which == 93) {
                debug.core.InputAction('clear-console');
            };

          };


        $(document).keydown(function(e){
            GetKeyDown(e);

            var code = e.keyCode || e.which;


            if(e.ctrlKey && (e.which == 77)) {
                e.preventDefault();
                debug.core.InputAction('toggle-console');
            };

            if (!userManager.IsLoggedIn()) {
                return;
            };

            

            if ( system.popup.IsActive() ) {
                e.preventDefault();
                if(e.which == 13 || e.which == 27) {
                    system.popup.ClosePopup();
                };
                return;
            };

            if(e.ctrlKey && (e.which == 79)) {
                e.preventDefault();
                system.creator.OpenCreateOrder();
            };



            if(e.which == 13) {
                //console.log("Enter");
                if ( system.search.IsActive() ) {
                    system.search.SelectItem();
                    return;
                } else {
                    system.slides.core.NextSlide();
                };
            };


            
            if (e.which == 27) {
                //console.log("Escape");
                e.preventDefault();
                if ( system.events.IsActive() ) {
                    system.events.CloseEventPanel();
                    return;
                } else if ( system.search.IsActive() ) {
                    system.search.CloseSearchPanel();
                    return;
                } else {
                    system.slides.core.PrevSlide();
                };
            };


            //  LEFT
            if (e.which == 37) {
                //console.log("Left");
                if ( system.search.IsActive() ) {
                    return;
                } else {
                    system.slides.core.PrevSlide();
                };
                
            };

            //  RIGHT
            if (e.which == 39) {
                //console.log("Right");
                if ( system.search.IsActive() ) {
                    return;
                } else {
                    system.slides.core.NextSlide();
                };
            };

            //  UP
            if (e.which == 38) {
                //console.log("Up");
                if ( system.search.IsActive() ) {
                    system.search.PrevItem();
                    return;
                } else if ( system.creator.IsActive() ) {

                } else {
                    system.slides.core.PrevItem();
                };
            };

            //  DOWN
            if (e.which == 40) {
                //console.log("Down");
                if ( system.search.IsActive() ) {
                    system.search.NextItem();
                    return;
                } else if ( system.creator.IsActive() ) {

                } else {
                    system.slides.core.NextItem();
                };
            };
        });

    }

    

    var GetKeyDown = function (e) {
        Val('key-down', e.which);
    }


	 //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
        $el.draggable = $('.draggable');
    };




    var MouseDown = function() {
        input.mouseDown = true;
        Val('mouse-down', 'true');
        SwipeDetection("start");
    };

    var MouseUp = function() {
        input.mouseDown = false;
        Val('mouse-down', 'false');
        SwipeDetection("end");
    };


    var MousePositionUpdate = function() {

        

        if (event.pageX != null) {
            input.mouse.x = event.pageX;
            input.mouse.y = event.pageY;    
        } else if (event.touches[0] != null) {
            input.mouse.x = event.touches[0].pageX;
            input.mouse.y = event.touches[0].pageY;
        };
        
        

        
        if ( !DebounceSlide() ) {
            return;
        };


        Val('mouse-x', input.mouse.x);
        Val('mouse-y', input.mouse.y);

        if (input.mouse.swipe.status == "active") {
            input.mouse.swipe.difference.x = input.mouse.swipe.startPosition.x - input.mouse.x;
            input.mouse.swipe.difference.y = input.mouse.swipe.startPosition.y - input.mouse.y;
            //console.log("Mouse Swipe Moved", input.mouse.swipe.difference);

            if (input.drag.activeElement != null) {

                if (input.drag.direction == 'x' || input.drag.direction == 'both') {
                    var newPos = input.drag.activeElement.data('start-position-x') - input.mouse.swipe.difference.x;

                    if (input.mouse.swipe.difference.x > input.drag.max) {
                        newPos = input.drag.activeElement.data('start-position-x') - input.drag.max - ( (input.mouse.swipe.difference.x - input.drag.max)/10 );
                    } else if (input.mouse.swipe.difference.x < -input.drag.max) {
                        newPos = input.drag.activeElement.data('start-position-x') + input.drag.max - ( (input.mouse.swipe.difference.x + input.drag.max)/10 );
                    };

                    input.drag.activeElement.css({
                        left: newPos,
                    });

                };

                if (input.drag.direction == 'y' || input.drag.direction == 'both') {
                    var newPos = input.drag.activeElement.data('start-position-y') - input.mouse.swipe.difference.y;

                    if (input.mouse.swipe.difference.y > input.drag.max) {
                        newPos = input.drag.activeElement.data('start-position-y') - input.drag.max - ( (input.mouse.swipe.difference.y - input.drag.max)/10 );
                    } else if (input.mouse.swipe.difference.y < -input.drag.max) {
                        newPos = input.drag.activeElement.data('start-position-y') + input.drag.max - ( (input.mouse.swipe.difference.y + input.drag.max)/10 );
                    };

                    input.drag.activeElement.css({
                        top: newPos,
                    });
    
                };

            };
        };

    };

    var MouseLeave = function() {
        if (input.mouse.swipe.status == "active") {
            SwipeDetection("end");
        };
    };

    var SwipeDetection = function($status) {

        

        if ($status == "start") {

            MousePositionUpdate();
            input.mouse.swipe.startPosition.x = input.mouse.x;
            input.mouse.swipe.startPosition.y = input.mouse.y;
            input.mouse.swipe.status = "active";
            //console.log("Mouse Swipe Started", input.mouse.swipe.startPosition);

        } else if ($status == "end") {

            MousePositionUpdate();
            input.mouse.swipe.endPosition = input.mouse;
            input.mouse.swipe.status = "inactive";

            //console.log("Mouse Swipe Difference",  input.mouse.swipe.difference);
            //console.log("Mouse Swipe Finished",  input.mouse.swipe.endPosition);

            if (input.drag.activeElement != null) {

                if (input.mouse.swipe.difference.x > input.drag.min) { 
                    input.drag.activeElement.trigger('slide', [1, input.drag.activeElement]);
                } else if (input.mouse.swipe.difference.x < -input.drag.min){
                    input.drag.activeElement.trigger('slide', [-1, input.drag.activeElement]);
                };


                if (input.mouse.swipe.difference.y > input.drag.min) { 
                    input.drag.activeElement.trigger('slide', [1, input.drag.activeElement]);
                } else if (input.mouse.swipe.difference.y < -input.drag.min){
                    input.drag.activeElement.trigger('slide', [-1, input.drag.activeElement]);
                };

                
                ResetDragActiveElement();
            };
        };
    };

    
    var ResetDragActiveElement = function() {
        input.drag.activeElement.removeClass('no-transition');
        input.drag.activeElement.attr('style', '');
        input.drag.activeElement = null;
        input.drag.direction = "none";
    }

    var Drag = function() {
        //console.log("Dragging Element", input.drag.activeElement);
        input.drag.activeElement = $(this);
        
        if ( !input.drag.activeElement.hasClass('no-transition') ) {
            input.drag.activeElement.addClass('no-transition');
        };

        input.drag.activeElement.data('start-position-x', parseInt(input.drag.activeElement.css('left'), 10) );
        input.drag.activeElement.data('start-position-y', parseInt(input.drag.activeElement.css('top'), 10) );
        input.drag.direction = input.drag.activeElement.data('drag-direction');
        input.drag.min = input.drag.activeElement.data('slide-min');
        input.drag.max = input.drag.activeElement.data('slide-max');
    };

    var double_click_time = 500;
    var last_click = null;
    var click_element = null;

    var DoubleClick = function($element) {
        var result = false;

        current_time = $.now();


        if (last_click != null) {
            difference = current_time - last_click;

            if ( click_element == $element[0] ) {
                if (difference <= double_click_time) {
                    result = true;
                };
            };

        } else {
            result = false;
        };

        last_click = $.now();
        click_element = $element[0];

        return result;
    };



    var CopyToClipboard = function(string) {
        var $temp = $("<textarea>");
        $("body").append($temp);
        string.replace(/\n/g, "\r\n");
        $temp.val(string).select();
        document.execCommand("copy");
        $temp.remove();

        //console.log("Copied: " + string);
        system.notify.Notify("Copied To Clipboard [" + string + "]", "success");
    }

    //  INITIALIZE
    Init();



    //  EXTERNAL FUNCTIONS
    return {

        DoubleClick: function($element) {
            return DoubleClick($element);
        },

        CopyToClipboard: function(string) {
            CopyToClipboard(string);
        },


    }
}