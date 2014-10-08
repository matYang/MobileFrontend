'use strict';
appControllers.controller('tuanDetailCtrl', ['$scope','app', function($scope,app) {
    var Tuan = app.restAPI.groupBuy;
    var tuanId = app.$state.params.id;
    $scope.doRefresh = function(){
        Tuan.get({ID:tuanId},function(data){
            $scope.tuan = data;
        },function(resposne){
            //todo error
        })
    };
    $scope.doRefresh();

}]);
