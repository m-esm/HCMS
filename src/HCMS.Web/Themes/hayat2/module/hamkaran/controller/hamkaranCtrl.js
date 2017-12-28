'use strict';

app.controller('hamkaranCtrl', function ($scope, $rootScope) {
    $('#slider').removeClass('active');
    $('.show-other-page-menu').addClass('active');
    $rootScope.blackActive = true;

   
})