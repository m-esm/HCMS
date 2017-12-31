/// <reference path="../lib/jquery/3.1.1/jquery3-1-1.js" />

$(document).on('mouseenter mouseleave', 'section.page-blocks area', function (event) {

    var wrapper = $('section.page-blocks');

    var target = $(event.target);


    if (event.type == "mouseenter")
        $(target.attr('data-block'), wrapper).addClass('in');


    if (event.type == "mouseleave")
        $(target.attr('data-block'), wrapper).removeClass('in');


});
