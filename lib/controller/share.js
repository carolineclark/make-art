var app = require('../app'),
    api = require('kano-world-sdk').api;

app.controller('ShareController', function ($scope, $routeParams, $http, $location) {
    $scope.id = $routeParams.id || null;

    api.share.get.byId({ id: $scope.id })
    .then(function (res) {

        $scope.item = res.body.item;

        if ($scope.item.app !== 'kano-draw') {
            return $scope.showError('Not a Kano Draw share');
        }

        $http
        .get($scope.item.attachment_url)
        .success(function (res) {

            localStorage.playgroundCode = res;
            $location.path('/playground');

        })
        .error(function (message) {
            $scope.showError(message);
        });

    }, function (res) {
        $scope.showError(res.body);
    })
    .catch(function (err) {
        throw err;
    });

    $scope.showError = function (message) {
        setTimeout(function () {
            $scope.error = message;
            $scope.$apply();
        }, 1);
    };
});