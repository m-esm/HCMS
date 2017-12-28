'use strict';

app.controller('aboutCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = false;

});
'use strict';

app.controller('blockCtrl', function ($scope, $rootScope, $location) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');


    $scope.animateName = "bounceInDown";

    $scope.blockDetails = [
        {
            id: 1, type: 'A', btnDown: 'به سمت بلوک B', btnUp: '',
            upIsActive: false, downIsActive: true, title: 'بلوک A',
            imageUrl: '/img/Blocks/Block A.png',
            descrp: '   بلکوک A مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 2, type: 'B', btnDown: 'به سمت بلوک C', btnUp: 'به سمت بلوک A', upIsActive: true, downIsActive: true, title: 'بلوک B', isActive: false,
            imageUrl: '/img/Blocks/Block B.png',
            descrp: '   بلکوک B مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 3, type: 'C', btnDown: '', btnUp: 'به سمت بلوک B', title: 'بلوک C', upIsActive: true, downIsActive: false, isActive: false,
            imageUrl: '/img/Blocks/Block C.png',
            descrp: '   بلکوک C مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },

    ];

    $scope.activeBlock = $scope.blockDetails[0];
    

    //next block
    $scope.nextBlock = function (id) {
        $scope.animateName = "bounceOutDown";
        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            if ($scope.blockDetails.lenght <= id)
                id = 1;
            else
                id += 1;
            console.log(id);
            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //prev block
    $scope.prevBlock = function (id) {
        console.log(id);
        $scope.animateName = "bounceOutUp";
        setTimeout(function () {
            $scope.animateName = "bounceInUp";
            if (id == 1)
                id = $scope.blockDetails.lenght;
            else
                id -= 1;
           
            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //goto cell
    $scope.gotoCell = function (item) {
        $location.path('/cell/').search({ type: item .type});
    }

})
'use strict';

app.controller('sliderCtrl', function ($scope, $rootScope, $location) {

    $('#slider').addClass('active');
    $rootScope.blackActive = true;

    $scope.images = [
        { id: 1, url: 'Themes/hayat2/img/my-slider/1.jpg', className: 'active' },
        { id: 2, url: 'Themes/hayat2/img/my-slider/2.jpg', className: '' },
        { id: 3, url: 'Themes/hayat2/img/my-slider/3.jpg', className: '' },
    ];


    $scope.mainImage = $scope.images[0].url;

    setInterval(function () {
        var find = $scope.images.find(a=>a.className == 'active');
        $scope.mainImage = find.url;
        var findIndex = $scope.images.indexOf(find);
        $scope.images[findIndex].className = '';
        var nextId = find.id + 1;
        if (find.id == $scope.images.length)
            nextId = 1;
        console.log(nextId);
        var nextSlider = $scope.images.find(a=>a.id == nextId);
        var index = $scope.images.indexOf(nextSlider);
        $scope.images[index].className = 'active';
        $scope.$apply();

    }, 11000);

    $scope.changeUrl = function (url) {
        console.log(url);
        $location.path('/hayat');
    }

})
'use strict';

app.controller('homeCtrl', function ($scope, $location) {
    $('#slider').addClass('active');
    $('.show-other-page-menu').removeClass('active');
    $('#portfolio').removeClass('hidden');
    $('#contact').removeClass('hidden');
    $('#footer').removeClass('hidden');
    
    //$('html, body').animate({ scrollTop: 0 }, 0, 'easeInOutExpo');
    $(window).scrollTop(0)

    $scope.table = [
    {O : 1, R : 1, id: 0, J : 'شمالی', N: 'BH1', className: '', T: 'همکف', M: 95, C: 'Code 1', Type: 'A-01' },
    {O : 2, R : 3, id: 1, J : 'جنوبی', N: 'BH1', className: '', T: 'همکف', M: 158, C: 'Code 2', Type: 'A-01' },
    {O : 2, R : 4, id: 2, J: 'شمالی', N: 'BH2', className: '', T: 'اول', M: 137, C: 'Code 2', Type: 'A-02' },
    {O : 3, R : 3, id: 3, J: 'جنوبی', N: 'BH2', className: '', T: 'اول', M: 160, C: 'Code 2', Type: 'A-02' },
    {O : 1, R : 5, id: 4, J : 'جنوبی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
    {O : 2, R : 2, id: 5, J : 'شرقی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
    {O : 2, R : 5, id: 6, J: 'شمالی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
    {O : 1, R : 4, id: 7, J : 'غربی', N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
    {O : 1, R : 1, id: 8, J: 'غربی', N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
    {O : 2, R : 3, id: 9, J: 'شرقی', N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
    {O : 3, R : 3, id: 10, J: 'شمالی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-03' },
    {O : 3, R : 5, id: 11, J: 'شرقی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
    {O : 3, R : 4, id: 12, J: 'غربی', N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
    {O : 3, R : 2, id: 13, J: 'شمالی', N: 'BH2', className: '', T: 'چهارم', M: 160, C: 'Code 2', Type: 'A-04' }
    ];



    $scope.gotoBlock = function () {
        $location.path('/block');
    }

    $scope.$on("$destroy", function () {
        $('#portfolio').addClass('hidden');
        $('#contact').addClass('hidden');
        $('#footer').addClass('hidden');
    });

    $scope.selectTable = function (p) {
        $scope.animateName = "bounceOutDown";
        angular.forEach($scope.model.planeImages, function (item, index) {
            if (item.Type == p.Type) {
                $scope.previewImage = item.url;
                $scope.model.planeImages[index].className = 'active';
            }
            else
                $scope.model.planeImages[index].className = '';
        });

        angular.forEach($scope.table, function (item, index) {
            if (item.Type == p.Type)
                $scope.table[index].className = "active";
            else
                $scope.table[index].className = "";

            if (item.id == p.id)
                $scope.table[index].className += " select";
        });

        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            $scope.$apply();
        }, 100)
    }
});
'use strict';

app.controller('hayatCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

    $scope.myPagingFunction = function () {
        console.log(res);
    }
})
'use strict';

app.controller('aboutCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = false;

});
'use strict';

app.controller('teamCtrl', function ($scope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

});
'use strict';

app.controller('ebtekarSazeCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

   
})
'use strict';

app.controller('hamkaranCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

   
})
'use strict';

app.controller('hayatProjectCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

    $scope.myPagingFunction = function () {
        console.log(res);
    }
})
'use strict';

app.controller('galleryCtrl', function () {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
});
'use strict';

app.controller('hayatNoCtrl', function ($scope, $rootScope, $location) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

    $scope.imageUrl = "/img/25-01.jpg";

    $scope.showImage = function (type) {
        switch (type) {
            case 'A':
                $scope.imageUrl = "/img/Blocks/Block A.png";
                break
            case 'B':
                $scope.imageUrl = "/img/Blocks/Block B.png";
                break
            case 'C':
                $scope.imageUrl = "/img/Blocks/Block C.png";
                break
            default:
                $scope.imageUrl = "/img/25-01.jpg";  
        }
    }

    $scope.defaultImage = function () {
        $scope.imageUrl = "img/25-01.jpg";
    }


    $scope.table = [
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

    $scope.animateName = "bounceInDown";

    $scope.blockDetails = [
        {
            id: 1, type: 'A', btnDown: 'به سمت بلوک B', btnUp: '', upIsActive: false, downIsActive: true, title: 'بلوک A',
            imageUrl: '/img/Blocks/Block A.png',
            descrp: '   بلکوک A مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 2, type: 'B', btnDown: 'به سمت بلوک C', btnUp: 'به سمت بلوک A', upIsActive: true, downIsActive: true, title: 'بلوک B', isActive: false,
            imageUrl: '/img/Blocks/Block B.png',
            descrp: '   بلکوک B مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 3, type: 'C', btnDown: '', btnUp: 'به سمت بلوک B', title: 'بلوک C', upIsActive: true, downIsActive: false, isActive: false,
            imageUrl: '/img/Blocks/Block C.png',
            descrp: '   بلکوک C مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },

    ];

    $scope.activeBlock = $scope.blockDetails[0];


    //next block
    $scope.nextBlock = function (id) {
        $scope.animateName = "bounceOutDown";
        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            if ($scope.blockDetails.lenght <= id)
                id = 1;
            else
                id += 1;
            console.log(id);
            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //prev block
    $scope.prevBlock = function (id) {
        console.log(id);
        $scope.animateName = "bounceOutUp";
        setTimeout(function () {
            $scope.animateName = "bounceInUp";
            if (id == 1)
                id = $scope.blockDetails.lenght;
            else
                id -= 1;

            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //goto cell
    $scope.gotoCell = function (item) {
        $location.path('/cell/').search({ type: item.type });
    }
  
})
'use strict';

app.controller('blockCtrl', function ($scope, $rootScope, $location) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');


    $scope.animateName = "bounceInDown";

    $scope.blockDetails = [
        {
            id: 1, type: 'A', btnDown: 'به سمت بلوک B', btnUp: '',
            upIsActive: false, downIsActive: true, title: 'بلوک A',
            imageUrl: '/img/Blocks/Block A.png',
            descrp: '   بلکوک A مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک A مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 2, type: 'B', btnDown: 'به سمت بلوک C', btnUp: 'به سمت بلوک A', upIsActive: true, downIsActive: true, title: 'بلوک B', isActive: false,
            imageUrl: '/img/Blocks/Block B.png',
            descrp: '   بلکوک B مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک B مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },
        {
            id: 3, type: 'C', btnDown: '', btnUp: 'به سمت بلوک B', title: 'بلوک C', upIsActive: true, downIsActive: false, isActive: false,
            imageUrl: '/img/Blocks/Block C.png',
            descrp: '   بلکوک C مجموعه حیات نو در ضلع شرقی' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...                   ' +
             ' بلکوک C مجموعه حیات نو در ضلع شرقی    ' +
             ' و و رودی اصلی شامل 100 واحد مسکونی با ' +
             ' 5 تیپ پلان مختلف و ...'
        },

    ];

    $scope.activeBlock = $scope.blockDetails[0];
    

    //next block
    $scope.nextBlock = function (id) {
        $scope.animateName = "bounceOutDown";
        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            if ($scope.blockDetails.lenght <= id)
                id = 1;
            else
                id += 1;
            console.log(id);
            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //prev block
    $scope.prevBlock = function (id) {
        console.log(id);
        $scope.animateName = "bounceOutUp";
        setTimeout(function () {
            $scope.animateName = "bounceInUp";
            if (id == 1)
                id = $scope.blockDetails.lenght;
            else
                id -= 1;
           
            $scope.activeBlock = $scope.blockDetails.find(a=>a.id == id);
            $scope.$apply();
        }, 1000)
    }

    //goto cell
    $scope.gotoCell = function (item) {
        $location.path('/cell/').search({ type: item .type});
    }

})
'use strict';

app.controller('cellCtrl', function ($scope, $location) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');

    var param = $location.search().type;
    $scope.animateName = "bounceInDown";

    $scope.model =
        {
            planeImages: [
                { url: '/img/Blocks/Plane A/A-01.jpg', className: '', Type: 'A-01' },
                { url: '/img/Blocks/Plane A/A-02.jpg', className: '', Type: 'A-02' },
                { url: '/img/Blocks/Plane A/A-03.jpg', className: '', Type: 'A-03' },
                { url: '/img/Blocks/Plane A/A-04.jpg', className: '', Type: 'A-04' }
            ]
        };

    $scope.table = [
        {id : 0, N: 'BH1', className: '', T: 'همکف', M: 95, C: 'Code 1', Type: 'A-01' },
        {id : 1, N: 'BH1', className: '', T: 'همکف', M: 158, C: 'Code 2', Type: 'A-01' },
        {id : 2, N: 'BH2', className: '', T: 'اول', M: 137, C: 'Code 2', Type: 'A-02' },
        {id : 3, N: 'BH2', className: '', T: 'اول', M: 160, C: 'Code 2', Type: 'A-02' },
        {id : 4, N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
        {id : 5, N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
        {id : 6, N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
        {id : 7, N: 'BH2', className: '', T: 'اول', M: 162, C: 'Code 2', Type: 'A-02' },
        {id : 8, N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
        {id : 9, N: 'BH2', className: '', T: 'سوم', M: 162, C: 'Code 2', Type: 'A-03' },
        {id : 10, N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-03' },
        {id : 11, N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
        {id : 12, N: 'BH2', className: '', T: 'چهارم', M: 162, C: 'Code 2', Type: 'A-04' },
        {id : 13, N: 'BH2', className: '', T: 'چهارم', M: 160, C: 'Code 2', Type: 'A-04' }
    ];


    // $scope.previewImage = $scope.model.planeImages[0].url;


    $scope.previewImg = function (item) {
        $scope.previewImage = item.url
    }

    $scope.removeImg = function (item) {
        var find = $scope.model.planeImages.find(a=>a.className == 'active');
        if (find == undefined)
            $scope.previewImage = '';
        else
            $scope.previewImage = find.url;
    }

    $scope.selectImg = function (pIndex, item) {
        $scope.animateName = "bounceOutDown";
        angular.forEach($scope.model.planeImages, function (item, index) {
            $scope.model.planeImages[index].className = "";
        })
        $scope.model.planeImages[pIndex].className = "active";

        angular.forEach($scope.table, function (item, index) {
            if (item.Type == $scope.model.planeImages[pIndex].Type)
                $scope.table[index].className = 'active';
            else
                $scope.table[index].className = '';
        })

        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            $scope.$apply();
        }, 100)
    }

    $scope.selectTable = function (p) {
        $scope.animateName = "bounceOutDown";
        angular.forEach($scope.model.planeImages, function (item, index) {
            if (item.Type == p.Type) {
                $scope.previewImage = item.url;
                $scope.model.planeImages[index].className = 'active';
            }
            else
                $scope.model.planeImages[index].className = '';
        });

        angular.forEach($scope.table, function (item, index) {
            if (item.Type == p.Type)
                $scope.table[index].className = "active";
            else
                $scope.table[index].className = "";

            if (item.id == p.id)
                $scope.table[index].className += " select";
        });

        setTimeout(function () {
            $scope.animateName = "bounceInDown";
            $scope.$apply();
        }, 100)
    }

});
'use strict';

app.controller('cellDetailCtrl', function ($scope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');

    $scope.images = [
        { url: '/img/slider/1.jpg', rank: 3, pov: '/img/pov/POV-01.png', className: 'active' },
        { url: '/img/slider/2.jpg', rank: 4, pov: '/img/pov/POV-01.png', className: '' },
        { url: '/img/slider/3.jpg', rank: 5, pov: '/img/pov/POV-01.png', className: '' },
    ];

    $scope.starRank = [];


    var _rank = $scope.images.find(a=>a.className == "active").rank;
    for (var i = 1; i <= 5; i++) {
        if (_rank >= i)
            $scope.starRank.push({ id: i, isActive: true });
        else
            $scope.starRank.push({ id: i, isActive: false });
    }

    $scope.isComment = false;


    $scope.next = function () {
        var curent = $scope.images.find(a=>a.className == 'active');
        var index = $scope.images.indexOf(curent);
        var activePage = 0;
        
        if ((index + 1) < $scope.images.length)
            activePage = index + 1;
        else
            $scope.isComment = true;

        $scope.images[index].className = '';
        $scope.images[activePage].className = 'active';

        $scope.starRank = [];
        var _rank = $scope.images.find(a=>a.className == "active").rank;
        for (var i = 1; i <= 5; i++) {
            if (_rank >= i)
                $scope.starRank.push({ id: i, isActive: true });
            else
                $scope.starRank.push({ id: i, isActive: false });
        }
    }

    $scope.prev = function () {
        var curent = $scope.images.find(a=>a.className == 'active');
        var index = $scope.images.indexOf(curent);
        var activePage = $scope.images.length - 1;
        console.log(index);
        if (index >= 1)
            activePage = index - 1;
        else
            $scope.isComment = false;
        $scope.images[index].className = '';
        $scope.images[activePage].className = 'active';

        $scope.starRank = [];
        var _rank = $scope.images.find(a=>a.className == "active").rank;
        for (var i = 1; i <= 5; i++) {
            if (_rank >= i)
                $scope.starRank.push({ id: i, isActive: true });
            else
                $scope.starRank.push({ id: i, isActive: false });
        }
    }

})
'use strict';

app.controller('registerCtrl', function ($scope, $rootScope, $location) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = false;

    $scope.type = 0;

    $scope.hamkar = false;
    $scope.show = false;

    $scope.changeRegType = function () {
        $scope.show = true;
        if ($scope.type == 1)
            $scope.hamkar = true;
        else if ($scope.type == 2)
            $scope.hamkar = false;
        else
            $scope.show = false;
    }

    $scope.gotoCell = function (item) {
        $location.path('/cell/').search({ type: item.type });
    }

});