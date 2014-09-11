app.factory('tools', ['enums', function (enums) {

    return  {
        toSchoolTimeList: toSchoolTimeList
    };

    function toSchoolTimeList(val,textEnum) {
        //value = 1 or += 2 or += 4
        var list = [];
        if(textEnum === undefined){//the default value
            textEnum = [1,2,4];
        }
        angular.forEach(textEnum, function (v, k) {//k is the number value in schooltimeDay
            if ((k & val ) !== 0)
                list.push(parseInt(k));
        }, list);
        if(list.join()==='')
            return undefined;
        return list;
    }
}]);