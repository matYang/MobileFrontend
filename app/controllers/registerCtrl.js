/**
 * Created by jz on 2014/9/3.
 */
app.controller('registerCtrl', ['$scope', 'app', 'Auth', function ($scope, app, Auth) {


    $scope.sendSms = function (e) {
        alert('send sms')

        //todo 发送验证码
        //发送状态
        // 正在发送 发送成功(倒计时)  发送失败
        // 重新发送

        //    $info.html("验证码已经发送至您的手机");
//    var count_down = function (k) {
//        if (k > 0) {
//            setTimeout(function () {
//                $button.val('重新发送(' + k + '秒)');
//                count_down(k - 1);
//            }, 1000)
//        } else {
//            $button.val('重新发送');
//        }
//    };
//    count_down(120);
//    $button.prop("disabled", true).css("background", "#999");
//    setTimeout(function () {
//        $button.prop("disabled", false).css("background", "");
//    }, 120000);
    };

    //提交注册
    $scope.submitRegister = function (u) {
        //todo validate the all values

        Auth.register(u).then(function () {
            console.log('registering');
            app.$state.go('complete')
        }, function () {
            console.log('register error');
            //todo error register error
        });
    };


}]);