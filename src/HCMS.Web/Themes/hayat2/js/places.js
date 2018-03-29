/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />


var map;


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
            descrp: descrps[_count],
            image: images[_count],
            icon: icon,
            isMain: isMain,
            map: map
        });
        markers.push(marker);

        google.maps.event.addListener(marker, 'click', (function (marker, _count) {
            return function () {
                infowindow.setContent('<div class="content cscroll" id="content-' + _count +
                    '" style="max-height:300px;overflow:hidden; font-family: Tahoma; font-size:12px;"><div style="text-align:center" class="alert alert-success">'
                    + marker.title + '</div>'
                   + '<img style="max-height:250px; max-width:100%;" src="' + marker.image + '" />'
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
    isFirst = true;
    // تغییر رنگ

    var item = $('#places ul').children('li');
    
    var _colors = []
    $.each(item, function (index, obj) {
        _colors.push({ index : index, cat: $(obj).attr('data-cat-name'), isSet: false, mainColor: $(obj).attr('data-cat-bgcolor'), color: $(obj).attr('data-cat-color'), _generateColor: '' });
    });

    $.each(item, function (index, obj) {
        var _cat = $(obj).attr('data-cat-name');
        var find = _colors.filter(a=>a.cat == _cat);
        var _mainColor = find[0].mainColor;
        var _rgb = _mainColor.split(',');
        var r = _rgb[0];
        var g = _rgb[1];
        var b = _rgb[2];
        if(!find[0].isSet)
            $.each(find, function (i, _col) {
                _col.isSet = true;
                _col.cat = _col.cat;
                _col._generateColor = getColor(r, g, b, find.length, i);
            })
    });

    $.each(item, function (index, obj) {
        var _find = _colors.find(a=>a.index == index);
        $(obj).css('background', _find._generateColor);
        $(obj).css('color', _find.color);
    });


}, 1000);

//open close tabs
//$(document).on('tap click', '.menu .fa', function () {
//    var elm = $(this);
//    if (elm.attr('data-action') == 'close') {
//        elm.parent('.menu').addClass('close');
//        $('.tabs').addClass('close');
//    } else {
//        elm.parent('.menu').removeClass('close');
//        $('.tabs').removeClass('close');
//    }

//})

$('.menu .fa').click(function () {
    var elm = $(this);
    if (elm.attr('data-action') == 'close') {
        elm.parent('.menu').addClass('close');
        $('.tabs').addClass('close');
    } else {
        elm.parent('.menu').removeClass('close');
        $('.tabs').removeClass('close');
    }
})

function getColor(r, g, b, len, i) {
    var len = len;
    var targ_R = r,
        targ_G = g,
        targ_B = b,

        inc_R = (0 + targ_R) / len,
        inc_G = (0 + targ_G) / len,
        inc_B = (0 + targ_B) / len;

    return "#" + toHex(0 + (i * inc_R)) + toHex(0 + (i * inc_G)) + toHex(0 + (i * inc_B));
   
}

function toHex(n) {
    var h = (~~n).toString(16);
    if (h.length < 2)
        h = "0" + h;
    return h;
}


