/**
 * Created by jz on 2014/9/3.
 */
app.controller('registerCtrl', ['$scope', 'app', 'Auth', function ($scope, app, Auth) {
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
    $scope.sendSms = function (e) {
        //仅1状态下不可点击
        if($scope.status == 1)return;
        console.log('send sms');
        //success
        $scope.status = 1;
        $scope.count = 5;
        var countdownPromise = app.$interval(function(){
            console.log($scope.count -- );
            if($scope.count <= 0 ){
                app.$interval.cancel(countdownPromise);
                $scope.status = 2;
                console.log('can retry')
            }
        },1000);
        //error
//        $scope.status = 3;


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