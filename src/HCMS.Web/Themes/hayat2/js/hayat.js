/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(document).on('mouseenter mouseleave', 'section.page-blocks area', function (event) {
    if ($(window).width() > 760) {
        var wrapper = $('section.page-blocks');

        var target = $(event.target);

        console.log(target.attr('data-block'));
        if (event.type == "mouseenter")
            $('.' + target.attr('data-block'), wrapper).addClass('in');


        if (event.type == "mouseleave")
            $('.' + target.attr('data-block'), wrapper).removeClass('in');
    }
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


$(document).on('tap click', '#recortes-plan-a area', function () {

    var unit = $(this).attr('data-unit');
    var find = plan_a_keys.find(a=>a.unit == unit);
    $('#block-a .plan-unit img').attr('src', find.url);

    $('#block-a .plan-unit').css('display', 'block');

    //set data table select and active
    var _id = '1-' + unit;
    //remove class from another child
    $('#block-a .table tr').removeClass('selected');
    $('#block-a .table tr').removeClass('active');

    //find plan number 
    var _area = parseInt($('#block-a #' + _id).attr('data-area'));
    for (var i = _area - 10; i < _area + 10; i++) {
        $('#block-a .table tr[data-area=' + i + ']').addClass('active');
    }
    $('#block-a #' + _id).addClass('selected');

    var plan = $(this).attr('data-unit');
    $('#figur-plan-a area:nth-of-type(' + plan + '):hover ~ #capaRecorte-plan-a').css('clip-path', 'url(#PA' + plan + ')').css('display', 'block');
    //var _hover = plan_a_keys_hover.find(a=>a.unit == plan);
    //$('#figur-plan-img-a').attr('src', _hover.url);
    $('#block-a .hayatbtn').addClass('active');

    ////نشان دادن در حالت موبایلی
    //$('#block-a .block').addClass('mobile-min');
    //$('#block-a .plan-unit').addClass('mobile-max');
    //$('#imagen-plan-a').css('display', 'none');

});

//$('#recortes-plan-a area').click(function () {
//    var unit = $(this).attr('data-unit');
//    var find = plan_a_keys.find(a=>a.unit == unit);
//    $('#block-a .plan-unit img').attr('src', find.url);

//    $('#block-a .plan-unit').css('display', 'block');

//    //set data table select and active
//    var _id = '1-' + unit;
//    console.log(_id);
//    //remove class from another child
//    $('#block-a .table tr').removeClass('selected');
//    $('#block-a .table tr').removeClass('active');

//    //find plan number 
//    var _area = parseInt($('#block-a #' + _id).attr('data-area'));
//    for (var i = _area - 10; i < _area + 10; i++) {
//        $('#block-a .table tr[data-area=' + i + ']').addClass('active');
//    }
//    console.log(_area);
//    $('#block-a #' + _id).addClass('selected');

//    var plan = $(this).attr('data-unit');
//    $('#figur-plan-a area:nth-of-type(' + plan + '):hover ~ #capaRecorte-plan-a').css('clip-path', 'url(#PA' + plan + ')').css('display', 'block');

//    $('#block-a .hayatbtn').addClass('active');

//    //نشان دادن در حالت موبایلی
//    $('#block-a .block').addClass('mobile-min');
//    $('#block-a .plan-unit').addClass('mobile-max');

//});

$(document).on('tap click', '.block-detail .mobile-min', function () {
    $(this).removeClass('mobile-min');
    $(this).parents('.block-detail').find('.plan-unit').removeClass('mobile-max');
})


$('.block-detail .hayatbtn').click(function () {

    var elm = $(this).parents('.block-detail');

    if ($(this).hasClass('prev')) {
        //elm.find('.data').removeClass('active');
        //elm.find('.plan').css('display', 'block');
        //elm.find('.block').css('display', 'block');
        //elm.find('.plan-unit').css('display', 'block');

        elm.find('.data').removeClass('active');
        elm.find('.plan').removeClass('prev');
        elm.find('.block').removeClass('prev');
        elm.find('.plan-unit').removeClass('prev');
        elm.find('.mobile-block').removeClass('prev');

        $(this).removeClass('prev').find('label').html('برای مشاهده مشخصات کلی کلیک کنید');
        $(this).find('i').removeClass('fa-arrow-up').addClass('fa-eye');
    } else {
        elm.find('.data').addClass('active');
        elm.find('.plan').addClass('prev');
        elm.find('.block').addClass('prev');
        elm.find('.plan-unit').addClass('prev');
        elm.find('.mobile-block').addClass('prev');

        $(this).addClass('prev').find('label').html('برای بازگشت کلیک کنید');
        $(this).find('i').removeClass('fa-eye').addClass('fa-arrow-up');
    }

})

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
    //var _area = parseInt($('#block-b #' + _id).attr('data-area'));
    //for (var i = _area - 10; i < _area + 10; i++) {
    //    $('#block-b .table tr[data-area=' + i + ']').addClass('active');
    //}
    //console.log(_area);
    //$('#block-b #' + _id).addClass('selected');

    //var floor = $(this).attr('data-floor');
    //$('#figur-b area:nth-of-type(' + floor + ') ~ #capaRecorte-b').css('clip-path', 'url(#F' + floor + '-b)').css('display', 'block');

    $('#block-b .hayatbtn').addClass('active');

    //نشان دادن در حالت موبایلی
    $('#block-b .block').addClass('mobile-min');
    $('#block-b .plan-unit').addClass('mobile-max');

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

    $('#block-c .hayatbtn').addClass('active');

    //نشان دادن در حالت موبایلی
    $('#block-c .block').addClass('mobile-min');
    $('#block-c .plan-unit').addClass('mobile-max');

});

