//
//	MODULE: DEBUG CONSOLE
//

var debug = {};
	debug.active = true;
	debug.version = '2000A';

if(debug.active) {
	debug.core = new debugConsole();

	function Bug ($data) {
		debug.core.debugConsole($data);
	};

	Bug('Bug() attached');

	function Val ($valueName, $data) {
		debug.core.debugValue($valueName, $data);
	};

	Bug('Val() attached');

	function CreateVal ($valueName) {
		debug.core.createValue($valueName);
	};

	Bug('CreateVal() attached');
	

	function BugPopup () {
		debug.core.OpenConsole();
	};

	Bug('BugPopup() attached');

};

function debugConsole() {

	//  CREATE ELEMENTS ARRAY
	var $el = {};
	var consoleLine = 0;


	var init = function() {

		buildConsole();

		cacheEl();

		//	CREATE DEBUG VALUES
		createValue('key-down');
		createValue('view-status');
		createValue('mouse-hover');
		createValue('key-status');

		styleConsole();

		debugConsole("init");


		$el.debugButton.click(ButtonToggle);
	};

	var ButtonToggle = function() {
		toggleConsole(null);
	}

	var InputAction = function ($keyDown) {

        if($keyDown == 'toggle-console') {
            toggleConsole();
        };

        if($keyDown == 'clear-console') {
            clearConsole();
        };

	}



	var buildConsole = function () {
		$('body').append(
			"<div id='debug-console' class='user-select'>" +
				"Press Ctrl + M to toggle in window debug console <br/>" +
				"Version: " + debug.version +
				"<div id='debug-feed'>" +
				"</div>" +
				"<div id='debug-static-values'>" +
				"</div>" +
				"<div id='fps-counter'>" +
					"<div class='current-frame'>" +
					"</div>" +
				"</div>" +
			"</div>"
		);

		
	};

	var createValue = function ($valueName) {
		$el.debugStaticValues.append(
			"<div id='" + $valueName + "'>" +
				$valueName + ": <span class='value'></span>" +
			"</div>"
		);
	};

	var styleConsole = function () {

		$el.debugConsole.css({
			color: 'white',
			background: 'black',
			borderTop: '1px solid gray',
			position: 'absolute',
			zIndex: '90',
			fontSize: 11,
			padding: 10,
			height: "50vh",
			width: "100vw",
			opacity: 0.65,
			bottom: "-60vh",
			left: 0,
			position: 'fixed',
			transition: '0.5s'
		});

		$el.debugFeed.css({
			background: 'black',
			overflowY: 'scroll',
			width: "80vw",
			paddingTop: 10,
			paddingBottom: 10,
			marginTop: 10
		});

		$el.debugStaticValues.css({
			position: 'absolute',
			top: 0,
			right: 0,
			width: 200,
			paddingTop: 10,
			paddingBottom: 10,
			marginTop: 10
		});


		$el.debugConsole.css('font-family', '"Helvetica Neue", helvetica, arial, verdana, sans-serif');
	};

	var toggleConsole = function (force_open) {

		if ( !$el.debugConsole.hasClass('active') ) {
			$el.debugConsole.addClass('active')
			$el.debugButton.addClass('active');
		} else {
			if (!force_open) {
				$el.debugConsole.removeClass('active');
				$el.debugButton.removeClass('active');
			};
		};

		if( $el.debugConsole.hasClass('active') ) {
			$el.debugConsole.css({
				bottom: 0
			});
		} else {
			$el.debugConsole.css({
				bottom: "-60vh"
			});

		};
	};

	var clearConsole = function () {
		if (debug.active) {
			$el.debugFeed.empty();
			consoleLine = 0;
		};
	}

	var debugConsole = function ($data) {
		if (debug.active) {
			$el.debugFeed.prepend(consoleLine + " > " + $data + "<br />");
			consoleLine++;
		};
		
	};

	var debugValue = function ($valueName, $data) {
		if (debug.active) {
			$el.debugStaticValues.find('#' + $valueName + " span.value").empty().append($data);
		};
	};

	//  CACHE ELEMENTS
	var cacheEl = function() {
		$el.debugConsole = $('#debug-console');
		$el.debugFeed = $('#debug-feed');
		$el.debugStaticValues = $('#debug-static-values');
		$el.debugExtraElements = $('#motion-control-helper, #motion-track-overlay');
		$el.trackingPointer = $('#tracking-pointer');
		$el.debugButton = $('#debug-button');
	};



	//  INITIALIZE
	init();

	//  EXTERNAL FUNCTIONS
	return {

		debugConsole: function($data) {
			debugConsole($data);
		},

		debugValue: function($valueName, $data) {
			debugValue($valueName, $data);
		},

		createValue: function($valueName) {
			createValue($valueName);
		},

        InputAction: function($keyDown) {
        	InputAction($keyDown);
		},

		OpenConsole: function() {
			toggleConsole(true);
		},
		
	};
};