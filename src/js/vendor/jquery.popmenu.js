/**
 * jQuery PopMenu
 * 
 * Context menu (popup menu) plugin for web applications.
 * 
 * Copyright © 2014 Fajar Yoseph Chandra. All rights reserved.
 * 
 * @version  1.0.0
 * @author   Fajar Chandra
 * @since    2014.05.29
 */

/******************************************************************************/

/**
 * PopMenu Constructor
 */
PopMenu = function(menu, options) {
	// Default properties
	this.id = "PopMenu_"+Math.round(Math.random()*10000000);
	this.data = PopMenu.defaults;
	
	// Build DOM layout
	this.$ = $(
		'<div id="'+this.id+'" class="PopMenu-Container" style="display: none;">' + 
			'<ul class="PopMenu-Menu">' + 
			'</ul>' +
		'</div>'
	);
	this.$menu = this.$.children('.PopMenu-Menu');
	
	// Populate context menu with items
	this.populateMenu(menu);
	
	// Bind events
	// Hide menu on clicking outside
	this.$.on('click', function() {
		var instance = $(this).data('PopMenu.instance');
		instance.hide();
	});
	// Disable context menu
	this.$.on('contextmenu', function() {
		return false;
	});
	// Disable scrolling
	this.$.on('mousewheel DOMMouseScroll', function(e) {
		e.stopPropagation();
		e.preventDefault();
		return false;
	});
	// Scrolling on overflowing menu
	this.$menu.on('mousewheel DOMMouseScroll', function(e) {
		if(!$(this).hasClass('overflows'))
			return false;
		
		var marginTop = parseInt($(this).css('margin-top'));
		
		// Scroll Up
		//console.log(e.originalEvent);
		if(
			// Firefox
			(e.type = 'DOMMouseScroll' && e.originalEvent.detail < 0) ||
			// Chrome
			(typeof WheelEvent != 'undefined' && e.originalEvent instanceof WheelEvent && e.originalEvent.wheelDeltaY > 0) ||
			// Opera
			(typeof MouseEvent != 'undefined' && e.originalEvent instanceof MouseEvent && e.originalEvent.detail < 0) ||
			// IE
			(typeof Event != 'undefined' && e.originalEvent instanceof Event && e.originalEvent.wheelDelta > 0)
		) {
			marginTop += 72;
			// dont scroll too far
			if(marginTop > 0)
				marginTop = 0;
		}
		// Scroll Down
		else if(
			// Firefox
			(e.type = 'DOMMouseScroll') ||
			// Chrome
			(typeof WheelEvent != 'undefined' && e.originalEvent instanceof WheelEvent) ||
			// Opera
			(typeof MouseEvent != 'undefined' && e.originalEvent instanceof MouseEvent) ||
			// IE
			(typeof Event != 'undefined' && e.originalEvent instanceof Event)
		) {
			marginTop -= 72;
			// dont scroll too far
			if(marginTop + $(this).data('menu-height') < $(window).height())
				marginTop = $(window).height() - $(this).data('menu-height');
		}
		
		$(this).stop();
		$(this).animate({
			'margin-top': marginTop + 'px'
		}, 100, 'linear');
	});
	// Scrolling on overflowing menu
	this.$menu.on('mousemove', function(e) {
		if(!$(this).hasClass('overflows'))
			return false;
		
		var $instance = $(this).parent().data('PopMenu.instance');
		var marginTop = parseInt($(this).css('margin-top'));
		var duration = 0;
		
		// Check direction
		if(e.pageY - $(window).scrollTop() < $instance.data.scrollerSize) {
			duration = -marginTop;
			marginTop = 0;
		}
		else if(e.pageY - $(window).scrollTop() > $(window).height() - $instance.data.scrollerSize) {
			duration = marginTop - ($(window).height() - $(this).data('menu-height'));
			marginTop = $(window).height() - $(this).data('menu-height');
		}
		else {
			if($(this).data('is-scrolling-with-scroller')) {
				$(this).stop();
				$(this).data('is-scrolling-with-scroller', false);
			}
			return;
		}
		
		$(this).stop();
		$(this).data('is-scrolling-with-scroller', true);
		$(this).animate({
			'margin-top': marginTop + 'px'
		}, duration*3, 'linear', function() {
			$(this).data('is-scrolling-with-scroller', false);
		});
	});
	
	// Assign reference to self
	this.$.data('PopMenu.instance', this);
	
	// Set options
	this.options(options);
};

/**
 * Direction constants
 */