$('#recortes-a area').click(function () {
    //$('#block-a .plan-hover').css('display', 'block');
    $('#block-a .plan').addClass('show');
});


$('#recortes-b area').click(function () {
    $('#block-b .plan').addClass('show');
});

$('#recortes-c area').click(function () {
    $('#block-c .plan').addClass('show');
});


$('#recortes-a area').click(function () {
    var floor = $(this).attr('data-floor');
    $('#figur-a area:nth-of-type(' + floor + ') ~ #capaRecorte-a').css('clip-path', 'url(#F' + floor + '-a)').css('display', 'block');
})

$('#recortes-b area').click(function () {
    var floor = $(this).attr('data-floor');
    $('#figur-b area:nth-of-type(' + floor + ') ~ #capaRecorte-b').css('clip-path', 'url(#F' + floor + '-b)').css('display', 'block');
});

//$('#recortes-plan-b area').click(function () {
//    alert();
//    var plan = $(this).attr('data-unit');
//    $('#figur-plan-b area:nth-of-type(' + plan + '):hover ~ #capaRecorte-plan-b').css('clip-path', 'url(#PB' + plan + ')').css('display', 'block');
//})


$('#recortes-c area').click(function () {
    var floor = $(this).attr('data-floor');
    $('#figur-c area:nth-of-type(' + floor + ') ~ #capaRecorte-c').css('clip-path', 'url(#F' + floor + '-c)').css('display', 'block');
});

