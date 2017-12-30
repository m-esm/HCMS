/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

var map;

function initMap() {

    if (!$('.page-places .map')[0])
        return;

    var uluru = { lat: 35.789581, lng: 51.495528 };
    map = new google.maps.Map($('.page-places .map')[0], {
        zoom: 16,
        center: uluru
    });

}


$(document).on('click', '#places .tabs li', function () {

    var li = $(this),
        positions = _.map(li.attr("data-latlng").split('|'), function (item) {

            if (!item)
                return;

            return new google.maps.LatLng(parseFloat(item.split(',')[0]), parseFloat(item.split(',')[1]))

        }),
        icon = li.attr("data-icon"),
        title = li.attr("data-title");

    //نانوایی
    //var points = [
    //    {
    //        position: new google.maps.LatLng(35.790198, 51.495022),
    //        title: title
    //    }
    //];

    positions.forEach(function (latlng) {

        new google.maps.Marker({
            position: latlng,
            title: title,
            icon: icon,
            map: map
        });

    });


});

setTimeout(function () {

    $('#places .tabs li').click();

}, 1000);