'use strict';
app.constant('app', { //constant 'app' assemble things like restAPI and configs
    version: 'v2',
    test_mode: !(typeof TEST_MODE === 'undefined'),//测试模式
    //默认的分页
    default_page: {
        start: 0,    // 起始记录
        count: 10,   //每页记录数
        total: 0    //记录总数
    },
    one_page: {
        start: 0,    // 起始记录
        count: 1000,   //每页记录数
        total: 0    //记录总数
    },
    errorMessage:'服务器异常'
});