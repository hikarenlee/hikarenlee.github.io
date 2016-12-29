var stars = $(".ratingStar"),
    currentRating = 0,
    clear = $("#clear"),
    ratingText = $('#ratingText'),
    ratingInitialOffset = "34px";

stars.on('click', function(){
  //get index of clicked star
  var index=$(this).index(),
      ratingOffset = "42px";
  resetRatingText();
  //reset stars to ☆ if reducing rating
  if (index < currentRating){clearStars();}
  currentRating = index;
  //convert ☆ to ★
  for (var i=0;i<=index;i++){
    $(stars[i]).addClass('fall').removeClass('fail').text('★').css('color','gold');
    /*You know you want to~~~
      if(index==4){$(stars[i]).text('💛');}
      ~~~*/
  } 
  switch(index) {
    case 0:
        caption = "How can we help?<a href='https://www.amazon.com/gp/help/contact-us/general-questions.html?skip=true' target='_blank'>Contact Support</a><a href='https://www.amazon.com/gp/orc/returns/homepage.html/ref=orc_surl_ret_hp?fg=1' target='_blank'>Initiate a return</a>";
        $('.ratingStar:first-of-type').addClass('fail');
        ratingOffset = "69px";
      break;
    case 1:
        caption = "Not good..."
      break;
    case 2:
        caption = "I like it"
      break;
    case 3:
        caption = "It's great!"
      break;
    case 4:
        caption = "OMG! I Love it!"
      break;
  }
  setTimeout(function(){
    if(index==0){ratingText.addClass('fail');}
    ratingText.html(caption).css('top',ratingOffset);
  },(300)); 
  
  //show #clear element
  clear.addClass('show');
  $('#clearTip').css('opacity', 1);
  setTimeout(function(){
    $('.fall').removeClass('fall');
  },(300));
});

clear.on('click', function(){
  //hide #clear element
  clear.removeClass('show');
  clearStars();
  resetRatingText();
});

$('body').on('click',function(el){
  if(currentRating == 0 && ratingText.hasClass('fail')){
    ratingText.removeClass('fail').html("Hated it. <a href='https://www.amazon.com/gp/orc/returns/homepage.html/ref=orc_surl_ret_hp?fg=1' target='_blank' style='display:inline'>Initiate a return?</a>").css('top','42px');
  }
});

var clearStars = function() {
  //convert all ★ to ☆
  $('.ratingStar').removeClass('fail').text('☆').css('color','white'); 
};
var resetRatingText = function() {
  //clears #ratingText
  ratingText.removeClass('fail').text('').css('top',ratingInitialOffset);
}

$('.links').on('click', 'a:nth-of-type(3)', function(event){
  stars[4].click();
  event.stopPropagation();
  $(this).remove();
})