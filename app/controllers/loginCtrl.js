/**
 * Created by jz on 2014/9/3.
 */
app.controller('loginCtrl', ['$scope', 'app','Auth', function ($scope, app,Auth) {
    $scope.submitLogin = function(user){
        Auth.login(user).then(function(){
            //在auth service中已设置了全局的登录信息global.user和global.isLogin 此部分仅处理业务逻辑

        },function(){

        });
    }
}]);