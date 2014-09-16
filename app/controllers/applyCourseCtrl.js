appControllers.controller('applyCourseCtrl', ['$scope', '$ionicModal', 'app',
    function ($scope, $ionicModal, app) {
        $scope.apply = {};

        //获取分类目录
        app.getCategory().then(function (data) {
            $scope.category = data.data;
        });

        //生成modal
        $ionicModal.fromTemplateUrl('views/modal/chooseCategory.html',
            //to be a child scope of current scope
            {scope: $scope}).then(function (modal) {
                $scope.modal = modal;
                $scope.openItemFilter = function () {
                    $scope.modal.show();
                };
            });
        //modal中确认选择类别
        $scope.confirmChoose = function () {
            $scope.modal.hide();
        };
        //提交申请
        $scope.submitApply = function () {
            var apply = angular.copy($scope.apply);
            app.restAPI.Apply.save(apply, function () {
                //todo success
            }, function () {
                //todo error
            })
        }
    }
]);