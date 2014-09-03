'use strict';
appServices.factory('restAPI',
    ['$resource','app', function ($resource,app) {
        var api_config = {
            version: '/v2',
            resources: {
                //[0] is the fake api,[1] is the real api
                //RO--role ID--id OP--operate
                // Example request api: /api/v2/login /api/v2/login
                'auth': ['/data/user.json?:ID:OP', '/user/:ID/:OP'],
                'courses': ['/data/courses:ID.json', '/courses/:ID']
            }
        };
        var resource_maker = function (recourseName) {
            var prefix = '/a-api/' + api_config.version;
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

        return {
            'auth': resource_maker('auth'),
            'courses': resource_maker('courses')
        };
    }]
);