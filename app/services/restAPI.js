'use strict';
appServices.factory('restAPI',
    ['$resource','app', function ($resource,app) {
        var api_config = {
            version: '/v2',
            resources: {
                'courses': ['/data/courses:ID.json', '/courses/:ID']
            }
        };
        var resource_maker = function (recourseName) {
            var prefix = '/api/' + app.version;
            var url = app.test_mode ? api_config.resources[recourseName][0] : prefix + api_config.resources[recourseName][1];
            return $resource(url)
        };

        return {
            'courses': resource_maker('courses')
        };
    }]
)