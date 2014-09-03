'use strict';

/* App Module */

var app = angular.module('app', [
    'ngResource',
    'ngCookies',
    'ionic',

    'appServices',
    'appControllers',
    'appDirectives',
    'appFilters'
]);
var appServices = angular.module('appServices', ['ngResource']);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);

app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
//    $interpolateProvider.startSymbol('{%');
//    $interpolateProvider.endSymbol('%}');

        $stateProvider
            .state('course-list', {
                url: '/course',
                templateUrl: 'views/course-list.html',
                controller: 'courseListCtrl'
            })
            .state('course-detail', {
                url: '/course/:id',
                templateUrl: 'views/course-detail.html',
                controller: 'courseDetailCtrl'
            });


        $urlRouterProvider.otherwise("/course");
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
    }).constant('app', { //constant 'app' assemble things like restAPI and configs
        version: 'v2',
        test_mode:true
    }).run(
        ['app', '$rootScope','restAPI', function (app, $rootScope,restAPI) {
            //global loading
            $rootScope.loading = {
                show: false
            };
            $rootScope.filter_choosed = {
                item: '',//培训类目
                address: '',//上课地点
                start_time: '',//开课时间
                on_time: '',//上课时间
                order_field: '',//排序字段
                order_type: ''//排序方式
            }
        }]
    );