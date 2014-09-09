/**
 * Created by jz on 2014/9/4.
 */
var appRoutes = angular.module('appRoutes', []);
appRoutes.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
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
        .state('courseList', {
            url: '/courses',
            templateUrl: 'views/course.list.html',
            controller: 'courseListCtrl'
        })
        //课程详情
        .state('courseDetail', {
            url: '/courses/:id'
            //todo 暂时移除
//            templateUrl: 'views/course.detail.html',
//            controller: 'courseDetailCtrl'
        });


    $urlRouterProvider.otherwise("/register");
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
});