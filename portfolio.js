$('document').ready(function(){
	var body = $('body'),
	container = $('#container'),
	articles = $('#container > article'),
	nav = $('nav'),
	navLinks = $('nav a'),
	footer = $('body > footer')
	player = $('.player'),
	zoomImage = $('.can-zoom'),
	activeArticle = $(),
	characters = ['thumb', 'peace', 'cake', 'magic', 'lightning', 'bicycle', 'coffee', 'heart', 'paw', 'music', 'smile'], selectedCharacter = 'a';

	function adjustPageHeight(element) {
		// clear all timeouts
		var id = window.setTimeout(function() {}, 0);
		while (id--) {window.clearTimeout(id);}

		if (nav.css('position') === "fixed") {
			container.css('height','auto');
			return;
		}
		container.css('height', $(element).outerHeight(true) + 'px');
	}
	function toggleInactiveArticles() {
		if (nav.css('position') === "fixed"){
			container.find('article:not(.active)').css('display','none');
		} else {
			container.find('article:not(.active)').attr('style','');
		}
	}
	function refreshBgIcon() {
		if (typeof selectedCharacter === 'number'){
			if (selectedCharacter < characters.length-1) {selectedCharacter++;}
			else {selectedCharacter = 0;}
		}
		else {selectedCharacter = Math.floor(Math.random() * characters.length);}

		body.removeClass().addClass(characters[selectedCharacter]);
		container.removeClass().addClass(characters[selectedCharacter]);
	}
	function loadDeepLink () {
		if (document.location.hash) {
			nav.css('display','block');
			if (document.location.hash === '#debug') {
				$('body').prepend($('<div id="debug" />')
					.append($('<p />').text('screen width: '+window.screen.width))
					.append($('<p />').text('screen height: '+window.screen.height))
					.append($('<p />').text('innerWidth: '+window.innerWidth))
					.append($('<p />').text('innerHeight: '+window.innerHeight))
					.append($('<p />').text('outerWidth: '+window.outerWidth))
					.append($('<p />').text('outerHeight: '+window.outerHeight))
				);
			} else {
				document.getElementById(document.location.hash.slice(9)).click();
			}
		}
		else { adjustPageHeight($('#resume')); }
	}

	/* LISTENERS */
	navLinks.on('click',function(){
		var clickedLink = $(this);

		if ($(articles[clickedLink.index()]).hasClass('active')) {return;}

		if (clickedLink.parent('nav').css('position') === "fixed") {
			refreshBgIcon();

			footer.addClass('hidden');

			container.find('.active').fadeOut(function(){
				articles[clickedLink.index()].click();
				$('.active').fadeIn();
				footer.removeClass('hidden');
			});
		}
		articles[clickedLink.index()].click();
	});

	$('body > footer').on('click', function(){
		if (window.innerWidth >= 710) {
			$(this).removeClass('qr');
			return;
		}
		$(this).toggleClass('qr');
	})

	function toggleNavPad () {
		if ((window.screen.width === 375  && window.screen.height === 812)  // iPhone X portrait
		 || (window.screen.width === 414  && window.screen.height === 896)  // iPhone Xs Max portrait
		 || (window.screen.width === 834 && window.screen.height === 1194)  // iPad Pro 11" portrait
		 || (window.screen.width === 1024 && window.screen.height === 1366) // iPad Pro 12.9" portrait
		 ){
		   // special code for avoiding bottom bar on iOS
		   $('nav').addClass('padded');
		} else {
		   $('nav').removeClass('padded');
		}
	};
	toggleNavPad();

	$(window).on('resize', function(event) {
		$('body > footer').removeClass('qr');
		toggleInactiveArticles();
		toggleNavPad();
		adjustPageHeight(container.find('.active'));
	});

	zoomImage.on('click',function(){
		if($(this).parent().hasClass('three-images')) {
			$(this).prependTo($(this).parent());
			$(this).siblings().removeClass('zoom');
		}
		$(this).toggleClass('zoom');

		activeArticle = $(this).parents('.case-study');
		window.setTimeout(function(){
			adjustPageHeight(activeArticle);
		}, 500);
	});

	//end Video/Animation Overlay
	articles.on('click', function(event) {
		//skip this whole click function if the clicked article is '.active'
		if ($(this).hasClass('active')) {return;}

		//update hash
		var newHash = this === $(this).parent().children(':first-child')[0] ? '' : "section-"+$(this).attr('id');
		if (history.replaceState && typeof(history.replaceState) === "function") {
		if (this === $(this).parent().children(':first-child')[0]) { window.history.replaceState("object or string", "Title", 'index.html'); }
			else { window.history.replaceState("object or string", "Title", "#" + newHash); }
		} else {
			document.location.hash = newHash;
		}

		//update new article and corresponding link to have 'active' class
		$('.active').removeClass('active');
		$(this).addClass('active');
		$(navLinks[$('.active').index()]).addClass('active');

		//change the icon if the last article is selected
		if ($(this).index() === articles.length-1) {refreshBgIcon();}

		$(this).parents('div').css('margin-left', $(this).index() * -875 + 'px');
		$('html, body').stop().animate({scrollTop:0});
		adjustPageHeight(this);

		$('#viewer').remove();
	});

	/* Start Page */
	loadDeepLink();
	toggleInactiveArticles();
	refreshBgIcon();

	$('.case-study').on('click','.gallery',function(e){
		if ($(this).css('position') === "static" || $(this).hasClass('expand')) {
			// Expanded either because the window is small or the gallery has been clicked
			var galleryImages = $(this).children('img');
			if ($(e.target).hasClass('collapse')) {
				$(this).removeClass('expand');
				galleryImages.removeClass('static focus');
				$(this).parent('section').find('.static.zoom').slideUp(function(){$(this).remove()});
				window.setTimeout(function(){
					adjustPageHeight(galleryImages.parents('article'));
				}, 500);
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
				window.setTimeout(function(){
					adjustPageHeight(galleryImages.parents('article'));
				}, 500);
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
			window.setTimeout(function(){
				adjustPageHeight(gallery.parents('article'));
			}, 300);
		}
	});
	$('.case-study').on('click','.static.zoom',function(){
		$(this).siblings('.gallery.expand').find('.focus').click();
	});
});
