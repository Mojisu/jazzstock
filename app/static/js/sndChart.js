function search(data) {
if(data.length ==0) {
    alert("해당 종목 데이터가 없습니다.");
    return;
}
function calculateMA(dayCount, data) {
    var result = [];
    for (var i = 0, len = data.length; i < len; i++) {
        if (i < dayCount) {
            result.push('-');
            continue;
        }
        var sum = 0;
        for (var j = 0; j < dayCount; j++) {
            sum += data[i - j][1];
        }
        result.push((sum / dayCount).toFixed(2));
    }
    return result;
}

var data_array = new Array;
var volumes = new Array;
var dates = new Array;
var ins = new Array;
var forei = new Array;
var per = new Array;
var yg = new Array;

var samo = new Array;
var tusin = new Array;

var finan = new Array;
var nation = new Array;

for(var i = 0; i <data.length; i++){
    data_array.push([data[i].OPEN, data[i].CLOSE, data[i].LOW, data[i].HIGH, data[i].VOLUME, data[i].DATE]);
    volumes.push(data[i].VOLUME);
    dates.push(data[i].DATE);
    ins.push(data[i].INS);
    forei.push(data[i].FOREI);
    per.push(data[i].PER);
    yg.push(data[i].YG)

    samo.push(data[i].SAMO)
    tusin.push(data[i].TUSIN)

    finan.push(data[i].FINAN)
    nation.push(data[i].NATION)

}

var dataMA5 = calculateMA(5, data_array);
var dataMA10 = calculateMA(10, data_array);
var dataMA20 = calculateMA(20, data_array);

var labelFont = 'bold 12px Sans-serif';
var upColor = '#0008ff';
var downColor = '#ec0000';
var myChart = echarts.init(document.getElementById('chart'));
/*
그래프 추가 필요 항목
    grid, x-axis, y-axis, series 추가
    datazoom 영역도 공유하려면 datazoom 역시 추가 필요
*/
myChart.setOption({
    animation: false,
    title: {
        left: 'center',
        text: data[0].STOCKNAME
    },
    legend: {
        top: 80,
        data: ['日K', 'MA5', 'MA10', 'MA20', 'MA30']
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            type: 'cross'
        },
        backgroundColor: 'rgba(245, 245, 245, 0.8)',
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        textStyle: {
            color: '#000'
        },
        position: function (pos, params, el, elRect, size) {
            var obj = {top: 10};
            obj[['left', 'right'][+(pos[0] < size.viewSize[0] / 2)]] = 30;
            return obj;
        }
    },
    axisPointer: {
        link: {xAxisIndex: 'all'},
        label: {
            backgroundColor: '#777'
        }
    },
    brush: {
        xAxisIndex: 'all',
        brushLink: 'all',
        outOfBrush: {
            colorAlpha: 0.1
        }
    },
    grid: [
        {
            left: '10%',
            right: '8%',
            top: '80',
            height: '300',
            show: true

        },
        {
            left: '10%',
            right: '8%',
            top: '380',
            height: '100',
            show: true
        }
        // Add graph Grid 위치 조정
        , {
            left: '10%',
            right: '8%',
            top: '480',
            height: '100',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '580',
            height: '100',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '680',
            height: '100',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '780',
            height: '100',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '880',
            height: '100',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '980',
            height: '100',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1080',
            height: '100',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1180',
            height: '100',
            show: true
        }





        // Add graph Grid End
    ],
    xAxis: [
        {
            type: 'category',
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            splitLine: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            name: 'VOLUME',
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: false},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
        // Add graph Start x-Grid
        , {
            name: 'INS ',
            type: 'category',
            gridIndex: 2, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'FOREI',
            type: 'category',
            gridIndex: 3, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : true,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'PERRRR',
            type: 'category',
            gridIndex: 4, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'YG',
            type: 'category',
            gridIndex: 5, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'SAMO',
            type: 'category',
            gridIndex: 6, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'TUSIN',
            type: 'category',
            gridIndex: 7, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'FINAN',
            type: 'category',
            gridIndex: 8, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: 'NATION',
            type: 'category',
            gridIndex: 9, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: false},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
        // Add graph End x-Grid
    ],
    yAxis: [
        {
            scale: true,
            splitArea: {
                show: true
            }
        }, {
            scale: true,
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
        // Add graph Start y-Grid
        , {
            scale: true,
            gridIndex: 2, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            gridIndex: 3, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            gridIndex: 4, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            gridIndex: 5, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            gridIndex: 6, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            gridIndex: 7, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            gridIndex: 8, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            gridIndex: 9, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {show: false},
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
        // Add graph End y-Grid
    ],
    dataZoom: [
        {
            type: 'inside',
            // 그래프 추가 될 시 x-axis index 추가
            xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9],
            start: 66,
            end: 100
        },
        {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '40',
            start: 66,
            end: 100
        }
    ],
    series: [
     {
        type: 'candlestick',
        name: '日K',
        data: data_array,
        itemStyle: {
            normal: {
                color: downColor,
                color0: upColor,
                borderColor: null,
                borderColor0: null
            },
            emphasis: {
                color: 'black',
                color0: '#444',
                borderColor: 'black',
                borderColor0: '#444'
            }
        }
    }, {
        name: 'MA5',
        type: 'line',
        data: dataMA5,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA10',
        type: 'line',
        data: dataMA10,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA20',
        type: 'line',
        data: dataMA20,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'Volume',
        type: 'bar',
        xAxisIndex: 1,
        yAxisIndex: 1,
        itemStyle: {
            normal: {
                color: '#7fbe9e'
            },
            emphasis: {
                color: '#140'
            }
        },
        data: volumes
    }
    // Add graph Start
    , {
        name: 'INS',
        type: 'bar',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: ins,
        lineStyle: {
            color: '#cc2e2e'
        }
    }
    , {
        name: 'FOREI',
        type: 'bar',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: forei,
        lineStyle: {
            color: '#cc2e2e'
        }

    }
    , {
        name: 'PER',
        type: 'bar',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: per,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    , {
        name: 'YG',
        type: 'bar',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: yg,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    , {
        name: 'SAMO',
        type: 'bar',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: samo,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    , {
        name: 'TUSIN',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: tusin,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    , {
        name: 'FINAN',
        type: 'bar',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: finan,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    , {
        name: 'NATION',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nation,
        lineStyle: {
            color: '#cc2e2e'
        }
    }

    // Add graph End
    ]
});

}