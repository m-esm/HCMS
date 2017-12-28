/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
$(function () {


    var busy = false;



    $('body').bind('mousewheel', function (e) {

        if (busy)
            return;


        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
            return;

        var currentPage = $('section.page.page-active');
        var nextPage = currentPage.next('section');
        var prevPage = currentPage.prev('section');

        setTimeout(function () {

            busy = false;

        }, 500);


        if (e.originalEvent.wheelDelta / 120 > 0) {
            console.log('scrolling up !');

            if (prevPage.length > 0) {

                prevPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-top')
                    .removeClass('page-active');


                if (prevPage.hasClass('page-slider'))
                    $('header').removeClass('stick');

                busy = true;
            }


        }
        else {

            console.log('scrolling down !');

            if (nextPage.length > 0) {
                nextPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-down')
                    .removeClass('page-active');


                $('header').addClass('stick');

                busy = true;


            }


        }
    });


});