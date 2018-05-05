﻿/// <reference path="../node_modules/jquery/dist/jquery.js" />
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


var sliderMobile = {
    timer: 0,
    sliderSelector: $('#slider-mobile'),
    interval: 8000,
    outTimeout: 500,
    sliceHeight: $(document).innerHeight(),
    sliceTimeout: 100,
    sliceOut: true,
    oneSlice: true,
    next: function (nextIndex) {

        var currentSlideIndex = $('.mobile.active', this.sliderSelector).index();

        if (currentSlideIndex === -1) {
            currentSlideIndex = 0;
        }
        var currentSlide = $($('.mobile', this.sliderSelector)[currentSlideIndex])
                     .removeClass('active');

        //  console.log(currentSlide);

        if (nextIndex === undefined)
            nextIndex = currentSlideIndex + 1;

        if (nextIndex === $('.mobile', this.sliderSelector).length)
            nextIndex = 0;

        var nextSlide = $('.mobile', this.sliderSelector)[nextIndex];

        if (!nextSlide)
            nextSlide = currentSlide;
        else
            nextSlide = $(nextSlide);

        currentSlide.addClass('deactive');

        nextSlide.removeClass('deactive').addClass('active');

        $('.slice-mobile', nextSlide).removeClass('out').removeClass('in');

        var sliceCount = $(document).innerHeight() / sliderMobile.sliceHeight;

        var animates = [];

        for (var i = 0; i < sliceCount; i++) {

            animates.push(i);


        }

        async.eachSeries(animates, function (item, callback) {

            var sliceIndex = item;

            setTimeout(function () {

                var nextSlices = $($('.slice-mobile', nextSlide)[sliceIndex]).addClass('in');


                setTimeout(function () {
                    if (nextSlide.index() !== currentSlide.index() && sliderMobile.sliceOut)
                        var prevSlices = $($('.slice-mobile', currentSlide)[sliceIndex]).addClass('out');

                }, sliderMobile.outTimeout);


                callback();

            }, (sliceIndex + 1) * sliderMobile.sliceTimeout);


        }, function () {

            setTimeout(function () {
                currentSlide.removeClass('deactive');
            }, sliderMobile.interval - 10);


            clearTimeout(sliderMobile.timer);

            sliderMobile.timer = setTimeout(sliderMobile.next, sliderMobile.interval);

        });




    },
    init: function () {
        $('.mobile', this.sliderSelector).each(function (index, elem) {

            var slide = $(elem);

            $('.slice-mobile', slide).remove();

            var imgSrc = $('img', elem).attr('src');

            var slice = $('<div />')
                    .addClass('slice-mobile')
                    .css('backgroundImage', 'url(' + imgSrc + ')');

            if (!sliderMobile.oneSlice)
                slice = slide
                .height(sliderMobile.sliceHeight)
                    .css('backgroundPosition', '0 ' + i * -1 * sliderMobile.sliceHeight + 'px');


            if (sliderMobile.oneSlice)
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

        sliderMobile.next();

        //   slider.timer = setTimeout(slider.next, slider.interval);

    },
    stop: function () {
        clearInterval(this.timer);
    }

};

$(function () {

    //slider.init();
    slider.init();
    sliderMobile.init();
   // $(window).resize(slider.init);

});