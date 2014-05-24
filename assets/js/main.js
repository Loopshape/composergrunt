// load bootstrap
console.log('\n\nLOOPSHAPE presents:\n\GRUNT+COMPOSER SKELETON\n');
console.log('Contact: webmaster@loopshape.com\n\n');
console.log('Starting App!\n');
// start the RJS config
require.config({

	baseUrl : './assets/js/',
	// enter correct pathname for /server/frame

	paths : {
		// Require.JS/BACKBONE CoreFiles
		jquery : './app/core/jquery-2.0.3.min',
		migrate : './app/core/jquery-migrate-1.2.1.min',
		underscore : './app/core/underscore-min',
		backbone : './app/core/backbone-min',
		lodash : './app/core/lodash.underscore',
		// Plugins / JS-Modules
		tweenmax : './app/lib/GreenSock/TweenMax.min',
		timelinemax : './app/lib/GreenSock/TimelineMax.min',
		sticky : './app/lib/garand-sticky-c199302/jquery.sticky',
		iframeautoheight : './app/lib/jquery-autoheight/jquery.iframe-auto-height.plugin.1.9.3.min',
		tooltipsy : './app/lib/tooltipsy-master/tooltipsy.min',
		pace : './app/lib/pace.min',
		// Website Logic
		app : './app/app',
		template : './app/class/_template'
	},

	shim : {
		jquery : {
			exports : '$'
		},
		migrate : {
			deps : ['jquery']
		},
		underscore : {
			deps : ['jquery'],
			exports : '_'
		},
		backbone : {
			deps : ['underscore'],
			exports : 'Backbone'
		},
		tweenmax : {
			exports : 'TweenMax'
		},
		timelinemax : {
			exports : 'TimelineMax'
		},
		template : {
			deps : ['backbone'],
			exports : 'Template'
		},
		sticky : {
			deps : ['jquery'],
			exports : 'Sticky'
		},
		iframeautoheight : {
			deps : ['jquery'],
			exports : 'IframeAutoheight'
		},
		tooltipsy : {
			deps : ['jquery'],
			exports : 'Tooltipsy'
		},
		pace : {
			deps : ['jquery'],
			exports : 'Pace'
		},
		app : {
			deps : ['jquery', 'migrate', 'template', 'pace'],
			exports : 'App'
		}
	},

	waitSeconds : 0

}), define(["jquery", "underscore", "backbone", 'tweenmax', 'timelinemax', "app"]); 
