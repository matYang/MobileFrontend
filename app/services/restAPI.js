'use strict';
//$resource() has methods below
/*
 'get':    {method:'GET'}
 'save':   {method:'POST'}
 'query':  {method:'GET', isArray:true}
 'remove': {method:'DELETE'}
 'delete': {method:'DELETE'}
 新增或修改的方法:
 'post': POST
 'query': GET isArray false
 'operate': PUT
 'update': PUT
 * */
appServices.factory('restAPI',
    ['$resource','app', function ($resource,app) {
        var api_config = {
            version: '/v2',
            resources: {
                //[0] is the fake api,[1] is the real api
                //RO--role ID--id OP--operate
                // Example request api: /api/v2/login /api/v2/login
                'user': ['/data/user.json?:ID:OP', '/user/:ID/:OP'],
                'courses': ['/data/courses:ID.json', '/course/:ID']
            }
        };
        var prefix = '/m-api/' + api_config.version;
        //用于生成资源
        var resource_maker = function (recourseName) {
            var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
            var methods = {};
            if (app.test_mode) {
                //测试模式使用GET
                methods = {
                    'query': {method: 'GET', isArray: false},
                    'save': { method: 'GET' },
                    'post': { method: 'GET' },
                    'update': { method: 'GET' },
                    'operate': { method: 'GET' },
                    'delete': { method: 'GET' }
                };
            } else {
                methods = {
                    'query': {method: 'GET', isArray: false},
                    'post': { method: 'POST' },
                    'update': { method: 'PUT' },
                    'operate': { method: 'PUT' }
                };
            }
            return $resource(url, {}, methods)
        };
        //用于生成资源的地址
        var makeResourceUrl = function (resourceName) {
            return prefix + '/' + resourceName;
        };

        return {
            'user': resource_maker('user'),
            'courses': resource_maker('courses'),

            'makeResourceUrl': makeResourceUrl//资源的地址
        };
    }]
);