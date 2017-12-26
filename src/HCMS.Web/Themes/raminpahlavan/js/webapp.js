var webapp = angular.module('webapp', ["ngRoute", "ngAnimate", "ngSanitize", 'btford.socket-io']);


function replaceDigits(input) {

    var map =
        [
            "&\#1632;", "&\#1633;", "&\#1634;", "&\#1635;", "&\#1636;",
            "&\#1637;", "&\#1638;", "&\#1639;", "&\#1640;", "&\#1641;"
        ];

    return input.replace(
        /\d(?=[^<>]*(<|$))/g,
        function ($0) { return map[$0] }
    );
}

//swal.setDefaults({
//    confirmButtonText: 'بسیار خب',
//});

$(document).ready(function () {

    setTimeout(function () {
        $('body').fadeIn();
    }, 10);

    $('header li').click(function () {
        if ($(window).innerWidth() < 800)
            $('header nav').toggle();

    });
    var lastActiveLi;
    $('ul.menu > li').hover(function () {

        if (!lastActiveLi)
            lastActiveLi = $('ul.menu li.active');


        $('ul.menu li').removeClass('active');


        var li = this;

        $(li).addClass('active');

        var innerul = $('ul', li);
        innerul.css('left', ($(li).position().left + $(li).outerWidth() - 10 - innerul.outerWidth()) + "px");

    }, function () {
        $('ul.menu li').removeClass('active');
        $(lastActiveLi).addClass('active');
    });


    $('ul.menu > li').each(function (index, item) {


        var href = '/' + $('a', item).attr('href').split('#')[0].split('/')[1];
        var path = '/' + location.pathname.split('#')[0].split('/')[1]
      
      

        if (href == '/projects' && location.pathname == '/')
            return $(item).addClass('active');

        console.log(href);

        if (href == path)
            return $(item).addClass('active');



    });


    $('.navToggle').click(function () {
        $('header nav').toggle();
    });

    $(window).resize(function () {

        if ($(window).innerHeight() - 40 > $('header').innerHeight() + $('#content').innerHeight())
            $('footer').addClass('sticky');
        else
            $('footer').removeClass('sticky');

    });
    setInterval(function () {
        $(window).resize();

    },500)


    if ($('.projects').length != 0)
        var mixer = mixitup('.projects', {
            selectors: {
                target: '.project'
            },
            animation: {
                effects: 'fade',
                duration: 200
            }
        });


    var hashChang = function () {
        var hash = window.location.hash.replace(/^#/, '');

        if (location.pathname == "/" || location.pathname == "/projects") {
            mixer.filter('.' + hash);
        }
        //do whatever you need with the hash
    };

    $(window).bind('hashchange', hashChang );

    hashChang();


});

moment.locale('fa');
moment.loadPersian();

