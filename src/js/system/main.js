/******
 * siteCore
 * [Web Template System]
 * Version: 1.0.0.0.A
 *
 * Author: Ed Spurrier
 ******/

/**
 * WINDOW READY INIT
 */


var system = {
	loaded : false,
	baseURL : location.protocol + "//" + location.host,
};




/**
 * System Init
 */
function Init() {
	


	var everythingLoaded = setInterval(function() {
		if (/loaded|complete/.test(document.readyState)) {

			clearInterval(everythingLoaded);
			system.core = new Core();
			Bug('System Initiated');
			system.page = $('#content').attr('data-page-template');

			var systemLoaded = setInterval(function() {
				if ( system.core.Loaded() ) {

					clearInterval(systemLoaded);

					if (!userManager.IsLoggedIn()) {
						system.loaded = true;
					
						Bug('Page Initiated - System Loaded (Logged Out)');
						return;
					};


					system.popup = new Popup();
					system.notify = new Notification();

					system.comms = new Comms();

					system.router = new Router();

					system.navigation = new Navigation();
					
					system.fileCabinet = new FileCabinet();

					system.db = new Database();

					system.creator = new Creator();

					system.grabs = new Grabs();


					if (system.page == 'home') {
						system.slides = {
							orderSlide : new FileSlide( fileSlides.orderSlide ),
							containerSlide : new FileSlide( fileSlides.containerSlide ),
							grabSlide : new FileSlide( fileSlides.grabSlide ),	
							logSlide : new FileSlide( fileSlides.logSlide ),
							core: new Slides()
						};
					} else if (system.page == 'inventory') {
						system.slides = {
							inventorySlide : new FileSlide( fileSlides.inventorySlide ),
							inboundSlide : new FileSlide( fileSlides.inboundSlide ),
							core: new Slides()
						};
					};
					

					

					system.search = new Search();

					system.events = new Events();

					system.containerDetector = new ContainerDetector();

					system.systems = new Systems();

					system.cycleProcessor = new CycleProcessor();

					system.importer = new Importer();

					system.loaded = true;
					
					Bug('Page Initiated - System Loaded (Logged In)');
				};
			}, 10);

		};
	}, 10);
};

$(window).on("load", function() {
	Init();
});
