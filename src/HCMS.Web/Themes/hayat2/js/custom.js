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

    var refreshToken = function () {
        $('form.register-form .captcha-field img').attr('src', 'manage/Captcha/msdn?prefix=captcha&guid=' + Date.now());
        $('form.contactForm .captcha-field img').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
    }

    $('#submit').on('keypress', function (e) {
        if ((e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 65 && e.charCode <= 90)) {
            alert('لطفا فارسی تایپ کنید.')
            e.preventDefault();
        }
        else if (isPersian(e.key))
            console.log('Persian');
        else
            console.log('Others')
    });

    function isPersian(str) {
        var p = /^[\u0600-\u06FF\s]+$/;
        return p.test(str);
    }


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


    //$('#_cooprate-captcha-image').attr('src', 'manage/Captcha/msdn?prefix=_cooprate&guid=' + Date.now());
    refreshToken();


    $('.register-form .hayatbtn').click(function () {

        var buy = {};
        var parent = $(this).parent('form');
        buy.__RequestVerificationToken = $(parent).find('input[name="__RequestVerificationToken"]').val();
        buy.isAjax = true;

        buy.Email = (parent).find('input[name="Username"]').val();
        buy.UserName = $(parent).find('input[name="Username"]').val();
        buy.password = $(parent).find('input[name="password"]').val();
        buy.ConfirmPassword = $(parent).find('input[name="ConfirmPassword"]').val();
        buy.captcha = $(parent).find('input[name="captcha"]').val();

        var _captcha_guid = $(parent).find('.captcha-field img').attr('src').split('guid=')[1];
        console.log(_captcha_guid);
        buy.captcha_guid = 'captcha' + _captcha_guid;

        console.log(buy);
        buy.loginAfterReg = true;

        refreshToken();

        $.ajax({
            type: 'POST',
            url: '/fa-ir/manage/Auth/register',
            data: buy
        }).success(function (res) {
            if (res.length > 0) {
                var html = ''
                $.each(res, function (index, item) {
                    html +=  item + '/';
                })

                swal("خطا", html, "error");
            } else {
                swal("", 'ثبت نام شما با موفقیت انجام شد.', "success");

                //login user
                setTimeout(function () {
                    window.location.reload('/');
                }, 2000)

             
            }
        }).error(function (err) {
            swal("خطا", 'خطا رخ داده است. لطفا بعدا مجددا تلاش نمایید.', "error");
        })
    })



    $('form.contactForm .hayatbtn').click(function () {
        var parent = $(this).parent('form');
        var spanser = {};
        spanser.__RequestVerificationToken = $(parent).find('input[name="__RequestVerificationToken"]').val();
        spanser.isAjax = true;
        spanser.role = $(parent).find('select[name="role"]').val();
        spanser.Email = $(parent).find('input[name="username"]').val();
        spanser.UserName = $(parent).find('input[name="username"]').val();
        spanser.name = $(parent).find('input[name="name"]').val();
        spanser.phone = $(parent).find('input[name="phone"]').val();
        spanser.password = $(parent).find('input[name="Password"]').val();
        spanser.ConfirmPassword = $(parent).find('input[name="ConfirmPassword"]').val();
        spanser.captcha = $(parent).find('input[name="captcha"]').val();

        var _captcha_guid = $(parent).find('.captcha-field img').attr('src').split('guid=')[1];

        spanser.captcha_guid = '_cooprate' + _captcha_guid;

        refreshToken();

        console.log(spanser);
        $.ajax({
            type: 'POST',
            url: '/fa-ir/manage/Auth/RegisterByRole',
            data: spanser
        }).success(function (res) {
            console.log(res);
            if (res.length > 0) {
                var html = '';
                $.each(res, function (index, item) {
                    html += item + "/";
                })

                swal("خطا", html, "error");
            } else {
                swal("", 'ثبت نام شما با موفقیت انجام شد.', "success");
            }
        }).error(function (err) {
            swal("خطا", 'خطا رخ داده است. لطفا بعدا مجددا تلاش نمایید.', "error");
        })
    })

    $(document).on('tap click', '#menu-bar', function () {
        $('header.show-mobile').addClass('open');
        $(this).addClass('deactive');
        $('body').addClass('cscroll');
    })

    $('#top-nav-search').click(function () {
        $('.search-bar.show-mobile').toggleClass('open');
    })
    
    $(document).on('tap click', '.bottom-nav ul li', function () {
        $(this).parent('ul').find('li').removeClass('open');
        $(this).parent('ul').find('i').removeClass('active');
        $(this).toggleClass('open');
        $(this).find('i').toggleClass('active');

    });

    $(document).on('tap click', '.has-sub', function () {
        $(this).next('.has-sub').siblings('active');
        $(this).parents('.bottom-nav').find('.has-sub').find('ul').removeClass('open');
        //$(this).parents('.bottom-nav').find('.child').removeClass('min');
        $(this).parents('.child').siblings('.child').addClass('min');
        $(this).find('i').removeClass('active')
        $(this).toggleClass('active');
        $(this).next('ul').toggleClass('open');
        $(this).parent('.child').toggleClass('min')
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




