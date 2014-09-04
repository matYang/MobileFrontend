'use strict';
appControllers.controller('courseListCtrl',
    ['$scope', '$rootScope', '$ionicModal', 'app', 'OPTIONS', function ($scope, $rootScope, $ionicModal, app, OPTIONS) {
        var Courses = app.restAPI.courses;
        var pageView = app.pageService.courses;

        $scope.page = pageView.page;
        $scope.filter = pageView.filter;
        //save tmp choosed filter options until confirmed
        $scope.filter_tmp = angular.copy($rootScope.filter);
        //不更改引用的情况下清空筛选条件
        var clearFilter = function () {
            angular.each($scope.filter, function (v, k) {
                $scope[k] = undefined;
            })
        };


        //刷新
        var doRefresh = $scope.doRefresh = function () {
            $scope.loading = true;
            Courses.get(angular.extend({}, $rootScope.filter, $scope.page)).$promise
                .then(function (data) {
                    $scope.courses = data.data;
                    $scope.page.start = data.start;
                    $scope.page.count = data.count;
                    $scope.page.total = data.total;
                }, function () {
                    //todo error 数据获取失败
                }).finally(function () {
                    $scope.loading = false;
                });
        };
        //搜索 清空删选条件
        var doSearch = function () {
            clearFilter();
            doRefresh();
        };
        $scope.prePage = function () {
            if ($scope.page.start >= $scope.page.count) {
                $scope.page.start -= $scope.page.count;
                doRefresh();
            }
        };
        $scope.nextPage = function () {
            if ($scope.page.start + $scope.page.count < $scope.page.total) {
                $scope.page.start += $scope.page.count;
                doRefresh();
            }
        };
        $scope.doRefresh();


        //filter part
        //this part can also isolate from this file
        // but will use 'broadcast' and 'on' to notify this controller which one user chooses
        $scope.options = {//init filter options
            address: OPTIONS.address,
            start_time: OPTIONS.start_time,
            on_time: OPTIONS.on_time
        };

        /*todo 拉取选项列表*/
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
                $scope.openItemFilter = function () {
                    $scope.modal = $scope.filterItemModal; //current modal
                    $scope.filter_tmp = angular.copy($scope.filter);
                    $scope.pop = false;
                    $scope.filterItemModal.show();
                };
            });

        //2nd 上课地点筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-addr.html',
            {scope: $scope}).then(function (modal) {
                $scope.filterAddrModal = modal;
                $scope.openAddrFilter = function () {
                    $scope.modal = $scope.filterAddrModal;
                    $scope.filter_tmp = angular.copy($scope.filter);
                    $scope.pop = false;
                    $scope.filterAddrModal.show();
                };
            });


        //3rd 时间筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-time.html',
            {scope: $scope}
        ).then(function (modal) {
                $scope.filterTimeModal = modal;
                $scope.openTimeFilter = function () {
                    $scope.modal = $scope.filterTimeModal;
                    $scope.filter_tmp = angular.copy($scope.filter);
                    $scope.pop = false;
                    $scope.filterTimeModal.show();
                };
            });

        //筛选确认按钮 触发刷新事件 todo 当条件变化时才进行筛选
        $scope.confirm_filter = function () {
            $scope.filter = angular.copy($scope.filter_tmp);
            $scope.modal.hide();
            doSearch();
        }
    }]
);
