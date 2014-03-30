// load bootstrap
console.log( '\n\nLOOPSHAPE presents:\n\GRUNT+COMPOSER SKELETON\n' );
console.log( 'Contact: webmaster@loopshape.com\n\n' );
console.log( 'Starting App!\n' );
// start the RJS config
require.config( {
	
	baseUrl : '/assets/js',
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
		syntaxhighlighter : './app/lib/syntaxhighlighter_3.0.83/scripts/shCore',
		shautoloader : './app/lib/syntaxhighlighter_3.0.83/scripts/shAutoloader',
		shapplescript : './app/lib/syntaxhighlighter_3.0.83/scripts/shBrushAppleScript',
		shbrushjs : './app/lib/syntaxhighlighter_3.0.83/scripts/shBrushJScript',
		iframeautoheight : './app/lib/jquery-autoheight/jquery.iframe-auto-height.plugin.1.9.3.min',
		tooltipsy : './app/lib/tooltipsy-master/tooltipsy.min',
		spritely : './app/lib/spritely-0.6.8/src/jquery.spritely',
		pace : './app/lib/pace.min',
		// Website Logic
		app : './app/app',
		template : './app/class/_template',
		clocktimer : './app/class/_clocktimer',
		canvas : './app/class/_canvas',
		scwidget : './app/lib/soundcloud-custom-player-master/js/soundcloud.player.api',
		scplayer : './app/lib/soundcloud-custom-player-master/js/sc-player',
		eqheights : './app/lib/jQuery.equalHeights-master/jquery.equalheights.min',
		benchmark : './app/lib/benchmark.js-master/benchmark'
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
		clocktimer : {
			deps : ['backbone'],
			exports : 'ClockTimer'
		},
		sticky : {
			deps : ['jquery'],
			exports : 'Sticky'
		},
		syntaxhighlighter : {
			exports : 'SyntaxHighlighter'
		},
		shautoloader : {
			deps : ['syntaxhighlighter'],
			exports : 'autoloader'
		},
		shbrushjs : {
			deps : ['syntaxhighlighter'],
			exports : 'brushes'
		},
		shapplescript : {
			deps : ['syntaxhighlighter'],
			exports : 'shapplescript'
		},
		iframeautoheight : {
			deps : ['jquery'],
			exports : 'IframeAutoheight'
		},
		tooltipsy : {
			deps : ['jquery'],
			exports : 'Tooltipsy'
		},
		spritely : {
			deps : ['jquery'],
			exports : 'Spritely'
		},
		scwidget : {
			deps : ['jquery'],
			exports : 'SC'
		},
		scplayer : {
			deps : ['scwidget'],
			exports : 'SCPlayer'
		},
		eqheights : {
			deps : ['jquery'],
			exports : 'EqualHeights'
		},
		pace : {
			deps : ['jquery'],
			exports : 'Pace'
		},
		app : {
			deps : ['migrate', 'template', 'clocktimer', 'canvas', 'tooltipsy', 'iframeautoheight', 'spritely', 'scwidget', 'scplayer', 'eqheights', 'pace'],
			exports : 'App'
		}
	},
	
	waitSeconds: 7
	
} ), define(["jquery", "underscore", "backbone", 'tweenmax', 'timelinemax', "app"]);