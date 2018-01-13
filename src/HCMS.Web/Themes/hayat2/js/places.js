/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />


var map;

function initMap() {

    if (!$('.page-places .map')[0])
        return;

    var uluru = { lat: 35.789581, lng: 51.495528 };
    map = new google.maps.Map($('.page-places .map')[0], {
        zoom: 16,
        scrollwheel: false,
        center: uluru
    });

    new google.maps.event.addListener(map, 'click', function (event) {
        this.setOptions({ scrollwheel: true });
    });

  
}




var markers = [];
var isFirst = false;

$(document).on('click', '#places .tabs li', function () {
    var images = [];
    var li = $(this)

    icon = li.attr("data-icon"),
     title = li.attr("data-title");
    //    positions = _.map(li.attr("data-latlng").split('|'), function (item) {

    //        if (!item)
    //            return;
    //        var _map = new google.maps.LatLng(parseFloat(item.split(',')[0]), parseFloat(item.split(',')[1]));
    //        images.push({ map: _map, url: li .att})
    //        return _map;

    //    }),

    var images = li.attr("data-image").split('|');
    var titles = li.attr("data-title").split('|');
    var descrps = li.attr("data-descrp").split('|');
    var _count = 0;

    if (isFirst)
        for (i = 0; i < markers.length; i++) {
            markers[i].setMap(null);
        }


    _.map(li.attr("data-latlng").split('|'), function (item) {

        if (!item)
            return;
        var latlng = new google.maps.LatLng(parseFloat(item.split(',')[0]), parseFloat(item.split(',')[1]));
        _count++;
        var marker = new google.maps.Marker({
            position: latlng,
            title: titles[_count],
            descrp : descrps[_count],
            image: images[_count],
            icon: icon,
            map: map
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, _count) {
            return function () {
                infowindow.setContent('<div class="content cscroll" id="content-' + _count +
                    '" style="max-height:300px;overflow:hidden; font-family: Tahoma; font-size:12px;"><div style="text-align:center" class="alert alert-success">'
                    + marker.title + '</div>'
                   + '<img style="max-height:250px; max-width:100%;" src="' + marker.image+ '" />'
                    + '<p style="text-align:justify; direction:rtl;word-break:break-word;">' + marker.descrp + '</p>' + '</div>');
                infowindow.open(map, marker);
            }
        })(marker, _count));


    })
     

    //نانوایی
    //var points = [
    //    {
    //        position: new google.maps.LatLng(35.790198, 51.495022),
    //        title: title
    //    }
    //];

    
   
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
        infoBoxClearance: new google.maps.Size(1, 1),
        disableAutoPan: false
    });
});

setTimeout(function () {
    $('#places .tabs li').click();
    isFirst = true;
}, 1000);

