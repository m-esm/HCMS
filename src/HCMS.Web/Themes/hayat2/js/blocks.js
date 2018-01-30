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