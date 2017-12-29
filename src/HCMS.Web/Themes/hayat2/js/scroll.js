/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
$(function () {



    var busy = false;

    var onHashChange = function () {

        if (!busy)
            changePage($(window.location.hash.toLowerCase()), "down");


    };

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

        setTimeout(function () {

            $('[data-aos]', nextPage)
 .addClass('aos-animate');


            $('[data-aos]', prevPage)
.addClass('aos-animate');

        }, 1000);



        // $('[data-aos]', currentPage).removeClass('aos-animate');



        if (currentPage.attr('id') === nextPage.attr('id'))
            return;



        if (mode === "up") {

            if (prevPage.length > 0) {


                prevPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-top')
                    .removeClass('page-active');


                if (prevPage.hasClass('page-slider'))
                    $('header').removeClass('stick');


                if (prevPage.attr('id'))
                    window.location.hash = prevPage.attr('id');


            }


        }
        if (mode === "down") {



            if (nextPage.length > 0) {
                nextPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-down')
                    .removeClass('page-active');


                $('header').addClass('stick');


                if (nextPage.attr('id'))
                    window.location.hash = nextPage.attr('id');



            }


        }

        //   $(window).bind('hashchange', onHashChange);


    };


    $('body').bind('mousewheel', function (e) {


        if (busy)
            return;


        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
            return;
        if (e.originalEvent.wheelDelta / 120 > 0) {

            console.log('scrolling up !');

            changePage(false, 'up');

        } else {

            console.log('scrolling down !');
            changePage(false, 'down');


        }

        changePage();

    });


        $(window).scrollTop(0);
    $(window).bind('hashchange', onHashChange);

    if (window.location.hash.length > 2)
        changePage($(window.location.hash.toLowerCase()), "down");
    else
        window.location.hash = $('section.page').first().attr('id');


    console.log('going to ' + window.location.hash);


});

