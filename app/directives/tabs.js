'use strict';

/* Filters */
appDirectives.directive('clickRefresh', ['$window', function ($window) {
    return {

        restrict: 'A',
        replace: true,
        scope: {},
//        controller: 'TabsetController',
//        templateUrl: 'template/tabs/tabset.html',
        link: function (scope, element, attrs) {
            element.on('click', function () {
                console.log($window)
                $window.location.reload();
            })
        }
    };
}]);