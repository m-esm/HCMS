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