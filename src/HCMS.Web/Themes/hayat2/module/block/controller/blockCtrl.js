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