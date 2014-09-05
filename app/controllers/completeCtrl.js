/**
 * Created by jz on 2014/9/3.
 */
app.controller('completeCtrl', ['$scope', 'app', function ($scope, app) {
    var restAPI = app.restAPI.user;

    app.getSchool().then(function (data) {
        $scope.school = data.data;
    });

    //提交完善的信息 学校信息
    $scope.submitComplete = function (schoolId) {
        if (!schoolId) {
            //todo 提醒用户未选择学校
            alert('未选择学校');
            return
        }
        var id = app.$rootScope.global.user && app.$rootScope.global.user.id;
        if (!id) {
            //todo 提醒用户未进行登录 点击确定后进入登录页面
            alert('尚未登录');
//            return
        }

        console.log('completing');
        restAPI.update({ID: 'info'}, {id: id, schooleId: schoolId}, function () {
            alert('success');
            app.$state.go('courseList');
        },function(){
            //todo error message
            alert('error')
        })
    }
}]);
