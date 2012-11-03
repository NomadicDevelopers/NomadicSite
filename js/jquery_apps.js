$(document).ready(function()
{
	var currentPosition = 0;
	var slideWidth = 970;
	var slides = $('.slide');
	var numberOfSlides = slides.length;
	
	var slideDelay = 6 * 1000; // delay secs before going to next slide
	var slideAuto = true;
	var slideTimer = null;
	var leaveDelay = 0; // delay to apply after they left the element
	var wasHovered = false;
	
	// Start automatic slide timer
	if ( numberOfSlides > 1 )
	{
		slideTimer = setTimeout( slideAutoLoop, slideDelay );
	}
	
	function slideAutoLoop()
	{
		if ( slideAuto )
		{
			currentPosition++; // add to the current slide
			slideToPosition(); // actually slide
		}
	}

	// Remove scrollbar in JS
	$('#galleryContainer').css('overflow', 'hidden');

	// Wrap all slides
	slides
	.wrapAll('<div id="galleryInner"></div>')

	// Float left to display horizontally
	.css({
		'float' : 'left'
	});

	// Set container width equal to total width of all slides
	$('#galleryInner').css('width', slideWidth * numberOfSlides);
	
	// Hide arrows on start
	$('.galleryControl').hide();

	// Create event listeners for clicks
	$('.galleryControl')
	.bind('click', function()
	{
		// Forbid constant click events to loop jquery
		if ( $(':animated').length ) {
			return false;
		}

		// Determine new position
		currentPosition = ($(this).attr('id')=='galleryControlRight') ? currentPosition+1 : currentPosition-1;

		// Do the slide animation
		slideToPosition();
	});
	
	function slideToPosition()
	{
		// Fade controls, if needed
		if ( $('.galleryControl').is(":visible") )
		{
			$('.galleryControl').fadeOut('fast');
			wasHovered = true;
		}

		// Display the slide info
		if ( $('.slideInfo').is(":visible") )
		{						
			$('.slideInfo').fadeOut('fast');
			wasHovered = true;
		}

		// Wrap right
		if ( currentPosition > numberOfSlides - 1 ) 
		{
			currentPosition = 0;
		}

		// Wrap left
		if ( currentPosition < 0 )
		{
			currentPosition = numberOfSlides - 1;
		}

		// Move using margin-left
		$('#galleryInner').animate(
			{ 'marginLeft' : slideWidth * ( -currentPosition ) },
			{
				duration: 'slow',
				easing: 'swing',
				complete: function()
				{					
					// Display controls/info
					if ( wasHovered )
					{
						fadeInControls();
						$('.slideInfo').fadeIn('fast');
					}
					
					//Automatically slide to the next
					if ( slideAuto )
					{
						startSlideLoop();
					}
				}
			}
		);
	}

	
	if ( numberOfSlides > 1 )
	{
		$('#gallery')
		.hover (
			function () {
				fadeInControls();
				$('.slideInfo').fadeIn('fast');

				// Halt the auto sliding
				slideAuto = false;
			},
			function () {
				$('.galleryControl').fadeOut('fast');
				$('.slideInfo').fadeOut('fast');
				
				wasHovered = false;
				
				// Start the auto sliding again
				slideAuto = true;
				if ( !$('#galleryInner').is(':animated') )
				{
					startSlideLoop();
				}
			}
		);
	}
	
	function startSlideLoop()
	{
		if ( numberOfSlides > 1 )
		{
			// Clear timer and restart it
			clearTimeout( slideTimer );
			slideTimer = setTimeout( slideAutoLoop, slideDelay );
		}
	}
	
	function fadeInControls()
	{
		setupControlPositions();

		if ( currentPosition != 0 )
		{
			$('#galleryControlLeft').fadeIn('fast');
		}

		if ( currentPosition != numberOfSlides - 1 )
		{
			$('#galleryControlRight').fadeIn('fast');
		}
	}
	
	function setupControlPositions()
	{
		if ( currentPosition != 0 )
		{
			$('#galleryControlLeft').css({ 'margin-left': '-485px'});
		}

		if ( currentPosition != numberOfSlides - 1 )
		{
			$('#galleryControlLeft').css({ 'margin-left': '-445px'});
		}
	}

});