﻿/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(function () {


    $('#videos .tv').click(function () {

        var video = $('#video')[0];



        if (!video)
            return;


        if ($('source', video).length == 0)
            playVideo($('#videos .thumbnails div').attr('data-src'),false);

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






});
