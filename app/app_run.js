'use strict';
app.run(
    ['app', '$rootScope', 'restAPI', '$log', 'Auth', '$state', 'pageService', 'enums', 'options', '$ionicScrollDelegate',
        function (app, $rootScope, restAPI, $log, Auth, $state, pageService, enums, options, $ionicScrollDelegate) {
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

//        Auth.checkUser();

            app.restAPI = restAPI;
            app.$log = $log;
            app.$rootScope = $rootScope;
            app.$state = $state;
            app.pageService = pageService;
            app.enums = enums;
            app.options = options;
            app.$scroll = $ionicScrollDelegate;
        }
    ]
)
;