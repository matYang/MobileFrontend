/**
 * Created by jz on 2014/9/10.
 */
app.controller('courseBookingCtrl', ['app', '$scope', function (app, $scope) {
    //该controller为子controller 父controller为courseDetail 如果直接输入地址进入booking
    //会执行父controller中的方法来获取课程详情(为异步加载) 因此如果在这里立刻输出 course为undefined(因为回调还没成功)
    //如果需要保证controller在调用时就已经加载好数据 需要在router中使用resolve
    var restAPI = app.restAPI.booking;
    $scope.id = app.$state.params.id;

    $scope.booking = {
        courseId: $scope.id,
        phone: app.$rootScope.global.user && app.$rootScope.global.user.phone,
        name: app.$rootScope.global.user && app.$rootScope.global.user.name,
        type: 1
    };

    $scope.submitBooking = function () {

        if (!$scope.booking.name) {
            app.alert('请输入姓名');
            return
        }
        var phone = $scope.booking.phone;
        if (!phone) {
            app.alert('请输入手机号');
            return
        }
        if (phone.length != 11 || isNaN(parseInt(phone, 10))) {
            alert('手机号格式不正确');
            return
        }
        var booking = angular.copy($scope.booking);
        //TODO 这里添加booking的其它信息
        booking.price = $scope.course.price;
        restAPI.save(booking, function (data) {
            var alertPopup = app.alert('预订成功');
            alertPopup.then(function (res) {
                app.$state.go('courseDetail', {id: $scope.id})
            });
        }, function (response) {
            console.log('register error');
            app.alert(response.data.message || '预订失败');
        });
    }

}]);