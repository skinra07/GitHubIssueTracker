(function() {

    var mainApp = angular.module("mainApp");

    // Initialize the controller
    mainApp.controller("UserController",
        function($scope, github, $routeParams, $location) {

            console.log("At UserController:")

            var onError = function(error) 
            {
                $scope.user = null
                $scope.repos = null
                $scope.error = "There was something error: " + error.statusText
            }

            var onGetRepo = function(data) 
            {
                $scope.repos = data
            }
            
            
            var onGetUser = function(data) 
            {
                console.log("OnGetUser")
                $scope.user = data
                $scope.error = null
                console.log(" Calling github getRepo")
                github.getRepo(data).then(onGetRepo, onError)
            }
            
            $scope.username = $routeParams.username
            $scope.repoOrderBy = "-stargazers_count"
            console.log("Calling github getUser")
            github.getUser($scope.username).then(onGetUser, onError)
            
            var onGetCollaborator = function(data) 
            {
                console.log(data)
            }

            $scope.repoName = function(reposName, openIssue)
            {
                console.log("Here!!!")
                $scope.openIssues = openIssue
                console.log(openIssue)
                $scope.reposName = reposName
                $location.path("/repo/" + $scope.reposName)
                console.log("/repo/"+reposName)
            }
            
        })

}())