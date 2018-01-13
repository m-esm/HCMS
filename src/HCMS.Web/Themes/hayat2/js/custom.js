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