PopMenu.direction = {
	RIGHT: 2,
	LEFT: 0,
	TOP: 0,
	BOTTOM: 1,
	HORIZONTAL: 2,
	VERTICAL: 1,
	RIGHT_BOTTOM: 3,
	RIGHT_TOP: 2,
	LEFT_BOTTOM: 1,
	LEFT_TOP: 0
};

/**
 * Default options for PopMenu
 */
PopMenu.defaults = {
	effect: 'fade',
	duration: 200,
	contextMenu: false,
	tmpFx: undefined,
	direction: PopMenu.direction.RIGHT_BOTTOM,
	scrollerSize: 24
};

/**
 * Get/set options
 */
PopMenu.prototype.options = function(options) {
	// Getter
	if(arguments.length == 0) {
		return this.data;
	}
	
	// Setter
	this.data = $.extend(true, {}, this.data, options);
	
	// Assign effect
	this.effect(this.data.effect);
	
	// Assign duration
	this.duration(this.data.duration);
	
	// Assign toplevel
	this.contextMenu(this.data.contextMenu);

};

/**
 * Get/set effect
 */
PopMenu.prototype.effect = function(effect) {
	// Getter
	if(arguments.length == 0) {
		return this.data.effect;
	}
	
	// Setter
	switch(effect) {
		case 'fade':
		case 'slide':
		case 'none':
			this.data.effect = effect;
			return true;
		default:
			return false;
	}
};

/**
 * Get/set duration
 */
PopMenu.prototype.duration = function(duration) {
	// Getter
	if(arguments.length == 0) {
		return this.data.duration;
	}
	
	// Setter
	this.data.duration = duration;
};

/**
 * Convert PopMenu into top level (context) menu
 */
PopMenu.prototype.contextMenu = function(value) {
	// Getter
	if(arguments.length == 0) {
		return this.data.contextMenu;
	}
	
	// Setter
	this.data.contextMenu = value;
	this.$.removeClass('PopMenu');
	this.$.removeClass('PopMenu-TopMenu');
	if(this.data.contextMenu) {
		this.$.addClass('PopMenu');
		this.$menu.addClass('PopMenu-TopMenu');
		$('body').append(this.$);
	}
};

/**
 * Show PopMenu
 * 
 * @param x Position to open from the left of the viewport
 * @param y Position to open from the top of the viewport
 */
PopMenu.prototype.show = function(x, y, effect, duration) {
	// Validate context menu
	if(!this.contextMenu())
		return false;
	
	// Check fx
	if(effect == null || effect == 'default') {
		effect = this.data.effect;
	}
	if(duration === undefined) {
		duration = this.data.duration;
	}
	
	// Assign effect to tmpFx -> for temporary use until the menu is hidden.
	this.data.tmpFx = effect;
	
	// Get dimension
	this.$.css('visibility', 'hidden');
	this.$.show();
	var menuW = this.$menu.outerWidth();
	var menuH = this.$menu.outerHeight();
	this.$.hide();
	this.$.css('visibility', 'visible');
	
	// Check if x overflows
	if(x < 0) {
		x = 0;
	}
	if(x + menuW > $(window).width()) {
		x -= menuW;
		// check further
		if(x + menuW > $(window).width()) {
			x = $(window).width() - menuW;
		}
	}
	
	// Check if y overflows
	if(y < 0) {
		y = 0;
	}
	if(y + menuH > $(window).height()) {
		y -= menuH;
		// check further
		if(y + menuH > $(window).height()) {
			y = $(window).height() - menuH;
		}
	}
	
	// Assign position
	this.$menu.css('left', x+'px');
	this.$menu.css('top', y+'px');
	
	// Update labels
	this.updateLabels();
	
	// Show
	switch(effect) {
		default:
		case 'none':
			this.$.show();
			break;
		case 'fade':
			this.$.fadeIn(duration);
			break;
		case 'slide':
			this.$.slideDown(duration);
			break;
	}
};

/**
 * Show PopMenu as non context menu
 */
