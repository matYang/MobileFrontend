'use strict';
app.value('enums', {
        //课程分类的options todo  confirm value
        classType: {
            0: 'VIP 1对1',
            1: '小班授课（小于6人）',
            2: '中班授课（6-30人）',
            3: '大班授课（30人+）'
        },
        schooltimeDay: {
            3: '白天',
            4: '晚上'
        },
        schooltimeWeek: {
            1: '平时',
            2: '周末'
        },
        //支付方式的test
        payTypeText:{
            0:'线上支付',
            1:'线下支付',
            2:'支持线上和线下'
        }


    }
);