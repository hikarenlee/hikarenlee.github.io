function showPlayer ($targetVid, $vidPos, eventTarget){
	var $div = '<div id="demo-player"><div class="container"><span><img src="" alt=""/><footer>(click anywhere to close this overlay)</footer></span><p>Loading...</p></div></div>';

	$($div).prependTo($(eventTarget).parents('section')).fadeTo("slow", 1.0);

	var vidPlayer = $('#demo-player');

	vidPlayer.find('.container').css('bottom',$vidPos);
	if ($targetVid === 'bluetooth-presentation') {
		vidPlayer.find('img').after($('<iframe src="https://docs.google.com/presentation/d/e/2PACX-1vTxQqvmgk8c1hy0LxPBQ6RWURbNxQ5FqCdg9OqPxPriwsZEyLgRB470g9ABmVXygYpIxwzQZtG5S9fU/embed?start=false&loop=false&delayms=60000" frameborder="0" width="90%" height="450" allowfullscreen="true" mozallowfullscreen="true" webkitallowfullscreen="true"></iframe>'));
	} else {
		vidPlayer.find('img').attr('src',$targetVid);
	}
	vidPlayer.on('click',function(){
		this.remove();
	});
}

$('document').ready(function(){
	var body = $('body'),
		container = $('#container'),
		articles = $('#container > article'),
		portfolio = $('#portfolio section'),
		nav = $('nav'),
		navLinks = $('nav a'),
		footer = $('body > footer'),
		player = $('.player'),
		zoomImage = $('.can-zoom'),
		activeArticle = $(),
		vidPlayer = $(), $div = $(), vidSrc = $(), vidPos = $(), eventTarget = $();

	zoomImage.on('click',function(){
		if($(this).parent().hasClass('three-images')) {
			$(this).prependTo($(this).parent());
			$(this).siblings().removeClass('zoom');
		}
		$(this).toggleClass('zoom');

		activeArticle = $(this).parents('.case-study');
	});

	//Video/Animation Overlay
	player.on('click', function(event){
		eventTarget = $(event.target);
		vidSrc = $(this).attr('id');
		vidPos = $(document).height() - $(this).parent().offset().top + 50;

		showPlayer(vidSrc, vidPos, eventTarget);
	});

	$('.case-study').on('click','.gallery',function(e){
		if ($(this).css('position') === "static" || $(this).hasClass('expand')) {
			// Expanded either because the window is small or the gallery has been clicked
			var galleryImages = $(this).children('img');
			if ($(e.target).hasClass('collapse')) {
				$(this).removeClass('expand');
				galleryImages.removeClass('static focus');
				$(this).parent('section').find('.static.zoom').slideUp(function(){$(this).remove()});
				return;
			}
			if (e.target.tagName === "IMG") {
				if ($(e.target).hasClass('focus')){
					removeGalleryZoomImage(this);
				} else {
					removeGalleryZoomImage(this);
					$(e.target).addClass('focus static');
					var zoom = $(e.target).clone().css('display','none').addClass('zoom');
					$(this).before(zoom);
					zoom.slideDown();
				}
			}
			// Creates consistency between mobile and desktop views
			// Normalizes for window resizing
			$(this).addClass('expand');
			galleryImages.addClass('static');

			function removeGalleryZoomImage (gallery) {
				$(gallery).children('img').removeClass('focus');
				$(gallery).parent().find('img.static.zoom').slideUp(function(){
					$(this).remove();
				});
			}
		} else {
			// At least 850px and NOT expanded
			$(this).addClass('expand');
			var gallery = $(this).children('img');
			for(var i = gallery.length-1; i >= 0; i--) {
				window.setTimeout(function(i){
					return function() {
						$(gallery[i]).addClass('static');
					};
				}(i), 400*(1/(i+2)));
			}
		}
	});
	$('.case-study').on('click','.static.zoom',function(){
		$(this).siblings('.gallery.expand').find('.focus').click();
	});

  /* configure independent case study page */
	if (window.location.pathname.includes('pages')) {
		$('head')
			.prepend($('<link rel="stylesheet" type="text/css" href="../style.css">'))
			.prepend($('<link href="https://fonts.googleapis.com/css?family=Raleway:300,600,700&display=swap" rel="stylesheet">'))
			.prepend($('<link rel="stylesheet" href="../fontawesome/css/all.css" media="all">'))
			.prepend($('<link rel="stylesheet" type="text/css" href="../case-study-page.css">'))
			.prepend($('<title>Brian Donahue - UX Design with Engineering in Mind</title>'))
			.prepend($('<meta charset="UTF-8">'))
			.prepend($('<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0">'))
			.prepend($('<meta name="author" content="Brian Donahue">'))
			.prepend($('<meta name="description" content="UX, web design, & front-end development portfolio for Brian Donahue, Product Designer based in Silicon Valley, California">'))
			.prepend($('<meta name="keywords" content="product,product design,manager,UX,UX design,UX designer,user experience,design,designer,UI,HTML,CSS,JavaScript,Illustrator,Adobe,Photoshop,freelance,contractor,developer,front-end,front end,portfolio,graphic design,graphics,web,web development,for hire,resume,jQuery,storyboarding,prototyping,research,user research,researcher,information architecture,taxonomy">'))
			.prepend($('<meta name="format-detection" content="telephone=no">;'));

		$('.case-study')
			.prepend($('<nav><i class="fa fa-angle-left"></i> <a href="../index.html">Back to portfolio</a></nav>'))
			.append('<footer><p>Made by B Donahue</p><p><a href="https://linkedin.com/in/donahuebrian" target="_blank"><i class="fab fa-linkedin fa-2x" aria-label="linkedin"></i></a> &bullet; <a href="mailto:brimwd@gmail.com"><i class="fad fa-mailbox fa-2x" aria-label="email"></i></a> &bullet; <a href="sms:971-222-9892"><i class="fas fa-sms fa-2x" aria-label="email"></i></a></p></footer>');
	}
	else { $('#case-study-page.js').remove(); }
});
