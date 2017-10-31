/// <reference path="../sweetalert.min.js" />
/// <reference path="angular.js" />

var app = angular.module('fieldsApp', []).filter('orderObjectBy', function () {
    return function (items, field, reverse) {
        var filtered = [];
        angular.forEach(items, function (item) {
            filtered.push(item);
        });
        filtered.sort(function (a, b) {
            return (a[field] > b[field] ? 1 : -1);
        });
        if (reverse) filtered.reverse();
        return filtered;
    };
})
         .controller('fieldsController', [
          '$scope', '$http',
          function ($scope, $http) {

              var defaultFields = [
                  { "ID": 0, "Label": "نام مدل", "Source": "0", "InputType": 0, "CssClass": "", "InputDivCssClass": "col-sm-12", "Required": true, "Name": "name", "GroupWith": "", "ShowInGrid": true, "Localize": false, "OrderID": 0, "Multiple": false, "$$hashKey": "object:3" },
                  { "ID": 0, "Label": "قیمت پیش فرض", "Source": "0", "InputType": 0, "CssClass": "", "InputDivCssClass": "col-sm-12", "Required": true, "Name": "DefaultPrice", "GroupWith": "", "ShowInGrid": true, "Localize": false, "OrderID": 0, "Multiple": false, "$$hashKey": "object:80" },
                  { "ID": 0, "Label": "نام ویژگی", "Source": "0", "InputType": 0, "CssClass": "", "InputDivCssClass": "col-xs-6", "Required": false, "Name": "field", "GroupWith": "other", "ShowInGrid": false, "Localize": false, "OrderID": 400, "Multiple": true, "$$hashKey": "object:7" },
                  { "ID": 0, "Label": "مقدار", "Source": "0", "InputType": 2, "CssClass": "", "InputDivCssClass": "col-xs-6", "Required": false, "Name": "value", "GroupWith": "other", "ShowInGrid": false, "Localize": false, "OrderID": 401, "Multiple": true, "$$hashKey": "object:8" },
                  { "ID": 0, "Label": "عکس", "Source": "0", "InputType": 21, "CssClass": "", "InputDivCssClass": "col-sm-12", "Required": true, "Name": "image", "GroupWith": "img", "ShowInGrid": false, "Localize": false, "OrderID": 1, "Multiple": true, "$$hashKey": "object:6" },
                  { "ID": 0, "Label": "توضیحات", "Source": "0", "InputType": 2, "CssClass": "", "InputDivCssClass": "col-sm-12", "Required": true, "Name": "description", "GroupWith": "", "ShowInGrid": false, "Localize": false, "OrderID": 0, "Multiple": false, "$$hashKey": "object:5" }];


              var DefaultFieldItem = {
                  ID: 0,
                  Label: '',
                  InputType: '',
                  ShowInGrid: false,
                  Required: true,
                  Localize: false,
                  Name: '',
                  InputDivCssClass: 'col-sm-12',

                  CssClass: '',
                  GroupWith: '',
                  Source: 0,
                  OrderID: 0,
                  Multiple: false
              };

              var formId = document.getElementById("fieldsApp").getAttribute("data-formId");

              // Init Variables
              $scope.sources = [];
              $scope.fields = [];
              $scope.inputTypes = [];

              $http.get('/Manage/Fields/GetForms')
                          .success(function (data, status, headers, config) {
                              var dataStr = JSON.stringify(data);
                              var json = JSON.parse(dataStr);
                              $scope.sources = json;
                          });

              $http.get('/datacontroller/getenumjson?EnumName=inputTypes')
                   .success(function (data, status, headers, config) {
                       var dataStr = JSON.stringify(data);
                       var json = JSON.parse(dataStr);
                       $scope.inputTypes = json;
                   });

              $http.get('/Manage/Fields/GetFields?formId=' + formId)
                       .success(function (data, status, headers, config) {
                           var dataStr = JSON.stringify(data);
                           var json = JSON.parse(dataStr);
                           $scope.fields = json;
                       });



              $scope.removeItem = function (item) {
                  $scope.fields.splice($scope.fields.indexOf(item), 1)
                  $scope.onPreview();

              };

              $scope.moveUp = function (item) {
                  item.OrderID = item.OrderID + 1;
                  $scope.onPreview();

              };

              $scope.moveDown = function (item) {

                  if (item.OrderID - 1 >= 0) {

                      item.OrderID = item.OrderID - 1;
                      $scope.onPreview();

                  }

              };


              $scope.addItem = function () {

                  var newItem = jQuery.extend(true, {}, DefaultFieldItem);
                  $scope.fields.push(newItem);
                  $scope.onPreview();


              };

              $scope.onDefaults = function () {
                  $(defaultFields).each(function (index, item) {
                      $scope.fields.push(item);
                  });
                  $scope.onPreview();

              };

              $scope.onSubmit = function () {

                  console.log($scope.fields);
                  $http.post('/Manage/Fields/Save', { formId: formId, fields: JSON.stringify($scope.fields) })
      .success(function (data, status, headers, config) {

          swal("با موفیت ذخیره شد ");

      });

              };

              $scope.onChange = function () {

                  $scope.onPreview();

              };


              $scope.onPreview = function () {

                  $http.post('/Manage/Fields/GetFormPreview', { formId: formId, fields: JSON.stringify($scope.fields) })
                        .success(function (data, status, headers, config) {

                            document.getElementById("preview").innerHTML = data;
                            InitBaseForms();

                            //$("#fieldsApp select").select2({ width: 'resolve' });


                        });

              };
              setTimeout(function () {
                  $scope.onPreview();
              }, 500);



          }
         ]);