$('#recortes-plan-c area').click(function () {
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


$(document).on('tap click', '.mobile-block ul li', function () {
    $(this).siblings('li').removeClass('active');
    $(this).toggleClass('active');

    //active unint
    $(this).parent('ul').next('ul').addClass('active');
})

$(document).on('tap click', '.mobile-block .unit li', function () {
    //show plan
    var parent = $(this).parents('section')
    console.log(parent.attr('id'));
    var unit = $(this).attr('data-unit');
    var find;
    switch (parent.attr('id')) {
        case 'block-a':
            find = plan_a_keys.find(a=>a.unit == unit);
            break;
        case 'block-b':
            find = plan_b_keys.find(a=>a.unit == unit);
            break;
        case 'block-c':
            find = plan_c_keys.find(a=>a.unit == unit);
            break;
        default:

    }
    parent.find('.plan-unit img').attr('src', find.url);
    parent.find('.plan-unit').addClass('show');
    parent.find('.hayatbtn').addClass('active');

    //$('#block-a .plan-unit img').attr('src', find.url);

    //$('#block-a .plan-unit').css('display', 'block');

})

var main_block_hover = [
    { block: 'a', url: '/Themes/hayat2/img/hover/Blocks Selection/Block A-Hover.png' },
    { block: 'b', url: '/Themes/hayat2/img/hover/Blocks Selection/Block B-Hover.png' },
    { block: 'c', url: '/Themes/hayat2/img/hover/Blocks Selection/Block C-Hover.png' },
    { block: 'm', url: '/Themes/hayat2/img/hover/Blocks Selection/Block M-Hover.png' },
];
if ($(window).width() < 760) {
    //show main mobile
    $('#capaRecorte-main').attr('src', '');
    $('#recortes-main area').attr('href', '#blocks');
    $('#blocks map').addClass('show-mobile');

    //دو بخش کردن فرم های ثبت نام
    $('#signup.first').addClass('hidden-mobile');
    $('#signup2').removeClass('hidden-mobile');
    $('#signup3').removeClass('hidden-mobile');
} else {
    $('#signup2').addClass('hidden-mobile');
    $('#signup3').addClass('hidden-mobile');
}


$(document).on('tap click', '#recortes-main area', '.block-button li a', function () {
    if ($(window).width() < 760) {
        $('.' + $(this).attr('data-block')).parent('.child-block').siblings().find('.in').removeClass('in');
        var elm = $(this).attr('data-block');
        $('.' + elm).toggleClass('in');
        $('.' + elm + '-btn').toggleClass('in');

        var find = main_block_hover.find(a=>a.block == elm.split('-')[1]);
        $('#img-back-main').attr('src', find.url);
       
    } else {
        //change a table color
        var blockId = $(this).attr('data-block-id');
        var parent = $(this).parents('#blocks').find('.table tr[data-block-id=' + blockId + ']').addClass('green');

    }
})

$(document).on('mouseenter mouseleave', '#recortes-main area', function (e) {
    var className = "";
    switch ($(this).attr('data-block')) {
        case 'block-a':
            className = 'blockA';
            break;
        case 'block-b':
            className = 'blockB';
            break;
        case 'block-c':
            className = 'blockC';
            break;
        default:
    }
    var blockId = $(this).attr('data-block-id');

    if (e.type == 'mouseenter') {
        //remove all class
        $(this).parents('#blocks').find('.table tr').removeClass('blockA').removeClass('blockB').removeClass('blockC');

        $(this).parents('#blocks').find('.table tr[data-block-id=' + blockId + ']').addClass(className);
    } else
        $(this).parents('#blocks').find('.table tr[data-block-id=' + blockId + ']').removeClass(className);
});

//$(document).on('mouseenter mouseleave', '#blocks table tr', function (e) {
//    $('#figur-main area:nth-of-type(1):hover ~ #capaRecorte-main').css('clip-path', 'url(#block-A)').css('display', 'block');
//    var blockId = $(this).attr('data-block-id');
//    if (blockId != undefined) {
//        var blockName = $('#recortes-main area[data-block-id=' + blockId + ']').attr('data-block');
//        var index = $('#recortes-main area').index($('#recortes-main area[data-block-id=' + blockId + ']'));
//        $('#figur-main area:nth-of-type(' + (index + 1) + '):hover ~ #capaRecorte-main').css('clip-path', 'url(#block-' + blockName.split('-')[1].toUpperCase() + ')').css('display', 'block');
//    }

//});

$('.plan-unit').click(function () {
    $('.unit-full-img').addClass('open');
    $('.unit-full-img .preview img').attr('src', $(this).find('img').attr('src'))
})

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

    //href not working in mobile.fix it
    $("a").each(function () {
        $(this).attr("rel", "external");
    });
    //$.mobile.loader.prototype.options.disabled = true;
    ////مخفی کردن loading
    //$(document).on("mobileinit", function () {
    //    $.mobile.loader.prototype.options.disabled = true;
    //});

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

    $('#page-up').click(function () {
        changePage(false, 'up');
    })

    $('#page-down').click(function () {
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

    //$('form').on('keypress', function (e) {
    //    $.each(e.target.attributes, function (index, item) {
    //        console.log(item);
    //    })
    //    //if ((e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 65 && e.charCode <= 90)) {
    //    //    alert('لطفا فارسی تایپ کنید.')
    //    //    e.preventDefault();
    //    //}
    //    //else if (isPersian(e.key))
    //    //    console.log('Persian');
    //    //else
    //    //    console.log('Others')
    //});

    $(document).on('keypress', 'form input', 'form textarea', function (e) {
        var attr = $(this).attr('is-not-persian-checked');
        if (typeof attr === typeof undefined) {
            if ((e.charCode >= 97 && e.charCode <= 122) || (e.charCode >= 65 && e.charCode <= 90)) {
                alert('لطفا فارسی تایپ کنید.')
                e.preventDefault();
            }
            else if (isPersian(e.key))
                console.log('Persian');
            else
                console.log('Others')
        }
    })

    function isPersian(str) {
        var p = /^[\u0600-\u06FF\s]+$/;
        return p.test(str);
    }




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
            }).done(function (res) {
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
            }).fail(function (err) {
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
            }).done(function (res) {
                if (res.length > 0) {
                    var html = '';
                    $.each(res, function (index, item) {
                        html += item + "/";
                    })

                    swal("خطا", html, "error");
                } else {
                    swal("", 'ثبت نام شما با موفقیت انجام شد.', "success");
                }
            }).fail(function (err) {
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

    $('#menu-bar').click(function () {
        $('header.show-mobile').addClass('open');
        $(this).addClass('deactive');
        $('body').addClass('cscroll');
    })

    $('#top-nav-search').click(function () {
        $('.search-bar.show-mobile').toggleClass('open');
    })

    $('.bottom-nav ul li').click(function () {
        $(this).parent('.bottom-nav').find('li').removeClass('open');
        $(this).parent('.bottom-nav').find('i').removeClass('active');
        $(this).toggleClass('open');
        $(this).find('i').toggleClass('active');

    });

    $('.has-sub').click(function () {
        $(this).next('.has-sub').siblings('active');

        $(this).parents('.bottom-nav').find('.has-sub').find('ul').removeClass('open');
        $(this).parents('.child').siblings('.child').addClass('min');
        $(this).next('ul').addClass('open');
        $(this).parent('.child').toggleClass('min')

        $(this).parents('.bottom-nav').find('.has-sub').not(this).removeClass('active');

        $(this).toggleClass('active');
    })

    $('.bottom-nav li').click(function () {
        //$('.right-icons li').not(this).removeClass('open');
        $(this).toggleClass('open');
    });

    $('header.show-mobile .fa-close').click(function () {
        $('header.show-mobile').removeClass('open');
        $('#menu-bar').removeClass('deactive');
        $('body').removeClass('cscroll');
    })

    //$('.left-icons-mobile').click(function () {
    //    $('.left-icons').toggleClass('active');
    //})

    //$('.right-icons-mobile').click(function () {
    //    $('.right-icons').toggleClass('active');
    //})


});




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


    //$("body").humm
    //var mc = new Hammer($("body"));

    //mc.on("panleft panright tap press", function (ev) {
    //    myElement.textContent = ev.type + " gesture detected.";
    //    alert();
    //});


    //$(document).on('swipedown', 'body', function (e) {
    //    if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll')
    //        || $(e.target).parents().hasClass('noSwipe') || $(e.target).hasClass('noSwipe'))
    //        return;
    //    changePage(false, "up");
    //})

    //$(document).on('swipeup', 'body', function (e) {

    //    if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll')
    //        || $(e.target).parents().hasClass('noSwipe') || $(e.target).hasClass('noSwipe'))
    //        return;
    //    changePage(false, "down");
    //})

    //$(document).on('swiperight', 'body', function (e) {
    //    if ($(e.target).parents().hasClass('noSwipe') || $(e.target).hasClass('noSwipe'))
    //        return;
    //    changeArticlePage(false, 'left');

    //})

    //$(document).on('swipeleft', 'body', function (e) {
    //    if ($(e.target).parents().hasClass('noSwipe') || $(e.target).hasClass('noSwipe'))
    //        return;
    //    else if (!$(e.target).parents().hasClass('page-horizontal') && !$(e.target).hasClass('page-horizontal'))
    //        toggleMobileMenu();
    //    else
    //        changeArticlePage(false, 'right');
    //})

    //var toggleMobileMenu = function () {
    //    $('#menu-bar').click();
    //}

    //var myPanHandler = function () {
    //    console.log($(this));
    //    alert();
    //}

    //var options = {
    //    preventDefault: true
    //};
    //$('body').hammer(options).bind("dragup dragdown swipeup swipedown", myPanHandler);




    $("body").swipe({
        //Generic swipe handler for all directions
        swipeStatus: function (e, phase, direction, duration, distance, fingerCount) {
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

                        else if (direction == "left" && !$(e.target).parents().hasClass('page-horizontal') && !$(e.target).hasClass('page-horizontal'))
                            $('#menu-bar').click();
                        else
                            if (direction == "right" || direction == "left")
                                changeArticlePage(false, direction == "left" ? "right" : "left");
                    }

                }
            }
            //$(this).swipe('option', 'preventDefaultEvents', preventDefaultEvents);
        },

        preventDefaultEvents: false,
        threshold: 1,
        excludedElements: " .noSwipe, .cscroll"

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

    setTimeout(function () {

        $('[data-aos]', nextPage).addClass('aos-animate');


        $('[data-aos]', prevPage).addClass('aos-animate');

    }, 1000);

    if (nextPage.hasClass('page-horizontal') || prevPage.hasClass('page-horizontal'))
        $('.back-to-top').addClass('horizontal');

    // $('[data-aos]', currentPage).removeClass('aos-animate');







    if (window.location.pathname !== "/") {

        $('header').addClass('navhide');
        //$('.top-nav').addClass('navhide');
        //$('.bottom-nav').addClass('navhide');
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

            //for (var i = 0; i < $(document).innerHeight() / slider.sliceHeight; i++) {

            //    var slice = $('<div />')
            //        .addClass('slice')
            //        .css('backgroundImage', 'url(' + imgSrc + ')');

            //    if (!slider.oneSlice)
            //        slice = slide
            //        .height(slider.sliceHeight)
            //            .css('backgroundPosition', '0 ' + i * -1 * slider.sliceHeight + 'px');


            //    if (slider.oneSlice)
            //        slice.addClass('one');



            //    slide.append(slice);

            //}

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