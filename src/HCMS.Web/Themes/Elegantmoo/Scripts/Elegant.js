$(document).ready(function () {
    $('#fullpage').fullpage({
        // menu: '#menu',
        anchors: ['Home', 'Gallery', 'Services', 'Articles', 'About', 'Contact'],
        //    sectionsColor: ['#C63D0F', '#1BBC9B', '#7E8F7C'],
        fitToSection: false,

        scrollOverflow: true,
        scrollOverflowOptions: {
            click: true
        }

    });

    $('.section.first').vegas({
        overlay: true,
        transition: "random",
        overlay: '/Packages/vegas/overlays/03.png',
        slides: [
            { src: '/themes/elegantmoo/images/slide1.jpg' },
            { src: '/themes/elegantmoo/images/slide2.jpg' }
        ]
    });





    $('.section.articles').vegas({
        overlay: true,
        transition: "random",
        overlay: '/Packages/vegas/overlays/03.png',
        slides: [
            { src: '/themes/elegantmoo/images/articles-1.jpg' },
            { src: '/themes/elegantmoo/images/articles-2.jpg' }
        ]
    });

    $("nav ul").tinyNav({
        active: 'selected', // String: Set the "active" class
        header: 'مـــنو', // String: Specify text for "header" and show header instead of the active item
        indent: '- ', // String: Specify text for indenting sub-items
        label: '' // String: Sets the <label> text for the <select> (if not set, no label will be added)
    });


    $(window).scroll(function (e) {
        console.log(e);
    });

    $('.gallery').each(function () { // the containers for all your galleries
        $(this).magnificPopup({
            delegate: 'a.item', // the selector for gallery item
            type: 'image',
            gallery: {
                enabled: true
            },
            image: {
                // options for image content type
                titleSrc: 'title'
            }
        });
    });


    $('.gallery-items').mixItUp();
});