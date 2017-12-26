(function (a) {
    var h = a(window), l = a("body"), e = a("#fakeLoader");
    e.length && e.fakeLoader({
        spinner: "spinner2", zIndex: "99999"
    }
    );
    e = a("[data-bg-video]");
    e.length && e.YTPlayer({
        fitToBackground: !0, videoId: e.data("bg-video")
    }
    );
    a(function () {
        a("[data-bg-img]").each(function () {
            var b = a(this);
            b.css("background-image", "url(" + b.data("bg-img") + ")").addClass("bg--img").removeAttr("data-bg-img")
        }
        );
        var m = a('[data-sticky="true"]');
        m.length && (m.sticky({
            zIndex: "999"
        }
        ), l.on("shown.bs.collapse", "#secondaryNavbar", function () {
            m.sticky("update")
        }
        ).on("hidden.bs.collapse",
        "#secondaryNavbar", function () {
            m.sticky("update")
        }
        ));
        a('[data-form-validation="true"] form').each(function () {
            a(this).validate({
                errorPlacement: function (a, b) {
                    return !0
                }
            }
            )
        }
        );
    

        var b = a(".testimonial-slider");
        b.length && b.owlCarousel({
            slideSpeed: 700, pagination: !1, navigation: !0, navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'], singleItem: !0, autoPlay: !0, addClassActive: !0
        }
        );
        b = a(".pricing--slider");
        b.length && b.owlCarousel({
            slideSpeed: 800, pagination: !1, navigation: !0, navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'], items: 3, itemsDesktop: [1199, 3], itemsDesktopSmall: [991, 2], itemsTablet: [767, 1]
        }
        );
        var k = a("#vpsPricing"),
        f, r;
        var t = k.find("#vpsSlider");
        var v = k.find("[data-put-value]");
        var u = k.find("[data-put-href]");
        var d = function (b) {
            d.value = 1;
            d.max = b.length - 1;
            d.changeValue = function (q, c) {
                d.value = a.isEmptyObject(c) ? d.value : c.value;
                t.find(".ui-slider-handle").html("<em>" + b[d.value].title + "</em>");
                v.each(function () {
                    var q = a(this);
                    q.text(b[d.value][q.data("put-value")])
                }
                );
                u.attr("href", b[d.value][u.data("put-href")])
            }
            ;
            t.slider({
                animate: "fast", range: "min", min: 0, max: d.max, value: d.value, step: 1, create: d.changeValue, slide: d.changeValue
            }
            )
        }
        ;

        k.length && a.getJSON("json/vps-plans.json", d).done(function () {
            f = k.find(".vps-pricing--items");
            r = k.find(".vps-pricing--tag");
            r.css("height", f.height());
            h.on("resize", function () {
                r.css("height", f.height())
            }
            )
        }
        );
        b = a('[data-counter-up="true"]');
        b.length && b.counterUp({
            delay: 10, time: 1E3
        }
        );
        a("[data-counter-down]").each(function () {
            var b = a(this);
            b.countdown(b.data("counter-down"), function (b) {
                a(this).html(b.strftime("%D Days %H:%M:%S"))
            }
            )
        }
        );
        a('[data-animate-scroll="true"]').on("click", function (b) {
            b.preventDefault();

            b = a(this).attr("href");
            var c = "undefined" === typeof a(this).data("offset") ? 0 : a(this).data("offset");
            a(b).animatescroll({
                padding: c, easing: "easeInOutExpo", scrollSpeed: 2E3
            }
            )
        }
        );
        b = a(".AdjustRow");
        b.length && b.isotope({
            layoutMode: "fitRows"
        }
        );
        var n = a(".gallery--items"), b = a(".gallery--filter-menu");
        n.length && (n.isotope({
            animationEngine: "best-available", itemSelector: ".gallery--item"
        }
        ), b.on("click", "a", function () {
            var b = a(this), c = b.attr("href");
            n.isotope({
                filter: "*" !== c ? '[data-cat~="' + c + '"]' : c
            }
            );
            b.parent("li").addClass("active").siblings().removeClass("active");

            return !1
        }
        ), n.magnificPopup({
            delegate: ".gallery--img a", type: "image", gallery: {
                enabled: !0, navigateByImgClick: !1
            }
        , zoom: {
            enabled: !0
        }
        , callbacks: {
            open: function () {
                this.currItem.el.addClass("active")
            }
        , close: function () {
            this.currItem.el.removeClass("active")
        }
        }
        }
        ));
        var g = a("#map"), b = a("#contactInfo");
        g.length && function () {
            var b = new google.maps.Map(g[0], {
                center: {
                    lat: g.data("map-latitude"), lng: g.data("map-longitude")
                }
            , zoom: g.data("map-zoom"), scrollwheel: !1, disableDefaultUI: !0, zoomControl: !0
            }
            );
            if ("undefined" !== typeof g.data("map-marker")) {
                var a =
                g.data("map-marker"), c = 0;
                for (c;
                c < a.length;
                c++) new google.maps.Marker({
                    position: {
                        lat: a[c][0], lng: a[c][1]
                    }
                , map: b, animation: google.maps.Animation.DROP, draggable: !0
                }
                )
            }
        }
        ();
        g.length && b.length && g.css("margin-bottom", -(b.outerHeight() / 2));
        var p = a('[data-has-pricing-head="no"]'), b = function () {
            var a = p.siblings().find(".pt-head").outerHeight(!0) + p.siblings().find(".pt-plan").outerHeight();
            p.children(".pricing--content").css("margin-top", a)
        }
        ;
        p.length && (b(), h.on("resize", b));
        var b = a("#domainPricing"), w = a("#dedicatedPricing");

        b.add(w).find("table td").each(function () {
            var b = a(this);
            b.prepend('<span class="labelText">' + b.data("label") + "</span>")
        }
        );
   
    }
    );
    var f = a(".domain-search--wrapper");
    a('[data-toggle="tawk"]').on("click", function (a) {
        a.preventDefault();
        Tawk_API.toggle()
    }
    );
    h.on("load scroll", function () {
        1 < h.scrollTop() ? l.addClass("scrolling") : l.removeClass("scrolling")
    }
    ).on("load", function () {
        var e = a("#banner"),
        c = a(".banner-slider"), f = "undefined" === typeof c.data("navigation") ? !1 : c.data("navigation"), b = "undefined" === typeof c.data("pagination") ? !1 : c.data("pagination");
        c.length && c.owlCarousel({
            slideSpeed: 800, paginationSpeed: 800, singleItem: !0, autoPlay: !0, addClassActive: !0, pagination: b, navigation: f, navigationText: ['<i class="fa fa-angle-left"></i>', '<i class="fa fa-angle-right"></i>'], afterInit: function () {
                var b = a(this.$owlWrapper).outerHeight();
                a(this.$userItems).css("height", parseInt(b));
                e.prev("#menu").addClass("nextBanner")
            }
        }
        )
    }
    ).on("load scroll",
    function () {
        f.length && (1 < h.scrollTop() ? f.css("margin-top", -(f.outerHeight() / 2)) : f.css("margin-top", 0))
    }
    ).on("load scroll resize", function () {
        //  a("#tawkchat-container").length ? l.addClass("isTawkMobile") : l.removeClass("isTawkMobile")
   

    }
    )
}
)(jQuery);
