'use strict';
appControllers.controller('tuanDetailCtrl', ['$scope', 'app', function ($scope, app) {
    var Tuan = app.restAPI.groupBuy;
    var tuanId = app.$state.params.id;
    $scope.doRefresh = function () {
        Tuan.get({ID: tuanId}, function (data) {
            $scope.tuan = data;
        }, function (resposne) {
            //todo error
        })
    };
    $scope.doRefresh();

    //创建团购订单
    $scope.submitTBooking = function () {
        //判断是否登录 未登录则进入登录页面 登录后返回
        if (!app.$rootScope.global.isLogin) {
            //进入login页面 设置refer
            app.$rootScope.global.refer = {
                name:'tuanDetail',
                param:{
                    id:tuanId
                }
            };
            app.$state.go('login');
            return
        }
        var booking = {
            groupBuyActivityId: $scope.tuan.id,
            groupBuyPrice: $scope.tuan.groupBuyPrice
        };
        Tuan.save({ID: 'booking'}, booking, function () {
            app.$state.go('tuanSuccess');
        },function(){
          app.alert('系统繁忙，请稍后再次抢购~');
        });
    }

}]);
