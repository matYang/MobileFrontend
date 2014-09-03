'use strict';
app.run(
    ['app', '$rootScope', 'restAPI','$log', function (app, $rootScope, restAPI,$log) {
        if (app.test_mode) {
            $log.info('RUN IN TEST MODE');
        }
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
        };


        app.restAPI = restAPI;
        app.$log = $log;
        app.$rootScope = $rootScope;
    }]
);