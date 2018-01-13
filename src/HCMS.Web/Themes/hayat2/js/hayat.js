/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(document).on('mouseenter mouseleave', 'section.page-blocks area', function (event) {

    var wrapper = $('section.page-blocks');

    var target = $(event.target);

    console.log(target.attr('data-block'));
    if (event.type == "mouseenter")
        $('.' + target.attr('data-block'), wrapper).addClass('in');


    if (event.type == "mouseleave")
        $('.' + target.attr('data-block'), wrapper).removeClass('in');

});

//


var plan_a_keys = [
    { unit: 1, url: '/Themes/hayat2/img/plan/A/keys/Block A Plan 001.png' },
    { unit: 2, url: '/Themes/hayat2/img/plan/A/keys/Block A Plan 002.png' },
    { unit: 3, url: '/Themes/hayat2/img/plan/A/keys/Block A Plan 003.png' },
    { unit: 4, url: '/Themes/hayat2/img/plan/A/keys/Block A Plan 004.png' },
];

var plan_b_keys = [
    { unit: 1, url: '/Themes/hayat2/img/plan/B/keys/Block B Plan-01.png' },
    { unit: 2, url: '/Themes/hayat2/img/plan/B/keys/Block B Plan-02.png' },
    { unit: 3, url: '/Themes/hayat2/img/plan/B/keys/Block B Plan-03.png' },
    { unit: 4, url: '/Themes/hayat2/img/plan/B/keys/Block B Plan-04.png' },
    { unit: 5, url: '/Themes/hayat2/img/plan/B/keys/Block B Plan-05.png' },
];

var plan_c_keys = [
    { unit: 1, url: '/Themes/hayat2/img/plan/C/keys/Block C Plan 01.png' },
    { unit: 2, url: '/Themes/hayat2/img/plan/C/keys/Block C Plan 02.png' },
    { unit: 3, url: '/Themes/hayat2/img/plan/C/keys/Block C Plan 03.png' },
    { unit: 4, url: '/Themes/hayat2/img/plan/C/keys/Block C Plan 04.png' },
    { unit: 5, url: '/Themes/hayat2/img/plan/C/keys/Block C Plan 05.png' },
];

$('#recortes-plan-a area').click(function () {
    var unit = $(this).attr('data-unit');
    var find = plan_a_keys.find(a=>a.unit == unit);
    $('#block-a .plan-unit img').attr('src', find.url);

    $('#block-a .plan-unit').css('display', 'block');

    //set data table select and active
    var _id = '1-' + unit;
    console.log(_id);
    //remove class from another child
    $('#block-a .table tr').removeClass('selected');
    $('#block-a .table tr').removeClass('active');

    //find plan number 
    var _area = parseInt($('#block-a #' + _id).attr('data-area'));
    for (var i = _area - 10; i < _area + 10; i++) {
        $('#block-a .table tr[data-area=' + i + ']').addClass('active');
    }
    console.log(_area);
    $('#block-a #' + _id).addClass('selected');

});

$('#recortes-plan-b area').click(function () {
    var unit = $(this).attr('data-unit');
    var find = plan_b_keys.find(a=>a.unit == unit);
    $('#block-b .plan-unit img').attr('src', find.url);

    $('#block-b .plan-unit').css('display', 'block');

    //set data table select and active
    var _id = '2-' + unit;
    console.log(_id);
    //remove class from another child
    $('#block-b .table tr').removeClass('selected');
    $('#block-b .table tr').removeClass('active');

    //find plan number 
    var _area = parseInt($('#block-b #' + _id).attr('data-area'));
    for (var i = _area - 10; i < _area + 10; i++) {
        $('#block-b .table tr[data-area=' + i + ']').addClass('active');
    }
    console.log(_area);
    $('#block-b #' + _id).addClass('selected');

});

$('#recortes-plan-c area').click(function () {
    var unit = $(this).attr('data-unit');
    var find = plan_c_keys.find(a=>a.unit == unit);
    $('#block-c .plan-unit img').attr('src', find.url);

    $('#block-c .plan-unit').css('display', 'block');

    //set data table select and active
    var _id = '3-' + unit;
    //remove class from another child
    $('#block-c .table tr').removeClass('selected');
    $('#block-c .table tr').removeClass('active');

    //find plan number 
    var _area = parseInt($('#block-c #' + _id).attr('data-area'));
    for (var i = _area - 10; i < _area + 10; i++) {
        $('#block-c .table tr[data-area=' + i + ']').addClass('active');
    }
    $('#block-c #' + _id).addClass('selected');

});

$('#recortes-a area').click(function () {
    $('#block-a .plan-hover').css('display', 'block');
});


$('#recortes-b area').click(function () {
    $('#block-b .plan-hover').css('display', 'block');
});

$('#recortes-c area').click(function () {
    $('#block-c .plan-hover').css('display', 'block');
});


