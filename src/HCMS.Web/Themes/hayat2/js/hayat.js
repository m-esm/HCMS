/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(document).on('mouseenter mouseleave', 'section.page-blocks area', function (event) {

    var wrapper = $('section.page-blocks');

    var target = $(event.target);


    if (event.type == "mouseenter")
        $(target.attr('data-block'), wrapper).addClass('in');


    if (event.type == "mouseleave")
        $(target.attr('data-block'), wrapper).removeClass('in');


});

/// <reference path="../lib/aos/aos.js" />


//AOS.init({
//    offset: 200,
//    duration: 600,
//    easing: 'ease-in-sine',
//    delay: 500,
//});


$(document).ready(function () {

    setTimeout(function () {

        $('#loader').fadeOut();

    }, 1000);

    $('.right-icons li').click(function () {

        $('.right-icons li').not(this).removeClass('open');

        $(this).toggleClass('open');


    });

    // Smoth scroll on page hash links
    $('a[href*="#"]:not([href="#"])').on('click', function () {
        if (location.pathname.replace(/^\//, '') === this.pathname.replace(/^\//, '') && location.hostname === this.hostname) {
            var target = $(this.hash);
            if (target.length) {

                var top_space = 0;

                if ($('#header').length) {
                    top_space = $('#header').outerHeight();
                }

                $('html, body').animate({
                    scrollTop: target.offset().top - top_space
                }, 1500, 'easeInOutExpo');

                if ($(this).parents('.nav-menu').length) {
                    $('.nav-menu .menu-active').removeClass('menu-active');
                    $(this).closest('li').addClass('menu-active');
                }

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('#mobile-nav-toggle i').toggleClass('fa-times fa-bars');
                    $('#mobile-body-overly').fadeOut();
                }

                return false;
            }
        }
    });

   
});
/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
$(function () {



    var busy = false;

    var onHashChange = function () {

        if (!busy)
            changePage($(window.location.hash.toLowerCase()), "down");

    };

    $('.back-to-top').click(function () {

        var btn = $(this);


        window.location.hash = $('section.page').first().attr('id');


    });


    var changePage = function (nextPage, mode) {



        if (busy)
            return;

        busy = true;

        setTimeout(function () {

            busy = false;

        }, 1000);




        var currentPage = $('section.page.page-active');

        if (!nextPage)
            nextPage = currentPage.next('section.page');
        else
            if (currentPage.attr('id') === nextPage.attr('id'))
                return;

        var prevPage = currentPage.prev('section.page');

        setTimeout(function () {

            $('[data-aos]', nextPage).addClass('aos-animate');


            $('[data-aos]', prevPage).addClass('aos-animate');

        }, 1000);

            if (nextPage.hasClass('page-horizontal') || prevPage.hasClass('page-horizontal'))
                $('.back-to-top').addClass('horizontal');

        // $('[data-aos]', currentPage).removeClass('aos-animate');






        if (window.location.pathname !== "/") {

            $('header').addClass('navhide');
            $('.homelogo').fadeIn();

        }

        if (mode === "up") {

            if (prevPage.length > 0) {


                prevPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-top')
                    .removeClass('page-active');


                if (prevPage.hasClass('page-slider'))
                    $('header').removeClass('stick');


                if (prevPage.prev('section.page').length == 0)
                    $('.back-to-top').fadeOut();
                else {
                    $('.back-to-top').fadeIn();
                }


                if (window.location.pathname === "/")
                    if (!prevPage.hasClass('page-slider'))
                        $('header').addClass('stick');


                if (prevPage.attr('id'))
                    window.location.hash = prevPage.attr('id');


            }


        }
        if (mode === "down") {



            if (nextPage.length > 0) {

                nextPage
                    .addClass('page-active')
                    .removeClass('page-deactive-top')
                    .removeClass('page-deactive-down');

                currentPage
                    .addClass('page-deactive-down')
                    .removeClass('page-active');


                if (nextPage.prev('section.page').length == 0)
                    $('.back-to-top').fadeOut();
                else {
                    $('.back-to-top').fadeIn();
                }


                if (window.location.pathname === "/")
                    if (!nextPage.hasClass('page-slider'))
                        $('header').addClass('stick');


                if (nextPage.attr('id'))
                    window.location.hash = nextPage.attr('id');



            }


        }

        //   $(window).bind('hashchange', onHashChange);


    };


    var mousewheel = function (e) {

        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
            return;


        var wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail;

        if (wheelDelta / 120 > 0) {
            changePage(false, 'up');
        } else {
            changePage(false, 'down');
        }


    };


    $(document).keydown(function (e) {
        switch (e.which) {
            case 37:
                changePage(false, 'up');
                break;
            case 38:
                changePage(false, 'up');
                break;
            case 39:
                changePage(false, 'down');
                break;
            case 40:
                changePage(false, 'down');
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $("body").swipe({

        //Generic swipe handler for all directions
        swipe: function (e, direction, distance, duration, fingerCount, fingerData) {
            if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
                return;

            changePage(false, direction == "up" ? "down" : "up");

        }
    });


    // For Chrome
    window.addEventListener('mousewheel', mousewheel);

    // For Firefox
    window.addEventListener('DOMMouseScroll', mousewheel);


    $(window).scrollTop(0);

    if (window.location.hash.length > 2)
        changePage($(window.location.hash.toLowerCase()), "down");
    else
        window.location.hash = $('section.page').first().attr('id');

    $(window).bind('hashchange', onHashChange);

});


/// <reference path="../node_modules/jquery/dist/jquery.js" />
/// <reference path="../node_modules/async/dist/async.js" />

var slider = {
    timer: 0,
    sliderSelector: $('#slider'),
    interval: 8000,
    outTimeout: 500,
    sliceHeight: $(document).innerHeight(),
    sliceTimeout: 100,
    sliceOut: true,
    oneSlice: true,
    next: function (nextIndex) {

        var currentSlideIndex = $('.slide.active', this.sliderSelector).index();

        if (currentSlideIndex === -1) {
            currentSlideIndex = 0;
        }
        var currentSlide = $($('.slide', this.sliderSelector)[currentSlideIndex])
                     .removeClass('active');

        //  console.log(currentSlide);

        if (nextIndex === undefined)
            nextIndex = currentSlideIndex + 1;

        if (nextIndex === $('.slide', this.sliderSelector).length)
            nextIndex = 0;

        var nextSlide = $('.slide', this.sliderSelector)[nextIndex];

        if (!nextSlide)
            nextSlide = currentSlide;
        else
            nextSlide = $(nextSlide);

        currentSlide.addClass('deactive');

        nextSlide.removeClass('deactive').addClass('active');

        $('.slice', nextSlide).removeClass('out').removeClass('in');

        var sliceCount = $(document).innerHeight() / slider.sliceHeight;

        var animates = [];

        for (var i = 0; i < sliceCount; i++) {

            animates.push(i);


        }

        async.eachSeries(animates, function (item, callback) {

            var sliceIndex = item;

            setTimeout(function () {

                var nextSlices = $($('.slice', nextSlide)[sliceIndex]).addClass('in');


                setTimeout(function () {
                    if (nextSlide.index() !== currentSlide.index() && slider.sliceOut)
                        var prevSlices = $($('.slice', currentSlide)[sliceIndex]).addClass('out');

                }, slider.outTimeout);


                callback();

            }, (sliceIndex + 1) * slider.sliceTimeout);


        }, function () {

            setTimeout(function () {
                currentSlide.removeClass('deactive');
            }, slider.interval - 10);


            clearTimeout(slider.timer);

            slider.timer = setTimeout(slider.next, slider.interval);

        });




    },
    init: function () {
        $('.slide', this.sliderSelector).each(function (index, elem) {

            var slide = $(elem);

            $('.slice', slide).remove();

            var imgSrc = $('img', elem).attr('src');
            for (var i = 0; i < $(document).innerHeight() / slider.sliceHeight; i++) {

                var slice = $('<div />')
                    .addClass('slice')
                    .css('backgroundImage', 'url(' + imgSrc + ')');

                if (!slider.oneSlice)
                    slice = slide
                    .height(slider.sliceHeight)
                        .css('backgroundPosition', '0 ' + i * -1 * slider.sliceHeight + 'px');


                if (slider.oneSlice)
                    slice.addClass('one');



                slide.append(slice);

            }

        });

        slider.next();

        //   slider.timer = setTimeout(slider.next, slider.interval);

    },
    stop: function () {
        clearInterval(this.timer);
    }

};

$(function () {

    slider.init();

    $(window).resize(slider.init);

});
/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(function () {


    $('#videos .tv').click(function () {

        var video = $('#video')[0];



        if (!video)
            return;


        if ($('source', video).length == 0)
            playVideo($('#videos .thumbnails div').attr('data-src'),false);

        if (video.paused) {

            $(this).addClass('play');

            video.play();

        }
        else {

            $(this).removeClass('play');

            video.pause();

        }


    });
    var playVideo = function (src, play) {

        if (!$('#video')[0])
            return;

        var video = $('#video')
            .html('')
             .append($("<source type='video/webm' />").attr('src', src))[0];



        if (play) 
            $('#videos .tv').addClass('play');
        else
            $('#videos .tv').removeClass('play');



        video.loop = true;

        video.pause();

        video.load();

        if (play)
            video.play();


    };


    $('#videos .thumbnails div').click(function () {

        playVideo($(this).attr('data-src'), true);

    });






});