PopMenu.prototype.showAsSubmenu = function(direction, effect, duration) {
	var $parent = this.$.parent('.PopMenu-Item');
	if($parent.length == 0)
		return false;
	
	// Check fx
	if(effect == null || effect == 'default') {
		effect = this.data.effect;
	}
	if(duration === undefined) {
		duration = this.data.duration;
	}
	if(direction === undefined) {
		direction = this.data.direction;
	}
	
	// Assign effect to tmpFx -> for temporary use until the menu is hidden.
	this.data.tmpFx = effect;
	this.$menu.removeClass('overflows');
	this.$menu.css('margin-top', 0);
	
	// Set default position
	if((direction & PopMenu.direction.HORIZONTAL) == PopMenu.direction.RIGHT) {
		this.$menu.css('left', '100%');
		this.$menu.css('right', 'auto');
	}
	else {
		this.$menu.css('left', 'auto');
		this.$menu.css('right', '100%');
	}
	
	if((direction & PopMenu.direction.VERTICAL) == PopMenu.direction.BOTTOM) {
		this.$menu.css('top', '0');
		this.$menu.css('bottom', 'auto');
	}
	else {
		this.$menu.css('top', 'auto');
		this.$menu.css('bottom', '0');
	}
	
	
	// Get dimension
	this.$.css('visibility', 'hidden');
	this.$.show();
	var menuW = this.$menu.outerWidth();
	var menuH = this.$menu.outerHeight();
	var x = this.$menu.offset().left - $(window).scrollLeft();
	var y = this.$menu.offset().top - $(window).scrollTop();
	this.$menu.data('menu-height', menuH);
	this.$menu.data('menu-width', menuW);
	this.$.hide();
	this.$.css('visibility', 'visible');
	
	var parentH = $parent.outerHeight();
	
	// Check if x overflows
	if((direction & PopMenu.direction.HORIZONTAL) == PopMenu.direction.RIGHT && x + menuW > $(window).width()) {
		this.$menu.css('left', 'auto');
		this.$menu.css('right', '100%');
		this.data.direction = (PopMenu.direction.direction & ~PopMenu.direction.HORIZONTAL) | PopMenu.direction.LEFT;
	}
	if((direction & PopMenu.direction.HORIZONTAL) == PopMenu.direction.LEFT && x < 0) {
		this.$menu.css('left', '100%');
		this.$menu.css('right', 'auto');
		this.data.direction = (PopMenu.direction.direction & ~PopMenu.direction.HORIZONTAL) | PopMenu.direction.RIGHT;
	}
	
	// Check if y overflows
	if((direction & PopMenu.direction.VERTICAL) == PopMenu.direction.BOTTOM && y + menuH > $(window).height()) {
		this.$menu.css('top', 'auto');
		this.$menu.css('bottom', '0');
		
		// Check if height overflows
		if(y + parentH - menuH < 0) {
			this.$menu.css('top', -y + 'px');
			//this.$menu.css('bottom', -($(window).height() - y - parentH) + 'px');
			// Opera fix, replace the above with this:
			this.$menu.css('bottom', 'auto');
			this.$menu.addClass('overflows');
		}
	}
	if((direction & PopMenu.direction.VERTICAL) == PopMenu.direction.TOP && y < 0) {
		this.$menu.css('top', '0');
		this.$menu.css('bottom', 'auto');
		
		// Check if height overflows
		if(y + parentH > $(window).height()) {
			this.$menu.css('top', -y + 'px');
			//this.$menu.css('bottom', -($(window).height() - y - parentH) + 'px');
			// Opera fix, replace the above with this:
			this.$menu.css('bottom', 'auto');
			this.$menu.addClass('overflows');
		}
	}
	
	// Show
	$parent.addClass('selected');
	switch(effect) {
		default:
		case 'none':
			this.$.show();
			break;
		case 'fade':
			this.$.fadeIn(duration);
			break;
		case 'slide':
			this.$.slideDown(duration);
			break;
	}
};

/**
 * Hide PopMenu
 */
PopMenu.prototype.hide = function(effect, duration) {
	// Check fx
	if(effect == null) {
		effect = this.data.tmpFx;
	}
	if(duration === undefined) {
		duration = this.data.duration;
	}
	
	// Hide
	this.hideSubmenus(effect, duration);
	switch(effect) {
		default:
		case 'none':
			this.$.hide();
			break;
		case 'fade':
			this.$.fadeOut(duration);
			break;
		case 'slide':
			this.$.slideUp(duration);
			break;
	}
};

/**
 * Hide Submenus
 */
PopMenu.prototype.hideSubmenus = function(effect, duration) {
	this.$.find('.PopMenu-Item.selected').removeClass('selected');
	switch(effect) {
		default:
		case 'none':
			this.$.find('.PopMenu-Container').hide();
			break;
		case 'fade':
			this.$.find('.PopMenu-Container').fadeOut(duration);
			break;
		case 'slide':
			this.$.find('.PopMenu-Container').slideUp(duration);
			break;
	}
};


