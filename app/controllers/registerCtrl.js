/**
 * Created by jz on 2014/9/3.
 */
app.controller('registerCtrl', ['$scope', 'app', 'Auth', function ($scope, app, Auth) {
    //初始化user
    $scope.u = {};
    $scope.vcodeImg = '/api/v2/user/vcodeimg';
    //发送短信按钮的状态
    //todo 发送验证码
    //发送状态
    //按钮状态status
    //#0 点击发送 >>可点击
    //#1 发送中倒计时 重新发送 count >>不可点击
    //#2 倒计时结束 重新发送 >>可点击
    //#3 发送失败 重新发送 >>可点击

    // 正在发送 发送成功(倒计时)  发送失败
    // 重新发送
    $scope.status = 0;
    $scope.changeImg = function(){
        var url = $scope.vcodeImg;
        url = url.split('?')[0] +'?_='+(new Date()).getTime();
        $scope.vcodeImg = url;
    };
    $scope.sendSms = function (phone, vcode) {
        //todo 验证手机号
        if (!phone) {
            // An alert dialog
            app.alert('请输入手机号');
            return
        }
        if (phone.length != 11 || isNaN(parseInt(phone, 10))) {
            app.alert('手机号格式不正确');
            return
        }
        if (!vcode) {
            // An alert dialog
            app.alert('请输入图形验证码');
            return
        }

        //仅1状态下不可点击
        if ($scope.status == 1)return;
        Auth.sendSms(phone, vcode).then(function () {
            //success
            $scope.status = 1;
            $scope.count = 120;
            var countdownPromise = app.$interval(function () {
                console.log($scope.count--);
                if ($scope.count <= 0) {
                    app.$interval.cancel(countdownPromise);
                    $scope.status = 2;
                    console.log('can retry')
                }
            }, 1000);
        }, function (data) {
            app.alert(data.message || '发送失败，请稍后再试');
            $scope.status = 3;
            $scope.changeImg();
        });


    };

    //提交注册
    $scope.submitRegister = function (u) {
        //validate the all values
        if (!u.phone) {
            app.alert('请输入手机号');
            return
        }
        if (u.phone.length != 11 || isNaN(parseInt(u.phone, 10))) {
            alert('手机号格式不正确');
            return
        }
        if (!u.password) {
            app.alert('请输入密码');
            return
        }
        if (u.password.length < 6 || u.password.length > 20) {
            app.alert('密码长度不正确');
            return
        }
        if (!u.authCode) {
            app.alert('请输入验证码');
            return
        }

        Auth.register(u).then(function () {
            console.log('registering');
            var alertPopup = app.alert('恭喜！注册成功');
            alertPopup.then(function (res) {
                console.log('register success');
                app.$state.go('complete')
            });
        }, function (data) {
            console.log('register error');
            app.alert(data.message || '注册遇到问题，请稍后再试');
        });
    };


}]);