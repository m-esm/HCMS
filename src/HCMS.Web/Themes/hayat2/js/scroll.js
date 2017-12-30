/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
$(function () {



    var busy = false;

    var onHashChange = function () {

        console.log('hashchange', window.location.hash.toLowerCase());

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

        }, 500);


        console.log(nextPage);

        var currentPage = $('section.page.page-active');

        if (!nextPage)
            nextPage = currentPage.next('section');

        var prevPage = currentPage.prev('section');


        console.log('next page', nextPage);


        setTimeout(function () {

            $('[data-aos]', nextPage)
 .addClass('aos-animate');


            $('[data-aos]', prevPage)
.addClass('aos-animate');

        }, 1000);

        if (nextPage.hasClass('page-horizontal') || prevPage.hasClass('page-horizontal'))
            $('.back-to-top').addClass('horizontal');

        // $('[data-aos]', currentPage).removeClass('aos-animate');



        if (currentPage.attr('id') === nextPage.attr('id'))
            return;

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


    var mousewheel =function (e) {

        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
            return;
        var wheelDelta = e.wheelDelta ? e.wheelDelta : -e.detail;

        if (wheelDelta / 120 > 0) {

            console.log('scrolling up !');

            changePage(false, 'up');

        } else {

            console.log('scrolling down !');
            changePage(false, 'down');


        }

        changePage();

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
  


    console.log('going to ' + window.location.hash);


});

