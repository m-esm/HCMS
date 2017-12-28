'use strict';

app.controller('aboutCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = false;

});