/**
 * Populate menu
 */
PopMenu.prototype.populateMenu = function(menu) {
	var instance = this;
	$.each(menu, function(index, item) {
		instance.append(index, item);
	});
};

/**
 * Locate an item by ID
 */
PopMenu.prototype.find = function(id) {
	var $find = this.$menu.find('a[data-id='+id+']');
	
	if($find.length == 0)
		return null;
	else
		return $find.parent().data('PopMenu.instance');
};

/**
 * Append menu item
 */
PopMenu.prototype.append = function(id, item) {
	item.id = id;
	var menuItem = new PopMenuItem(item);
	this.$menu.append(menuItem.$);
	
	return menuItem;
};

/**
 * Insert menu item after another item
 */
PopMenu.prototype.insert = function(id, item, after) {
	item.id = id;
	var $after = this.find(after).$;
	var menuItem = new PopMenuItem(item);
	$after.after(menuItem.$);
	
	return menuItem;
};

/**
 * Prepend menu item
 */
PopMenu.prototype.prepend = function(id, item) {
	item.id = id;
	var menuItem = new PopMenuItem(item);
	this.$menu.prepend(menuItem.$);
	
	return menuItem;
};

/**
 * Remove an item
 */
PopMenu.prototype.remove = function(id) {
	var item = this.find(id);
	if(item != null) {
		item.$.remove();
		delete item;
	}
};

/**
 * Update labels
 */
PopMenu.prototype.updateLabels = function(force) {
	this.$.find('a.PopMenu-Link').each(function() {
		var instance = $(this).parent().data('PopMenu.instance');
		instance.updateLabel(force);
	});
};

/**
 * Get selected item
 */
PopMenu.prototype.selectedItem = function() {
	var selected = this.$.find('.PopMenu-Item.selected');
	if(selected.length > 0) {
		return selected.data('PopMenu.instance');
	}
	else {
		return null;
	}
};

/******************************************************************************/

/**
 * PopMenuItem Constructor
 */
PopMenuItem = function(options) {
	this.data = PopMenuItem.defaults;
	this.callbacks = {};
	
	// Build DOM
	this.$ = $(
		'<li class="PopMenu-Item">' +
			'<a class="PopMenu-Link" data-name="'+options.id+'">' +
			'</a>' +
			'<span class="PopMenu-Icon"></span>' +
		'</li>'
	);
	
	// Assign references
	this.$link = this.$.children('.PopMenu-Link');
	this.$icon = this.$.children('.PopMenu-Icon');
	
	// Set options
	this.options(options);
	
	// Bind events
	this.$link.click(function(e) {
		if($(this).parent().hasClass('disabled'))
			return false;
		
		$(this).trigger('action', e);
		
		if($(this).parent().hasClass('PopMenu-HasMenu')) {
			e.stopPropagation();
		}
	});
	this.$.mouseover(function(e) {
		var instance = $(this).data('PopMenu.instance');
		var $container = $(this).parents('.PopMenu-Container:eq(0)');
		if($container.length > 0) {
			var container = $container.data('PopMenu.instance');
			if(container.selectedItem() != instance) {
				container.hideSubmenus();
				if(instance.submenu != null)
					instance.submenu.showAsSubmenu(container.data.direction, container.data.effect, container.data.duration);
			}
		}
		else if(instance.submenu != null) {
			instance.submenu.showAsSubmenu(container.data.direction, container.data.effect, container.data.duration);
		}
		e.stopPropagation();
	});
	
	// Assign reference to self
	this.$.data('PopMenu.instance', this);
};

/**
 * Default options
 */
PopMenuItem.defaults = {
	id: undefined,
	type: 'item',
	label: undefined,
	key: undefined,
	action: undefined,
	href: undefined,
	target: undefined,
	icon: undefined,
	disabled: false,
	submenu: undefined,
	visible: true
};

/**
 * Bind events
 */
PopMenuItem.prototype.on = function(event, callback) {
	var instance = this;
	if(typeof this.callbacks[event] != 'object') {
		this.callbacks[event] = [];
		this.$link.on(event, function() {
			var args = arguments;
			$.each(instance.callbacks[event], function(index, item) {
				item.apply(instance, args);
			});
		});
	}
	this.callbacks[event].push(callback);
};

/**
 * Unbind events
 */
