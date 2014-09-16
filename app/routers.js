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
        //todo 申请--人工选课
        .state('applyCourse', {
            url: '/apply/course',
            templateUrl: 'views/apply.course.html',
            controller: 'applyCourseCtrl'
        })
        //todo 申请--助学贷款
        .state('applyLoan', {
            url: '/apply/loan',
            templateUrl: 'views/apply.loan.html',
            controller: 'applyLoanCtrl'
        })
        //课程搜索页面(确定搜索条件后再进入课程列表页面)
        .state('search', {
            url: '/search',
            templateUrl: 'views/course.search.html',
            controller: 'courseSearchCtrl'
        })
        //课程列表
        .state('courseList', {
            url: '/courses',
            templateUrl: 'views/course.list.html',
            controller: 'courseListCtrl'
        })
        //课程详情
        .state('courseDetail', {
            url: '/courses/{id}',
            templateUrl: 'views/course.detail.html',
            controller: 'courseDetailCtrl'
        })
        //课程预定(咨询)
        .state('courseDetail.booking', {
            url: '/booking',
            templateUrl: 'views/course.booking.html',
            controller: 'courseBookingCtrl'
        });


    $urlRouterProvider.otherwise("/register");
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
});