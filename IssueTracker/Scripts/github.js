(function () {

    var mainApp = angular.module("mainApp");

    mainApp.factory("github", function ($http) {

        var getIssues = function (username, reponame, createdate) {
            var http_url = "https://api.github.com/search/issues?sort=created&order=asc&q=repo:" + reponame + "/" + username + "+is:issue+created:>=" + createdate
            return $http.get(http_url)
                .then(function (response) {
                    return response.data
                })
        }

        var getIssues2 = function (username, reponame, createdate) {
            var http_url = "https://api.github.com/search/issues?sort=created&order=asc&q=repo:" + reponame + "/" + username + "+is:issue+created:>=" + createdate
            var array = []
            return $http.get(http_url)
                .then(function (response) {
                    array.data = response.data
                    array.link = response.headers('link')
                    return array
                })
        }

        var getIssuesByURL = function (http_url) {
            var array = []
            return $http.get(http_url)
                .then(function (response) {
                    array.data = response.data
                    array.link = response.headers('link')
                    return array
                })
        }

        return {
            getIssues: getIssues,
            getIssues2: getIssues2,
            getIssuesByURL: getIssuesByURL
        }
    })

}())