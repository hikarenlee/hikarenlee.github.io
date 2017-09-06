//Main Script
$(document).ready(function() {
  //navigation collapse
  $('#collapse').click(function(){
    if($(this).hasClass('shown')){
      $('#nav').slideUp().removeClass('visible');
      $(this).text("Show Navigation");
      $(this).removeClass('shown');
    } else {
      $('#nav').slideDown().addClass('visible');
      $(this).text("Collapse Navigation");
      $(this).addClass('shown');
    }
  });

  if (window.innerWidth < 760) {
    $('#nav a').on('click', function(){
      $('#collapse').trigger('click');
    });
  } else {
    $('#nav').slideDown().addClass('visible');
    $('#collapse').text("Collapse Navigation");
    $('#collapse').addClass('shown');
  }

  //nav links
  $("#portfoliobtn, .portfolio-menu").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#portfolio").offset().top -45
    }, 600);
  });
  $("#aboutbtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#about").offset().top -45
    }, 600);
  });
  $("#skillsbtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#skills").offset().top -45
    }, 600);
  });
  $("#goalsbtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#goals").offset().top -20
    }, 600);
  });
  $("#experiencebtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#experience").offset().top -50
    }, 600);
  });
  $("#educationbtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#education").offset().top -20
    }, 600);
  });
  $("#contactbtn").on('click', function() {
    $('html, body').animate({
      scrollTop: $("#contact").offset().top -30
    }, 600);
  });

  //nav snap
  $(window).scroll(function(scroll) {
    var navStart = $('#container').offset().top;
    if (window.innerWidth > 760){
      navStart += 24;
    }
    var scroll = $(window).scrollTop();
    if (scroll > navStart) {
      $('#mainNav').addClass('snap');
    } else {
      $('#mainNav').removeClass('snap');
    }
  });

  /* PORTFOLIO & SHOWCASE */
  /* THIS LOOP REPLACED WITH THE FOREACH BELOW
  var portfolioTypes = $('#portfolio-top a p');
  for (var i = 0; i < portfolioTypes.length; i++) {
    var that = $(portfolioTypes[i]);
    that.html(_wordwrap(that));
  }*/

  Array.prototype.forEach.call($('#portfolio-top a p'), function loopThroughParagraphs(paragraph) {
    var paragraph = $(paragraph);
    paragraph.html(_wordwrap(paragraph));
  });

  $('#UX-link').on('click', function(){
    $('#portfolio-top').slideUp();
    $('#UX').slideDown();
  });
