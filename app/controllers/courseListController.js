'use strict';
appControllers.controller('courseListCtrl',
    ['$scope', '$rootScope', '$ionicModal', 'app', 'OPTIONS', function ($scope, $rootScope, $ionicModal, app, OPTIONS) {
        $scope.title = 'course list page';
        var Courses = app.restAPI.courses;
        // 课程id  班级图片 课程名 班级人数 价格 开课时间 上课市时间 地区 其它优惠信息
        //todo that should be cached
        $scope.page = app.pageService.courses;
//        courseService.getFilterCourses().success(function(data){
//            console.log(data)
//        })
        $scope.doRefresh = function () {
            Courses.get(angular.extend({},$rootScope.filter_choosed,$rootScope.page), function (data) {
                $rootScope.courses = data.data;
                $rootScope.page.start = data.start;
                $rootScope.page.count = data.count;
                $rootScope.page.total = data.total;
            }, function () {
                //error
            });

        };
        $scope.prePage = function(){

        };
        $scope.nextPage = function(){

        };
        if($rootScope.courses==undefined){
            $scope.doRefresh();
        }


        //filter part
        //this part can also isolate from this file
        // but will use 'broadcast' and 'on' to notify this controller which one user chooses

        //save tmp choosed filter options until confirmed
        $scope.filter_tmp = angular.copy($rootScope.filter_choosed);
        $scope.options = {//init filter options
            address: OPTIONS.address,
            start_time: OPTIONS.start_time,
            on_time: OPTIONS.on_time
        };
        var init_options = function () {
            //init options of item category and address
            //todo it better to use promise chain
            if (!$scope.options.items) {
                //todo get the item options from backend
            }
            if (!$scope.options.address) {
                //todo get the address options from backend
            }
        };
        init_options();
        //1st 培训类目筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-item.html',
            //to be a child scope of current scope
            {scope: $scope}).then(function (modal) {
                $scope.filterItemModal = modal;
            });
        $scope.openItemFilter = function () {
            $scope.modal = $scope.filterItemModal; //current modal
            $scope.filter_tmp = angular.copy($scope.filter_choosed);
            $scope.filterItemModal.show();
        };

        //2nd 上课地点筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-addr.html',
            {scope: $scope}).then(function (modal) {
                $scope.filterAddrModal = modal;
            });
        $scope.openAddrFilter = function () {
            $scope.modal = $scope.filterAddrModal;
            $scope.filter_tmp = angular.copy($scope.filter_choosed);
            $scope.filterAddrModal.show();
        };

        //3rd 时间筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-time.html',
            {scope: $scope}
        ).then(function (modal) {
                $scope.filterTimeModal = modal;
            });
        $scope.openTimeFilter = function () {
            $scope.modal = $scope.filterTimeModal;
            $scope.filter_tmp = angular.copy($scope.filter_choosed);
            $scope.filterTimeModal.show();
        };

        //筛选确认按钮 触发刷新事件 todo 当条件变化时才进行筛选
        $scope.confirm_filter = function () {
            $rootScope.filter_choosed = angular.copy($scope.filter_tmp);
            $scope.modal.hide();
        }
    }]
);
