
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