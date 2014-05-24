// additional template-script
require( ['jquery', 'underscore', 'backbone'], function( $, _, Backbone ) {'use strict';

	var Template = Backbone.View.extend( {

		render : function( ) {
			return;
		},
		
		events : {},

		initialize : function( ) {
			_.bindAll( this, 'render' );
			this.render( );
		}
		
	} );

	var template = new Template;

} );
