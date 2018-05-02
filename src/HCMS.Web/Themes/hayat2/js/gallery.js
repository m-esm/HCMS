var maximum = null;

$('.thumnail').each(function () {
    var value = parseFloat($(this).attr('data-item'));
    maximum = (value > maximum) ? value : maximum;
});

$(document).on('mouseover', '.thumnail', function () {
    $(this).parent().find('.back').addClass('active');
})

$(document).on('click', '.thumnail', function () {
    $('.full-image').addClass('open');
    $('.preview img').attr('src', $(this).attr('src'));
    $('.preview img').attr('data-item', $(this).attr('data-item'));

});

$(document).on('click', '.full-image .fa-close', function () {
    $('.full-image').removeClass('open');
});

$(document).on('click', '.unit-full-img .fa-close', function () {
    $('.unit-full-img').removeClass('open');
});



$(document).on('click', '#prev', function () {
    var attr = parseInt($('.preview img').attr('data-item'));
    var prevItem = $('.thumnail[data-item=' + (attr + 1) + ']');
    if (prevItem.length > 0) {
        $('.preview img').attr('src', prevItem.attr('src'));
        $('.preview img').attr('data-item', attr + 1);
    } else {
        $('.preview img').attr('src', $('.thumnail[data-item=1]').attr('src'));
        $('.preview img').attr('data-item', 1);
    }
})

$(document).on('click', '#next', function () {
    var attr = parseInt($('.preview img').attr('data-item'));
    var prevItem = $('.thumnail[data-item=' + (attr - 1) + ']');
    if (prevItem.length > 0) {
        $('.preview img').attr('src', prevItem.attr('src'));
        $('.preview img').attr('data-item', attr - 1);
    } else {
        $('.preview img').attr('src', $('.thumnail[data-item=' + maximum + ']').attr('src'));
        $('.preview img').attr('data-item', maximum);
    }
})

$('#gallery .box').click(function () {
    $('.all-box').removeClass('active');
    $('.slider-section[data-target="' + $(this).attr('data-target') + '"]').addClass('active');
})

//$('#gallery button').click(function () {
//    $('.all-box').removeClass('active');
//    $('.slider-section[data-target="' + $(this).attr('data-target') + '"]').addClass('active');
//})

$(document).on('tap click', '#gallery button', function () {
    $('.all-box').removeClass('active');
    $('.slider-section[data-target="' + $(this).attr('data-target') + '"]').addClass('active');
})

$('#gallery-back').click(function () {
    $('.all-box').addClass('active');
    $('.slider-section').removeClass('active');
})




$(document).on('mouseenter mouseleave', '#gallery-photo-carousel .carousel-inner', function (e) {
    if (e.type == 'mouseenter')
        $('#gallery-photo-carousel .navbar').addClass('open');
    else
        $('#gallery-photo-carousel .navbar').removeClass('open');
})

$(document).on('mouseenter mouseleave', ' #gallery-photo-carousel .navbar', function (e) {
    if (e.type == 'mouseenter')
        $('#gallery-photo-carousel .navbar').addClass('open');
    else
        $('#gallery-photo-carousel .navbar').removeClass('open');
});

$(document).on('click tap', '.carousel-indicators li', function () {
    $('.carousel-indicators li').removeClass('active');
    $(this).addClass('active');

    $('.carousel-inner .item').removeClass('active');
    $('.carousel-inner .item[data-slide-no="' + $(this).attr('data-slide-to') + '"]').addClass('active');

});