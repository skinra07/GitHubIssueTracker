(function () {
    var mainApp = angular.module("mainApp", ["ngRoute"]);
    mainApp.config(function ($routeProvider) {
        $routeProvider
            .when("/main", {
                templateUrl: "main.html",
                controller: "MainController"
            })
            .when("/repo/:username/:repository/:dateDays", {
                templateUrl: "repo.html",
                controller: "RepoController"
            })

            .otherwise({ redirectTo: "/main" })
    })
}())