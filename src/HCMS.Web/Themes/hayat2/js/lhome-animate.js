var lastScrollTop = 0;
var px = 80;

$(window).scroll(function (e) {

    var body = $("html, body");

    var st = $(this).scrollTop();

    var itemCount = $('.lhome-animate').children('.box').length;

    for (var i = 1; i <= itemCount; i++) {

    }

    if ($('.lhome-animate > .item1').offset() != undefined) {

        if (st > lastScrollTop) {

            //scroll down
            if (!$('.lhome-animate > .item' + 1).hasClass('done')) {
                $('.lhome-animate > .item' + 1).addClass('start');
                animateDown(1, st);
            }

            if ($('.lhome-animate > .item' + 1).hasClass('done') && !$('.lhome-animate > .item' + 2).hasClass('done')) {
                if (px <= 0 && !$('.lhome-animate > .item' + 2).hasClass('start'))
                    px = 80;
                $('.lhome-animate > .item' + 2).addClass('start');
                animateDown(2, st);
            }

            if ($('.lhome-animate > .item' + 1).hasClass('done') && $('.lhome-animate > .item' + 2).hasClass('done') && !$('.lhome-animate > .item' + 3).hasClass('done')) {
                if (px <= 0 && !$('.lhome-animate > .item' + 3).hasClass('start'))
                    px = 80;
                $('.lhome-animate > .item' + 3).addClass('start');
                animateDown(3, st);
            }

        } else {

            // upscroll code
            if (($('.lhome-animate > .item' + 1).hasClass('done') &&
                !$('.lhome-animate > .item' + 2).hasClass('done') &&
                !$('.lhome-animate > .item' + 3).hasClass('start')) ||
                !$('.lhome-animate > .item' + 1).hasClass('done')) {
                //if ($('.lhome-animate > .item' + 1).hasClass('start')) {
                //    $('.lhome-animate > .item' + 1).removeClass('start');
                //    if ($('.lhome-animate > .item' + 1).hasClass('start') && px >= 114) {
                //        $('.lhome-animate > .item' + 1).removeClass('start');
                //        px = 0;
                //    }
                //}
                animateUp(1, st);
            }

            if (($('.lhome-animate > .item' + 2).hasClass('done') &&
                !$('.lhome-animate > .item' + 3).hasClass('done') &&
                !$('.lhome-animate > .item' + 3).hasClass('start'))) {
                //if ($('.lhome-animate > .item' + 2).hasClass('start') && px >= 114)
                //{
                //    $('.lhome-animate > .item' + 2).removeClass('start');
                //    px = 0;
                //}

                animateUp(2, st);

            }

            if ($('.lhome-animate > .item' + 3).hasClass('done') ||
                $('.lhome-animate > .item' + 3).hasClass('start')) {

                animateUp(3, st);
            }
        }
        lastScrollTop = st;
    }

});

var animateDown = function (item, st) {
    var itemTop = $('.lhome-animate > .item' + item).offset().top;
    var itemHeight = $('.lhome-animate > .box').height();

    if (st >= itemTop - 100 && st <= itemHeight + itemTop && px > 0) {
        px -= 3;
        $('.lhome-animate > .item' + item + ' > .left > img').css('transform', 'translateY(' + px + 'px)');
    } else {
        if (st > (itemHeight + itemTop - 120)) {
            $('.lhome-animate > .item' + item).removeClass('start');
            $('.lhome-animate > .item' + item).addClass('done');
        }
    }

}

var animateUp = function (item, st) {
    console.log(item);

    var itemTop = $('.lhome-animate > .item' + item).offset().top;
    var itemHeight = $('.lhome-animate > .box').height();
    if (st >= itemTop - itemHeight && st <= itemHeight + itemTop && px <= 114) {
        px += 3;
        $('.lhome-animate > .item' + item + ' > .left > img').css('transform', 'translateY(' + px + 'px)');
    } else {
        //if (px >= 114) {
        //    if(!$('.lhome-animate > .item' + item).hasClass('start'))
        //        $('.lhome-animate > .item' + item).addClass('start');
        //    else {
        //        $('.lhome-animate > .item' + item).removeClass('start');
        //        $('.lhome-animate > .item' + item - 1).addClass('start');

        //    }

        //}

        //console.log(item, st, itemTop - itemHeight);
        if (st < itemTop - itemHeight) {
            $('.lhome-animate > .item' + item).removeClass('done');
            $('.lhome-animate > .item' + item).removeClass('start');
            var _newItem = item - 1;
            $('.lhome-animate > .item' + _newItem).addClass('start');
            px = 0;
        }
    }
}