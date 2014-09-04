/**
 * Created by jz on 2014/9/3.
 */
app.controller('completeCtrl', ['$scope', 'app', function ($scope, app) {
    var restAPI = app.restAPI.user;
    //提交完善的信息 学校信息
    $scope.submitComplete = function (schoolId) {
        var id = app.$rootScope.global.user && app.$rootScope.global.user.id;
        if (!id) {
            //todo 提醒用户未进行登录 点击确定后进入登录页面
        }
        if (!schoolId) {
            //todo 提醒用户未选择学校
        }
        console.log('completing');
        restAPI.update({ID: 'info'}, {id: id, schooleId: schoolId}, function () {

        })

    }

}]);
