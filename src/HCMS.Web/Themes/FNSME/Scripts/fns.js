/// <reference path="jquery-1.9.1.js" />

$(document).ready(function ()
{
    $("#loader").fadeOut();
    $("#body").fadeIn();
});

$(function ()
{

    $('table').stacktable();

    $(window).resize(function ()
    {
        if (window.innerWidth > 768)
        {
            $("ul.expend").removeAttr("style");
        }
    });

    $("li.navi").click(function ()
    {
        if (window.innerWidth < 768)
        {

            var ul = $(this).parents("ul").first();
            
            if (!$(ul).hasClass("expend"))
            {
                $(ul).addClass("expend");
                $(ul).stop().animate({ height: ($("nav > ul > li").size() + $("ul.open li").size() + 1) * 35 }, 100, "", null);

            } else
            {
                console.log("remove");
                $(ul).stop().animate({ height: 35 }, 100, "", null);
                $(ul).removeClass("expend");
            }

        }

    });

    $("nav > ul > li").click(function ()
    {
        if (window.innerWidth < 768)
        {
            if ($(this).is(":eq(0)") == false)
            {


                if ($("ul", this).size() > 0)
                {
                    if (!$("ul", this).hasClass("open"))
                        $("ul", this).addClass("open");
                    else
                        $("ul", this).removeClass("open");

                    $("nav > ul").stop().animate({ height: ($("nav > ul > li").size() + $("ul.open li").size()) * 50 }, 100, "", null);

                }



            }
        }


         
   
      

    });

    jQuery('#slider').camera({
        height: '300px',
        loader: 'bar',
        loaderColor: '#555',
        pagination: false,
        thumbnails: false,
        navigation: false,
        playPause: false
    });

});