'use strict';

app.controller('sliderCtrl', function ($scope, $rootScope, $location) {

    $('#slider').addClass('active');
    $rootScope.blackActive = true;

    $scope.images = [
        { id: 1, url: 'img/my-slider/1.jpg', className: 'active' },
        { id: 2, url: 'img/my-slider/2.jpg', className: '' },
        { id: 3, url: 'img/my-slider/3.jpg', className: '' },
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