/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />


var map;

//function initMap() {

//    if (!$('.page-places .map')[0])
//        return;

//    var uluru = { lat: 35.789581, lng: 51.495528 };
//    map = new google.maps.Map($('.page-places .map')[0], {
//        zoom: 16,
//        scrollwheel: false,
//        center: uluru
//    });

//    new google.maps.event.addListener(map, 'click', function (event) {
//        this.setOptions({ scrollwheel: true });
//    });

  
//}




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
    var isMain = li.attr("data-isMain");
    var _count = 0;
    if (isFirst)
        for (i = 0; i < markers.length; i++) {
            if (markers[i].isMain == 'false')
                markers[i].setMap(null);
        }

   
    //var hayatLangLat = hayat.attr('data-latlng').split('|')[1];

    //var latlng = new google.maps.LatLng(parseFloat(hayatLangLat.split(',')[0]), parseFloat(hayatLangLat.split(',')[1]));
    
    //var marker = new google.maps.Marker({
    //    position: latlng,
    //    title: hayat.attr('data-title').split('|')[1],
    //    descrp: hayat.attr('data-descrp').split('|')[1],
    //    image: hayat.attr('data-image').split('|')[1],
    //    icon: hayat.attr('data-icon').split('|')[1],
    //    map: map
    //});
    //markers.push(marker);



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
            isMain :isMain, 
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

    
   
    var infowindow = new google.maps.InfoWindow({
        maxWidth: 300,
        infoBoxClearance: new google.maps.Size(1, 1),
        disableAutoPan: false
    });
});

setTimeout(function () {
    $('#places .tabs li[data-isMain="true"]').click();
    isFirst = true;
}, 1000);

