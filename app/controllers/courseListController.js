'use strict';
appControllers.controller('courseListCtrl',
    ['$scope', '$rootScope', '$ionicModal', 'app', function ($scope, $rootScope, $ionicModal, app) {
        var Courses = app.restAPI.courses;
        var pageView = app.pageService.courses;
        $scope.options = app.options;

        $scope.page = pageView.page;
        $scope.filter = pageView.filter;
        //在用户确认前临时保存用户选择的信息 确认后会拷贝到filter中进行保存
        $scope.filter_tmp = angular.copy($scope.filter);

        //get options for filter modal
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });
        app.getLocation().then(function (data) {
            $scope.location = data.data[0]&&data.data[0].children[0]&&data.data[0].children[0].children;
        });

        //刷新
        var doRefresh = $scope.doRefresh = function () {
            $scope.loading = true;
            app.$scroll.resize();
            app.$scroll.scrollTop(false);
            var filter = angular.copy($scope.filter);

            var value;//临时用的变量
            //格式化filter条件的值 开课日期startDate 上课时间schoolTime
            if(filter.hasOwnProperty('startDate')){
                //todo 格式化 开课日期startDate 当月 下月 下下月

            }
            //todo 下面两段代码可以进行合并
            if(filter.hasOwnProperty('schoolTime')){
                value = filter['schoolTime'].split('_');
                filter.schoolTimeWeek = value[0] == '' ? undefined : value[0];
                filter.schoolTimeDay = value[1] == '' ? undefined : value[1];
                delete filter['schoolTime'];
            }
            //排序的字段 存在排序字段和排序顺序两个信息
            if(filter.hasOwnProperty('orders')){
                value = filter['orders'].split('_');
                filter.columnKey = value[0] == '' ? undefined : value[0];
                filter.order = value[1] == '' ? undefined : value[1];
                delete filter['orders'];
            }

            Courses.get(angular.extend({}, filter, $scope.page)).$promise
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
        //搜索 清空分页
        var doSearch = function () {
            $scope.page.start = app.default_page.start;
            $scope.page.count = app.default_page.count;
            $scope.page.total = app.default_page.total;
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

        /**
         * 底部栏爱推荐弹出框中点击事件 主要用来排序 columnKey
         * @param e 事件对象
         * @param columnKey 需要排序的字段
         * @param order 排序的顺序 asc和desc
         */
        $scope.filterOrder = function(e,columnKey,order){
            //阻止事件冒泡
            e.stopPropagation();
            //选择完关闭弹出层
            $scope.pop = false;
            //进行数据的重新加载
            $scope.filter.orders =[columnKey, order].join('_');
            doSearch();
        };

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
                    $scope.filter_tmp = angular.copy($scope.filter);//should init when open
                    $scope.pop = false;
                    $scope.filterTimeModal.show();
                };
            });

        //筛选确认按钮 触发刷新事件 todo 当条件变化时才进行筛选
        $scope.confirm_filter = function () {
            //]直接拷贝会影响引用状态 这里先清空条件 然后重新扩展对象
            angular.forEach($scope.filter, function (v, k) {
                $scope.filter[k] = undefined;
            });
            angular.extend($scope.filter, $scope.filter_tmp);
            $scope.modal.hide();
            doSearch();
        }
    }]
);