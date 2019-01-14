(function () {

    var mainApp = angular.module("mainApp");

    mainApp.controller("ngToggler",
        function ($scope) {
            $scope.custom = true;
            $scope.toggleCustom = function () {
                $scope.custom = $scope.custom === false ? true : false;
            }
        })
}())