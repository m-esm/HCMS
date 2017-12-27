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