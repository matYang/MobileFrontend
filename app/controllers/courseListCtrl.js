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
            $scope.location = data.data[0] && data.data[0].children[0] && data.data[0].children[0].children;
        });

        //刷新
        var doRefresh = $scope.doRefresh = function () {
            $scope.loading = true;
            app.$scroll.resize();
            app.$scroll.scrollTop(false);
            var filter = angular.copy($scope.filter);

            var value;//临时用的变量
            //格式化filter条件的值 开课日期startDate 上课时间schoolTime may be 01,2
            if (filter.hasOwnProperty('startDate') && filter['startDate']!==undefined) {

                //格式化 开课日期startDate 当月 下月 下下月
                var dataValue = filter['startDate'];
                console.log(dataValue);
                var now = new Date();
                var date1 = new Date(Date.parse([now.getFullYear(), now.getMonth() + 1].join('-')));
                var date2;
                var month = date1.getMonth();
                //设置当月的时间
                if (dataValue == 0) {
                    date2 = new Date(date1);
                    if (month === 11) {
                        date2.setMonth(0);
                        date2.setFullYear(date1.getFullYear() + 1);
                    } else {
                        date2.setMonth(date1.getMonth() + 1);
                    }
                }
                //设置下个月的时间
                else if (dataValue == 1) {
                    if (month === 11) {
                        date1.setMonth(0);
                        date1.setFullYear(date1.getFullYear() + 1);
                        date2 = new Date(date1);
                        date2.setMonth(date2.getMonth() + 1);
                    } else {
                        date1.setMonth(date1.getMonth() + 1);
                        date2 = new Date(date1);
                        if (month === 10) {
                            date2.setMonth(0);
                            date2.setFullYear(date2.getFullYear() + 1);
                        } else {
                            date2.setMonth(date2.getMonth() + 1);
                        }
                    }
                } else if (dataValue == 2) {
                    if (month >= 10) {
                        date1.setMonth((date1.getMonth() + 2) % 12);
                        date1.setFullYear(date1.getFullYear() + 1);
                        date2 = new Date(date1);
                        date2.setMonth(date2.getMonth() + 1);
                    } else {
                        date1.setMonth(date1.getMonth() + 2);
                        date2 = new Date(date1);
                        if (month === 10) {
                            date2.setMonth(0);
                            date2.setFullYear(date2.getFullYear() + 1);
                        } else {
                            date2.setMonth(date2.getMonth() + 1);
                        }
                    }
                } else {
                    date1 = undefined;
                    date2 = undefined;
                }
                filter.startDateStart = date1 ? date1.getTime() : date1;
                filter.startDateEnd = date2 ? date2.getTime() : date2;
                delete filter['startDate'];
            }
            if (filter.hasOwnProperty('tab')) {
                filter.originalPriceStart = filter['tab'] ? 1 : undefined;
                delete filter['tab'];
            }
            //todo 下面两段代码可以进行合并
            if (filter.hasOwnProperty('schoolTime') && filter['schoolTime']) {
                value = filter['schoolTime'].split('_');
                filter.schoolTimeWeek = value[0] == '' ? undefined : value[0];
                filter.schoolTimeDay = value[1] == '' ? undefined : value[1];
                delete filter['schoolTime'];
            }
            //排序的字段 存在排序字段和排序顺序两个信息
            if (filter.hasOwnProperty('orders') && filter['orders']) {
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
                }, function (response) {
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

        $scope.clickTab = function (discount) {
            if (discount == $scope.filter.tab)return;
            $scope.filter.tab = discount;
            doSearch();
        };

        /**
         * 底部栏爱推荐弹出框中点击事件 主要用来排序 columnKey
         * @param e 事件对象
         * @param columnKey 需要排序的字段
         * @param order 排序的顺序 asc和desc
         */
        $scope.filterOrder = function (e, columnKey, order) {
            //阻止事件冒泡
            e.stopPropagation();
            //选择完关闭弹出层
            $scope.pop = false;
            //进行数据的重新加载
            $scope.filter.orders = [columnKey, order].join('_');
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
            console.log($scope.filter_tmp);
            angular.extend($scope.filter, $scope.filter_tmp);
            $scope.modal.hide();
            doSearch();
        }
    }]
);