jQuery(document).ready(function() {
					
	jQuery(".mason .featured-thumb, .grid .featured-thumb").hoverIntent(function() {
		jQuery('.img-meta',this).slideDown(300,'linear'); 
		jQuery('.img-meta-link',this).css('margin-right','50px');
		jQuery('.img-meta-link',this).animate({'margin-right':'0px'},500);
	},
		function() {
		jQuery('.img-meta-link',this).animate({'margin-right':'50px'},500);
		//jQuery('.img-meta-link').css('margin-right','50px');
		jQuery('.img-meta',this).fadeOut('fast');
		//jQuery('.img-meta-link').stop(true,false);	
	});	
	jQuery(".poster .featured-thumb").hoverIntent(function() {
		jQuery('.gridt-date',this).animate({'margin-top':'0px'},300);
		jQuery('.gridt-meta',this).animate({'margin-bottom':'0px'},300);
		
	},
		function() {
			jQuery('.gridt-date',this).animate({'margin-top':'-50px'},300);
			jQuery('.gridt-meta',this).animate({'margin-bottom':'-100px'},300);
			
	});	
	
	jQuery('.bxslider li').hover(
		function(){
			jQuery(this).find('.bx-caption').animate({marginBottom: 10}, 300);
		},
		function(){
			jQuery(this).find('.bx-caption').animate({marginBottom: -80}, 300);
		});		
	jQuery(window).bind('scroll', function(e) {
		hefct();
	});		
	
	jQuery('#fixed-search span.show-fake').click(
	function() {
		jQuery('#fixed-search span.show-fake').hide();
		jQuery('#fixed-search input[type=text]').css('width','0px').show().animate({'width':'200px'},500);
		jQuery('#fixed-search').css('bottom','-48px');
		if ( jQuery.browser.mozilla ) {
/*  		   	jQuery('#fixed-search').css('bottom','-44px') */
    }
		jQuery('#fixed-search input[type=text]').focus();
	});
	jQuery('#fixed-search input[type=text]').focusout(
	function(){
		jQuery('#fixed-search input[type=text]').hide();
		jQuery('#fixed-search').css('bottom','-40px');
		jQuery('#fixed-search span.show-fake').show();
		if ( jQuery.browser.mozilla ) {
/*  		   	jQuery('#fixed-search').css('bottom','-42px') */
    }
	});
	if ( jQuery.browser.mozilla ) {
 		   /*
	jQuery('#fixed-search').css('bottom','-42px');
 		   	jQuery('#fixed-search').css('box-shadow','0px 3px 2px #8a8a8a')
*/
    }
});

jQuery(function() {
  jQuery('a[href*=#]:not([href=#])').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = jQuery(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        jQuery('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});
    	
function hefct() {
	var scrollPosition = jQuery(window).scrollTop();
	jQuery('#parallax-bg, #parallax-home-bg').css('top', (0 - (scrollPosition * .4)) + 'px');
}	