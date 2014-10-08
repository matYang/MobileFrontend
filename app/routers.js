/**
 * Created by jz on 2014/9/4.
 */
var appRoutes = angular.module('appRoutes', []);
appRoutes.config(function ($stateProvider, $urlRouterProvider, $httpProvider, $locationProvider) {
//    $interpolateProvider.startSymbol('{%');
//    $interpolateProvider.endSymbol('%}');
    var version = '?build001';
    $stateProvider
        //用户登录
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.html'+version,
            controller: 'loginCtrl'
        })
        //用户注册
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.html'+version,
            controller: 'registerCtrl'
        })
        //用户完善信息
        .state('complete', {
            url: '/complete',
            templateUrl: 'views/complete.html'+version,
            controller: 'completeCtrl'
        })
        /*------申请----*/
        //申请--人工选课
        .state('applyCourse', {
            url: '/apply/course',
            templateUrl: 'views/apply.course.html'+version,
            controller: 'applyCtrl'
        })
        //申请--助学贷款
        .state('applyLoan', {
            url: '/apply/loan',
            templateUrl: 'views/apply.loan.html'+version,
            controller: 'applyCtrl'
        })


        //课程搜索页面(确定搜索条件后再进入课程列表页面)
        .state('search', {
            url: '/search',
            templateUrl: 'views/course.search.html'+version,
            controller: 'courseSearchCtrl'
        })
        //列表（包括课程列表和团购列表）
        .state('list', {
            abstract: true,
            url: '/list',
            templateUrl: 'views/list.html'+version
        })
        //课程列表
        .state('list.course', {
            url: '/courses',
            templateUrl: 'views/list.course.html'+version,
            controller: 'courseListCtrl'
        })
        //团购列表
        .state('list.tuan', {
            url: '/tuan',
            templateUrl: 'views/list.tuan.html'+version,
            controller: 'tuanListCtrl'
        })


        //申请成功
        .state('applySuccess', {
            url: '/apply/success',
            templateUrl: 'views/apply200.html'+version
        })
        //团购成功
        .state('tuanSuccess', {
            url: '/tuan/success',
            templateUrl: 'views/tbooking200.html'+version
        })

        //课程详情
        .state('courseDetail', {
            url: '/courses/{id}',
            templateUrl: 'views/course.detail.html'+version,
            controller: 'courseDetailCtrl'
        })

        //团购详情
        .state('tuanDetail', {
            url: '/tuan/{id}',
            templateUrl: 'views/tuan.detail.html'+version,
            controller: 'tuanDetailCtrl'
        })

        //课程预定(咨询)
        .state('courseDetail.booking', {
            url: '/booking',
            templateUrl: 'views/course.booking.html'+version,
            controller: 'courseBookingCtrl'
        });


    $urlRouterProvider.otherwise("/register");
//        $locationProvider.html5Mode(true).hashPrefix('!');//remove '#' but all href should be adjusted
});