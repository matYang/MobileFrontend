appControllers.controller('applyCtrl', ['$scope', '$ionicModal', 'app',
    function ($scope, $ionicModal, app) {
        /**
         * 助学贷款和人工选课的共同controller
         */

        //保存选择课程三级类别的对obj
        $scope.chosen = {};
        $scope.apply = {
            phone: app.$rootScope.global.user && app.$rootScope.global.user.phone,
            userName: app.$rootScope.global.user && app.$rootScope.global.user.name
        };
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
            apply.categoryId = $scope.chosen.cat && $scope.chosen.cat.id;
            //todo 验证用户输入
            if (apply.categoryId === undefined) {
                app.alert('请选择您的课程意向');
                return;
            }
            if (app.$state.is('applyLoan')) {
                //如果处于助学贷款页面 添加备注
                apply.remark = (apply.remark || '') + '[申请助学贷款]';
            }
            app.restAPI.Apply.save(apply, function () {
                //todo success
                app.$state.go('applySuccess');
            }, function () {
                //todo error
            })
        }
    }
]);