PopMenuItem.prototype.off = function(event) {
	this.$link.off(event);
	delete this.callbacks[event];
	
	// If 'click' event is unbound, the click-to-action event must be rebound.
	if(event == 'click') {
		this.$link.click(function(e) {
			if($(this).parent().hasClass('disabled'))
				return false;
			
			$(this).trigger('action', e);
			
			if($(this).parent().hasClass('PopMenu-HasMenu')) {
				e.stopPropagation();
			}
		});
	}
};

/**
 * Get/set options
 */
PopMenuItem.prototype.options = function(options) {
	// Getter
	if(arguments.length == 0) {
		return this.data;
	}
	
	// Setter
	this.data = $.extend(true, {}, this.data, options);
	
	// Assign id
	this.id(this.data.id);
	
	// Assign key
	this.key(this.data.key);
	
	// Assign type
	this.type(this.data.type);
	
	// Assign icon
	this.icon(this.data.icon);
	
	// Assign label
	this.label(this.data.label);

	// Disable item
	this.disable(this.data.disabled);
	
	// Show/hide item
	this.visible(this.data.visible);
	
	// Assign link
	this.href(this.data.href);
	this.target(this.data.target);
	
	// Assign action
	if(typeof this.data.action == 'function') {
		this.off('action');
		this.on('action', this.data.action);
	}
	this.data.action = undefined;
	
	// Assign submenu
	if(typeof this.data.submenu == 'object') {
		if(this.data.submenu instanceof PopMenu == false) {
			this.data.submenu = new PopMenu(this.data.submenu);
		}
		this.$.append(this.data.submenu.$);
		this.$.addClass('PopMenu-HasMenu');
		this.submenu = this.data.submenu;
		
	}
	else {
		this.$.removeClass('PopMenu-HasMenu');
		delete this.submenu;
	}

};

/**
 * Get/set icon
 */
PopMenuItem.prototype.icon = function(icon) {
	// Getter
	if(arguments.length == 0) {
		return this.data.icon;
	}
	
	// Setter
	this.$icon.css('background-image', 'none');
	this.$icon.attr('data-icon', null);
	
	// If null or empty string is provided, then just remove icon
	if(icon == null) {
		return;
	}
	
	// If icon is a common name
	if(icon.indexOf('.') == -1) {
		this.$icon.attr('data-icon', icon);
	}
	// If icon is a filename
	else {
		this.$icon.css('background-image', 'url("'+icon+'")');
	}
};

/**
 * Show menu item
 */
PopMenuItem.prototype.show = function() {
	this.data.visible = true;
	this.$.show();
};

/**
 * Hide menu item
 */
PopMenuItem.prototype.hide = function() {
	this.data.visible = false;
	this.$.hide();
};

/**
 * Check visibility
 */
PopMenuItem.prototype.visible = function(value) {
	// Getter
	if(arguments.length == 0) {
		return this.data.visible;
	}
	
	// Setter
	if(value)
		return this.show();
	else
		return this.hide();
};

/**
 * Get/set id
 */
PopMenuItem.prototype.id = function(id) {
	// Getter
	if(arguments.length == 0) {
		return this.data.id;
	}
	
	// Setter
	this.data.id = id;
	this.$link.attr('data-id', this.data.id);
};

/**
 * Get/set key
 */
PopMenuItem.prototype.key = function(key) {
	// Getter
	if(arguments.length == 0) {
		return this.data.key;
	}
	
	// Setter
	this.data.key = key;
	this.$link.attr('data-key', this.data.key);
};

/**
 * Get/set href
 */
PopMenuItem.prototype.href = function(url) {
	// Getter
	if(arguments.length == 0) {
		return this.data.href;
	}
	
	// Setter
	this.data.href = url;
	if(this.data.href) {
		this.$link.attr('href', this.data.href);
	}
	else {
		this.$link.attr('href', null);
	}
};

/**
 * Get/set target
 */
PopMenuItem.prototype.target = function(target) {
	// Getter
	if(arguments.length == 0) {
		return this.data.target;
	}
	
	// Setter
	this.data.target = target;
	if(this.data.target) {
		this.$link.attr('target', this.data.target);
	}
	else {
		this.$link.attr('target', null);
	}
};

/**
 * Get/set label
 */
PopMenuItem.prototype.label = function(label) {
	// Getter
	if(arguments.length == 0) {
		return this.data.label;
	}
	
	// Setter
	this.data.label = label;
	this.updateLabel(true);
};

/**
 * Get/set type
 */
