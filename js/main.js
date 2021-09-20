/*global jQuery:false */
(function($) {
	"use strict";
	
	/* FancyBox */
	$('.fancybox').fancybox();
	
	/* Radio buttons styled  */
	$('input.darkblue').iCheck({ radioClass: 'iradio_minimal-darkblue' });
	$('input.lightblue').iCheck({ radioClass: 'iradio_minimal-lightblue' });
	
	/* Datepicker */
	$('#date').datepicker({dateFormat: 'dd/mm/yy', prevText: "", nextText: "" });
	$('#datedep1').datepicker({dateFormat: 'dd/mm/yy', prevText: "", nextText: "" }); 
	$('#datedep2').datepicker({dateFormat: 'dd/mm/yy', prevText: "", nextText: "" });
	$('#ui-datepicker-div').wrap('<div id="themedp"></div>');

	/* Range sliders */
	$('#map-range1').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range1').wrap('<div id="themesl"></div>');
	$('#map-range2').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range2').wrap('<div id="themesl"></div>');
	$('#map-range3').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range3').wrap('<div id="themesl"></div>');
	$('#map-range4').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range4').wrap('<div id="themesl"></div>');
	$('#map-range5').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range5').wrap('<div id="themesl"></div>');
	$('#map-range6').slider({ range: "min", value: 30, max: 100, step: 1, animate: "fast", });
	$('#map-range6').wrap('<div id="themesl"></div>');
	
	/* Show/hide more options  */
	$('#morelc').click(function() {
		$('#morelc').hide();
		$('#lesslc').show();
		$('#locmore').slideToggle('slow', function() {});
	});

	$('#lesslc').click(function() {
		$('#morelc').show();
		$('#lesslc').hide();
		$('#locmore').slideToggle('slow', function() {});
	});
	
	/* List - Grid View */
	$("#grid-style").hide();
	$('#changelist').addClass('active');

	$('#changegrid').click(function() {
	$('#list-style').hide();
	$('#grid-style').fadeIn();
	$('#changegrid').addClass('active');
	$('#changelist').removeClass('active');
	});

	$('#changelist').click(function() {
	$('#list-style').fadeIn();
	$('#grid-style').fadeOut();
	$('#changelist').addClass('active');
	$('#changegrid').removeClass('active');
	});
	
	/* JsScroll for dropdowns */
	$('.countryoptions').jScrollPane();
	$('.countryoptions').hide();
	$('.cityoptions').jScrollPane();
	$('.cityoptions').hide();
	$('.cardoptions').hide();
  
	/* DropDown Menu  */
	var nav = $("#topNav");
		nav.find("li").each(function() {
		if ($(this).find("ul").length > 0) {
			$(this).mouseenter(function() {
				$(this).find("ul").stop(true, true).slideDown();
			});
		$(this).mouseleave(function() {
			$(this).find("ul").stop(true, true).slideUp();
		});
		}
		});

	$(window).load(function() {
        $('#slider').nivoSlider({ controlNav: false, randomStart: true });
    });
	
	/* Range Slider Function  */
$(function() {

	$("#price-range").slider({ range: true, min: 0, max: 2000, values: [ 200, 1500 ], step: 50, animate: "fast", slide: function( event, ui ) {
		$("#pr1").val( "$ " + ui.values[ 0 ] );
		$("#pr2").val( "$ " + ui.values[ 1 ] ); 
		}
		});
		$("#pr1").val( "$ " + $( "#price-range" ).slider( "values", 0 ) );
		$("#pr2").val( "$ " + $( "#price-range" ).slider( "values", 1 ) );
		$('#price-range').wrap('<div id="themesl"></div>');

	$("#star-range").slider({ range: "min", value: 3, min: 1, max: 5, step: 1, animate: "fast", slide: function( event, ui ) {
		$( "#sr" ).val( ui.value + " Ratings" );
		}
		});
		$( "#sr" ).val( $( "#star-range" ).slider( "value" ) + " Ratings" );	
		$('#star-range').wrap('<div id="themesl"></div>');

	$("#user-range").slider({ range: "min", value: 30, max: 50, step: 1, animate: "fast", slide: function( event, ui ) {
		$( "#ur" ).val( ui.value + " Users" );
		}
		});
		$( "#ur" ).val( $( "#user-range" ).slider( "value" ) + " Users" );
		$('#user-range').wrap('<div id="themesl"></div>');
		
	$( "#discount-range" ).slider({ range: "min", value: 60, max: 100, step: 1, animate: "fast", slide: function( event, ui ) {
	$( "#dr" ).val( ui.value + " %" );
		}
		});
	$( "#dr" ).val( $( "#discount-range" ).slider( "value" ) + " %" );
	$('#discount-range').wrap('<div id="themesl"></div>');	
	
	});
	
	/* Ad Gallery  */
	
	var galleries = $('.ad-gallery').adGallery();
	galleries[0].settings.effect = 'fade';
 
})(jQuery);

/*jshint undef:false, unused:false */
function resetall() {
  "use strict";
	var $pslider = $("#price-range");
	$pslider.slider("values", 0, 200);
	$pslider.slider("values", 1, 1500);
	var $rslider = $("#star-range");
	$rslider.slider("value", 3);
	var $uslider = $("#user-range");
	$uslider.slider("value", 30);
	var $dslider = $("#discount-range");
	$dslider.slider("value", 60);
	$( "#pr1" ).val( "$ " + $( "#price-range" ).slider( "values", 0 ) );
	$( "#pr2" ).val( "$ " + $( "#price-range" ).slider( "values", 1 ) );
	$( "#sr" ).val( $( "#star-range" ).slider( "value" ) + " Ratings" );
	$( "#ur" ).val( $( "#user-range" ).slider( "value" ) + " Users" );
	$( "#dr" ).val( $( "#discount-range" ).slider( "value" ) + " %" );
	$('#locmore').slideUp('slow', function() { });
}
function resetmap() {
  "use strict";
	$('#map-range1').slider("value", 30);
	$('#map-range2').slider("value", 30);
	$('#map-range3').slider("value", 30);
	$('#map-range4').slider("value", 30);
	$('#map-range5').slider("value", 30);
	$('#map-range6').slider("value", 30);
}