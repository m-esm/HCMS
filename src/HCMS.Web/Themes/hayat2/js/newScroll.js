/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
var busy = false;

$(function () {

    var onHashArtChange = function () {
        if (!busy)
            changeArticlePage($(window.location.hash.toLowerCase()), "right");

    };

    if ($('article.page-child').first().attr('id') == undefined)
        return;

    if (window.location.hash == undefined || $(window.location.hash).length == 0) {
        var _first = $('article.page-child').first();

        window.location.hash = _first.attr('id');


        if (!$(_first).parent('section.page').hasClass('page-active')) {
            $(_first).parent('section.page').addClass('page-active');
            $(_first).addClass('page-active');
        }
        console.log($(_first).parent('section.page'));

    }
    else {
        if ($('section' + window.location.hash).length > 0) {
            if (!$('section' + window.location.hash).hasClass('page-active'))
                $('section' + window.location.hash).addClass('page-active');


            $('section' + window.location.hash + ' article').first().addClass('page-active');
        } else {
            if (!$(window.location.hash).hasClass('page-active'))
                $(window.location.hash).addClass('page-active');

            if (!$(window.location.hash).parent('section').hasClass('page-active'))
                $(window.location.hash).parent('section').addClass('page-active')
        }

    }



    $(document).keydown(function (e) {
        alert(e.which);
        switch (e.which) {
            case 37:
                changeArticlePage(false, 'left');
                break;
            case 38:
                changeArticlePage(false, 'up');
                break;
            case 39:
                changeArticlePage(false, 'right');
                break;
            case 40:
                changeArticlePage(false, 'down');
                break;

            default: return; // exit this handler for other keys
        }
        e.preventDefault(); // prevent the default action (scroll / move caret)
    });

    $(window).bind('hashchange', onHashArtChange);

});


var toggleMobileMenu = function () {
    alert();
}
var changeArticlePage = function (nextArticle, mode) {
    if (nextArticle)
        if (nextArticle.attr("id") != undefined)
            if ($('article[id=' + nextArticle.attr("id") + ']').length === 0)
                return;

    if (busy)
        return;

    busy = true;

    setTimeout(function () {
        busy = false;
    }, 1000);

    if ($('section.page-active'))
    if ($('section.page-active article.page-child.page-active').length === 0) {
        var currentArticle = $('section.page-active article.page-child')[0];
        $(currentArticle).addClass('page-active');
    }

    //var currentArticle = $('article.page-child.page-active');
    var currentArticle = $('section.page-active article.page-child.page-active');

    if (!nextArticle)
        nextArticle = currentArticle.next('section.page-active article.page-child');
    //else
    //    if (currentArticle.attr('id') === nextArticle.attr('id'))
    //        return;

    var prevArticle = currentArticle.prev('article.page-child');
    setTimeout(function () {

        $('[data-aos]', nextArticle).addClass('aos-animate');
        $('[data-aos]', prevArticle).addClass('aos-animate');

    }, 1000);

    if (window.location.pathname !== "/") {

        $('header').addClass('navhide');
        $('.homelogo').fadeIn();

    }


    if (mode === "left") {
        if (prevArticle.length > 0) {

            currentArticle
              .addClass('page-deactive-top')
              .removeClass('page-active');

            prevArticle.parent('section.page')
                .removeClass('page-deactive-top')
                .removeClass('page-deactive-down')
                .addClass('page-active');

            prevArticle
                .addClass('page-active')
                .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

            if (window.location.pathname === "/")
                if (!prevArticle.parent('section.page').hasClass('page-slider'))
                    $('header').addClass('stick');


            if (prevArticle.attr('id'))
                window.location.hash = prevArticle.attr('id');
        } else {
            //back to main page
            window.location.href = "/#blocks";

        }
    }
    if (mode === "right") {
        if (nextArticle.length > 0) {

            currentArticle
                .addClass('page-deactive-down')
                .removeClass('page-active');

            nextArticle.parent('section.page')
                .removeClass('page-deactive-top')
                .removeClass('page-deactive-down')
                .addClass('page-active');

            nextArticle
                .addClass('page-active')
                .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

            if (window.location.pathname === "/")
                if (!nextArticle.parent('section.page').hasClass('page-slider'))
                    $('header').addClass('stick');


            if (nextArticle.attr('id'))
                window.location.hash = nextArticle.attr('id');
        }
    }


};