PopMenuItem.prototype.type = function(type) {
	// Getter
	if(arguments.length == 0) {
		return this.data.type;
	}
	
	// Setter
	var invalid = false;
	switch(type) {
		case 'item':
			this.$.removeClass();
			this.$.addClass('PopMenu-Item');
			break;
		case 'separator':
			this.$.removeClass();
			this.$.addClass('PopMenu-Separator');
			break;
		default: 
			invalid = true;
			break;
	}
	if(!invalid) {
		this.data.type = type;
	}
};

/**
 * Disable menu item
 */
PopMenuItem.prototype.disable = function(disabled) {
	if(disabled === undefined) {
		return this.$.hasClass('disabled');
	}
	
	if(disabled) {
		this.$.addClass('disabled');
	}
	else {
		this.$.removeClass('disabled');
	}
};

/**
 * Update label
 */
PopMenuItem.prototype.updateLabel = function(force) {
	// Skip if not forced
	if((typeof this.data.label != 'function') && !force)
		return;
	
	// Assign label
	if(typeof this.data.label == 'function') {
		var label = this.data.label();
	}
	else {
		var label = this.data.label;
	}
	
	// Assign key
	if(this.data.key != null) {
		pattern = new RegExp("("+this.data.key+")", 'i');
		label = label.replace(pattern, '<u>$1</u>');
	}
	
	// Assign label
	this.$link.html(label);
};

/******************************************************************************/

(function($) {
	
	var methods = {};
	
	/**
	 * Default options for PopMenu
	 */
	var defaults = {
		effect: 'default',
		duration: null
	};
	
	/**
	 * Main entry to PopMenu methods
	 * 
	 * This function will look for the options parameter passed in, and 
	 * try to do something as specified in this order:
	 * 1. If nothing is passed, then return a reference to assigned context menu.
	 * 2. If object is passed, then initialize the PopMenu.
	 * 3. If string is passed, then try to fire a method with that name.
	 * 4. If string is passed and no method matches the name, then try 
	 *    to set/get an option with that name.
	 */
	$.fn.popmenu = function() {
		
		// If nothing is passed, then return a reference to assigned context menu.
		if( arguments.length == 0) {
			// If this is the first time, create an empty popup menu
			if(this.data('PopMenu.contextmenu') == null) {
				methods.init.call( this, {} );
			}
			
			return this.data('PopMenu.contextmenu').data('PopMenu.instance');
		}
		
		// If object is passed, then initialize the PopMenu.
		if( typeof arguments[0] === "object" ) {
			return methods.init.call( this, arguments[0] );
		} 
		
		// If string is passed, then try to fire a method with that name.
		else if( $.isFunction( methods[ arguments[0] ] ) ) {
			var shift = [].shift;
			var firstArg = shift.apply(arguments);
			return methods[ firstArg ].apply( this, arguments );
		} 
	};
	
	/**
	 * Initialize PopMenu
	 */
	methods.init = function(menu, options) {
		var $this = this;
		
		// Create PopMenu
		if(menu instanceof PopMenu == false) {
			var menu = new PopMenu(menu);
		}
		menu.contextMenu(true);
		
		return $this.each(function() {
			var $this = $(this);
			var newOptions = $.extend(true, {}, defaults, options);
			
			$this.data('PopMenu.contextmenu', menu.$);
			$this.data('PopMenu.options', newOptions);
			$this.on('contextmenu', methods.show);
		});
	};
	
	/**
	 * Show context menu
	 */
	methods.show = function(e) {
		var $elm = $(this);
		var $menu = $elm.data('PopMenu.contextmenu');
		var instance = $menu.data('PopMenu.instance');
		var options = $elm.data('PopMenu.options');
		
		// Position context menu under mouse cursor if 'e' is available
		if(e != null) {
			var pageX = e.pageX;
			var pageY = e.pageY;
		}
		// Otherwise position the context menu over the element
		else {
			var pageX = $elm.offset().left;
			var pageY = $elm.offset().top;
		}
		
		var scrollLeft = $(window).scrollLeft();
		var scrollTop = $(window).scrollTop();
		
		var menuX = pageX-scrollLeft;
		var menuY = pageY-scrollTop;
		
		instance.show(menuX, menuY, options.effect, options.duration);
		return false;
	};
	
	/**
	 * Hide context menu
	 */
	methods.hide = function(e) {
		var $menu = $(this).data('PopMenu.contextmenu');
		var options = $(this).data('PopMenu.options');
		var instance = $menu.data('PopMenu.instance');
		instance.hide(options.effect, options.duration);
	};
	
	
})(jQuery);
