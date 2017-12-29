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

var removeBlockA = function (className) {
    $('.' + className).removeClass('bounceInLeft animated');
    $('.' + className).addClass('bounceOutRight animated');
    setTimeout(function () {
        $('.' + className).removeClass('active');
    }, 500)
}

var addClass = function (className) {
    $('.' + className).addClass('active');
    $('.' + className).removeClass('bounceOutRight animated');

    if (!$('.' + className).hasClass('bounceInLeft animated'))
        $('.' + className).addClass('bounceInLeft animated');
}

//var addClass = function (className) {
//    $('.' + className).addClass('active');
//    $('.' + className).removeClass('bounceOutRight animated');
//    $('.' + className).addClass('bounceInLeft animated');
//}

$(document).on('click', '#coordBlockA', function () {

    //removeBlockA('block-b');
    //removeBlockA('block-c');
    //removeBlockA('block-m');

    //if ($('.block-a').hasClass('active'))
    //    removeBlockA('block-a');
    //else 
    //    addClass('block-a');
});

$(document).on('click', '#coordBlockB', function () {
    removeBlockA('block-a');
    removeBlockA('block-c');
    removeBlockA('block-m');

    if ($('.block-b').hasClass('active'))
        removeBlockA('block-b');
    else
        addClass('block-b');
});

$(document).on('click', '#coordBlockC', function () {
    removeBlockA('block-a');
    removeBlockA('block-b');
    removeBlockA('block-m');

    if ($('.block-c').hasClass('active'))
        removeBlockA('block-c');
    else
        addClass('block-c');
})

