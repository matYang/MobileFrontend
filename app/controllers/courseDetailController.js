'use strict';
appControllers.controller('courseDetailCtrl', ['$scope','app', function($scope,app) {
    var Courses = app.restAPI.courses;
    var course_id = $state.params.id;
    $scope.title = '课程详情';
    $scope.doRefresh = function(){
        Courses.get({ID:course_id},function(data){
            $scope.course = data;
        },function(){
            //error
        })
    };
    $scope.doRefresh();

}]);
