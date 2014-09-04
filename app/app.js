'use strict';

/* App Module */

var app = angular.module('app', [
    'ngResource',
    'ionic',

    'appServices',
    'appControllers',
    'appDirectives',
    'appFilters'
]);
var appServices = angular.module('appServices', ['ngResource']);
var appControllers = angular.module('appControllers', []);
var appDirectives = angular.module('appDirectives', []);
var appFilters = angular.module('appFilters', []);