$(document).on('click', '#coordBlockM', function () {
    removeBlockA('block-b');
    removeBlockA('block-c');
    removeBlockA('block-a');

    if ($('.block-m').hasClass('active'))
        removeBlockA('block-m');
    else
        addClass('block-m');

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
/// <reference path="../lib/aos/aos.js" />


//AOS.init({
//    offset: 200,
//    duration: 600,
//    easing: 'ease-in-sine',
//    delay: 500,
//});


$(document).ready(function () {

    $('#loader').fadeOut();

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

   
});
$(function () {


    var logoBoxSelect = ".logobox";
    var logoBox = $(logoBoxSelect).html('');

    for (var i = 1; i <= 50; i++) {
        logoBox.append('<div class="o' + i + ' start"></div>');
    }


    function doLogoAnim(reverse) {

        logoBox = $(logoBoxSelect);

        var transforms = [
            [2, { height: 45 }],
            [3, { height: 10 }],
            [4, { height: 28 }],
            [5, { width: 27 }],
            [6, { width: 78 }],
            [7, { width: 57.5 }],
            [10, { height: 44 }],
            [11, { width: 22.5 }],
            [12, { width: 78 }],
            [13, { width: 40 }],
            [9, { height: 10 }],
            [8, { height: 10 }],
            [17, { width: 42 }, ],
            [16, { height: 45 }, ],
            [15, { width: 26 }, ],
            [14, { height: 55 }, ],
            [18, { height: 10 }, ],
            [19, { height: 90 }],
            [20, { height: 70 }],
            [21, { height: 140 }],
            [22, { height: 133 }, 300],
            [23, { width: 198 }, 300],
            [24, { height: 144 }, 300],
            [25, { width: 154 }, 300],
            [26, { width: 50 }, 300],
            [27, { width: 88 }, 300],
            [30, { width: 43 }, 100],
            [28, { width: 102 }, 100],
            [29, { width: 35 }, 100],
            [31, { width: 71 }, 100]
        ];

        if (reverse)
            transforms = transforms.reverse();



        var transformSeries = [];

        transforms.forEach(function (item) {

            var reverseDuration = 5000;

            if (reverse)
                if ([23, 24, 29, 15, 16, 14].indexOf(item[0]) !== -1)
                    return;

            var resFn = function (callback) {

                if (reverse) {

                    if (item[1].width)
                        item[1].width = 0;

                    if (item[1].height)
                        item[1].height = 0;


                    var mainDuration = reverseDuration;
                    if ([22, 25, 31].indexOf(item[0]) !== -1)
                        mainDuration = reverseDuration / 2;

                    if ([17].indexOf(item[0]) !== -1)
                        mainDuration = reverseDuration / 4;

                    $('.o' + item[0], logoBox).animate(item[1], mainDuration, function () {


                        if (item[0] === 22)
                            $('.o23', logoBox).animate({ width: 0 }, reverseDuration / 2);


                        if (item[0] === 25)
                            $('.o24', logoBox).animate({ height: 0 }, reverseDuration / 2);


                        if (item[0] === 31)
                            $('.o29', logoBox).animate({ width: 0 }, reverseDuration / 2);


                        if (item[0] === 17)
                            $('.o16', logoBox).animate({ height: 0 }, reverseDuration / 4, function () {
                                $('.o15', logoBox).animate({ width: 0 }, reverseDuration / 4, function () {
                                    $('.o14', logoBox).animate({ height: 0 }, reverseDuration / 4, function () {

                                    });
                                });
                            });


                       return callback(null, item);



                    });


                } else {

                    $('.o' + item[0], logoBox).animate(item[1], item[2] || 200, function () {
                       return callback(null, item);

                    });

                }


            }

            transformSeries.push(resFn);

        });

        $('> div', logoBox).removeClass('start');

        if (reverse) {

            async.parallel(transformSeries, function () {

                setTimeout(function () {
                    $('.logobox').addClass('solid');
                }, 3000);


            });

        } else
            async.series(transformSeries,
                    function (err, results) {

                        setTimeout(function () {

                            var logoBoxR = $('.logoboxR');
                            logoBoxR = $($('<div class="logoboxR done loaded"></div>').append(logoBox.html()));
                            logoBox.parent().append(logoBoxR);
                            logoBoxSelect = '.logoboxR';

                            var toReversPos = {
                                "o20": ["bottom", "left"],
                                "o22": ["bottom", "left"],
                                "o23": ["bottom", "left"],
                                "o17": ["top", "right"],
                                "o16": ["bottom", "left"],
                                "o15": ["bottom", "left"],
                                "o14": ["top", "left"],

                                // "o24": ["top", "left"],
                                // "o25": ["top", "right"]
                            };

                            _.each(_.keys(toReversPos), function (key) {

                                var ro = toReversPos[key];
                                var o = $('div.' + key, logoBoxR);

                                if (ro.indexOf("bottom") !== -1)
                                    o.css("top", o.css("top")).css("bottom", "unset");

                                if (ro.indexOf("top") !== -1)
                                    o.css("bottom", o.css("bottom")).css("top", "unset");

                                if (ro.indexOf("left") !== -1)
                                    o.css("right", o.css("right")).css("left", "unset");

                                if (ro.indexOf("right") !== -1)
                                    o.css("left", o.css("left")).css("right", "unset");

                            });


                            setTimeout(function () {
                                doLogoAnim(true);
                            }, 5000);

                        }, 3000);


                    });
    };

    setTimeout(function () {

        doLogoAnim(false);

    }, 1000);




});


var map;

function initMap() {

    if (!$('.page-places .map')[0])
        return;

    var uluru = { lat: 35.789581, lng: 51.495528 };
    map = new google.maps.Map($('.page-places .map')[0], {
        zoom: 16,
        center: uluru
    });
    var marker = new google.maps.Marker({
        position: uluru,
        map: map
    });
}


$(document).on('click', '#tabs-rest', function () {
    //رستوران
    var points = [
         {
             position: new google.maps.LatLng(35.788718, 51.497732),
             title: 'رستوران نوبهار',
         }, {
             position: new google.maps.LatLng(35.788688, 51.496523),
             title: 'کترینگ عارف',
         }, {
             position: new google.maps.LatLng(35.790298, 51.495021),
             title: 'بامزی فست فود',
         }
    ];
    // Create markers.
    points.forEach(function (point) {
        var marker = new google.maps.Marker({
            position: point.position,
            title: point.title,
            icon: '/Themes/hayat2/img/Icon.png',
            map: map
        });
    });


});

$(document).on('click', '#tabs-bred', function () {
    //نانوایی
    var points = [
        {
            position: new google.maps.LatLng(35.790198, 51.495022),
            title: 'نانوایی سنگکی',
        }
    ];
    // Create markers.
    points.forEach(function (point) {
        var marker = new google.maps.Marker({
            position: point.position,
            title: point.title,
            //icon: icons[feature.type].icon,
            map: map
        });
    });
});
/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />
$(function () {



    var busy = false;

    var onHashChange = function () {

        if (!busy)
            changePage($(window.location.hash.toLowerCase()), "down");


    };

    var changePage = function (nextPage, mode) {

        if (busy)
            return;

        busy = true;

        setTimeout(function () {

            busy = false;

        }, 500);


        console.log(nextPage);

        var currentPage = $('section.page.page-active');

        if (!nextPage)
            nextPage = currentPage.next('section');

        var prevPage = currentPage.prev('section');

        setTimeout(function () {

            $('[data-aos]', nextPage)
 .addClass('aos-animate');


            $('[data-aos]', prevPage)
.addClass('aos-animate');

        }, 1000);



        // $('[data-aos]', currentPage).removeClass('aos-animate');



        if (currentPage.attr('id') === nextPage.attr('id'))
            return;



        if (mode === "up") {

            if (prevPage.length > 0) {


                prevPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-top')
                    .removeClass('page-active');


                if (prevPage.hasClass('page-slider'))
                    $('header').removeClass('stick');


                if (prevPage.attr('id'))
                    window.location.hash = prevPage.attr('id');


            }


        }
        if (mode === "down") {



            if (nextPage.length > 0) {
                nextPage.addClass('page-active')
                    .removeClass('page-deactive-top')
                .removeClass('page-deactive-down');

                currentPage.addClass('page-deactive-down')
                    .removeClass('page-active');


                $('header').addClass('stick');


                if (nextPage.attr('id'))
                    window.location.hash = nextPage.attr('id');



            }


        }

        //   $(window).bind('hashchange', onHashChange);


    };


    $('body').bind('mousewheel', function (e) {


        if (busy)
            return;


        if ($(e.target).parents().hasClass('cscroll') || $(e.target).hasClass('cscroll'))
            return;
        if (e.originalEvent.wheelDelta / 120 > 0) {

            console.log('scrolling up !');

            changePage(false, 'up');

        } else {

            console.log('scrolling down !');
            changePage(false, 'down');


        }

        changePage();

    });


        $(window).scrollTop(0);
    $(window).bind('hashchange', onHashChange);

    if (window.location.hash.length > 2)
        changePage($(window.location.hash.toLowerCase()), "down");
    else
        window.location.hash = $('section.page').first().attr('id');


    console.log('going to ' + window.location.hash);


});


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
            for (var i = 0; i < $(document).innerHeight() / slider.sliceHeight; i++) {

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

            }

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


    playVideo($('#videos .thumbnails div').attr('data-src'),false);



});