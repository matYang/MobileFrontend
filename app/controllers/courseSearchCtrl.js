'use strict';
appControllers.controller('courseSearchCtrl',
    ['$scope', '$rootScope', '$ionicModal', 'app', function ($scope, $rootScope, $ionicModal, app) {
        /**
         * 用于提前进行搜索页面的搜索(确定搜索条件)
         * 搜索条件为课程列表页的前三个条件
         * 点击搜索后即修改pageService中的filter值并进入课程列表页(课程列表页使用pageService中的filter进行搜索)
         */
        var pageView = app.pageService.courses;
        $scope.options = app.options;

        $scope.filter = pageView.filter;
        //在用户确认前临时保存用户选择的信息 确认后会拷贝到filter中进行保存
        $scope.filter_tmp = angular.copy($scope.filter);

        //获取课程分类目录以及地址目录
        app.getCategory().then(function (data) {
            $scope.category = data.data;

        });
        app.getLocation().then(function (data) {
            $scope.location = data.data[0] && data.data[0].children[0] && data.data[0].children[0].children;
        });


        //1st 培训类目筛选弹出框
        $ionicModal.fromTemplateUrl('views/course-filter/course-filter-item.html',
            //to be a child scope of current scope
            {scope: $scope}).then(function (modal) {
                $scope.filterItemModal = modal;
                $scope.openItemFilter = function () {
                    //$scope.modal用于保存当前的modal 可用于判断当期是否有其它modal打开
                    $scope.modal = $scope.filterItemModal;
                    $scope.filter_tmp = angular.copy($scope.filter);
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
                    $scope.filterTimeModal.show();
                };
            });

        //modal中进行调用 筛选确认按钮 触发刷新事件
        $scope.confirm_filter = function () {
            //]直接拷贝会影响引用状态 这里先清空条件 然后重新扩展对象
            angular.forEach($scope.filter, function (v, k) {
                $scope.filter[k] = undefined;
            });
            angular.extend($scope.filter, $scope.filter_tmp);
            $scope.modal.hide();
        };
    }]
);