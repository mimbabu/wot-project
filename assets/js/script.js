$(document).ready(function(){
  $('.primary-c').owlCarousel({
    animateOut: 'slideOutDown',
    animateIn: 'flipInX',
    items:1,
    margin:30,
    stagePadding:30,
    smartSpeed:450
  });


  $(document).on('click', function (e){

    /* check if collapse part of nav has show*/
    var menu_opened = $('#mainnav .navbar-collapse').hasClass('show');
    var scroll_menu_opened = $('#mainnav-scroll .navbar-collapse').hasClass('show');

    /*console.log("main nav"+menu_opened);
    console.log("scroll nav"+scroll_menu_opened);*/

    var clickover = $(e.target);

    if (menu_opened === true && !clickover.hasClass("navbar-toggler")) {
        $("#mainnav button.navbar-toggler").click();
    }

    if (scroll_menu_opened === true && !clickover.hasClass("navbar-toggler")) {
        $("#mainnav-scroll button.navbar-toggler").click();
    }

});

  /*Team carousel*/
  $('.owlteam-carousel').owlCarousel({
      loop:false,
      margin:5,
      nav:true,
      dots: true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:1,
              slideBy: 1
          },
          400:{
              items:2,
              slideBy: 2
          },
          600:{
              items:3,
              slideBy: 3
          },
          1000:{
              items:4,
              slideBy: 4
          }
      }
  });

  $('.owlproduct-carousel').owlCarousel({
      loop:false,
      margin:15,
      nav:true,
      dots: true,
      autoplay:true,
      autoplayTimeout:3000,
      autoplayHoverPause:true,
      responsive:{
          0:{
              items:2,
              slideBy: 2
          },
          600:{
              items:3,
              slideBy: 3
          },
          800:{
              items:4,
              slideBy: 4
          },
          1000:{
              items:5,
              slideBy: 5
          }
      }
  });
});

$(function() {

  AOS.init({
   once: true
  });

    $('.custom-file-input').on('change', function() {
        let fileName = $(this).val().split('\\').pop();
        $(this).next('.custom-file-label').addClass("selected").html(fileName);
    });

    //Enable swiping...
    $("#heroCarousel").swipe({
        //Single swipe handler for left swipes
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $(this).carousel('prev');
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            $(this).carousel('next');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 75
    });

    //Enable swiping...
    $("#featuredCarousel").swipe({
        //Single swipe handler for left swipes
        swipeLeft: function(event, direction, distance, duration, fingerCount) {
            $(this).carousel('next');
        },
        swipeRight: function(event, direction, distance, duration, fingerCount) {
            $(this).carousel('prev');
        },
        //Default is 75px, set to 0 for demo so any distance triggers swipe
        threshold: 75
    });


});

$( window ).resize(function() {
  /*console.log("resized");*/
  $('header').css('background-image',"url('assets/site/images/sliderbg.jpeg')");

});

$(document).ready(function() {

    // Fragment exists
    if(window.location.hash) {
      $('.mainmenu a').removeClass('nav-link-selected');

      //not scrolling on top
      $('.mainmenu a[href="'+window.location.origin + window.location.hash+ '"]').addClass('nav-link-selected');


    }


    // Add smooth scrolling to all links
    $("a").on('click', function(event) {

        base_url = window.location.origin + '/';


        //fix for localhost subfolder link
        if(base_url == 'http://localhost/'){
          base_url = 'http://localhost/braincraftapps.com.public/';
        }else{
          /*console.log(base_url);*/
        }

        // Make sure this.hash has a value before overriding default behavior
        //if (this.hash !== "" && (window.location.href === 'http://insidetec.co/')) {

        //make current url without the hash
        curref =location.protocol+'//'+location.hostname+(location.port?":"+location.port:"")+location.pathname+(location.search?location.search:"");

        //exception of scroll to tag
        if(this.hash === '#featuredCarousel' || this.hash ==='#heroCarousel' || this.hash === '#reviewscarousel'){
          // this is exception, dont trigger default scroll behaviour for slider nav buttons

        }else if (this.hash !== "" && (curref === base_url)) {
          //if there is a hash and the url is homepage

            // Prevent default anchor click behavior
            event.preventDefault();

            // Store hash
            var hash = this.hash;

            //remove select marker from all links
            //$('mainmenu a[href="'+window.location.origin+'"]').removeClass('nav-link-selected');

            $('.mainmenu a').removeClass('nav-link-selected');

            //add select marker to current hash
            //console.log('a[href="'+window.location.origin +hash+ '"]');
            $('a[href="'+window.location.origin + hash+ '"]').addClass('nav-link-selected');


            // Using jQuery's animate() method to add smooth page scroll
            // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 800, function() {

                // Add hash (#) to URL when done scrolling (default click behavior)
                window.location.hash = hash;
                //$(this).addClass('nav-link-selected');



            });
        } // End if
    });


    //$('.menu').addClass('active');
});

