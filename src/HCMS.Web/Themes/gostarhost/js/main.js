/*

[Main Script]

Project: lilyHost - Responsive Hosting WordPress Theme
Version: 1.0.0
Author : themelooks.com

*/
function splitBy3_core(x) {
    x += '';
    x = x.replace(/ /g, "");
    var isManfi = false;
    if (x.toString().substr(0, 1) == "-") {
        isManfi = true;
        x = x.replace(/-/g, "");
    }

    if (x.length < 3) { var parts = [x]; return parts; }
    var startPos = (x.length % 3);
    var newStr = x.substr(startPos);
    var remainingStr = x.substr(0, startPos);

    var parts = newStr.match(/.{1,3}/g);
    if (remainingStr != '') { var length = parts.unshift(remainingStr); }

    if (isManfi)
        return "-" + parts;

    return parts;

}
function splitBy3() {
    $(".splitBy3").not('.splited').each(function (index, elem) {
        $(elem).addClass('splited').text(splitBy3_core($(elem).text()));
    });
}


(function ($) {

    splitBy3();


    "use strict";
    
    $(function () {
		/* ------------------------------------------------------------------------- *
		 * CUSTOM BACKGROUND IMAGE
		 * ------------------------------------------------------------------------- */
		var bgSrc = $('[data-bg-src]');
		
        bgSrc.each(function () {
            var $t = $(this),
                imgValue = $t.data('bg-src');
			
			if ( imgValue.length ) {
				$t.css('background-image', 'url(' + imgValue + ')').addClass('bg--img').removeAttr('data-bg-src');
			} else {
				$t.removeAttr('data-bg-src');
			}
        });
        
        /* ------------------------------------------------------------------------- *
         * PROMO
         * ------------------------------------------------------------------------- */
		var $promo = $('#promo'),
			promoCloseAction = $promo.data('close-action') === 'close-remember' ? true : false,
			promoToggleAction = $promo.data('close-action') === 'toggle' ? true : false;
		
		if ( localStorage.getItem('lilyHostPromoClose') === null && promoCloseAction ) {
			$promo.show();
		}
		
		$promo.on('closed.bs.alert', function (e) {
			if ( promoCloseAction ) {
				localStorage.setItem('lilyHostPromoClose', 'true');
			}
		});
		
		$promo.on('click', '[data-dismiss]', function (e) {
			if ( promoToggleAction ) {
				$promo.toggleClass('toggled').find('.promo--content-wrapper').slideToggle('linear');
				return false;
			}
		});
        
        /* ------------------------------------------------------------------------- *
         * STICKY JS
         * ------------------------------------------------------------------------- */
        var $stickySecondaryMenu = $('[data-sticky="secondaryMenu"]'),
			$wpAdminBar = $('#wpadminbar'),
			stickyTopSpacing = $wpAdminBar.outerHeight() ? $wpAdminBar.outerHeight() : 0;
        
        $stickySecondaryMenu.each(function () {
            $(this).sticky({
				topSpacing: stickyTopSpacing,
                zIndex: 999
            });
        });

        /* -------------------------------------------------------------------------*
         * OFF-CANVAS MENU
         * -------------------------------------------------------------------------*/
        var offCanvasMenu = $('.off-canvas-menu, .off-canvas-menu-overlay')
        ,   offCanvasMenuLinks = $('.off-canvas-menu .nav > li > a');
        
        $('.menu-toggle-btn, .close-btn, .off-canvas-menu-overlay').click(function (e) {
            e.preventDefault();
            offCanvasMenu.toggleClass('menu-open');
        });
        
        offCanvasMenuLinks.one('click', function () {
            if ( $(this).parent('li').hasClass('opened') ) {
                $(this).parent('li').toggleClass('opened open');
            } else {
                $(this).parent('li').siblings('li.opened').toggleClass('opened open');
            }
        });
        
        /* -------------------------------------------------------------------------*
         * FORM VALIDATION
         * -------------------------------------------------------------------------*/
		var $formValidate = $('[data-form="validate"], .formValidation');
		
		$formValidate.each(function () {
			$(this).validate({
				errorPlacement: function (error, element) {
					return true;
				}
			});
		});

        /* -------------------------------------------------------------------------*
         * ABOUT VIDEO POPUP
         * -------------------------------------------------------------------------*/
		var $popupVideo = $('[data-popup="video"]');
		
		if ( $popupVideo.length ) {
			$popupVideo.magnificPopup({
                type: 'iframe',
                mainClass: 'my-mfp-zoom-in'
			});
		}
        
        /* -------------------------------------------------------------------------*
         * OWL CAROUSEL
         * -------------------------------------------------------------------------*/
		var bannerSlider = $('.banner-slider');
		
        if (bannerSlider.length) {
            bannerSlider.owlCarousel({
                slideSpeed: 300,
                paginationSpeed: 400,
                singleItem: true,
                autoPlay: true,
                addClassActive : true,
                pagination: false,
                navigation: true,
                navigationText: ["<i class='fa fa-angle-left'></i>", "<i class='fa fa-angle-right'></i>"]
            });
        }

		var testimonialSlider = $('.testimonial-slider')
		,	testimonialCustomPagination = function () {
			$.each(this.owl.userItems, function (i) {
				var recommenderThumb = jQuery(this).data('recommender-thumb');
				var paginationLinks = jQuery('.testimonial-slider .owl-page span');

				$(paginationLinks[i]).html('<img src="'+ recommenderThumb +'" alt="" class="img-responsive" />');
			});
		};
		
		if ( testimonialSlider.length ) {
            if (testimonialSlider.children('.testimonial-item').length > 3) {
                testimonialSlider.addClass('overload');
            }
			testimonialSlider.owlCarousel({
				slideSpeed: 700,
				paginationSpeed: 700,
				singleItem: true,
				autoPlay: true,
                addClassActive: true,
                afterInit: testimonialCustomPagination,
                afterUpdate: testimonialCustomPagination
			});
		}
        
		var brandsSlider = $('.brands-slider');
		
        if ( brandsSlider.length ) {
            brandsSlider.owlCarousel({
				slideSpeed: 700,
				paginationSpeed: 700,
				items: 5,
				autoPlay: true,
                pagination: false
			});
        }
		
		var	headerSlider = $('.header-slider');
		
        if ( headerSlider.length ) {
            headerSlider.owlCarousel({
				slideSpeed: 700,
				paginationSpeed: 700,
				singleItem: true,
				autoPlay: true
			});
        }

		/* ------------------------------------------------------------------------- *
		 * VPS SLIDER
		 * ------------------------------------------------------------------------- */
        var $vpsPricing = $('#vpsPricing'),
            $vpsSlider = $('#vpsSlider');

        if ( $vpsSlider.length ) {
            var $vpsSliderHandle,
				$featureItemValue = $vpsPricing.find('.vps-item-feature-value'),
                $vpsTotalPriceChild = $vpsPricing.find('.vps-total-price span'),
                $vpsTotalPriceDur = $vpsPricing.find('.vps-total-price em'),
                $vpsOrderLink = $vpsPricing.find('a.order-link'),
                $vpsdeatilsLink = $vpsPricing.find('a.deatils-link'),
				vpsTotalPriceCur = $vpsTotalPriceChild.text();

            var changingVpsPlans = function ( res, indx ) {
				$vpsSliderHandle.text( res[ indx ][0] );
				
                for ( var i = 0; i < res[ indx ][1].length; i++ ) {
                    $featureItemValue.eq(i).text( res[ indx ][1][i] );
                }

                $vpsTotalPriceChild.text( vpsTotalPriceCur + res[ indx ][2] );
                $vpsOrderLink.attr( 'href', res[ indx ][3] );
                $vpsdeatilsLink.attr( 'href', res[ indx ][4] );
                $vpsTotalPriceDur.text( res[ indx ][5] );
            };
			
            var vpsSliderInit = function (res) {
                $vpsSlider.slider({
                    animate: "fast",
                    range: "min",
                    min: 0,
                    max: (res.length - 1),
                    value: 0,
                    step: 1,
                    create: function(e) {
						$vpsSliderHandle = $vpsSlider.find('.ui-slider-handle');
                        changingVpsPlans( res, '0' );
                    },
                    slide: function(e, ui) {
                        changingVpsPlans( res, ui.value );
                    }
                });
            };
			
			vpsSliderInit( ajaxvps.vpscontent );
        }
		
		/* -------------------------------------------------------------------------*
		 * COUNTER
		 * -------------------------------------------------------------------------*/
        var counterNum = $('.counter-number');
		
		if ( $(counterNum).length ) {
			$(counterNum).counterUp({
				delay: 10,
				time: 1000
			});
		}
		
        /* -------------------------------------------------------------------------*
         * MAP
         * -------------------------------------------------------------------------*/
		var $map = $('[data-map]');

        $.fn.initMap = function () {
            var $el = this,
				mapPositions = $el.data('map'),
                map;

            map = new google.maps.Map($el[0], {
                center: {lat: parseInt( mapPositions[0][0], 10 ), lng: parseInt( mapPositions[0][1], 10 )},
                zoom: $el.data('map-zoom'),
                scrollwheel: false,
                disableDefaultUI: true,
                zoomControl: true
            });
            
            if ( typeof mapPositions !== 'undefined' ) {
				
				console.log( mapPositions );
                for ( var i = 0; i < mapPositions.length; i++ ) {
                    new google.maps.Marker({
                        position: {lat: parseInt( mapPositions[i][0], 10 ), lng: parseInt( mapPositions[i][1], 10 )},
                        map: map,
                        animation: google.maps.Animation.DROP,
                        draggable: true
                    });
                }
            }
        };

        $map.each(function () {
            $(this).initMap();
        });
        
		/* -------------------------------------------------------------------------*
		 * PRICING TABLE LABEL
		 * -------------------------------------------------------------------------*/
		if ( $(window).width() < 992 ) {
			$('#pricingTable2 table td, #compare table td').each(function () {
				$(this).prepend('<span class="labelText">'+ $(this).data('label') + '</span>');
			});
		}
    });
	
	$(window).on('load', function () {
		/* -------------------------------------------------------------------------*
		 * BACK TO TOP BUTTON
		 * -------------------------------------------------------------------------*/
		var $backToTopBtn = $('#backToTop'),
			backToTopBtnShow = function () {
				return $(window).scrollTop() > 1 ? $backToTopBtn.addClass('show') : $backToTopBtn.removeClass('show');
			};
		
		if ( $backToTopBtn ) {
			backToTopBtnShow();
			$(window).on('scroll', backToTopBtnShow);
		}
		
		$backToTopBtn.on('click', 'a', function (e) {
			e.preventDefault();
			
			$('html, body').animate({
				scrollTop: 0
			}, 800);
		});
		
		/* -------------------------------------------------------------------------*
		 * PRELOADER
		 * -------------------------------------------------------------------------*/
		var $preloader = $('#preloader');
		
		if ( $preloader.length ) {
			$preloader.fadeOut('slow');
		}
	});
})(jQuery);
