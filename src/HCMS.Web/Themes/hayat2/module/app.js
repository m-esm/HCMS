let app = angular.module('myApp',['ngRoute']);
app.config(function ($routeProvider, $locationProvider) {


    $locationProvider.html5Mode(true).hashPrefix('!');

    //$routeProvider.when("/home", {
    //    controller: "homeCtrl",
    //    templateUrl: "Themes/hayat2/module/home/view/home.html"
    //});

    //$routeProvider.when("/hayat", {
    //    controller: "hayatCtrl",
    //    templateUrl: "Themes/hayat2/module/hayat/view/hayat.html"
    //});

    //$routeProvider.when("/about", {
    //    controller: "aboutCtrl",
    //    templateUrl: "Themes/hayat2/module/about/view/about.html"
    //});

    //$routeProvider.when("/team", {
    //    controller: "teamCtrl",
    //    templateUrl: "Themes/hayat2/module/team/view/team.html"
    //});

    //$routeProvider.when("/ebtekarSaze", {
    //    controller: "ebtekarSazeCtrl",
    //    templateUrl: "Themes/hayat2/module/ebtekarSaze/view/ebtekarSaze.html"
    //});

    //$routeProvider.when("/hamkaran", {
    //    controller: "hamkaranCtrl",
    //    templateUrl: "Themes/hayat2/module/hamkaran/view/hamkaran.html"
    //});

    //$routeProvider.when("/hayatProject", {
    //    controller: "hayatProjectCtrl",
    //    templateUrl: "Themes/hayat2/module/hayatProject/view/hayatProject.html"
    //});

    //$routeProvider.when("/hayatNo", {
    //    controller: "hayatNoCtrl",
    //    templateUrl: "Themes/hayat2/module/hayatno/view/hayatno.html"
    //});

    //$routeProvider.when("/gallery", {
    //    controller: "galleryCtrl",
    //    templateUrl: "Themes/hayat2/module/gallery/view/gallery.html"
    //});

    //$routeProvider.when("/block", {
    //    controller: "blockCtrl",
    //    templateUrl: "Themes/hayat2/module/block/view/block.html"
    //});

    //$routeProvider.when("/cell", {
    //    controller: "cellCtrl",
    //    templateUrl: "Themes/hayat2/module/cell/view/cell.html"
    //});

    //$routeProvider.when("/cell/detail", {
    //    controller: "cellDetailCtrl",
    //    templateUrl: "Themes/hayat2/module/cellDetail/view/cellDetail.html"
    //});

    //$routeProvider.when("/cell/detail", {
    //    controller: "cellDetailCtrl",
    //    templateUrl: "Themes/hayat2/module/cellDetail/view/cellDetail.html"
    //});

    //$routeProvider.when("/register", {
    //    controller: "registerCtrl",
    //    templateUrl: "Themes/hayat2/module/register/view/register.html"
    //});
    
    
   // $routeProvider.otherwise({ redirectTo: "/home" });

   
});

app.run(function ($rootScope) {



});