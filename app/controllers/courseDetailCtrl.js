'use strict';
appControllers.controller('courseDetailCtrl', ['$scope','app', function($scope,app) {
    var Courses = app.restAPI.courses;
    var course_id = app.$state.params.id;
    $scope.doRefresh = function(){
        Courses.get({ID:course_id},function(data){
            $scope.course = data;
        },function(resposne){
            //todo error
        })
    };
    $scope.doRefresh();

}]);
