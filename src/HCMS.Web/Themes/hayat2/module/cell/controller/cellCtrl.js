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