/*  $('.subNav a').on('click',function(el){
    $('.subNav .ux-active').removeClass('ux-active');
    $('#UX article').hide().removeClass('ux-active');
    var index = $(this).index();
    $(this).addClass('ux-active');
    $($('#UX article')[index]).fadeIn().addClass('ux-active');
  });*/

  $('#FED-link').on('click', function(){
    $('#portfolio-top').slideUp();
    $('#FED').slideDown();
  });
  $('#PRINT-link').on('click', function(){
    $('#portfolio-top').slideUp();
    $('#PRINT').slideDown();
  });
  $('#portfoliobtn, .portfolio-menu').on('click',function(){
    if( $('#portfolio-top').css('display') == 'none' )  {
      $('#portfolio section:nth-of-type(n+1)').slideUp();
      $('#portfolio-top').slideDown();
    }
  });

  //Handle deep linking
  var hash = window.location.hash;
  if(hash){
    /*var deepLink = hash+'-link';
    $(deepLink).trigger('click');*/
    $('#portfolio-top').css('display','none');
    $(hash).css('display','block');
    $('body').animate({
      scrollTop: $(hash).offset().top - 30
    }, 400);
  }

  var browser = $('#browser'),
      tab = $("#tab"),
      feature = $('#feature'),
      project = $('.project');

  //Rules for Showcase Open
  project.on("click", 'a', function(){
    //sets clicked portfolio <a> tag to active
    $(this).addClass('active');
    //prevent scrolling in body
    $('body').css({'overflow':'hidden'});
    $(document).bind('scroll',function () {
      window.scrollTo(0,0);
    });
    populateShowcase($(this));
    $('#showcase').fadeIn();
    setAR();//NOT WORKING
  });

  var populateShowcase = function(el){
    var portfolioElement = el;
    var projectName = portfolioElement.parent('li').data("project");
    $.ajax({
      url: 'https://brimwd.github.io/2014/showcase/'+projectName+'.html',
      dataType: 'html',
      success: function(response) {
        portfolioElement.html(response);
        //clones images from project into browser
        var images = $(response).filter('img');
        images.each(function(){
          var $a = $('<a></a>');
          var $li = $('<li></li>');
          var $alt = $(this).attr('alt');
          browser.find('ul').append($li);
          $a.appendTo($li);
          $li.append($alt);
          $(this).appendTo($a).fadeIn();
        });
        //sets # of images in browser
        if (images.length == 1){
          browser.find('h4').hide().text("1 Image").fadeIn();
          tab.find('span').text(images.length);
        } else {
          browser.find('h4').hide().text(images.length+ " Images").fadeIn();
          tab.find('span').text(images.length);
        }
        //sets project title in nav-bar
        var title = portfolioElement.parent().children('h3');
        $('.nav p').text(title.text());
        if (title.text() == "Unity Game"){
          var $play = '<a id="playbutton" href="apps/index.html" target="new"><i class="fa fa-gamepad"></i> Play</a>';
          $('.nav p').append($play);
        }
      },
      type: 'GET'
    });
    //sets featured image
    var featImg = portfolioElement.children('img');
    getFeature($(featImg[0]));
    browser.find('a:first').addClass('active');
  }

  var getFeature = function(ft){
    //sets feature image and text
    feature.css('background-image','url('+ft.attr('src')+')');
    feature.find('h3').text(ft.attr('alt'));
    setAR();
  }

  //Rules for Showcase Close
  var hideShowcase = function(){
    $('#showcase').fadeOut(clearBrowser);
    $(document).unbind('scroll');
    $('body').css({'overflow':'visible'});
    $('#FED .active, #PRINT .active').removeClass('active');
  }
  var clearBrowser = function(){
    browser.children('h3').remove();
    browser.children('ul').find('li').remove();
  }
  var toggleBrowser = function(){
    if ($('#tab').hasClass('open')) {
      $('#tab').removeClass('open');
      browser.removeClass('open');
    } else {
      $('#tab').addClass('open');
      browser.addClass('open');
    }
  };

  $('#closeshowcase').on("click", hideShowcase);

  browser.on("click", 'img', function(){
    browser.find('a').removeClass('active');
    $(this).parent('a').addClass('active');
    getFeature($(this));
    if ($('#tab').hasClass('open')) {
      $('#tab').removeClass('open');
      browser.removeClass('open');
    }
    setAR();
  });

  $('#prevproject').on('click', function(){
    var $active = $('.active');
    var $prev = $active.parent('li').prev();
    if (!$prev.length) {
      $prev = $active.parent('li').siblings('.project').last();
    }
    $active.removeClass('active');
    $prev.find('a').addClass('active');
    clearBrowser();
    populateShowcase($('.active'));
  });

  $('#nextproject').on('click', function(){
    var $active = $('.active');
    var $next = $active.parent('li').next('.project');
    if (!$next.length) {
      $next = $active.parent('li').siblings('.project').first();
    }
    $active.removeClass('active');
    $next.find('a').addClass('active');
    clearBrowser();
    populateShowcase($('.active'));
  });

  $('#tab').on('click', toggleBrowser);
  $('#overlay').on('click', toggleBrowser);

  $('#expand').on('click', function(){
    var $featureImgURL = feature.css('background-image');
        $featureImgURL = $featureImgURL.replace('url(','').replace(')','').replace('"','').replace('"','');
    window.open($featureImgURL);
  })

  $('#showmore').click(function(){
    if ($(this).hasClass('shown')){
      $(this).removeClass('shown').text('Show More Work');
      $('#experience .xp').slideUp();
    } else {
      $(this).addClass('shown').text('Show Less Work');
      $('#experience .xp').slideDown();
    }
  });

  $('#skillsmenu').click(function(){
    var skillsTitle = $('#skills h1 span').text();
    var altText = "Skills I Use";
    var defaultText = "Skill Proficiency";
    if (skillsTitle == altText){
      $('#skills h1 span').text(defaultText);
      $('#skills .frequency').addClass('hide');
      $('#skills .proficiency').removeClass('hide');
    } else {
      $('#skills h1 span').text(altText);
      $('#skills .frequency').removeClass('hide');
      $('#skills .proficiency').addClass('hide');
    }
  });

  //set AR of #feature background
  var setAR = function(){
    var $featureImgURL = feature.css('background-image');
        $featureImgURL = $featureImgURL.replace('url(','').replace(')','').replace('"','').replace('"','');
    var $featureImg = new Image;
        $featureImg.src = $featureImgURL;
    var naturalAR = $featureImg.width / $featureImg.height;
    //function to change ratio
    var setRatio = function(){
      var featureAR = $('#feature').width() / $('#feature').height();
      if (naturalAR > featureAR) {
        // image is MORE landscape than the window
        feature.css('background-size','100% auto');
      } else {
        // image is more PORTRAIT than the window
        feature.css('background-size','auto 100%');
      }
    };
    //set initial background ratio
    setRatio();
    //set background ration on window resize
    $(window).on('resize', setRatio);
  };

  $('#about .text > a').on('click', function(){
    if ($('#about .text').hasClass('hide')){
      $('#about .text > p').css('color','inherit');
      $('.contact').hide();
      $(this).text('Contact Brian');
      $('#about .text').removeClass('hide');
    } else {
      $('#about .text > p').css('color','#F5E6E3');
      $('.contact').show();
      $(this).text('Read Bio');
      $('#about .text').addClass('hide');
    }
  });

  //navigation window resize
  $(window).on('resize', function(event) {
    if (window.innerWidth >= 760){
      if($('#collapse').hasClass('shown')){
      } else {
        $('#nav').css('display','block');
        $('#collapse').text("Collapse Navigation");
        $('#collapse').addClass('shown');
      }
    } else {
      if($('#collapse').hasClass('shown')){
        $('#nav').css('display','none');
        $('#collapse').text("Show Navigation");
        $('#collapse').removeClass('shown');
      }
    }
    if (window.innerWidth < 800){
      if ($('#star-box').hasClass('fly')){
        $('#star-box').removeClass('fly');
        $('#gameCanvas').addClass('hide');
        $('#info').addClass('hide');
        $('#display-font').removeClass('hide');
      }
    }
    /* PORTFOLIO AUTO-HIDE -- DEPRECIATED
      if (window.innerWidth >= 1050){
      if ($('#showportfolio').hasClass('shown')){
        $('#portfolio .d').css('display','inline-block');
      } else {
          $('#portfolio .c').css('display','none');
          $('#portfolio .b').css('display','inline-block');
          $('#portfolio .a').css('display','inline-block');
      }
    } else {
      $('#portfolio .d').css('display','none');
      if ($('#showportfolio').hasClass('shown')){
        } else if (window.innerWidth >= 820){
          $('#portfolio .b').css('display','none');
          $('#portfolio .a').css('display','inline-block');
        } else {
          $('#portfolio .a').css('display','none');
        }
    }*/
  });

  //play game
	$('#display-font a').click(function(){
		$('#star-box').addClass('fly');
		$('#gameCanvas').removeClass('hide');
		$('#info').removeClass('hide');
		$('#display-font').addClass('hide');
    $('#starfield').removeClass('hide');
    starfield.start();
	});

  //mute game
  $('#muteLink').click(function(event){
    event.preventDefault();
  });
});

