'use strict';
app.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
//    $interpolateProvider.startSymbol('{%');
//    $interpolateProvider.endSymbol('%}');

    $stateProvider
        //用户登录
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html',
            controller: 'loginCtrl'
        })
        //用户注册
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html',
            controller: 'registerCtrl'
        })
        //用户完善信息
        .state('complete', {
            url: '/complete',
            templateUrl: 'views/complete.html',
            controller: 'completeCtrl'
        })
        //课程列表
        .state('course-list', {
            url: '/courses',
            templateUrl: 'views/course.list.html',
            controller: 'courseListCtrl'
        })
        //课程详情
        .state('course-detail', {
            url: '/courses/:id',
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