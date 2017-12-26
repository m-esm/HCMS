/// <reference path="jquery-1.9.1.js" />
/*!
 * jQuery plugin -> Production Line
 * Developer : Mohsen Esmaeli
 * HappySpider.Org
 */

(function ($)
{

    $.fn.pline = function (opts)
    {
        // default configuration
        var config = $.extend({}, {

        }, opts);


        var innerGrid = $(".inner-grid");


        /// Grid Element Move
        var gridElementLastMouseEvent = null;

        var gridElementMouseDown = function (event)
        {
            event.preventDefault(event);



            gridElementLastMouseEvent = event;

            event.target.addEventListener("mousemove", gridElementMouseMove);

        };

        var gridElementMouseUp = function (event)
        {
            event.target.removeEventListener("mousemove", gridElementMouseMove);

            var jtarget = $(event.target);
            var targetX = parseInt(jtarget.css("left").toString().replace("px", ""));
            var targetY = parseInt(jtarget.css("top").toString().replace("px", ""));

            targetX = Math.ceil(targetX / 50) * 50;
            targetY = Math.round(targetY / 50) * 50;

            jtarget.css("left", targetX);
            jtarget.css("top", targetY);

        };

        var gridElementMouseMove = function (event)
        {
            var jtarget = $(event.target);

            var NewX = (event.pageX - gridElementLastMouseEvent.pageX);
            var NewY = (event.pageY - gridElementLastMouseEvent.pageY);

            var OldX = parseInt(jtarget.css("left").toString().replace("px", ""));
            var OldY = parseInt(jtarget.css("top").toString().replace("px", ""));

            var targetX = OldX + NewX;
            var targetY = OldY + NewY;


            jtarget.css("left", targetX);
            jtarget.css("top", targetY);

            gridElementLastMouseEvent = event;

        };


        var gridElementMouseOut = function (event)
        {
            event.target.removeEventListener("mousemove", gridElementMouseMove);
        };
        /// Grid Element Move End
        var PEKey = 0;

        function downloadCanvas(link, canvasId, filename)
        {
            link.href = document.getElementById(canvasId).toDataURL();
            link.download = filename;
        }


        // main function
        function BuildPLine(elem)
        {


            var jelem = $(elem);
            var innerGrid = $("div.inner-grid", elem);

            $(".save", jelem).click(function ()
            {
                var divToRender = $("<div />");
                divToRender.addClass("render");
                divToRender.append($("<h1 />").text("Hannan Sanat Production Line Preview :"));
                divToRender.append($(".inner-grid").clone());
                divToRender.append($("ul.pline-list"));
                $("body").append(divToRender);

                html2canvas(divToRender, {
                    onrendered: function (canvas)
                    {
                        $("a.download", jelem)[0].href = canvas.toDataURL('image/png');
                        $("a.download", jelem)[0].click();
                        setTimeout(function ()
                        {
                            $(".render").remove();
                        }, 2000);
                    }
                });


            });


            $("input.length,input.width").change(function ()
            {
                var place_length = $("input.length", elem).val();
                var place_width = $("input.width", elem).val();
                innerGrid.css({ width: place_length * 100, height: place_width * 100 });

            });

            $("input.length,input.width").change();

            $(".grid-nav", jelem).mousedown(function ()
            {
                var navBtn = $(this);
                var innerGrid = $(".inner-grid", jelem);
                var verticalPosAppend = 0;
                var horizontalPosAppend = 0;
                var posAppend = 90;
                var transformScaleAppend = 0;


                if (innerGrid.attr("data-transform") == undefined)
                    innerGrid.attr("data-transform", 1);

                var elemTransformScale = parseFloat(innerGrid.attr("data-transform"));


                innerGrid.css({ top: "", left: "" });

                if (navBtn.hasClass("up"))
                    verticalPosAppend = posAppend;

                if (navBtn.hasClass("down"))
                    verticalPosAppend = -1 * posAppend;

                if (navBtn.hasClass("left"))
                    horizontalPosAppend = posAppend;

                if (navBtn.hasClass("right"))
                    horizontalPosAppend = -1 * posAppend;

                if (navBtn.hasClass("zoom-in"))
                    elemTransformScale += 0.1;

                if (navBtn.hasClass("zoom-out"))
                    elemTransformScale -= 0.1;

                if (navBtn.hasClass("add-pillar"))
                {
                    var pillar = $("<div />").addClass("pillar").text("X");
                    $(".inner-grid", jelem).append(pillar);

                    pillar[0].addEventListener('mousedown', gridElementMouseDown);
                    pillar[0].addEventListener('mouseup', gridElementMouseUp);
                    pillar[0].addEventListener('mouseout', gridElementMouseOut);


                    pillar.contextmenu(function (e)
                    {
                        e.preventDefault(e);
                        $(this).remove();
                    });

                }



                innerGrid.attr("data-transform", elemTransformScale);
                innerGrid.css({
                    top: parseInt(innerGrid.css("top").replace("px", "")) + verticalPosAppend,
                    left: parseInt(innerGrid.css("left").replace("px", "")) + horizontalPosAppend,
                    transform: "scale(" + elemTransformScale + ")"
                });


            });
            $(document).on("click", "div.sub-products li", function (e)
            {
                var img = $("img", this).clone();
                $(".inner-grid", jelem).append(img);

                img[0].addEventListener('mousedown', gridElementMouseDown);
                img[0].addEventListener('mouseup', gridElementMouseUp);
                img[0].addEventListener('mouseout', gridElementMouseOut);
                img.attr("data-key", PEKey);


                $("ul.pline-list").append($("<li />").text($(this).text()).attr("data-key", PEKey));


                img.contextmenu(function (e)
                {
                    e.preventDefault(e);
                    var key = $(this).attr("data-key");
                    $(this).remove();
                    $("ul.pline-list li[data-key=" + key + "]").remove();

                });

                PEKey++;

            });

            function getUniqueName(elem)
            {
                var un = new Date().toTimeString();
                un += $(elem).text();
                return un.replaceAll(" ", "").trim().replace(/(\r\n|\n|\r)/gm, "");
            }



        }



        // initialize every element
        this.each(function ()
        {
            BuildPLine(this);
        });

        return this;
    };

    // start
    $(function ()
    {
        $("#pline").pline();
    });

})(jQuery);


String.prototype.replaceAll = function (search, replacement)
{
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};