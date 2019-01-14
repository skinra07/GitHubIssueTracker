(function () {
    var mainApp = angular.module("mainApp");

    mainApp.controller("MainController", function ($scope,$location) {

        $scope.fname = "angular"
        $scope.reponame = "angular"
        $scope.pastdays = 7

        $scope.searchIssues = function (pastdays) {
            // Redirect to the route
            $location.path("/repo/angular/angular/" + pastdays);
        }

});
}())