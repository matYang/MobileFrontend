'use strict';
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
//    $interpolateProvider.startSymbol('{%');
//    $interpolateProvider.endSymbol('%}');

    $stateProvider
        .state('course-list', {
            url: '/course',
            templateUrl: 'views/course.list.html',
            controller: 'courseListCtrl'
        })
        .state('course-detail', {
            url: '/course/:id',
            templateUrl: 'views/course.detail.html',
            controller: 'courseDetailCtrl'
        });


    $urlRouterProvider.otherwise("/course");
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
}).constant('app', { //constant 'app' assemble things like restAPI and configs
    version: 'v2',
    test_mode: !(typeof TEST_MODE === 'undefined'),//测试模式
    //默认的分页
    default_page: {
        start: 0,    // 起始记录
        count: 10,   //每页记录数
        total: 0    //记录总数
    }
});