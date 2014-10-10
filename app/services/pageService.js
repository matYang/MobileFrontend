/**
 * Created by jz on 2014/9/4.
 */
app.service('pageService', ['app', function (app) {
    return {
        courses: {
            //该对象中主要保存的是页面的筛选和分页信息 通过对象引用在controller中使用
            page: angular.copy(app.default_page),
            filter:{}
        },
        tuan: {
            //该对象中主要保存的是页面的筛选和分页信息 通过对象引用在controller中使用
            page: angular.copy(app.one_page),
            filter:{}
        }
    };

}]);