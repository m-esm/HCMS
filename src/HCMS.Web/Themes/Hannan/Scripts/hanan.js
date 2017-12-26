/// <reference path="jquery-1.9.1.js" />

$(function ()
{
    $('ul.head-nav').tinyNav({
        active: 'current',
        indent: '--- '
    });

    $("#tinynav1 option").each(function (index, opt)
    {
        var optVal = $(opt).val().toLowerCase();
        if (window.location.toString().toLowerCase().indexOf(optVal) != -1)
            $(opt).attr("selected", "selected");

        console.log(optVal);
    });


    jQuery('#slider').camera({
        height: '400px',
        loader: 'bar',
        loaderColor: '#ff0000',
        thumbnails: false,
        navigation: true,
        pagination: false,
        playPause: true
    });

    $(".pcat").click(function ()
    {
        var pcatId = $(this).attr("data-id");
        var i = 0;
        $(".pcat").each(function (index, pcat)
        {

            setTimeout(function ()
            {
                $(pcat).animate({ top: "-999px" }, "fast");
            }, i);

            i += 100;

        });

        setTimeout(function ()
        {
            $("div.pcat-products[data-pcat=" + pcatId + "]").animate({ top: 0, opacity: 1 }, "fast", "linear", function ()
            {
            });
        }, i + 200);

    });

    $(".mcat").click(function ()
    {
        var mcatId = $(this).attr("data-id");
        var i = 0;
        $(".mcat").each(function (index, pcat)
        {

            setTimeout(function ()
            {

               
               $(pcat).addClass("active","slow");

                setTimeout(function ()
                {
                    $(pcat).animate({ top: "-500px" }, "slow", function ()
                    {
                       
                    });

                }, 200);

            }, i);

            i += 300;

        });

        setTimeout(function ()
        {
           
            $("div.pcats[data-mcat=" + mcatId +"]").animate({ top: 0, opacity: 1 }, "fast", "linear", function ()
            {
                $(".mcats").hide();
            });
            var pcatCount = ($(".pcat").size() / 2);
            if ($(".pcat").size() % 2 != 0)
                pcatCount += 1;

            $("div.home-products-categories").animate({ height: pcatCount * 115, opacity: 1 }, "fast", "linear");

        }, i + 1000);

    });

    var itemSliderReverse = false;
    var itemSliderInterval = 0;
    setInterval(function () {
        if (itemSliderInterval < 6) {
            itemSliderInterval++;
            if(itemSliderReverse)
                $("#item-slider .prev").trigger("click");
            else
                $("#item-slider .next").trigger("click");

        } else {
            itemSliderReverse = !itemSliderReverse;
            itemSliderInterval = 0;
        }
    }, 3000);
    $("#item-slider .next,#item-slider .prev").click(function (e)
    {

        clearInterval(resetItemSliderInterval);
        var ul = $("ul", "#item-slider");
        var dir = "right";
        if (ul.attr("data-dir") != undefined)
            dir = ul.attr("data-dir");


        var valueToAdd = 200;
        if (dir == "left")
            valueToAdd *= -1;

        if ($(e.currentTarget).attr("class") == "next")
            valueToAdd *= -1;
        if (dir == "right")
            ul.css("right", (parseInt(ul.css(dir).replace("px", "")) + valueToAdd) + "px");
        else
            ul.css("left", (parseInt(ul.css(dir).replace("px", "")) + valueToAdd) + "px");

        resetItemSliderInterval = setInterval(resetItemSlider, 5000);

    });

    $("#pline ul.products > li").click(function ()
    {
        $("#pline div.sub-products").html($("ul", $(this).clone())[0]);
    });

    var resetItemSliderInterval = setInterval(resetItemSlider, 5000);
    resetItemSlider();
    function resetItemSlider()
    {
        var ul = $(".item-slider ul");
        var dir = "right";
        if (ul.attr("data-dir") != undefined)
            dir = ul.attr("data-dir");

        if (dir == "right")
            ul.css("right", 0);
        else
            ul.css("left", 0);

    }

    //if (window.addEventListener)
    //    window.addEventListener('DOMMouseScroll', wheel, false);
    //window.onmousewheel = document.onmousewheel = wheel;



    $(window).resize(function ()
    {
        resetItemSlider();
    });

    //function wheel(event)
    //{
    //    var delta = 0;
    //    if (event.wheelDelta) delta = event.wheelDelta / 120;
    //    else if (event.detail) delta = -event.detail / 3;

    //    handle(delta);
    //    if (event.preventDefault) event.preventDefault();
    //    event.returnValue = false;
    //}

    //function handle(delta)
    //{
    //    var time = 500;
    //    var distance = 300;

    //    $('html, body').stop().animate({
    //        scrollTop: $(window).scrollTop() - (distance * delta)
    //    }, time);
    //}

    $(window).scroll(function ()
    {
        if ($(this).scrollTop() > 100)
        {
            $('#scroll').fadeIn();
        } else
        {
            $('#scroll').fadeOut();
        }
    });
    $('#scroll').click(function ()
    {
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });


});


// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

function init()
{
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        zoom: 12,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(35.688049, 51.126748), // New York

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [{ "stylers": [{ "hue": "#ff1a00" }, { "invert_lightness": true }, { "saturation": -100 }, { "lightness": 33 }, { "gamma": 0.5 }] }, { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#2D333C" }] }]
    };
   // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Let's also add a marker while we're at it
    var marker = new google.maps.Marker({
        position: new google.maps.LatLng(35.688049, 51.126748),
        map: map,
        title: 'Hannan Sanat Pouya'
    });
}