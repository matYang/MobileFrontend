/**
 * Created by jz on 2014/9/10.
 */
app.controller('courseBookingCtrl', ['app', '$scope', function (app, $scope) {
    var restAPI = app.restAPI.booking;
    $scope.id = app.$state.params.id;

    $scope.booking = {
        userId: app.$rootScope.global.user && app.$rootScope.global.user.id,
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
        restAPI.save(booking, function (data) {
            var alertPopup = app.alert('预定成功');
            alertPopup.then(function (res) {
                app.$state.go('courseDetail',{id:$scope.id})
            });
        },function(data){
            console.log('register error');
            app.alert(data.message || '预定失败');
        });
    }

}]);