$(document).on('click', '#recortes-a area', function () {
    var floor = $(this).attr('data-floor');
    $('#figur-a area:nth-of-type(' + floor + ') ~ #capaRecorte-a').css('clip-path', 'url(#F' + floor + '-a)').css('display', 'block');
});

$(document).on('click', '#recortes-plan-a area', function () {
    var plan = $(this).attr('data-unit');
    $('#figur-plan-a area:nth-of-type(' + plan +'):hover ~ #capaRecorte-plan-a').css('clip-path', 'url(#PA' + plan + ')').css('display', 'block');
})

$(document).on('click', '#recortes-b area', function () {
    var floor = $(this).attr('data-floor');
    $('#figur-b area:nth-of-type(' + floor + ') ~ #capaRecorte-b').css('clip-path', 'url(#F' + floor + '-b)').css('display', 'block');
});

$(document).on('click', '#recortes-plan-b area', function () {
    var plan = $(this).attr('data-unit');
    $('#figur-plan-b area:nth-of-type(' + plan + '):hover ~ #capaRecorte-plan-b').css('clip-path', 'url(#PB' + plan + ')').css('display', 'block');
})

$(document).on('click', '#recortes-c area', function () {
    var floor = $(this).attr('data-floor');
    $('#figur-c area:nth-of-type(' + floor + ') ~ #capaRecorte-c').css('clip-path', 'url(#F' + floor + '-c)').css('display', 'block');
});

$(document).on('click', '#recortes-plan-c area', function () {
    var plan = $(this).attr('data-unit');
    $('#figur-plan-c area:nth-of-type(' + plan + '):hover ~ #capaRecorte-plan-c').css('clip-path', 'url(#PC' + plan + ')').css('display', 'block');
})

var toggleSearchBar = function () {
    $('.search-bar').toggleClass('open');
}

$('section.page .arrow .up').click(function () {
    changePage(false, 'up');
})

$('section.page .arrow .down').click(function () {
    changePage(false, 'down');
})
/// <reference path="../lib/aos/aos.js" />


//AOS.init({
//    offset: 200,
//    duration: 600,
//    easing: 'ease-in-sine',
//    delay: 500,
//});


//var nVer = navigator.appVersion;
//var nAgt = navigator.userAgent;
//var browserName = navigator.appName;
//var fullVersion = '' + parseFloat(navigator.appVersion);
//var majorVersion = parseInt(navigator.appVersion, 10);
//var nameOffset, verOffset, ix;

