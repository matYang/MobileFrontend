'use strict';
appControllers.controller('tuanListCtrl', ['$scope', '$rootScope', '$ionicModal', 'app',
    function ($scope, $rootScope, $ionicModal, app) {
        var Tuan = app.restAPI.groupBuy;
        var pageView = app.pageService.tuan;

        $scope.page = pageView.page;

        //刷新
        var doRefresh = $scope.doRefresh = function () {
            $scope.loading = true;
            app.$scroll.resize();
            app.$scroll.scrollTop(false);

            //enabled=1 后台使用group by templateId
            Tuan.get(angular.extend({status: 1}, $scope.page)).$promise
                .then(function (data) {
                    $scope.tuans = data.data;
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
    }
]);