$(".popupFacebook").on("click", function() {
    var href = $(this).data('href');
    var fbpopup = window.open("https://www.facebook.com/sharer/sharer.php?u=" + href, "pop", "width=600, height=400, scrollbars=no");
    return false;
});

$(".popupTwitter").on("click", function() {
    var href = $(this).data('href');
    var text = $(this).data('text');
    var twpopup = window.open("https://twitter.com/intent/tweet?url=" + href + "&text=" + text, "pop", "width=600, height=400, scrollbars=no");
    return false;
});

$(".popupGoogle").on("click", function() {
    var href = $(this).data('href');
    var text = $(this).data('text');
    var fbpopup = window.open("https://twitter.com/intent/tweet?url=" + href + "&text=" + text, "pop", "width=600, height=400, scrollbars=no");
    return false;
});

$(".popupLinkdin").on("click", function() {
    var href = $(this).data('href');
    var text = $(this).data('text');
    var fbpopup = window.open("https://www.linkedin.com/shareArticle?mini=true&url=" + href, "pop", "width=600, height=400, scrollbars=no");
    return false;
});

window.onscroll = function() {
    scrollFunction()
};

var load_fresh = true;

function scrollFunction() {

      var scrollPos = $(document).scrollTop();

      //console.log(scrollPos);
      if(scrollPos > 5000){
        $('.scrollToTop').css('opacity','1');
      }else{
        $('.scrollToTop').css('opacity','0');
      }


      if(scrollPos < 50){
        current_url = window.location.href  ;
        /*console.log(current_url);*/
        base_url = window.location.origin + '/';
        /*console.log(base_url);*/
        if(current_url == base_url){
          $('.mainmenu a').removeClass("nav-link-selected");
          $('.mainmenu a.home-link').addClass("nav-link-selected");
        }

      }else{
        $('#mainnav-scroll a.nav-link').each(function () {
            var currLink = $(this);

            //var linkParts = currLink.attr("href").split("#");
            //console.log($(this));

            var divTarget = $(this).data('homediv');

            var refElement = $('#'+divTarget);
            //console.log(refElement);

            // only try if the divs re found
            if ($('#'+divTarget).length ) {


              if ( (refElement.position().top - 50) <= (scrollPos) && refElement.position().top + refElement.height() - 50 > (scrollPos)) {
                  $('#mainnav-scroll ul li a').removeClass("nav-link-selected");
                  currLink.addClass("nav-link-selected");
              }
              else{
                  currLink.removeClass("nav-link-selected");
              }
            }
        });
      }





    //scrolling down, hide
    if (document.body.scrollTop > 800 || document.documentElement.scrollTop > 800) {

        //$("#mainnav").off("animationend webkitAnimationEnd MSAnimationEnd oAnimationEnd","**");


        //$("#brandlogo").addClass('brand-shrinked');
        $("#mainnav-scroll").removeClass('floatingnav-exit');
        $("#mainnav-scroll").addClass('floatingnav-enter');

        //$("#mainnav").removeClass('floatingnav-reverse');

        load_fresh = false;


    } else if (load_fresh) {
        //site just loaded
        //console.log("fresh load, no anime");
    } else {
        //scrolling up
        $("#mainnav-scroll").removeClass('floatingnav-enter');
        $("#mainnav-scroll").addClass('floatingnav-exit');

        //$("#brandlogo").removeClass('brand-shrinked');
        //$("#mainnav").addClass('floatingnav-reverse');
        //$("#mainnav").removeClass('floatingnav');


        //document.getElementById("logo").style.fontSize = "35px";
    }
}


$(window).load(function() {
  // When the page has loaded
  $("body").fadeIn(1000);
});
