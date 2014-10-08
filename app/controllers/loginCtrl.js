/**
 * Created by jz on 2014/9/3.
 */
app.controller('loginCtrl', ['$scope', 'app', 'Auth', function ($scope, app, Auth) {
    $scope.submitLogin = function (u) {
        if (!u.accountIdentifier) {
            app.alert('请输入用户名');
            return
        }
        if (!u.password) {
            app.alert('请输入密码');
            return
        }
        Auth.login(u).then(function () {
            //在auth service中已设置了全局的登录信息global.user和global.isLogin 此部分仅处理业务逻辑
            app.$state.go('list.tuan')
        }, function (data) {
            app.alert(data.message || '登录失败');
        });
    }
}]);