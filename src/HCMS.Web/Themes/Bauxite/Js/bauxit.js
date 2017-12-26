/// <reference path="/Packages/jquery-1.6.4/jquery-1.6.4-vsdoc.js" />
/// <reference path="freewall.js" />

function is_numeric(str) {
    return /^\d+$/.test(str);
}

$(function () {
    $('a.scroll-down').click(function () {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: target.offset().top - 80
                }, 1000);
                return false;
            }
        }
    });
});

$(function () {

    jQuery.scrollSpeed(100, 800);

    if ($(".last-price .value").size() != 0) {
        $.get("/pr_al", function (price) {
            price = price.trim();
            console.log(price);
            if (is_numeric(price)) {
                $(".last-price .value").text('$' + price);
            }
        });
    }



    $(".item-slider .cats li").click(function () {
        $(".item-slider .cats li").removeClass("active");
        $(this).addClass("active");
        $('.thumbnail-slider').hide();
        $('.thumbnail-slider[data-cat=' + $(this).data('target') + ']').show();

    });

    $('.close-nav').click(function () {

        $('nav').animate({ right: "-300px" });

    });

    $(document).on("click", "#photo_gallery a.play", function () {
        var preview = $(this).parents(".preview");
        var rid = preview.data("rid");
        $.get("/gallery_ajax", { rid: rid }, function (data) {
            $("#photo_gallery .slider").html(data);
            $("#photo_gallery .slider .gallery").magnificPopup({
                delegate: 'a', // the selector for gallery item
                type: 'image',
                gallery: {
                    enabled: true
                }
            });

            $("#photo_gallery .slider .gallery a").first().click();

        });
    });
    $(document).on("click", "#video_box .closebtn", function () {
        $("#video_box").remove();
    });

    $(document).on("click", "#videos .box", function () {



        var rid = $(this).data("rid");
        $.get("/video_ajax", { rid: rid }, function (data) {


            if ($("#video_box").size() == 0) {
                $("body").append($("<div id='video_box' />")
                    .append($("<div class='closebtn'>X</div>"))
                    .append($("<div class='video_frame' />")));
            }

            $("#video_box").fadeIn();
            $("#video_box .video_frame").html(data);

        });
    });




    $("#photo_gallery .galleries .box").hover(function () {

        galleryBoxHover(this);

    });

    galleryBoxHover($("#photo_gallery .galleries .box").first());


    function galleryBoxHover(item) {

        var pgallery = $("#photo_gallery");
        var preview = $(".preview", pgallery);
        var boxImage = $("img", item).clone();
        var box = $(item).clone();



        preview.html('');
        preview.append(boxImage);
        preview.data("rid", box.data("rid"));
        preview.append($("<h4 />").text($(item).data('title')));
        preview.append($("<a class='play'><i class='glyphicon glyphicon-play' /></a>"));

    }


    $('.nav-btn').click(function () {

        $('nav').animate({ right: "0" });

    });




    //$('.journals').mosaicflow({
    //    itemSelector: "> .journal",
    //    columnClass: 'journal__column',
    //    minItemWidth: 200
    //});
    if ($('.camera_wrap').size() != 0)
        jQuery('.camera_wrap').camera({
            navigationHover: false,
            pagination: false,
            playPause: false
        });





    $('.thumbnail-slider').slick({
        infinite: true,
        slidesToShow: 4,
        slidesToScroll: 3

    });

});