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