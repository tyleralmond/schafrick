//// COUNTDOWN ////

$(function() {
  $(".countdown-bg").delay(100).fadeIn("slow");
});

$(function() {
  var currentDate = new Date();
  $('.clock').countdown("2012/12/01", function(event) {
    $this = $(this);
    switch(event.type) {
      case "seconds":
      case "minutes":
      case "hours":
      case "days":
      case "weeks":
      case "daysLeft":
        $this.find('span#'+event.type).html(event.value);
        break;
      case "finished":
        $this.fadeTo('slow', .5);
        break;
    }
  });
});


//// PRELOADER ////

$(document).ready(function() {
  $('body').jpreLoader();
});


//// MODERNIZR ////

// if (!Modernizr.svg) {
//   $(".cube-nav, .nav-blog a").css("background-image", "url('img/nav-large.png')");
//   $(".launch-cube").css("background-image", "url('img/countdown-cube.png')");
// }


//// FADE ONLOAD ////

$(function() {
    $("#body-home header, #body-home footer").hide().delay(4600).fadeIn('slow');
    $(".p-one").hide().delay(500).fadeIn('slow').delay(2000).fadeOut('slow');
    $(".p-two").hide().delay(2500).fadeIn('slow').delay(2000).fadeOut('slow');
    $(".p-three").hide().delay(4500).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-four").hide().delay(4500*2).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-five").hide().delay(4500*3).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-six").hide().delay(4500*4).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-seven").hide().delay(4500*5).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-eight").hide().delay(4500*6).fadeIn('slow').delay(4000).fadeOut('slow');
    $(".p-nine").hide().delay(4500*7).fadeIn('slow');
});

// $(function() {
//   $(".body-secondary").delay(300).css("opacity","0").animate({opacity: 1}, 1000);
// });


//// NAV TOGGLE ////

$(function() {
	$(".search-toggle").on("click", function(e){
		$(".search").fadeToggle('fast');
		$(this).toggleClass("active");
    $(".main, .nav-footer").toggleClass("main-fade");
    e.preventDefault();
	});

	$(".search-toggle-industry").on("click", function(e){
		$(".search-industry").fadeToggle("fast");
    $(".search-clients, .search-effects").fadeOut("fast");
    $(".search-toggle-clients, .search-toggle-effects").removeClass("active-secondary")    
		$(this).toggleClass("active-secondary");
    e.preventDefault();
	});
	$(".search-toggle-clients").on("click", function(e){
		$(".search-clients").fadeToggle("fast");
		$(".search-industry, .search-effects").fadeOut("fast");
		$(".search-toggle-industry, .search-toggle-effects").removeClass("active-secondary")
		$(this).toggleClass("active-secondary");
    e.preventDefault();
	});
  $(".search-toggle-effects").on("click", function(e){
    $(".search-effects").fadeToggle("fast");
    $(".search-industry, .search-clients").fadeOut("fast");
    $(".search-toggle-industry, .search-toggle-clients").removeClass("active-secondary")
    $(this).toggleClass("active-secondary");
    e.preventDefault();
  });   		
});

//// MOBILE MENU ////

$(function() {
  /* prepend menu icon */
  $('nav').prepend('<a class="mobile-toggle" href="#">menu</a>');
  
  /* toggle nav */
  $(".mobile-toggle").on("click", function(e){
    $(".nav-main").slideToggle('fast');
    $(this).toggleClass("active");
    e.preventDefault();
  });
});


//// IMAGE CROSSFADE ////

function cycleImages(){
      var $active = $('#portfolio_cycler .active');
      var $next = ($active.next().length > 0) ? $active.next() : $('#portfolio_cycler img:first');
      $next.css('z-index',2);//move the next image up the pile
      $active.fadeOut(1500,function(){//fade out the top image
    $active.css('z-index',1).show().removeClass('active');//reset the z-index and unhide the image
          $next.css('z-index',3).addClass('active');//make the next image the top one
      });
    }

$(document).ready(function(){
  // run every 5s
  setInterval('cycleImages()', 5000);
})


//// FITVIDS - SHOW REEL ////

$(document).ready(function(){
  $(".show-reel").fitVids();
});


//// MAP TOGGLE - CONTACT ////

$(document).ready(function(){
  $(".map-toggle").on("click", function(e){
    $(".map").toggleClass('map-active');
    $(this).toggleClass("map-toggle-active");
    e.preventDefault();
  });
});


//// PORTFOLIO - MUST BE LAST SCRIPT ////

    /* Okay, everything is loaded. Let's go! (on dom ready) */
    $(function () {
        /* a generic product carousel - something that might appear in the body of a e-commerce site. */
        $('#slider-wrapper')
                .responsiveCarousel({
                    unitWidth:'compute',
                    // dragEvents: true,  // uncomment this line and comment the line below if you want mouse drag on regular screens and touch screens
                    dragEvents: Modernizr.touch,  // uncomment this line and comment the line above if you only want touch-enabled screens to have drag functionality.
                    responsiveUnitSize:function () {
                        var m, w, i = $(document).width(); // use the document width as a measuring stick to determine how many elements we want in the carousel.
                        if (i > 1400) {
                            m = 2;
                        }
                        else if (i > 900) {
                            m = 1.5;
                        }
                        else if (i > 700) {
                            m = 1;
                        }
                        else if (i > 600) {
                            m = 1;
                        }
                        else if (i > 400) {
                            m = 1;
                        }
                        else {
                            m = 1
                        }
                        return m;
                    },
                    onRedraw:function () {
                        // optional callback that is called after the slider is done adjusting to a new window width.  You can
                        // perform all sorts of cleanup here if you wish.  See my makeSameHeight jQuery plugin on github!
                    }
                });
    });

// Image Count

$(function () { 
  matchimage(); 
});

function matchimage() { 
  var targetposition = Math.abs($('.slider-target').position().left); 
  var matchthis = targetposition; 
  var visible = $('.slider-target li').filter(function () { return $(this).position().left == matchthis }).index(); 
  var total = $('.slider img').length; 
  
  $("#count").html((visible + 1) + ' / ' + total); 
}
