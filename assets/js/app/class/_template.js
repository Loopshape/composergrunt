// module dependencies
require( ['iframeautoheight', 'spritely', 'scwidget', 'scplayer'], function( IFrameAutoheight, Spritely, SC, SCPlayer ) {
	'use strict';

	var currentMousePos = {
		x : -1,
		y : -1
	};

	var xpos = 0;
	var ypos = 0;

	var perfVal = 2;

	var spritecount = 8;
	var bubblecount = 4;

	var guiOpen = false;

	$.scPlayer.defaults.onDomReady = null;
	var musicPlayer = null;
	var musicPlayerRun = false;
	
	var i = 0;

	var myPlayer = function( toggler ) {
		if( toggler ) {
			if( $( '#wellenwert' ).length == 0 ) {
				$( 'body' ).append( '<div id="wellenwert" class="hide"><a href="http://soundcloud.com/wellenwert/sets/website_backgroundmusic" class="sc-player">Piano Session by Arjuna Noorsanto aka Wellenwert</a></div>' );
				$( '#wellenwert' ).scPlayer.defaults.autoPlay = true;
				$( '#wellenwert' ).scPlayer.defaults.randomize = true;
				$( '#wellenwert' ).ready( function( ) {
					$( '#wellenwert' ).scPlayer( );
				} );
			}
		} else {
			//window.location = "http://loopshape.com/";
		}
		return;
	};
	myPlayer( );

	for( i = 0; i < spritecount; i++ ) {
		var counter = i < 10 ? '0' + i : i;
		$( '#page' ).after( '<div id="sprite' + counter + '"></div>' );
	}
	for( i = 0; i < bubblecount; i++ ) {
		var counter = i < 10 ? '0' + i : i;
		$( '#page' ).after( '<div id="bubble' + counter + '"></div>' );
	}
	$( 'div[id*="sprite"]' ).each( function( ) {
		$( this ).css( {
			'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
			'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
			'opacity' : Math.random( 1 ),
			'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
			'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 16 + 'px)'
		} );
		;
	} );
	$( 'div[id*="bubble"]' ).each( function( ) {
		$( this ).css( {
			'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
			'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
			'opacity' : Math.random( 1 ),
			'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
			'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 8 + 'px)'
		} );
	} );
	$( 'div[id*="bubble"]' ).show( );

	var Template = Backbone.View.extend( {

		render : function( ) {

			console.log( '::start animations' );

			var page = $( '#page' );
			var screenWidth = $( window ).width( );
			var hover = this.hover;

			page.css( {
				'position' : 'relative',
				'display' : 'block',
				'left' : -( screenWidth * 2 )
			} );
			TweenMax.to( page, 1, {
				'left' : '0',
				'ease' : 'Back.easeInOut',
				'onComplete' : function( ) {
					if( $( 'a[class*="soMeLink_"]' ).length ) {
						$( 'a[class*="soMeLink_"]' ).css( {
							'opacity' : '0'
						} ).show( );
						TweenMax.to( $( 'a[class*="soMeLink_"]' ), 1, {
							'alpha' : '0.5',
							'onComplete' : function( ) {
								hover( );
							}
						} );
					}
				}
			} );

			return;
		},

		sprites : function( perfVal ) {

			$( 'div[id*="sprite"],div[id*="bubble"]' ).remove( );

			switch( perfVal ) {
				case 0:
					$( 'li.perfButton' ).find( 'a' ).html( '<i class="fa-heart"></i>Performance: Off' );
					$( '#backgroundSpaceGalaxy,#backgroundSun' ).hide( );
					$('#backgroundSpaceGalaxy,#backgroundEarth').removeClass('anim');
					$( 'div[id*="sprite"],div[id*="bubble"]' ).sprite( {
						fps : 0,
						no_of_frames : 0
					} ).spSpeed( 0 );
					$( '#backgroundStars,#backgroundPattern' ).hide( );
					break;
				case 1:
					$( 'li.perfButton' ).find( 'a' ).html( '<i class="fa-heart"></i>Performance: Low' );
					$( '#backgroundSpaceGalaxy' ).hide( );
					$('#backgroundSpaceGalaxy,#backgroundEarth').removeClass('anim');
					$( 'div[id*="sprite"],div[id*="bubble"]' ).sprite( {
						fps : 0,
						no_of_frames : 0
					} ).spSpeed( 0 );
					bubblecount = 4;
					for( i = 0; i < bubblecount; i++ ) {
						var counter = i < 10 ? '0' + i : i;
						$( '#page' ).after( '<div id="bubble' + counter + '"></div>' );
					}
					$( 'div[id*="bubble"]' ).each( function( ) {
						$( this ).css( {
							'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
							'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
							'opacity' : Math.random( 1 ),
							'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
							'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 24 + 'px)'
						} );
					} );
					$( 'div[id*="bubble"]' ).show( );
					$( '#backgroundPattern' ).show( );
					break;
				case 2:
					$( 'li.perfButton' ).find( 'a' ).html( '<i class="fa-heart"></i>Performance: Med' );
					$('#backgroundSpaceGalaxy,#backgroundEarth').removeClass('anim');
					$( 'div[id*="sprite"],div[id*="bubble"]' ).sprite( {
						fps : 0,
						no_of_frames : 0
					} ).spSpeed( 0 );
					spritecount = 8;
					for( i = 0; i < spritecount; i++ ) {
						counter = i < 10 ? '0' + i : i;
						$( '#page' ).after( '<div id="sprite' + counter + '"></div>' );
					}
					bubblecount = 8;
					for( i = 0; i < bubblecount; i++ ) {
						counter = i < 10 ? '0' + i : i;
						$( '#page' ).after( '<div id="bubble' + counter + '"></div>' );
					}
					$( 'div[id*="sprite"],div[id*="bubble"]' ).each( function( ) {
						$( this ).css( {
							'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
							'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
							'opacity' : Math.random( 1 ),
							'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
							'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 24 + 'px)'
						} );
					} );
					$( '#backgroundStars,#backgroundSpaceGalaxy,div[id*="sprite"],div[id*="bubble"]' ).show( );
					break;
				case 3:
					spritecount = 32;
					$( 'li.perfButton' ).find( 'a' ).html( '<i class="fa-heart"></i>Performance: High' );
					$('#backgroundSpaceGalaxy').addClass('anim');
					for( i = 0; i < spritecount; i++ ) {
						counter = i < 10 ? '0' + i : i;
						$( '#page' ).after( '<div id="sprite' + counter + '"></div>' );
					}
					bubblecount = 16;
					for( i = 0; i < bubblecount; i++ ) {
						counter = i < 10 ? '0' + i : i;
						$( '#page' ).after( '<div id="bubble' + counter + '"></div>' );
					}
					$( 'div[id*="sprite"]' ).each( function( ) {
						$( this ).sprite( {
							fps : 1,
							no_of_frames : 1
						} ).spRandom( {
							top : Math.random( $( document ).height( ) ) * $( document ).height( ),
							left : Math.random( $( document ).width( ) ) * $( document ).width( ) - $( document ).height( ) / 4,
							right : Math.random( $( document ).width( ) ) * $( document ).width( ) + $( document ).height( ) / 4,
							bottom : Math.random( $( document ).height( ) ) * $( document ).height( ),
							speed : 32000,
							pause : 0,
						} ).css( {
							'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
							'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
							'opacity' : Math.random( 1 ),
							'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
							'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 16 + 'px)'
						} );
						;
					} );
					$( 'div[id*="bubble"]' ).each( function( ) {
						$( this ).sprite( {
							fps : 1,
							no_of_frames : 1
						} ).spRandom( {
							top : Math.random( $( document ).height( ) ) * ( $( document ).height( ) / 2 ),
							left : Math.random( $( document ).width( ) ) * ( $( document ).width( ) / 1.75 ) - $( document ).height( ) / 4,
							right : Math.random( $( document ).width( ) ) * ( $( document ).width( ) / 1.25 ) + $( document ).height( ) / 4,
							bottom : Math.random( $( document ).height( ) ) * ( $( document ).height( ) / 2 ),
							speed : 32000,
							pause : 0,
						} ).css( {
							'top' : Math.random( $( document ).height( ) ) * $( document ).height( ),
							'left' : Math.random( $( document ).width( ) ) * $( document ).width( ),
							'opacity' : Math.random( 1 ),
							'-webkit-transform' : 'scale(' + Math.random( 6 ) + ')',
							'-webkit-filter' : 'grayscale(1) blur(' + Math.random( 1 ) * 8 + 'px)'
						} );
					} );
					$( '#backgroundSun,#backgroundStars,#backgroundSpaceGalaxy,div[id*="sprite"],div[id*="bubble"]' ).show( );
					break;
			}

			return;
		},

		hover : function( ) {

			var spriteFunc = this.sprites;

			var pageGroup = '#backgroundSun,#header,#navi,#content,#footer,a[class*="soMeLink_"]';
			var elemGroup = '#backgroundEarth,#header .link,#navi,#content,#footer,a[class*="soMeLink_"]';

			var delay = 1;

			var screenHeight = $( '#page' ).offset( );

			console.log( '::set perfomance level' );

			$( '.perfButton' ).on( 'click', function( e ) {
				e.preventDefault( );
				perfVal--;
				if( perfVal < 0 )
					perfVal = 3;
				spriteFunc( perfVal );
			} );

			/*
			 * KLICKROUTINE LOGO
			 */
			var logoClickLoop = function( ) {
				$( '#header a h1' ).stop( ).on( 'click', function( ) {
					if( ! /Firefox|Explorer/i.test( navigator.userAgent ) ) {
						guiOpen = true;
						$( '#backgroundPattern' ).css( {
							'-webkit-filter' : 'blur(0)'
						} );
						TweenMax.to( $( '#page' ), delay / 2, {
							'marginTop' : '0',
							'ease' : 'Elastic.easeInOut',
							'onComplete' : function( ) {
								TweenMax.to( $( elemGroup ), delay / 2, {
									'alpha' : '0',
									'ease' : 'Linear',
									'onComplete' : function( ) {
										$( elemGroup ).hide( );
										TweenMax.to( $( '#cube' ), delay * 4, {
											'alpha' : '1',
											'top' : '280',
											'scale' : '3',
											'ease' : 'Elastic.easeOut'
										} );
										TweenMax.to( $( '#msgWindow' ), 1, {
											'display' : 'block',
											'alpha' : '1',
											'left' : '400px',
											'zIndex' : '100000'
										} );
										setTimeout( function( ) {
											$( '.eqheight' ).equalHeights( );
										}, 100 );
									}
								} );
								TweenMax.to( $( '#backgroundPattern' ), 0.2, {
									'scale' : '2',
									'ease' : 'Elastic.easeInOut'
								} );
								TweenMax.to( $( '#backgroundEarth' ), 0.1, {
									'alpha' : '0',
									'top' : '-300px',
									'ease' : 'Elastic.easeInOut'
								} );
							}
						} );
						$( this ).on( 'click', function( ) {
							$( '#backgroundPattern' ).css( {
								'-webkit-filter' : 'blur(4px)'
							} );
							TweenMax.to( $( '#page' ), delay / 2, {
								'marginTop' : '200px',
								'ease' : 'Elastic.easeInOut',
								'onComplete' : function( ) {
									TweenMax.to( $( '#msgWindow' ), 1, {
										'display' : 'none',
										'alpha' : '0',
										'zIndex' : '-1',
										'left' : $( document ).width( )
									} );
									TweenMax.to( $( '#cube' ), delay, {
										'top' : -$( document ).height( ) / 4,
										'alpha' : '0',
										'ease' : 'Quad.easeOut'
									} );
									$( elemGroup ).show( );
									TweenMax.to( $( elemGroup ), delay, {
										'alpha' : '1',
										'ease' : 'Linear',
										'onComplete' : function( ) {
											$(this).ready(function() {
												$( '.eqheight' ).equalHeights( );
												logoClickLoop( );
											});
										}
									} );
									TweenMax.to( $( '#backgroundPattern' ), 0.2, {
										'scale' : '1',
										'ease' : 'Elastic.easeOut'
									} );
									TweenMax.to( $( '#backgroundEarth' ), 0.1, {
										'scale' : '1',
										'alpha' : '0.75',
										'top' : '-300px',
										'ease' : 'Elastic.easeOut'
									} );
									guiOpen = false;
								}
							} );
						} );
					}
					setTimeout( function( ) {
						$( '.eqheight' ).equalHeights( );
					}, 100 );
				} );
			};
			logoClickLoop( );

			function movePopWindow( ) {
				TweenMax.to( $( 'div.popWindow' ), 0.5, {
					'left' : '2400px',
					'top' : 25,
					'onComplete' : function( ) {
						TweenMax.to( $( 'div.popWindow' ), 0.5, {
							'left' : '380px'
						} );
					}
				} );
				return;
			}

			function cubeDoRot( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'spincube',
					'-webkit-animation-play-state' : 'running'
				} );
				return;
			}


			$( 'ul.msgList li:eq(0)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'frontside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(0)' ).show( );
				movePopWindow( );
			} );
			$( 'ul.msgList li:eq(1)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'leftside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(1)' ).show( );
				movePopWindow( );
			} );
			$( 'ul.msgList li:eq(2)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'backside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(2)' ).show( );
				movePopWindow( );
			} );
			$( 'ul.msgList li:eq(3)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'rightside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(3)' ).show( );
				movePopWindow( );
			} );
			$( 'ul.msgList li:eq(4)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'topside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(4)' ).show( );
				movePopWindow( );
			} );
			$( 'ul.msgList li:eq(5)' ).on( 'mouseenter', function( ) {
				$( '#cube' ).css( {
					'-webkit-animation-name' : 'botside'
				} ).on( 'mouseleave', function( ) {
					cubeDoRot( );
				} );
				$( 'ul.msgPopup li' ).hide( );
				$( 'ul.msgPopup li:eq(5)' ).show( );
				movePopWindow( );
			} );

			$( 'html,body,#header .banner h1' ).hover( function( ) {
				$( 'div[id*="sprite"]' ).css( {
					'background-image' : 'url("../assets/img/sun.png")',
				} );
				TweenMax.to( $( '#background_00' ), 0.25, {
					'scale' : '1.2',
					'ease' : 'Quad.easeInOut'
				} );
				$( '#page' ).css( {
					'opacity' : '1',
					'-webkit-filter' : 'blur(' + 0 + 'px)'
				} );
			}, function( ) {
				TweenMax.to( $( '#background_00' ), 0.25, {
					'scale' : '0.001',
					'alpha' : '0',
					'ease' : 'Quad.easeInOut'
				} );
				$( '#page' ).css( {
					'opacity' : '0',
					'-webkit-filter' : 'blur(' + 128 + 'px)'
				} );
			} );

			$( 'a[rel="ajax"]' ).hover( function( ) {

				var button = $( this );

				TweenMax.to( button, 0.3, {
					'scale' : '1.3',
					'ease' : 'Elastic.quad'
				} );

			}, function( ) {

				var button = $( this );

				TweenMax.to( button, 0.3, {
					'scale' : '1',
					'ease' : 'Elastic.quad'
				} );

			} );

			$( 'a[class*="soMeLink_"],a#goTop' ).hover( function( ) {
				if( !guiOpen )
					TweenMax.to( $( this ), 0.2, {
						'alpha' : '1',
						'scale' : '1.2',
						'ease' : 'Elastic.quad'
					} );
			}, function( ) {
				if( !guiOpen )
					TweenMax.to( $( this ), 0.2, {
						'alpha' : '0.5',
						'scale' : '1',
						'ease' : 'Elastic.quad'
					} );
			} );

			var sndBuffer = null;
			$( 'li.sndButton' ).on( 'click', function( ) {
				if( musicPlayerRun == false ) {
					musicPlayerRun = true;
					$( this ).find( 'a' ).html( '<i class="bigIcon fa-volume-up"></i> On' );
					myPlayer( musicPlayerRun );
				} else if( musicPlayerRun == true ) {
					musicPlayerRun = false;
					$( this ).find( 'a' ).html( '<i class="bigIcon fa-volume-down"></i> Off' );
					myPlayer( musicPlayerRun );
				}
			} );

			this.stage( );

		},

		stage : function( ) {

			console.log( '::staging elements' );

			if( $( '#loopshape_frame' ).length )
				$( '#loopshape_frame' ).iframeAutoHeight( );

			$( document ).on( 'mousemove', function( event ) {
				xpos = event.pageX;
				ypos = event.pageY;
			} );

			$( 'html' ).focus( );

		},

		initialize : function( ) {
			console.log( '::set layout fixes' );

			_.bindAll( this, 'render', 'sprites', 'hover', 'stage' );
			this.render( );
		}
	} );

	var template = new Template;

} );
