'use strict';
app.value('options', {
        schooltime: [
            {label: '不限', value: undefined},
            {label: '白天', value: '_3'},
            {label: '晚上', value: '_4'},
            {label: '平时白天', value: '1_3'},
            {label: '平时晚上', value: '1_4'},
            {label: '周末白天', value: '2_3'},
            {label: '周末晚上', value: '2_4'}
        ],
        startDate: [
            {label: '不限', value: undefined},
            {label: '当月', value: 0},
            {label: '下月', value: 1},
            {label: '下下月', value: 2}
        ]

    }
);