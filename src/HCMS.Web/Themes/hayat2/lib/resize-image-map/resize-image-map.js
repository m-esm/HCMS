﻿
(function ($) {
   $.fn.rwdImageMaps = function () {
        var $img = this;
        var rwdImageMap = function () {
            $img.each(function () {

                if (typeof ($(this).attr('usemap')) == 'undefined')
                    return;

                var that = this,
					$that = $(that);
                $('<img />').on('load', function () {
                    var attrW = 'width',
						attrH = 'height',
						w = $that.attr(attrW),
						h = $that.attr(attrH);

                    console.log(h, w);
                    if (!w || !h) {
                        var temp = new Image();
                        temp.src = $that.attr('src');
                        if (!w)
                            w = temp.width;
                        if (!h)
                            h = temp.height;
                    }

                    var wPercent = $that.width() / 100,
						hPercent = $that.height() / 100,
						map = $that.attr('usemap').replace('#', ''),
						c = 'coords';
                    p = 'points';

                    $('map[name="' + map + '"]').find('area').each(function () {
                        var $this = $(this);
                        if (!$this.data(c))
                            $this.data(c, $this.attr(c));

                        var coords = $this.data(c).split(','),
							coordsPercent = new Array(coords.length);

                        for (var i = 0; i < coordsPercent.length; ++i) {
                            if (i % 2 === 0)
                                coordsPercent[i] = parseInt(((coords[i] / w) * 100) * wPercent);
                            else
                                coordsPercent[i] = parseInt(((coords[i] / h) * 100) * hPercent);
                        }
                        $this.attr(c, coordsPercent.toString());
                    });

                    $('svg[name="' + map + '"]').find('polygon').each(function () {
                        var $this = $(this);
                        if (!$this.data(p))
                            $this.data(p, $this.attr(p));

                        var coords = $this.data(p).split(','),
							coordsPercent = new Array(coords.length);

                        for (var i = 0; i < coordsPercent.length; ++i) {
                            if (i % 2 === 0)
                                coordsPercent[i] = parseInt(((coords[i] / w) * 100) * wPercent);
                            else
                                coordsPercent[i] = parseInt(((coords[i] / h) * 100) * hPercent);
                        }
                        $this.attr(p, coordsPercent.toString());
                    });
                }).attr('src', $that.attr('src'));
            });
        };
        $(window).resize(rwdImageMap).trigger('resize');

        return this;
    };
})(jQuery);
