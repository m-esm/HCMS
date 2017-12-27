'use strict';

app.controller('hayatProjectCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

    $scope.myPagingFunction = function () {
        console.log(res);
    }
})