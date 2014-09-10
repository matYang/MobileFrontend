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
    ['$resource', 'app', function ($resource, app) {
        var api_config = {
            api_name: '/api',
            version: '/v2',
            resources: {
                //[0] is the fake api,[1] is the real api
                //RO--role ID--id OP--operate
                // Example request api: /api/v2/login /api/v2/login
                'user': ['/data/user.json?:ID:OP', '/user/:ID/:OP'],
                'courses': ['/data/courses:ID.json', '/course/:ID'],
                //预定课程
                'booking': ['/data/options/school.json', '/booking/:ID'],

                'category': ['/data/options/category.json', '/general/category'],
                'location': ['/data/options/location.json', '/general/location'],
                'school': ['/data/options/school.json', '/general/school']

            }
        };
        var prefix = api_config.api_name + api_config.version;
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
            'booking': resource_maker('booking'),
            'category': resource_maker('category'),
            'location': resource_maker('location'),
            'school': resource_maker('school'),

            'makeResourceUrl': makeResourceUrl//资源的地址
        };
    }]
)//带有缓存服务的promise服务 仅限GET请求
    .factory('promiseGet', ['$q',
        function ($q) {
            return function (param, restAPI, cacheId, cache) {
                var result, defer = $q.defer();
                //如果指定了cacheId和cache则会优先获取缓存中值
                result = cacheId && cache && cache.get(cacheId);
                if (result) {
                    defer.resolve(result);
                } else {
                    restAPI.get(param, function (data) {
                        if (cacheId && cache) {
                            cache.put(cacheId, data);
                        }
                        defer.resolve(data);
                    }, function (data) {
                        defer.reject(data.error);
                    });
                }
                return defer.promise;
            };
        }
    ])
    //缓存服务
    .factory('cache', ['$cacheFactory',
        function ($cacheFactory) {
            return {
                //课程分类目录的缓存 容量大小为200条记录
                category: $cacheFactory('category', {
                    capacity: 200
                }),
                location: $cacheFactory('location', {
                    capacity: 200
                })
            };
        }
    ])
    //返回课程目录数据 使用promiseGet对数据使用内存缓存
    .factory('getCategory', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function () {
                return promiseGet({}, restAPI.category, 'category', cache.category);
            };
        }
    ])
    .factory('getLocation', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function () {
                return promiseGet({}, restAPI.location, 'location', cache.location);
            };
        }
    ])
    //仅查询enabled=1的school
    .factory('getSchool', ['restAPI', 'cache', 'promiseGet',
        function (restAPI, cache, promiseGet) {
            return function (id) {
                return promiseGet({enabled:1}, restAPI.school, null, null);
            };
        }
    ]);