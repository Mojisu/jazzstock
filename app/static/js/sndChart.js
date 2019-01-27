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


function calculateCumSum(data) {
    var result = [];
    var now = 0
    for (var i = 0, len = data.length; i < len; i++) {

        now = now + data[i]
        result.push(now);
    }
    return result;
}

function separatePlusMinus(data) {
    var plus = [];
    var minus = [];

    for (var i = 0, len = data.length; i < len; i++) {


        if (data[i]>0) {
            plus.push(data[i])
            minus.push(0)
        }
        else{
            minus.push(data[i])
            plus.push(0)
        }
    }
    return {
        plus:plus,
        minus:minus
   };
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

var inscumsum = calculateCumSum(ins)
var foreicumsum = calculateCumSum(forei)
var percumsum = calculateCumSum(per)

var ygcumsum = calculateCumSum(yg)
var samocumsum = calculateCumSum(samo)

var tusincumsum = calculateCumSum(tusin)
var financumsum = calculateCumSum(finan)

var nationcumsum = calculateCumSum(nation)


ins = separatePlusMinus(ins)
forei = separatePlusMinus(forei)
per = separatePlusMinus(per)
yg = separatePlusMinus(yg)
samo = separatePlusMinus(samo)
tusin = separatePlusMinus(tusin)
finan = separatePlusMinus(finan)
nation = separatePlusMinus(nation)


var dataMA5 = calculateMA(5, data_array);
var dataMA20 = calculateMA(20, data_array);
var dataMA60 = calculateMA(60, data_array);
var dataMA120 = calculateMA(120, data_array);

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
        text: data[0].STOCKNAME + '('  + data[0].STOCKCODE + ')'
    },
    legend: {
        top: 80,
        data: ['Candle', 'MA5', 'MA20', 'MA60', 'MA120']
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
        opacity: 0.1,
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
            show:false,
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
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: true},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax',
            axisPointer: {
                z: 100
            }
        },
        {
            type: 'category',
            name: '거래량',
            nameLocation:"start",
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
        // Add graph Start x-Grid
        , {

            name: '기관 ',
            nameLocation:"start",
            type: 'category',
            gridIndex: 2, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '외인',
            nameLocation:"start",
            type: 'category',
            gridIndex: 3, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '개인',
            nameLocation:"start",
            type: 'category',
            gridIndex: 4, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '연기금',
            nameLocation:"start",
            type: 'category',
            gridIndex: 5, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '사모펀드',
            nameLocation:"start",
            type: 'category',
            gridIndex: 6, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '투신',
            nameLocation:"start",
            type: 'category',
            gridIndex: 7, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '금융',
            nameLocation:"start",
            type: 'category',
            gridIndex: 8, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
            axisLabel: {show: false},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }

        , {
            name: '국가',
            nameLocation:"start",
            type: 'category',
            gridIndex: 9, // Index 를 맞춰줘야 함
            data: dates,
            scale: true,
            boundaryGap : false,
            axisLine: {onZero: true},
            axisTick: {show: false},
            splitLine: {show: true},
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
        name: 'Candle',
        data: data_array,
        itemStyle: {
            normal: {
                color: downColor,
                color0: upColor,
                borderColor: null,
                borderColor0: null
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
        name: 'MA20',
        type: 'line',
        data: dataMA20,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA60',
        type: 'line',
        data: dataMA60,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA120',
        type: 'line',
        data: dataMA120,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    },


     {
        name: '거래량',
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
        name: '기관',
        type: 'bar',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: ins.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '기관',
        type: 'bar',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: ins.minus,
        itemStyle: {
            color: upColor
        }
    }
    , {
        type: 'line',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: inscumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }




    , {
        name: '외인',
        type: 'bar',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: forei.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '외인',
        type: 'bar',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: forei.minus,
        itemStyle: {
            color: upColor
        }
    }
        , {
        type: 'line',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: foreicumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }
    , {
        name: '개인',
        type: 'bar',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: per.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '개인',
        type: 'bar',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: per.minus,
        itemStyle: {
            color: upColor
        }
    }
    , {
        type: 'line',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: percumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    , {
        name: '연기금',
        type: 'bar',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: yg.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '연기금',
        type: 'bar',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: yg.minus,
        itemStyle: {
            color: upColor
        }
    }

        , {
        type: 'line',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: ygcumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    , {
        name: '사모펀드',
        type: 'bar',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: samo.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '사모펀드',
        type: 'bar',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: samo.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: samocumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    , {
        name: '투신',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: yg.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '투신',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: yg.minus,
        itemStyle: {
            color: upColor
        }
    }

    , {
        type: 'line',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: tusincumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    , {
        name: '금융',
        type: 'bar',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: finan.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '금융',
        type: 'bar',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: finan.minus,
        itemStyle: {
            color: upColor
        }
    }

        , {
        type: 'line',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: financumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    , {
        name: '국가',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: yg.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '국가',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: yg.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nationcumsum,
        lineStyle: {
            color: '#cc2e2e',
            type:'dashed'
        }
    }

    // Add graph End
    ]
});

}