$(document).ready(function () {

    //hide loader
    setTimeout(function () {
        $('#loader').fadeOut();
    }, 1000);

})

$(document).on('tap click', '.right-icons li', function () {
    $('.right-icons li').not(this).removeClass('open');
    $(this).toggleClass('open');
})

//تغییر رنگ جداول 
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

//فعال شدن عکسهای صلع ها
$(document).on('mouseenter mouseleave', 'section.page-blocks area', function (event) {
    if ($(window).width() > 760) {
        var wrapper = $('section.page-blocks');

        var target = $(event.target);

        if (event.type == "mouseenter")
            $('.' + target.attr('data-block'), wrapper).addClass('in');


        if (event.type == "mouseleave")
            $('.' + target.attr('data-block'), wrapper).removeClass('in');
    }
});

//GALLERY

var maximum = null;

$('.thumnail').each(function () {
    var value = parseFloat($(this).attr('data-item'));
    maximum = (value > maximum) ? value : maximum;
});


$(document).on('tap click', '.thumnail', function () {
    $('.full-image').addClass('open');
    console.log($(this));
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
