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