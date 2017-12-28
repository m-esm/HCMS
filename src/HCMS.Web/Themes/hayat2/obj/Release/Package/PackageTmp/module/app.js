var app = angular.module('myApp', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        controller: "homeCtrl",
        templateUrl: "/module/home/view/home.html"
    });

    $routeProvider.when("/hayat", {
        controller: "hayatCtrl",
        templateUrl: "/module/hayat/view/hayat.html"
    });

    $routeProvider.when("/about", {
        controller: "aboutCtrl",
        templateUrl: "/module/about/view/about.html"
    });

    $routeProvider.when("/team", {
        controller: "teamCtrl",
        templateUrl: "/module/team/view/team.html"
    });

    $routeProvider.when("/ebtekarSaze", {
        controller: "ebtekarSazeCtrl",
        templateUrl: "/module/ebtekarSaze/view/ebtekarSaze.html"
    });

    $routeProvider.when("/hamkaran", {
        controller: "hamkaranCtrl",
        templateUrl: "/module/hamkaran/view/hamkaran.html"
    });

    $routeProvider.when("/hayatProject", {
        controller: "hayatProjectCtrl",
        templateUrl: "/module/hayatProject/view/hayatProject.html"
    });

    $routeProvider.when("/hayatNo", {
        controller: "hayatNoCtrl",
        templateUrl: "/module/hayatno/view/hayatno.html"
    });

    $routeProvider.when("/gallery", {
        controller: "galleryCtrl",
        templateUrl: "/module/gallery/view/gallery.html"
    });

    $routeProvider.when("/block", {
        controller: "blockCtrl",
        templateUrl: "/module/block/view/block.html"
    });

    $routeProvider.when("/cell", {
        controller: "cellCtrl",
        templateUrl: "/module/cell/view/cell.html"
    });

    $routeProvider.when("/cell/detail", {
        controller: "cellDetailCtrl",
        templateUrl: "/module/cellDetail/view/cellDetail.html"
    });

    $routeProvider.when("/cell/detail", {
        controller: "cellDetailCtrl",
        templateUrl: "/module/cellDetail/view/cellDetail.html"
    });

    $routeProvider.when("/register", {
        controller: "registerCtrl",
        templateUrl: "/module/register/view/register.html"
    });

    
    
    $routeProvider.otherwise({ redirectTo: "/home" });
});

