appControllers.controller('applyCtrl', ['$scope', '$ionicModal', 'app',
    function ($scope, $ionicModal, app) {
        /**
         * 助学贷款和人工选课的共同controller
         */
        $scope.chosen = {};//保存选择课程三级类别的obj（obj.name obj.id）
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
            //验证用户输入
            if (!apply.categoryId) {
                app.alert('请选择您的课程意向');
                return;
            }
            if (!apply.phone) {
                app.alert('请输入联系电话');
                return;
            }
            if (apply.phone.length != 11 || isNaN(parseInt(apply.phone, 10))) {
                alert('手机号格式不正确');
                return
            }
            if (!apply.userName) {
                app.alert('请输入您的姓名');
                return;
            }
            //如果处于助学贷款页面 添加备注
            if (app.$state.is('applyLoan')) {
                apply.remark = (apply.remark || '') + '[申请助学贷款]';
            }
            app.restAPI.Apply.save(apply, function () {
                app.$state.go('applySuccess');
            }, function (response) {
                app.alert(response.data.message || '申请失败，请稍后再试');
            })
        }
    }
]);