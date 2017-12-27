'use strict';

$(document).on('mouseenter', '#coordBlockA', function () {
    if (!$('.map #a').hasClass('active')) {
        $('.map #a').addClass('active');
    }

    removeBlockA('block-b');
    removeBlockA('block-c');
    removeBlockA('block-m');

    addClass('block-a');

    //if ($('.block-a').hasClass('active'))
    //    removeBlockA('block-a');
    //else
    //    addClass('block-a');
});

$(document).on('mouseleave', '#coordBlockA', function () {
    if ($('.map #a').hasClass('active')) {
        $('.map #a').removeClass('active');
    }
});

$(document).on('mouseenter', '#coordBlockB', function () {
    if (!$('.map #b').hasClass('active')) {
        $('.map #b').addClass('active');
    }

    removeBlockA('block-a');
    removeBlockA('block-c');
    removeBlockA('block-m');

    addClass('block-b');
});

$(document).on('mouseleave', '#coordBlockB', function () {
    if ($('.map #b').hasClass('active')) {
        $('.map #b').removeClass('active');
    }
});

$(document).on('mouseenter', '#coordBlockC', function () {
    if (!$('.map #c').hasClass('active')) {
        $('.map #c').addClass('active');
    }

    removeBlockA('block-b');
    removeBlockA('block-a');
    removeBlockA('block-m');

    addClass('block-c');
});

$(document).on('mouseleave', '#coordBlockC', function () {
    if ($('.map #c').hasClass('active')) {
        $('.map #c').removeClass('active');
    }
});

$(document).on('mouseenter', '#coordBlockM', function () {
    if (!$('.map #m').hasClass('active')) {
        $('.map #m').addClass('active');
    }

    removeBlockA('block-b');
    removeBlockA('block-c');
    removeBlockA('block-a');

    addClass('block-m');
});

$(document).on('mouseleave', '#coordBlockM', function () {
    if ($('.map #m').hasClass('active')) {
        $('.map #m').removeClass('active');
    }
});

var removeBlockA = function removeBlockA(className) {
    $('.' + className).removeClass('bounceInLeft animated');
    $('.' + className).addClass('bounceOutRight animated');
    setTimeout(function () {
        $('.' + className).removeClass('active');
    }, 500);
};

var addClass = function addClass(className) {
    $('.' + className).addClass('active');
    $('.' + className).removeClass('bounceOutRight animated');

    if (!$('.' + className).hasClass('bounceInLeft animated')) $('.' + className).addClass('bounceInLeft animated');
};

$(document).on('click', '#coordBlockA', function () {
    window.location.href = "/block?type=a";
});

$(document).on('click', '#coordBlockB', function () {
    removeBlockA('block-a');
    removeBlockA('block-c');
    removeBlockA('block-m');

    if ($('.block-b').hasClass('active')) removeBlockA('block-b');else addClass('block-b');
});

$(document).on('click', '#coordBlockC', function () {
    removeBlockA('block-a');
    removeBlockA('block-b');
    removeBlockA('block-m');

    if ($('.block-c').hasClass('active')) removeBlockA('block-c');else addClass('block-c');
});

$(document).on('click', '#coordBlockM', function () {
    removeBlockA('block-b');
    removeBlockA('block-c');
    removeBlockA('block-a');

    if ($('.block-m').hasClass('active')) removeBlockA('block-m');else addClass('block-m');
});

function testAnim(x) {
    $('#animationSandbox').removeClass().addClass(x + ' animated').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function () {
        $(this).removeClass();
    });
};

$(document).ready(function () {
    $('.js--triggerAnimation').click(function (e) {
        e.preventDefault();
        var anim = $('.js--animations').val();
        testAnim(anim);
    });

    $('.js--animations').change(function () {
        var anim = $(this).val();
        testAnim(anim);
    });
});

