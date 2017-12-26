(function ($, window, i) {
    $.fn.tinyNav = function (options) {

        // Default settings
        var settings = $.extend({
            'active': 'selected', // String: Set the "active" class
            'header': 'Navigation', // String: Specify text for "header" and show header instead of the active item
            'indent': '- ', // String: Specify text for indenting sub-items
            'label': '' // String: sets the <label> text for the <select> (if not set, no label will be added)
        }, options);

        return this.each(function () {

            // Used for namespacing
            i++;

            var $nav = $(this),
              // Namespacing
              namespace = 'tinynav',
              namespace_i = namespace + i,
              l_namespace_i = '.l_' + namespace_i,
              $select = $('<select/>').attr("id", namespace_i).addClass(namespace + ' ' + namespace_i);

            if ($nav.is('ul,ol')) {

                if (settings.header !== '') {
                    $select.append(
                      $('<option/>').text(settings.header)
                    );
                }

                // Build options
                var options = '';

                $nav
                  .addClass('l_' + namespace_i)
                  .find('a')
                  .each(function () {
                      options += '<option value="' + $(this).attr('href') + '">';
                      var j;
                      for (j = 0; j < $(this).parents('ul, ol').length - 1; j++) {
                          options += settings.indent;
                      }
                      options += $(this).text() + '</option>';
                  });

                // Append options into a select
                $select.append(options);

                // Select the active item
                if (!settings.header) {
                    $select
                      .find(':eq(' + $(l_namespace_i + ' li')
                      .index($(l_namespace_i + ' li.' + settings.active)) + ')')
                      .attr('selected', true);
                }

                // Change window location
                $select.change(function () {
                    //window.location.href = $(this).val();
                });

                // Inject select
                $(l_namespace_i).after($select);

                // Inject label
                if (settings.label) {
                    $select.before(
                      $("<label/>")
                        .attr("for", namespace_i)
                        .addClass(namespace + '_label ' + namespace_i + '_label')
                        .append(settings.label)
                    );
                }

            }

        });

    };
})(jQuery, this, 0);


$(function () {

    AOS.init({
        duration: 1000,
        //delay: 600,
    });

    var header = $("header");

    $(window).scroll(function () {
        if ($(this).scrollTop() > 100 && !$('header').hasClass('fix')) {

            header.addClass('fix');

        } else if ($(this).scrollTop() <= 100) {
            header.removeClass('fix');

        }
    });

    //setInterval(function () {

    //    if ($('#video video')[0].paused) {
    //        $('#video video')[0].play();
    //    }

    //}, 500);

    History.Adapter.bind(window, 'statechange', function () { // Note: We are using statechange instead of popstate
        var State = History.getState(); // Note: We are using History.getState() instead of event.state
        loadIt(window.location.pathname + window.location.search);
    });


    var initMap = function () {
        // When the window has finished loading create our google map below
        var mapElement = document.getElementById('map');
        if (mapElement != null) {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 14,

                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(35.760543, 51.362720), // New York

                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.
                styles: [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#e9e9e9" }, { "lightness": 17 }] }, { "featureType": "landscape", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 20 }] }, { "featureType": "road.highway", "elementType": "geometry.fill", "stylers": [{ "color": "#ffffff" }, { "lightness": 17 }] }, { "featureType": "road.highway", "elementType": "geometry.stroke", "stylers": [{ "color": "#ffffff" }, { "lightness": 29 }, { "weight": 0.2 }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 18 }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }, { "lightness": 16 }] }, { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }, { "lightness": 21 }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#dedede" }, { "lightness": 21 }] }, { "elementType": "labels.text.stroke", "stylers": [{ "visibility": "on" }, { "color": "#ffffff" }, { "lightness": 16 }] }, { "elementType": "labels.text.fill", "stylers": [{ "saturation": 36 }, { "color": "#333333" }, { "lightness": 40 }] }, { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "transit", "elementType": "geometry", "stylers": [{ "color": "#f2f2f2" }, { "lightness": 19 }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#fefefe" }, { "lightness": 20 }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "color": "#fefefe" }, { "lightness": 17 }, { "weight": 1.2 }] }]
            };

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>

            // Create the Google Map using our element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Let's also add a marker while we're at it
            var marker = new google.maps.Marker({
                position: new google.maps.LatLng(35.760543, 51.362720),
                map: map,
                title: 'Snazzy!'
            });
        }
    }

    var loadIt = function (pathname) {
        pathname = pathname.toLowerCase();
        if (pathname == "/")
            pathname = "/home";

        $.get('/ajax' + pathname, function (data) {

            //$('#pageHeading,#pageContent').hide();
            $("#scroll-down,#contentSection").show();

            $('#pageHeading').html($(data).filter('#pageHeading').html());
            $('#pageContent').html($(data).filter('#pageContent').html());


            $("#pageContent p ").attr("data-aos", "zoom-in");
            $("#pageContent h1").attr("data-aos", "fade-right");



            //console.log($('#pageContent').text().trim());
            if ($('#pageContent').text().trim() == "")
                $("#scroll-down , #contentSection").hide();

            //$('#pageHeading,#pageContent').show();

            setTimeout(function () {


                //AOS.refreshHard();
                initMap();

            }, 500);



        });


    };

    loadIt(window.location.pathname + window.location.search);

    $(document).on("click", "nav a,a.ajax", function (e) {
        e.preventDefault();
        var link = $(this);
        History.pushState(null, link.text(), link.attr('href'));
    });


    $(document).on('change', '.tinynav', function (e) {
        e.preventDefault();
        History.pushState(null, $(this).text(), $(this).val());
    });

    $("nav ul").tinyNav();


    //$('#fullpage').fullpage({
    //    anchors: ['heading', 'content'],
    //    continuousVertical: false,
    //    fitToSection: false,
    //    autoScrolling: true,
    //    continuousHorizontal: false,
    //    responsiveSlides: false,
    //    onSlideLeave: function () {

    //        $('#pageContent').scrollTop(0)


    //    }
    //});

    //$('#video').vide({
    //    mp4: '/Themes/Avatiss/video/birds.mp4',
    //    webm: '/Themes/Avatiss/video/birds.webm',
    //    poster: '/Themes/Avatiss/video/birds.jpg'
    //},
    //{
    //    volume: 1,
    //    playbackRate: 1,
    //    muted: true,
    //    loop: true,
    //    autoplay: true,
    //    position: '50% 50%', // Similar to the CSS `background-position` property.
    //    posterType: 'jpg', // Poster image type. "detect" — auto-detection; "none" — no poster; "jpg", "png", "gif",... - extensions.
    //    resizing: true, // Auto-resizing, read: https://github.com/VodkaBears/Vide#resizing
    //    bgColor: 'transparent', // Allow custom background-color for Vide div,
    //    className: '' // Add custom CSS class to Vide div
    //}
    //);

});

$(document).ready(function () {

    setTimeout(function () {
        $("#loader").fadeOut();
        $("#wrapper").fadeIn();
    }, 1);

});

