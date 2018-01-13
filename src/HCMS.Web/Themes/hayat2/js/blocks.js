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