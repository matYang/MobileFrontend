app.factory('tools', ['enums', function (enums) {

    return  {
        toOptions: toOptions,
        toSchoolTimeList: toSchoolTimeList
    };

    /**
     * 将value和name的键值对转换成选项的数组
     * @param obj like {<value>:<name>}
     * @returns {Array} [{label:<name>,value:<value>}]
     */
    function toOptions(obj) {
        var arr = [];
        angular.forEach(obj, function (v, k) {
            this.push({label: v, value: parseInt(k, 10)});
        }, arr);
        return arr;
    }

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