/// <reference path="jquery-1.9.1.js" />

var ARXE = function () {

    function initImages(activeFloor) {

        var floor = $(".level:eq(" + activeFloor + ")");
        $("[data-src]", floor).each(function (index, elem) {
            $(elem).attr("src", $(elem).attr("data-src"));
        });

        $("[data-bg]", floor).each(function (index, elem) {
            $(elem).css("background-image", "url(" + $(elem).attr("data-bg") + ")");
        });

    }


    $('.graphicCatWorks').each(function (index, elem) {

        var gcat = $(elem);

        var changeSlide = function (icon) {

            gcat.find(".box-pic").css("backgroundImage", 'url(' + icon.data("src") + ')');
            gcat.find(".box-title").text(icon.data("title"));
            gcat.find(".box-text").text(icon.data("text"));

        };

        //   gcat.find(".box-pic").css("backgroundImage", 'url(' + gcat.find(".icon").first().data("src") + ')');
        changeSlide(gcat.find(".icon").first());

        gcat.find(".icon").click(function () {

            var icon = $(this);

            changeSlide(icon);

        });


    });






    //setTimeout(function () {
    //    var text = $('.typewriter').data('text');
    //    typeWriter(text, 0);
    //}, 2000);

    $("[title]").miniTip({
        delay: 0,
        fadeIn: 100,
        fadeOut: 0
    });


    $(document).on("click", ".project .slider .btn-prev", function () {
        var project = $(this).parents(".project").first();
        var slider = $(".slider", project);
        var currentImage = 0;
        function getImage(index) {
            return $("img:eq(" + index + ")", slider);
        }

        if (slider.data("current-image") == undefined)
            slider.data("current-image", currentImage);
        else
            currentImage = parseInt(slider.data("current-image"));

        getImage(currentImage).hide();
        if (currentImage - 1 < 0)
            currentImage = $("img", slider).size();



        getImage(currentImage - 1).fadeIn();

        slider.data("current-image", currentImage - 1);



    });

    $(document).on("click", ".project .slider .btn-next", function () {
        var project = $(this).parents(".project").first();
        var slider = $(".slider", project);
        var currentImage = 0;
        function getImage(index) {
            return $("img:eq(" + index + ")", slider);
        }

        if (slider.data("current-image") == undefined)
            slider.data("current-image", currentImage);
        else
            currentImage = parseInt(slider.data("current-image"));

        getImage(currentImage).hide();
        if (currentImage + 1 >= $("img", slider).size())
            currentImage = -1;

        getImage(currentImage + 1).fadeIn();

        slider.data("current-image", currentImage + 1);



    });



    $(document).on("click", ".project .slider .btn-gallery", function () {
        var project = $(this).parents(".project").first();
        $(".slider", project).remove();
        $(".members", project).fadeIn();
        $("#arrow").fadeIn();
        var floor = $(".level:eq(" + ascensorInstance.floorActive + ")")
           .data("ascensor-left", ascensorInstance.floorActive - 1)
           .data("ascensor-right", ascensorInstance.floorActive + 1);

    });

    $(document).on("click", ".box.gallery", function () {

        var project = $(this).parents(".project").first();
        var projectName = project.data("name");

        $.get("/project_gallery_ajax", { pname: projectName }).done(function (data) {
            var jsonData = JSON.parse(data);

            $(".members", project).fadeOut();
            $("#arrow").fadeOut();


            project.prepend($("<div />").addClass("slider"));


            var floor = $(".level:eq(" + ascensorInstance.floorActive + ")")
            .data("ascensor-left", ascensorInstance.floorActive)
            .data("ascensor-right", ascensorInstance.floorActive);

            $(".slider", project).prepend($("<a />").addClass("btn-gallery").append("<i class='glyphicon glyphicon-picture'></i>"));
            $(".slider", project).prepend($("<a />").addClass("btn-next").append("<i class='glyphicon glyphicon-menu-right'></i>"));
            $(".slider", project).prepend($("<a />").addClass("btn-prev").append("<i class='glyphicon glyphicon-menu-left'></i>"));
            $(jsonData).each(function (index, item) {

                $(".slider", project).append($("<img />").attr("src", item).hide());

            });

            $(".slider img", project).first().fadeIn();

        });


    });


    function renderProc(activeFloor) {
        $("#render-farm").remove();
        console.log("Render called for floor #" + activeFloor);
        var floor = $(".level:eq(" + activeFloor + ")");
        var floorBackground = floor.data("background");
        if (floorBackground == undefined)
            return;

        if ($("#render-farm").size() == 0)
            $(".level-content", floor).prepend($("<div />").attr("id", "render-farm"));

        var rederFarm = $("#render-farm");
        rederFarm.css("backgroundImage", "url(" + floorBackground + ")");


        $(".block", rederFarm).css({ opacity: 1 });;

        var dHeight = window.innerHeight;
        var dWeight = window.innerWidth;
        var count = ((dHeight + 100) * (dWeight + 100)) / 10000;
        var animQueue = [];
        if ($(".block", rederFarm).size() < count) {

            var forLenght = count - $(".block", rederFarm).size();
            for (var i = 0; i <= forLenght; i++) {
                rederFarm.append($("<div />").addClass("block"));
                animQueue.push({
                    index: i,
                    duration: parseInt(Math.random().toString().substr(2, 3))
                });
            }

        }

        var animDone = 0;

        $(animQueue).each(function (index, item) {
            setTimeout(function () {
                var block = $(".block:eq(" + item.index + ")", rederFarm).css({ opacity: 0 });
                animDone++;
                if (animDone + 1 > animQueue.length) {
                    setTimeout(function () {
                        $(".block", rederFarm).remove();
                    }, 500);
                }
            }, item.duration);

        });

        //  rederFarm.css("background", "#fff");






    }


    $(window).resize(function () {
        var windowWidth = window.innerWidth;
        $(".grid-center").each(function (index, elem) {
            var elemWidth = $(elem).width();
            var elemLeft = (windowWidth / 2) - (elemWidth / 2);
            elemLeft = Math.floor(elemLeft / 100) * 100;
            $(elem).css("left", elemLeft);
        });
    });



    var ascensorFloorNames = ["first", "Home", "Manifest", "Contact", "Architecture", "Architecture_Manifest", "Architecture_Staff", "Architecture_Projects"];
    var ascensorDirections = [[2, 0], [2, 1], [1, 1], [0, 1], [2, 2], [1, 2], [2, 3], [3, 2]];


    $.get("/projects_ajax").done(function (data) {


        var jsonData = JSON.parse(data);

        $(jsonData).each(function (index, item) {

            ascensorFloorNames.push(item);
            ascensorDirections.push([3, 3 + index]);

        });


        $.get("/staff_ajax").done(function (data2) {
            var jsonData2 = JSON.parse(data2);

            $(jsonData2).each(function (index, item) {
                ascensorFloorNames.push(item);
                ascensorDirections.push([2, 4 + index]);

            });




            for (var i = 0; i < 100; i++) {
                ascensorFloorNames.push("gap_" + i);
                ascensorDirections.push([i + 3, 1]);
            }

            ascensorFloorNames.push("Graphic");
            ascensorDirections.push([103, 1]);

            ascensorFloorNames.push("Graphic_Home");
            ascensorDirections.push([104, 1]);



            //ascensorFloorNames.push("Graphic_Projects");
            //ascensorDirections.push([105, 1]);


            $.get("/graphic_ajax").done(function (graphic) {


                for (var i = 0; i < graphic.cats.length; i++) {

                    console.log("Graphic_Categories_" + i, 104, 2 + i);

                    ascensorFloorNames.push("Graphic_Categories_" + i);
                    ascensorDirections.push([104, 2 + i]);
                    // graphic.cats[i].count
                    for (var b = 0; b < 1; b++) {
                        console.log("Graphic_Categories_" + i + "_work_" + b);
                        ascensorFloorNames.push("Graphic_Categories_" + i + "_work_" + b);
                        console.log([104 + (1 + b), 2 + i]);
                        ascensorDirections.push([104 - (1 + b), 2 + i]);
                    }






                }

                ascensorFloorNames.push("Graphic_Projects");
                ascensorDirections.push([105, 1]);

                for (var i = 0; i < graphic.projects.length; i++) {

                    ascensorFloorNames.push("Graphic_Project_" + graphic.projects[i].name);
                    ascensorDirections.push([106 + i, 1]);

                    for (var b = 0; b < graphic.projects[i].count; b++) {

                        ascensorFloorNames.push("Graphic_Project_" + i + "_work_" + b);
                        ascensorDirections.push([106 + i, 2 + b]);
                    }






                }



                initAsc();

            }).error(function (err) {
                console.log(err);
            });


        });




    });

    function initAsc() {



        ascensor = $('#ascensor').ascensor(
     {
         ascensorFloorName: ascensorFloorNames,
         loop: false,
         direction: ascensorDirections,
         time: 500
     });           // Init ascensor

        var ascensorInstance = ascensor.data('ascensor');


        ascensor.on("scrollStart", function (e, floor) {
            console.log(ascensorFloorNames[floor.to].indexOf('gap_'));
            if (ascensorFloorNames[floor.to].indexOf('gap_') == 0) {
                setTimeout(function () {


                    ascensorInstance.scrollToFloor('Graphic');
                }, 100);
            }


            //$("#ascensor > div.level:eq(" + floor.to + ")").addClass("to");


        });

        ascensor.on("scrollEnd", function (e, floor) {

            renderProc(floor.to);
            initImages(floor.to);

            //setTimeout(function () {
            //  $("#ascensor > div.level:eq(" + floor.to + ")").removeClass("to");
            //}, 500);
        });

        ascensorInstance = ascensor.data('ascensor');   // Access instance


        $(window).keyup(function (e) {


            var floor = $(".level:eq(" + ascensorInstance.floorActive + ")");

            if (floor.children(".slider").size() == 1) {

                //right
                if (e.keyCode == 39) {
                    $(".btn-next", floor).click();
                }
                //left
                if (e.keyCode == 37) {
                    $(".btn-prev", floor).click();
                }

                if (e.keyCode == 27) {
                    $(".btn-gallery", floor).click();
                }


            }
            if ($(".gallery", floor).size() == 1) {
                // press [g]
                if (e.keyCode == 71) {
                    $(".gallery", floor).click();
                }



            }



        });


        renderProc(ascensorInstance.floorActive);
        initImages(ascensorInstance.floorActive);



        $("#arrow .up").click(function () {
            ascensorInstance.scrollToDirection('up');
        });
        $("#arrow .down").click(function () {
            ascensorInstance.scrollToDirection('down');
        });
        $("#arrow .left").click(function () {
            ascensorInstance.scrollToDirection('left');
        });
        $("#arrow .right").click(function () {
            ascensorInstance.scrollToDirection('right');
        });

    }
    $(".content-scroll").mCustomScrollbar({
        theme: "minimal-dark",
        axis: "y" // horizontal scrollbar
    });


    setTimeout(function () {
        $("#arrow-help").fadeOut();

    }, 3000);

    ////////
    $(window).resize();
    ////////
    $(".filter", "#projects-filter").click(function (event) {

        if ($(event.target).hasClass("remove-filter"))
            return;

        if ($(event.target).is("select") || $(event.target).is("input"))
            return;

        var filters = $(".filter", "#projects-filter").css("background", "none");

        if ($(this).hasClass("active")) {

            $(this).removeClass("active").fadeIn().animate({ width: 100 })
              .children(".input").fadeOut().animate({ opacity: 0 });

            filters.fadeIn();
            //$("#projects-filter")[0].reset();
            //$(".projects a.project").removeClass("grayscale");

        } else {
            filters.fadeOut();
            $(this).css("background", "#fff").addClass("active").fadeIn().animate({ width: 600 })
                .children(".input").fadeIn().animate({ opacity: 1 });
        }


    });

    $(document).on("click", ".filter .remove-filter", function () {


        var filter = $(this).parents(".filter").removeClass("changed").children("input,select").val('');

        $("#projects-filter")[0].reset();
        $(".projects a.project").removeClass("grayscale");

        $(this).remove();

    });
    $("input,select", "#projects-filter").change(function (e) {




        if ($(this).val() == undefined || $(this).val() == '') {
            $(this).parents(".filter").removeClass("changed").click();
        } else {
            $(this).parents(".filter").addClass("changed").click();

            $(this).parents(".filter").children("label").append("<div class='remove-filter'>X</div>");
        }

        //$(".box.clear-form").fadeIn();
        var form = $("#projects-filter");
        $.get("/projects_filter", form.serializeArray()).done(function (data) {
            var json = JSON.parse(data);
            $(".projects a.project").addClass("grayscale");
            $(json).each(function (index, rid) {
                $(".projects a.project[data-rid=" + rid + "]").removeClass("grayscale");
            });
        });
    });
    $(".box.clear-form").click(function () {
        $(this).fadeOut();
        $("#projects-filter")[0].reset();
        $(".projects a.project").removeClass("grayscale");
    });
};
var ascensor = null;
var ascensorInstance = null;
$(document).ready(function () {
    setTimeout(function () {
        $("#loader").fadeOut();
    }, 1000);
    ARXE();
});