/*Code for toggling frames within UX Process*/
function updateFrame ($newFrameIndex) {
  var $currentProject = $('#UX .ux-active ol');
  if ($currentProject.children('.selected').index() != $newFrameIndex-1) {
    $currentProject.children().hide().removeClass('selected').eq($newFrameIndex-1).fadeIn().addClass('selected');
  }
};
/*move by arrow*/
$('#UX article nav i').on('click',function(el){
  var $clickedArrow = $(el.target);
  var $selectedFrameNumber = $clickedArrow.parents('ul').find('.selected');
  if($clickedArrow.hasClass('fa-chevron-left') && $selectedFrameNumber.index() != 1){
    //prev arrow clicked && not first frame
    $selectedFrameNumber.removeClass('selected').prev().addClass('selected');
  } else if ($clickedArrow.hasClass('fa-chevron-right') && $selectedFrameNumber.index() != $selectedFrameNumber.siblings().length -1){
    //next arrow clicked && not last frame
    $selectedFrameNumber.removeClass('selected').next().addClass('selected');
  }
  //check selected position function
  toggleArrows($selectedFrameNumber.parent().find('.selected'));
  updateFrame($('#UX .ux-active nav .selected').index());
});
/*move by frame number*/
$('#UX article nav a').on('click',function(el){
  var $clickedFrameNumber = $(el.target).parent('li');
  $clickedFrameNumber.parents('ul').find('.selected').removeClass('selected');
  $clickedFrameNumber.addClass('selected');
  toggleArrows($clickedFrameNumber);
  updateFrame($('#UX .ux-active nav .selected').index());
});

function toggleArrows ($selectedFrame){
  //show both arrows
  var $leftArrow = $selectedFrame.siblings().first(),
      $rightArrow = $selectedFrame.siblings().last();
  if ($selectedFrame.index() == 1) {
    //hide left arrow
    $leftArrow.addClass('off');
    $rightArrow.removeClass('off');
  } else if ($selectedFrame.index() == $selectedFrame.siblings().length -1){
    //hide right arrow
    $leftArrow.removeClass('off');
    $rightArrow.addClass('off');
  } else {
    $leftArrow.removeClass('off');
    $rightArrow.removeClass('off');
  }
};

//justified text wordbreak & hyphenation
function _wordwrap(inputText) {
  var unformattedArray = inputText.text().split(' ');
  var formatted = [];
  var minBreakLength = 9;

  for(var i = 0; i < unformattedArray.length; i++) {
    if (unformattedArray[i].length >= minBreakLength){
      var formattedWord = unformattedArray[i].split('').join('&shy;');
      var singleDashes = formattedWord.split('&shy;-&shy;').join('-');
      formatted.push(singleDashes);
    } else {
      formatted.push(unformattedArray[i]);
    }
  }

  return formatted.join(' ');
};