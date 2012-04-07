// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// the compiled file.
//
// WARNING: THE FIRST BLANK LINE MARKS THE END OF WHAT'S TO BE PROCESSED, ANY BLANK LINE SHOULD
// GO AFTER THE REQUIRES BELOW.
//
//= require hamlcoffee
//= require jquery
//= require jquery_ujs
//= require h5bp
//= require bootstrap
//= require ckeditor/init
//= require_tree .

CKEDITOR.on('instanceReady', function (ev) {
	var editor = ev.editor,
		dataProcessor = editor.dataProcessor,
		htmlFilter = dataProcessor && dataProcessor.htmlFilter;

	// Out self closing tags the HTML4 way, like <br>.
	dataProcessor.writer.selfClosingEnd = '>';

	// Make output formatting behave similar to FCKeditor
	var dtd = CKEDITOR.dtd;
	for ( var e in CKEDITOR.tools.extend( {}, dtd.$nonBodyContent, dtd.$block, dtd.$listItem, dtd.$tableContent ) )
	{
		dataProcessor.writer.setRules( e,
			{
				indent : true,
				breakBeforeOpen : true,
				breakAfterOpen : false,
				breakBeforeClose : !dtd[ e ][ '#' ],
				breakAfterClose : true
			});
	}

	// Output properties as attributes, not styles.
	htmlFilter.addRules(
	{
		elements :
		{
			$ : function( element )
			{
				// Output dimensions of images as width and height
				if ( element.name == 'img' )
				{
					var style = element.attributes.style;

					if ( style )
					{
						// Get the width from the style.
						var match = /(?:^|\s)width\s*:\s*(\d+)px/i.exec( style ),
							width = match && match[1];

						// Get the height from the style.
						match = /(?:^|\s)height\s*:\s*(\d+)px/i.exec( style );
						var height = match && match[1];

						if ( width )
						{
							element.attributes.style = element.attributes.style.replace( /(?:^|\s)width\s*:\s*(\d+)px;?/i , '' );
							element.attributes.width = width;
						}

						if ( height )
						{
							element.attributes.style = element.attributes.style.replace( /(?:^|\s)height\s*:\s*(\d+)px;?/i , '' );
							element.attributes.height = height;
						}
					}
				}

				// Output alignment of paragraphs using align
				if ( element.name == 'p' )
				{
					style = element.attributes.style;

					if ( style )
					{
						// Get the align from the style.
						match = /(?:^|\s)text-align\s*:\s*(\w*);/i.exec( style );
						var align = match && match[1];

						if ( align )
						{
							element.attributes.style = element.attributes.style.replace( /(?:^|\s)text-align\s*:\s*(\w*);?/i , '' );
							element.attributes.align = align;
						}
					}
				}

				if ( !element.attributes.style )
					delete element.attributes.style;

				return element;
			}
		},

		attributes :
			{
				style : function( value, element )
				{
					// Return #RGB for background and border colors
					return convertRGBToHex( value );
				}
			}
	} );
});

/**
* Convert a CSS rgb(R, G, B) color back to #RRGGBB format.
* @param Css style string (can include more than one color
* @return Converted css style.
*/
function convertRGBToHex( cssStyle )
{
	return cssStyle.replace( /(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi, function( match, red, green, blue )
		{
			red = parseInt( red, 10 ).toString( 16 );
			green = parseInt( green, 10 ).toString( 16 );
			blue = parseInt( blue, 10 ).toString( 16 );
			var color = [red, green, blue] ;

			// Add padding zeros if the hex value is less than 0x10.
			for ( var i = 0 ; i < color.length ; i++ )
				color[i] = String( '0' + color[i] ).slice( -2 ) ;

			return '#' + color.join( '' ) ;
		 });
}
