'use strict';
appServices.factory('Auth',
    ['$rootScope', 'restAPI', '$q', '$location', '$log', 'app',
        function ($rootScope, restAPI, $q, $location, $log, app) {
            var auth = restAPI.user;
            return {
                checkUser: function () {
                    var self = this;
//                    var defer = $q.defer();
                    //检测用户的状态（从内存中的用户信息以及调用findSession的） user的初始值为null
//                    if (!$rootScope.global.user) {
//                        auth.get({OP: 'findSession'}, function (user) {
//                            if (user && user.id >= 0) {
//                                $rootScope.global.user = user;
//                                $rootScope.global.isLogin = true;
//                                $log.log('checking user:session found');
//                            }
//                            $log.log('checking user:session not found');
//                            setTimeout(function(){
//                                defer.resolve(true);
//                            },1000);
//
//                        });
//                    } else {
//                        //已登录
//                        defer.resolve(true);
//                        $log.log('checking user:logined');
//                    }
//                    return defer.promise;

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

                    try{
                        user = JSON.parse(xhr.responseText);
                    }catch(e){
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
                    auth.post({ID: 'login',OP:'phone'}, user, function (result_user) {
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        $rootScope.global.user = result_user;
                        $rootScope.global.isLogin = true;
                        $log.log('login success');
                        defer.resolve(result_user);
                    }, function (data) {
                        //todo error::reject should just reponse with message
                        defer.reject(data && data.message || '服务器异常');
                    });
                    return defer.promise;
                },
                register: function (user) {//date为登录信息对象
                    var self = this;
                    //这里使用promise模式 在controller中调用login先进行以下处理流程
                    var defer = $q.defer();
                    auth.post({ID: 'register'}, user, function (result_user) {
                        //根据返回的用户信息设置内存中保存的用户信息 以及cookie
                        $rootScope.global.user = result_user;
                        $rootScope.global.isLogin = true;
                        $log.log('register and then login success');
                        defer.resolve(result_user);
                    }, function (data) {
                        //todo error::reject should just reponse with message
                        defer.reject(data && data.message || '服务器异常');
                    });
                    return defer.promise;
                },
                logout: function () {
                    var self = this;
                    //发送用户注销请求
                    auth.update({ID: $rootScope.global.user.id, OP: 'logout'}, {}, function () {
                        //success
                        $log.log('logout success');
                    }, function (data) { //todo should know what in 'data'
                        //todo error
                        $log.log('logout failed');
                    });
                    $rootScope.global.user = null;
                    $rootScope.global.isLogin = false;
                    $location.path('/login');

                },
                //发送验证码
                sendSms: function (phone) {
                    var defer = $q.defer();
                    auth.get({ID: 'smsVerification'},{phone:phone}, function (data) {
                        //success
                        $log.log('get sms success');
                        defer.resolve(data);
                    }, function (data) {
                        //todo error
                        $log.log('get sms failed');
                        defer.reject(data)
                    });
                    return defer.promise;
                }
            }
        }]
);