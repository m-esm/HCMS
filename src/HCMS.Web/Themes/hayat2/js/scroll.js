/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
var keyLeftRight = false;
var busy = false;

$(document).on("mobileinit", function () {
    $.mobile.ignoreContentEnabled = true;
});

$(function () {

    var onHashChange = function () {
        if (!busy && !keyLeftRight)
            changePage($(window.location.hash.toLowerCase()), "down");
    };

    $('.back-to-top').click(function () {
        window.location.hash = $('section.page').first().attr('id');
    });

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
                keyLeftRight = true;
                break;
            case 38:
                changePage(false, 'up');
                break;
            case 39:
                keyLeftRight = true;
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
        swipeStatus: function (e, phase, direction, distance, duration, fingers, fingerData, currentDirection) {
            if (phase == "move" || phase == "start") {
                var $target = e.target.nodeName;
                if ($target.toLowerCase() === 'input') {
                    return false;
                } else {
                    if (duration > 20) {
                        //if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
                        //    return;
                        console.log($(e.target).parents().hasClass('page-horizontal'))
                        if (direction == "up" || direction == "down")
                            changePage(false, direction == "up" ? "down" : "up");

                        //else if (direction == "left" && !$(e.target).parents().hasClass('page-horizontal') && !$(e.target).hasClass('page-horizontal')) {
                        //    if (currentDirection == "left" && duration < 100)
                        //        $('#menu-bar').click();

                        //}
                        else
                            if (direction == "right" || direction == "left")
                                changeArticlePage(false, direction == "left" ? "right" : "left");
                    }

                }
            } else {
                if (direction == "left" && !$(e.target).parents().hasClass('page-horizontal') && !$(e.target).hasClass('page-horizontal')) {
                    if (currentDirection == "left" && duration < 300)
                        $('#menu-bar').click();

                }
            }
            //$(this).swipe('option', 'preventDefaultEvents', preventDefaultEvents);
        },

        preventDefaultEvents: false,
        threshold: 1,
        excludedElements: " input , textarea, .noSwipe, .cscroll"

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


var changePage = function (nextPage, mode) {
  
    if (busy)
        return;

    busy = true;

    setTimeout(function () {

        busy = false;

    }, 1000);

    var currentPage = $('section.page.page-active');

    if (currentPage.hasClass('stop'))
        return;

    if (!nextPage)
        nextPage = currentPage.next('section.page');
    else
        if (currentPage.attr('id') === nextPage.attr('id'))
            return;

    var find = false;
    while (!find) {
        if (nextPage.hasClass('hidden-mobile'))
            nextPage = nextPage.next('section.page');
        else
            find = true;
    }

    var prevPage = currentPage.prev('section.page');

    find = false;
    while (!find) {
        if (prevPage.hasClass('hidden-mobile'))
            prevPage = prevPage.prev('section.page');
        else
            find = true;
    }
 
    //if sign up age refresh captcha
    if (nextPage.attr('id') === 'signup' || nextPage.attr('id') === 'signup2' || nextPage.attr('id') === 'signup3') {
    
        refreshCaptcha();
    }

    setTimeout(function () {

        $('[data-aos]', nextPage).addClass('aos-animate');


        $('[data-aos]', prevPage).addClass('aos-animate');

    }, 1000);

    if (nextPage.hasClass('page-horizontal') || prevPage.hasClass('page-horizontal'))
        $('.back-to-top').addClass('horizontal');


    if (window.location.pathname !== "/") {

        $('header').addClass('navhide');
        $('.homelogo').fadeIn();

    }

    if (mode === "up") {

        if (prevPage.length > 0) {

            prevPage.addClass('page-active')
                .removeClass('page-deactive-top')
            .removeClass('page-deactive-down');

            if (prevPage.hasClass('hasChild'))
                prevPage.find('article').first().addClass('page-active');

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

            if (nextPage.hasClass('hasChild'))
                nextPage.find('article').first().addClass('page-active');

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
};

var refreshCaptcha = function() {
    $('form.register-form .captcha-field img').attr('src', 'manage/Captcha/msdn?prefix=captcha&guid=' + Date.now());
    $('form.contactForm .captcha-field img').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
}