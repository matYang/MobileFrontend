'use strict';
app.run(
    ['app', '$rootScope', 'restAPI', '$log', 'Auth', '$state', 'pageService', 'enums', 'options', '$ionicScrollDelegate',
        'getLocation', 'getCategory', 'getSchool', '$timeout', '$interval', '$ionicPopup', '$window', '$location',
        function (app, $rootScope, restAPI, $log, Auth, $state, pageService, enums, options, $ionicScrollDelegate, getLocation, getCategory, getSchool, $timeout, $interval, $ionicPopup, $window, $location) {
            if (app.test_mode) {
                $log.info('RUN IN TEST MODE');
            }
            //$rootScope has some global functions and params
            $rootScope.$state = $state;
            $rootScope.global = {
                user: null,
                isLogin: false
            };
            //global loading
            $rootScope.loading = {
                show: false
            };
            $rootScope.filter_choosed = {
                item: undefined,//培训类目
                address: undefined,//上课地点
                start_time: undefined,//开课时间
                on_time: undefined,//上课时间
                order_field: undefined,//排序字段
                order_type: undefined//排序方式
            };

            app.$log = $log;
            app.$timeout = $timeout;
            app.$interval = $interval;
            app.$rootScope = $rootScope;
            app.$state = $state;
            app.$location = $location;
            app.$window = $window;
            app.$scroll = $ionicScrollDelegate;

            app.pageService = pageService;
            app.enums = enums;
            app.options = options;
            app.restAPI = restAPI;

            app.getLocation = getLocation;
            app.getCategory = getCategory;
            app.getSchool = getSchool;

            app.alert = function (title, message) {
                if (message == undefined) {
                    message = title;
                    title = '';
                }
                return $ionicPopup.alert({
                    title: title,
                    template: message,
                    okText: '好的',
                    okType: ''
                });
            };

            Auth.checkUser();
            //router的权限控制
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                $log.log('route change start');
                // event.preventDefault();
                // transitionTo() promise will be rejected with
                // a 'transition prevented' error
                var isLogin = $rootScope.global.isLogin;
                var completed = $rootScope.global.isLogin && !!$rootScope.global.user.schoolId;
                var isToLoginPage = $state.get('login') === toState || $state.get('complete') === toState || $state.get('register') === toState;
                //未输入学校的用户强制只能进入complete页面
                if (isLogin && !completed) {
                    if ($state.get('complete') === fromState) {
                        //已经在complete页面的就别想出去了..
                        event.preventDefault();
                    } else {
                        //还没在complete页面的就直接去这个页面的 其中包括本来就想去compete页面的情况
                        $location.path('complete');
                    }
                }

                //已登录用户想要进入登录页面 当然不可以..
                if (isLogin && completed) {
                    //非首次进入页面 想要进入登录等页面
                    if (fromState.name&&isToLoginPage) {
                        event.preventDefault();
                    } else {
                        $location.path('courses');
                    }
                }
            });
        }
    ]
);