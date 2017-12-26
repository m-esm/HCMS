//check browser
var nVer = navigator.appVersion;
var nAgt = navigator.userAgent;
var browserName = navigator.appName;
var fullVersion = '' + parseFloat(navigator.appVersion);
var majorVersion = parseInt(navigator.appVersion, 10);
var nameOffset, verOffset, ix;

// In Opera 15+, the true version is after "OPR/"
if ((verOffset = nAgt.indexOf("OPR/")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 4);
}
    // In older Opera, the true version is after "Opera" or after "Version"
else if ((verOffset = nAgt.indexOf("Opera")) != -1) {
    browserName = "Opera";
    fullVersion = nAgt.substring(verOffset + 6);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
}
    // In MSIE, the true version is after "MSIE" in userAgent
else if ((verOffset = nAgt.indexOf("MSIE")) != -1) {
    browserName = "Microsoft Internet Explorer";
    fullVersion = nAgt.substring(verOffset + 5);
}
    // In Chrome, the true version is after "Chrome"
else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
    browserName = "Chrome";
    fullVersion = nAgt.substring(verOffset + 7);
}
    // In Safari, the true version is after "Safari" or after "Version"
else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
    browserName = "Safari";
    fullVersion = nAgt.substring(verOffset + 7);
    if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
}
    // In Firefox, the true version is after "Firefox"
else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
    browserName = "Firefox";
    fullVersion = nAgt.substring(verOffset + 8);
}
    // In most other browsers, "name/version" is at the end of userAgent
else if ((nameOffset = nAgt.lastIndexOf(' ') + 1) <
          (verOffset = nAgt.lastIndexOf('/'))) {
    browserName = nAgt.substring(nameOffset, verOffset);
    fullVersion = nAgt.substring(verOffset + 1);
    if (browserName.toLowerCase() == browserName.toUpperCase()) {
        browserName = navigator.appName;
    }
}
if (browserName != "Firefox" && browserName != "Chrome")
    alert("لطفا از یکی از مرورگرهای گوگل کروم و یا فایر فاکس استفاده کنید");



var toggleSearchBar = function () {
    $('.search-bar').toggleClass('open');
}



$(document).ready(function () {

    $('#loader').fadeOut();

    //click on right menu
    $('.right-icons ul li').click(function () {
        var isOpen = $(this).hasClass('open');
        $('.right-icons ul li').removeClass('open');

        if (!isOpen)
            $(this).addClass('open');

    })

    //toggle mobile menu
    $(document).on('click', '.mobile-menu .fa', function () {
        $('.mobile-menu').removeClass('open');
    })

    $(document).on('click', '.show-mobile  .menu-icon', function () {
        $('.mobile-menu').addClass('open');
    });


    var table = [
   { O: 1, R: 1, id: 0, J: 'شمالی', N: 'BH1', className: '', T: 'همکف', M: 95, C: 'Code 1', Type: 'A-01' },
   { O: 2, R: 3, id: 1, J: 'جنوبی', N: 'BH1', className: '', T: 'همکف', M: 158, C: 'Code 2', Type: 'A-01' },
   { O: 2, R: 4, id: 2, J: 'شمالی', N: 'BH2', className: '', T: 'اول', M: 137, C: 'Code 2', Type: 'A-02' },
   { O: 3, R: 3, id: 3, J: 'جنوبی', N: 'BH2', className: '', T: 'اول', M: 160, C: 'Code 2', Type: 'A-02' },
   { O: 1, R: 5, id: 4, J: 'جنوبی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
   { O: 2, R: 2, id: 5, J: 'شرقی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
   { O: 2, R: 5, id: 6, J: 'شمالی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
   { O: 1, R: 4, id: 7, J: 'غربی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
   { O: 1, R: 1, id: 8, J: 'غربی', N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
   { O: 2, R: 3, id: 9, J: 'شرقی', N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
   { O: 3, R: 3, id: 10, J: 'شمالی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-03' },
   { O: 3, R: 5, id: 11, J: 'شرقی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
   { O: 3, R: 4, id: 12, J: 'غربی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
   { O: 3, R: 2, id: 13, J: 'شمالی', N: 'BH2', className: '', T: 'چهارم', M: 160, C: 'Code 2', Type: 'A-04' }
    ];

});