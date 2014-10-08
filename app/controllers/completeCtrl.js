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
            app.alert('未选择学校');
            return
        }
        var id = app.$rootScope.global.user && app.$rootScope.global.user.id;
        if (!(id && id > 0)) {
            var alertPopup = app.alert('您尚未登录');
            alertPopup.then(function (res) {
                app.$state.go('login')
            });
            return
        }
        restAPI.update({ID: id}, {id: id, schoolId: schoolId}, function () {
            //更新本地的用户信息schoolId
            app.$rootScope.global.user.schoolId = schoolId;
//            var alertPopup = app.alert('绑定成功');
//            alertPopup.then(function (res) {
//                app.$window.location.href = 'http://www.ishangke.cn';
            app.$state.go('list.tuan');
//            });
        }, function (reponse) {
            app.alert(reponse.data.message && '绑定失败，请稍后再试');
        })
    }
}]);