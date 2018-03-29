/// <reference path="../lib/aos/aos.js" />


//AOS.init({
//    offset: 200,
//    duration: 600,
//    easing: 'ease-in-sine',
//    delay: 500,
//});


var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

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
if (nAgt.match(/iPad/i) || nAgt.match(/iPhone/i)) {
    // iPad or iPhone
    //$('.show-safari').addClass('active');
    //jQuery('body').addClass('apple-ios');
}
else {
    // Anything else

}

$(document).ready(function () {

    setTimeout(function () {

        $('#loader').fadeOut();

    }, 1000);

    //for ios
    /* we need this only on touch devices */
    if (Modernizr.touch) {
        /* cache dom references */
        var $body = jQuery('body');
        /* bind events */
        $(document)
        .on('focus', 'input', function () {
            $body.addClass('fixfixed');
        })
        .on('blur', 'input', function () {
            $body.removeClass('fixfixed');
        });
    }

    $('.map-top').click(function () {
        changePage(false, 'up');
    })

    $('.map-down').click(function () {
        changePage(false, 'down');
    })
    //$(document).on('tap click', '.map-top', function () {
    //    changePage(false, 'up');
    //})

    //$(document).on('tap click', '.map-down', function () {
    //    changePage(false, 'down');
    //})
    //end for ios

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


    $('.register-form .hayatbtn').click(function (e) {

        var buy = {};
        var parent = $(this).parent('form');
        if (IsValid(parent) === true) {
            buy.__RequestVerificationToken = $(parent).find('input[name="__RequestVerificationToken"]').val();
            buy.isAjax = true;

            buy.Email = (parent).find('input[name="Username"]').val();
            buy.UserName = $(parent).find('input[name="Username"]').val();
            buy.FirstName = $(parent).find('input[name="FirstName"]').val();
            buy.password = $(parent).find('input[name="password"]').val();
            buy.ConfirmPassword = $(parent).find('input[name="ConfirmPassword"]').val();
            buy.captcha = $(parent).find('input[name="captcha"]').val();

            var _captcha_guid = $(parent).find('.captcha-field img').attr('src').split('guid=')[1];
            buy.captcha_guid = 'captcha' + _captcha_guid;

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
                        html += item + '/';
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
        }
        e.preventDefault();
    })



    $('form.contactForm .hayatbtn').click(function (e) {
        var parent = $(this).parent('form');
        if (IsValid(parent) === true) {
            var spanser = {};
            spanser.__RequestVerificationToken = $(parent).find('input[name="__RequestVerificationToken"]').val();
            spanser.isAjax = true;
            spanser.role = $(parent).find('select[name="role"]').val();
            spanser.Email = $(parent).find('input[name="username"]').val();
            spanser.UserName = $(parent).find('input[name="username"]').val();
            spanser.FirstName = $(parent).find('input[name="FirstName"]').val();
            spanser.phone = $(parent).find('input[name="phone"]').val();
            spanser.password = $(parent).find('input[name="Password"]').val();
            spanser.ConfirmPassword = $(parent).find('input[name="ConfirmPassword"]').val();
            spanser.captcha = $(parent).find('input[name="captcha"]').val();

            var _captcha_guid = $(parent).find('.captcha-field img').attr('src').split('guid=')[1];

            spanser.captcha_guid = '_cooprate' + _captcha_guid;

            refreshToken();

            $.ajax({
                type: 'POST',
                url: '/fa-ir/manage/Auth/RegisterByRole',
                data: spanser
            }).success(function (res) {
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
        }
        e.preventDefault();
    })


    var IsValid = function (_form) {
        var isValid = true;
        var form = _form;
        var inputs = $(form).find('input:required');

        $.each(inputs, function (index, item) {
            if ($(item).val() === '') {
                isValid = false;
                $(item).addClass('has-error');
            }
            else
                $(item).removeClass('has-error');
        });

        var select = $(form).find('select:required');
        $.each(select, function (index, item) {
            if ($(item).val() === '0') {
                isValid = false;
                $(item).addClass('has-error');
            }
            else
                $(item).removeClass('has-error');
        })

        var textarea = $(form).find('textarea:required');
        $.each(textarea, function (index, item) {
            if ($(item).val().trim() === '') {
                isValid = false;
                $(item).addClass('has-error');
            }
            else
                $(item).removeClass('has-error');
        })
        return isValid;
    }

    $(document).on('tap click', '#menu-bar', function () {
        $('header.show-mobile').addClass('open');
        $(this).addClass('deactive');
        $('body').addClass('cscroll');
    })

    $('#top-nav-search').click(function () {
        $('.search-bar.show-mobile').toggleClass('open');
    })
    
    $(document).on('tap click', '.bottom-nav ul li', function () {
        $(this).parent('.bottom-nav').find('li').removeClass('open');
        $(this).parent('.bottom-nav').find('i').removeClass('active');
        $(this).toggleClass('open');
        $(this).find('i').toggleClass('active');

    });

    $(document).on('tap click', '.has-sub', function () {
        $(this).next('.has-sub').siblings('active');
        $(this).parents('.bottom-nav').find('.has-sub').find('ul').removeClass('open');
        $(this).parents('.bottom-nav').find('i').removeClass('active');
        $(this).parents('.child').siblings('.child').addClass('min');
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




