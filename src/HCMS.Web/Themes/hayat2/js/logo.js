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

    }, 10);

});
