/**
 * Created by jz on 2014/9/4.
 */
app.service('pageService', ['app', function (app) {
    return {
        courses: {
            page: angular.copy(app.default_page)
        }
    };

}]);