//// In Opera 15+, the true version is after "OPR/"
//if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
//    browserName = "Opera";
//    fullVersion = nAgt.substring(verOffset + 4);
//}
//    // In older Opera, the true version is after "Opera" or after "Version"
//else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
//    browserName = "Opera";
//    fullVersion = nAgt.substring(verOffset + 6);
//    if ((verOffset = nAgt.indexOf("Version")) != -1)
//        fullVersion = nAgt.substring(verOffset + 8);
//}
//    // In MSIE, the true version is after "MSIE" in userAgent
//else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
//    browserName = "Microsoft Internet Explorer";
//    fullVersion = nAgt.substring(verOffset + 5);
//}
//    // In Chrome, the true version is after "Chrome"
//else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
//    browserName = "Chrome";
//    fullVersion = nAgt.substring(verOffset + 7);
//}
//    // In Safari, the true version is after "Safari" or after "Version"
//else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
//    browserName = "Safari";
//    fullVersion = nAgt.substring(verOffset + 7);
//    if ((verOffset = nAgt.indexOf("Version")) != -1)
//        fullVersion = nAgt.substring(verOffset + 8);
//}
//    // In Firefox, the true version is after "Firefox"
//else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
//    browserName = "Firefox";
//    fullVersion = nAgt.substring(verOffset + 8);
//}
//    // In most other browsers, "name/version" is at the end of userAgent
//else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
//          (verOffset = nAgt.lastIndexOf('/'))) {
//    browserName = nAgt.substring(nameOffset, verOffset);
//    fullVersion = nAgt.substring(verOffset + 1);
//    if (browserName.toLowerCase() == browserName.toUpperCase()) {
//        browserName = navigator.appName;
//    }
//}
//if (browserName != "Firefox" && browserName != "Chrome" && browserName != "Safari")
//    alert("لطفا از یکی از مرورگرهای گوگل کروم و یا فایر فاکس استفاده کنید")

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


    $('#_cooprate-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
    $('#_register-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());

   

    $('#regUser').click(function () {

        var buy = {};
        buy.__RequestVerificationToken = $('#register-form input[name="__RequestVerificationToken"]').val();
        buy.isAjax = true;

        buy.Email = $('#register-form input[name="Username"]').val();
        buy.UserName = $('#register-form input[name="Username"]').val();
        buy.password = $('#register-form input[name="password"]').val();
        buy.ConfirmPassword = $('#register-form input[name="ConfirmPassword"]').val();
        buy.captcha = $('#register-form input[name="captcha"]').val();

        var _captcha_guid = $('#_register-captcha-image').attr('src').split('guid=')[1];

        buy.captcha_guid = '_register' + _captcha_guid;

        console.log(buy);
        $.ajax({
            type: 'POST',
            url: '/fa-ir/manage/Auth/register',
            data: buy
        }).success(function (res) {
            $('#_register-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
            if (res.length > 0) {
                var html = '<ul>'
                $.each(res, function (index, item) {
                    html += '<li>' + item + '</li>';
                })

                html += '</ul>';
                $('#reg-err').css('display', 'block');
                $('#reg-done').css('display', 'none');
                $('#reg-err').html(html);
            } else {
                $('#reg-err').css('display', 'none');
                $('#reg-done').css('display', 'block');
                $('#reg-done').html('ثبت نام شما با موفقیت انحام شد.');
            }
        }).error(function (err) {
            $('#_register-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
            $('#reg-err').css('display', 'block');
            $('#reg-done').css('display', 'none');
            $('#reg-err').html('خطا رخ داده است. لطفا بعدا مجددا تلاش نمایید.');
        })
    })
   

    $('#reg-spanser').click(function () {
        var spanser = {};
        spanser.__RequestVerificationToken = $('#colleagueForm input[name="__RequestVerificationToken"]').val();
        spanser.isAjax = true;
        spanser.role = $('#colleagueForm select[name="role"]').val();
        spanser.Email = $('#colleagueForm input[name="username"]').val();
        spanser.UserName = $('#colleagueForm input[name="username"]').val();
        spanser.name = $('#colleagueForm input[name="name"]').val();
        spanser.phone = $('#colleagueForm input[name="phone"]').val();
        spanser.password = $('#colleagueForm input[name="Password"]').val();
        spanser.ConfirmPassword = $('#colleagueForm input[name="ConfirmPassword"]').val();
        spanser.captcha = $('#colleagueForm input[name="captcha"]').val();

        var _captcha_guid = $('#_cooprate-captcha-image').attr('src').split('guid=')[1];

        spanser.captcha_guid = '_cooprate' + _captcha_guid;

        console.log(spanser);
        $.ajax({
            type: 'POST',
            url: '/fa-ir/manage/Auth/RegisterByRole',
            data: spanser
        }).success(function (res) {
            $('#_cooprate-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
            if (res.length > 0) {
                var html = '<ul>'
                $.each(res, function (index, item) {
                    html += '<li>' + item + '</li>';
                })

                html += '</ul>';
                $('#coll-err').css('display', 'block');
                $('#coll-done').css('display', 'none');
                $('#coll-err').html(html);
            } else {
                $('#coll-err').css('display', 'none');
                $('#coll-done').css('display', 'block');
                $('#coll-done').html('ثبت نام شما با موفقیت انجام شد.');
            }
        }).error(function (err) {
            $('#_cooprate-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
            $('#coll-err').css('display', 'block');
            $('#coll-done').css('display', 'none');
            $('#coll-err').html('خطا رخ داده است. لطفا بعدا مجددا تلاش نمایید.');
        })
    })


    $('#menu-bar').click(function () {
        $('header.show-mobile').addClass('open');
        $(this).addClass('deactive');
        $('body').addClass('cscroll');
    })
  
    $('header.show-mobile .fa-close').click(function () {
        $('header.show-mobile').removeClass('open');
        $('#menu-bar').removeClass('deactive');
        $('body').removeClass('cscroll');
    })

    $('.left-icons-mobile').click(function () {
        $('.left-icons').toggleClass('active');
    })

    $('.right-icons-mobile').click(function () {
        $('.right-icons').toggleClass('active');
    })

});





/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
var keyLeftRight = false;
var busy = false;


$(function () {



    var onHashChange = function () {
        if (!busy && !keyLeftRight)
            changePage($(window.location.hash.toLowerCase()), "down");

    };

    $('.back-to-top').click(function () {

        var btn = $(this);


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
        swipeStatus: function (e, phase, direction, duration, distance, fingerCount) {
            if ( phase == "move" || phase == "start" ) {
                var $target = e.target.nodeName;
                if( $target.toLowerCase() === 'input' ) {
                    return false;
                } else {
                    if (duration > 30) {
                        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
                            return;
                        changePage(false, direction == "up" ? "down" : "up");
                    }
                  
                }
            }
        },
        excludedElements: "label, button, input, select, textarea, .noSwipe"
        //swipe: function (e, direction, distance, duration, fingerCount, fingerData) {
        //    console.log(e);
        //    if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
        //        return;
        //    changePage(false, direction == "up" ? "down" : "up");

        //}
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