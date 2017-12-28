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