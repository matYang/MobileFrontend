'use strict';
appServices.factory('Auth',
    ['$rootScope', 'restAPI', '$q', '$location', '$log', 'app',
        function ($rootScope, restAPI, $q, $location, $log, app) {
            var auth = restAPI.user;
            return {
                checkUser: function () {
                    var self = this;
                    //sync method to check user
                    var xhr;
                    if (window.XMLHttpRequest) {
                        xhr = new window.XMLHttpRequest();//ie>8
                    } else if (window.ActiveXObject) {
                        xhr = new window.ActiveXObject("Microsoft.XMLHTTP");
                    } else {
                        return;
                    }
                    if (app.test_mode) {
                        xhr.open('GET', '/data/user.json', false);
                    } else {
                        xhr.open('GET', restAPI.makeResourceUrl('user') + '/findSession', false);
                    }
                    xhr.setRequestHeader('content-type', 'application/json');
                    xhr.send();
                    var user;

                    try {
                        user = JSON.parse(xhr.responseText);
                    } catch (e) {
                        $log.log('checking user:parse error--no session');
                    }

                    if (user && user.id >= 0) {
                        $rootScope.global.user = user;
                        $rootScope.global.isLogin = true;
                        $log.log('checking user:session found');
                    } else {
                        $log.log('checking user:session not found');
                    }

                },
                login: function (user) {//date为登录信息对象
                    var self = this;
//                    user.remember = user.remember ? 1 : 0;
                    user.remember = 1;//手机端默认记住密码
                    //这里使用promise模式 在controller中调用login先进行以下处理流程
                    var defer = $q.defer();
                    auth.post({ID: 'login', OP: 'phone'}, user, function (result_user) {
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        $rootScope.global.user = result_user;
                        $rootScope.global.isLogin = true;
                        $log.log('login success');
                        defer.resolve(result_user);
                    }, function (response) {
                        defer.reject(response.data);
                    });
                    return defer.promise;
                },
                register: function (user) {//date为登录信息对象
                    var self = this;
                    //todo 自动确认密码
                    user = angular.copy(user);
                    user.confirmPassword = user.password;

                    //这里使用promise模式 在controller中调用login先进行以下处理流程
                    var defer = $q.defer();
                    auth.post({ID: 'registration'}, user, function (result_user) {
                        $log.log('register success');
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        $rootScope.global.user = result_user;
                        $rootScope.global.isLogin = true;
                        defer.resolve(result_user);
                    }, function (response) {
                        defer.reject(response.data)
                    });
                    return defer.promise;
                },
                logout: function () {
                    var defer = $q.defer();
                    //发送用户注销请求
                    auth.update({ID: $rootScope.global.user.id, OP: 'logout'}, {}, function () {
                        $log.log('logout success');
                    }, function (response) {
                        defer.reject(response.data)
                    });
                    $rootScope.global.user = null;
                    $rootScope.global.isLogin = false;
                    $location.path('/login');

                },
                //发送验证码
                sendSms: function (phone, vcode) {
                    var defer = $q.defer();
                    auth.get({ID: 'smsVerification', phone: phone, vcode: vcode}, function (data) {
                        $log.log('get sms success');
                        defer.resolve(data);
                    }, function (response) {
                        defer.reject(response.data)
                    });
                    return defer.promise;
                }
            }
        }]
);