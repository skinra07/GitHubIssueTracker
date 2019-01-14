(function() {

    var mainApp = angular.module("mainApp");

    mainApp.controller("RepoController", 
        function ($scope, github, $routeParams, $filter) {

            var onError = function (error) {
                $scope.error = "There was something error: " + error.statusText
            }

           
            // Main function to parse the response and initialize the values for viewing.
            var onGetIssues = function (array) {

                var data = array.data
                
                for (var key in data.items) {
                    if (data.items.hasOwnProperty(key)) {
                        var valObj = new Object()
                        valObj.title = data.items[key].title

                        valObj.body = data.items[key].body
                        valObj.isBody = true;
                        if (valObj.body == null) {
                            valObj.isBody = false;
                        }

                        valObj.user = data.items[key].user.login

                        valObj.assignee = "Unknown"
                        if (data.items[key].assignee != null) {
                            valObj.assignee = data.items[key].assignee.login
                        }

                        $scope.issueList.push(valObj)
                    }
                }

                pageNavigation(array.link);
            }

            // function to calculate page navigation using info from headers->links
            function pageNavigation(linkInfo) {
                if (linkInfo == null) {
                    $scope.pageList = null;
                }
                else {
                    var linksrc = linkInfo;
                    // This basically replace '>;' and ',' with '||'. And also replace 'rel=' with empty string
                    var normlink = linksrc.replace(/>;|,/g, `||`).replace(/rel=|<|"/g, ``)

                    var arrStr = normlink.split(`||`)

                    // After split, even index (0,2,4..) are always urls. And odd idx are 'prev or next or first or last'
                    for (index = 1; index <= arrStr.length; index += 2) {

                        var pageNum = arrStr[index].trim();
                        if (pageNum.localeCompare("prev") == 0) {
                            $scope.prevPage = arrStr[index - 1].trim();;
                        }
                        else if (pageNum.localeCompare("next") == 0) {
                            $scope.nextPage = arrStr[index - 1].trim();
                        }
                    }
                }
            }

            // This process previous/next page buttons.
            $scope.processPage = function (url) {
                github.getIssuesByURL(url)
                    .then(onGetIssues, onError)
            }

            $scope.repository = $routeParams.repository
            $scope.username = $routeParams.username
            $scope.dateDays = $routeParams.dateDays
            $scope.issueList = [];
            $scope.prevPage = null;
            $scope.nextPage = null;

            var today = new Date();
            var endDate = new Date(today.getTime() - ($scope.dateDays * 24 * 60 * 60 * 1000));
            $scope.fmtEndDate = $filter('date')(endDate, 'yyyy-MM-dd');

            // This execute the initial URL to get list of issues.
            github.getIssues2($scope.username, $scope.username, $scope.fmtEndDate)
                .then(onGetIssues, onError)

        });

}())