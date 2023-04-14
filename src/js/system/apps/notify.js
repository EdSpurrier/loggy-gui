//
//	NOTIFY
//

function Notification() {
	//  CREATE ELEMENTS ARRAY
	var $el = {};

    var loaded = false;

    var lifetime = 1000;

    


	var Init = function() {
        Bug('Notify Initiated.');

        CacheEl();


        CreateNotify();
        

        Notify('Connected To Server', 'success');

/*         setTimeout(function() {
            Notify('There has been an error', 'alert');

            setTimeout(function() {
                Notify('Hello there how are you?', 'success');

                setTimeout(function() {
                    Notify('Here is some information', 'note');
        
                    setTimeout(function() {
                        Notify('Pay attention this is important', 'important');
        
                    }, lifetime);
                }, lifetime);
            }, lifetime);
        }, lifetime); */

        

        
        


        //Nofity('Hello there!');
        
        loaded = true;

    }


    //  CACHE ELEMENTS
    var CacheEl = function() {
        $el.body = $('body');
    };

    var CreateNotify = function() {
        $el.body.append(
            "<div id='system-notify'>" +
            "</div>"
        );

        $el.nofity = $('#system-notify');
    }

    var Notify = function ($output, notification_type) {
        
        if (notification_type == null) {
            notification_type = 'note';
        };

        var $this_el = $("<div class='notification " + notification_type + "'></div>").html(
                "<div class='notify-output'>" +
                    "<i class='icon-info-1'></i>" +
                    "<i class='icon-attention'></i>" +
                    "<i class='icon-quote'></i>" +
                    "<span>" + $output + "<span>" +
                "</div>"
            );

        $el.nofity.prepend($this_el);

        var tl = new TimelineMax();

        tl.to( $this_el, 0.5, {opacity: 1, right: 0, onComplete: function() {
            setTimeout(function() {
                RemoveNotification( $this_el );
            }, lifetime);
        }});
    }
 

    var RemoveNotification = function( $this_el ) {
        var tl = new TimelineMax();
        tl.to( $this_el, 0.5, {opacity: 0});
        tl.to( $this_el, 0.5, {height: 0, marginTop: 0, padding: 0, onComplete: function() {
            $this_el.remove();
        }});
    }






    //  INITIALIZE
    Init();

    //  EXTERNAL FUNCTIONS
    return {

        Notify : function ($output, notification_type) {
            Notify($output, notification_type);
        },

        Loaded: function() {
            return loaded;
        },


    }
}



