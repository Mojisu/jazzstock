function search(data,flag) {
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

var mg = new Array;
var gm = new Array;
var cs = new Array;
var mr = new Array;
var mq = new Array;

var cl = new Array;
var ub = new Array;
var nm = new Array;
var dc = new Array;
var dw = new Array;

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

    mg.push(data[i].MG)
    gm.push(data[i].GM)
    cs.push(data[i].CS)
    mr.push(data[i].MR)
    mq.push(data[i].MQ)

    cl.push(data[i].CL)
    ub.push(data[i].UB)
    nm.push(data[i].NM)
    dc.push(data[i].DC)
    dw.push(data[i].DW)

}

var inscumsum = calculateCumSum(ins)
var foreicumsum = calculateCumSum(forei)
var percumsum = calculateCumSum(per)

var ygcumsum = calculateCumSum(yg)
var samocumsum = calculateCumSum(samo)
var tusincumsum = calculateCumSum(tusin)
var financumsum = calculateCumSum(finan)
var nationcumsum = calculateCumSum(nation)

var mgcumsum = calculateCumSum(mg)
var gmcumsum = calculateCumSum(gm)
var cscumsum = calculateCumSum(cs)
var mrcumsum = calculateCumSum(mr)
var mqcumsum = calculateCumSum(mq)

var clcumsum = calculateCumSum(cl)
var ubcumsum = calculateCumSum(ub)
var nmcumsum = calculateCumSum(nm)
var dccumsum = calculateCumSum(dc)
var dwcumsum = calculateCumSum(dw)

ins = separatePlusMinus(ins)
forei = separatePlusMinus(forei)
per = separatePlusMinus(per)
yg = separatePlusMinus(yg)
samo = separatePlusMinus(samo)
tusin = separatePlusMinus(tusin)
finan = separatePlusMinus(finan)
nation = separatePlusMinus(nation)

mg= separatePlusMinus(mg)
gm= separatePlusMinus(gm)
cs= separatePlusMinus(cs)
mr= separatePlusMinus(mr)
mq= separatePlusMinus(mq)
cl= separatePlusMinus(cl)
ub= separatePlusMinus(ub)
nm= separatePlusMinus(nm)
dc= separatePlusMinus(dc)
dw= separatePlusMinus(dw)


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

// 통합
if (flag =='merge'){

    myChart.clear();
    myChart = echarts.init(document.getElementById('chart'));
    myChart.setOption({
        animation: false,

        legend: {
            top: 400,
            left:'10%',
            align:'left',
            textStyle:{
                fontSize:14,
                fontWeight:'bold'
            },
            selected:{

            '기관':true,
            '외인':true,
            '개인':false,
            '사모펀드':true,
            '연기금':true,
            '투신':false,
            '금융':false,
            '국가':false,
            '모건':false,
            '골드만':false,
            'CS':false,
            '메릴':false,
            '맥쿼리':false,
            'CLSA':false,
            'UBS':false,
            '노무라':false,
            '도이치':false,
            '다이와':false,


            },
            data: ['기관','외인','개인',''
            ,'사모펀드','연기금','투신','금융','국가',''
            ,'모건','골드만','CS','메릴','맥쿼리',''
            ,'CLSA','UBS','노무라','도이치','다이와']
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
                top: '40',
                height: '280',
                show: true
            },
            {
                left: '10%',
                right: '8%',
                top: '320',
                height: '50',
                show: true
            }
            // Add graph Grid 위치 조정
            , {
                left: '10%',
                right: '8%',
                top: '400',
                height: '600',
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
                axisLabel: {show: false},
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
                axisLabel: {show: true},
                splitNumber: 20,
                min: 'dataMin',
                max: 'dataMax'
            }
            // Add graph Start x-Grid
            , {

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
                position: 'right',
                gridIndex: 1,
                splitNumber: 2,
                axisLabel: {
                    show: true,
                    fontSize: 10,
                },
                axisLine: {show: false},
                axisTick: {show: false},
                splitLine: {show: false}
            }
            // Add graph Start y-Grid
            , {
                scale: true,
                position: 'right',
                gridIndex: 2, // Index 를 맞춰줘야 함
                splitNumber: 2,
                axisLabel: {
                    show: true,
                    fontSize: 10,
                },
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
                xAxisIndex: [0, 1, 2],
                start: 66,
                end: 100
            },
            {
                show: true,
                xAxisIndex: [0, 1],
                type: 'slider',
                top: 0,
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
            showSymbol: false,
            data: dataMA5,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        }, {
            name: 'MA20',
            type: 'line',
            showSymbol: false,
            data: dataMA20,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        }, {
            name: 'MA60',
            type: 'line',
            showSymbol: false,
            data: dataMA60,
            smooth: true,
            lineStyle: {
                normal: {opacity: 0.5}
            }
        }, {
            name: 'MA120',
            type: 'line',
            showSymbol: false,
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
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: inscumsum,
            itemStyle: {
                color: '#DD4132',
            },
            lineStyle: {
                type:'dashed'
            }
        }
        , {
            name: '외인',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: foreicumsum,
            itemStyle: {
                color: '#00539C',
            },
            lineStyle: {
                type:'dashed'
            }
        }

            , {
            name: '개인',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: percumsum,
            itemStyle: {
                color: '#343148',
            },
            lineStyle: {
                type:'dashed'
            }
        }
        , {
            name: '연기금',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: ygcumsum,
            itemStyle: {
                color: '#FE840E',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: '사모펀드',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: samocumsum,
            itemStyle: {
                color: '#3F69AA',
            },
            lineStyle: {
                type:'dashed'
            },
        } ,

        {
            name: '투신',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: tusincumsum,
            itemStyle: {
                color: '#D5AE41',
            },
            lineStyle: {
                type:'dashed'
            },
        } ,
        {
            name: '금융',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: financumsum,
            itemStyle: {
                color: '#9C9A40',
            },
            lineStyle: {
                type:'dashed'
            }
        },
        {
            name: '국가',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: nationcumsum,
            itemStyle: {
                color: '#C48F65',
            },
            lineStyle: {
                type:'dashed'
            }
        }
            , {
            name: '모건',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: mgcumsum,
            itemStyle: {
                color: '#005960',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: '골드만',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: gmcumsum,
            itemStyle: {
                color: '#5A7247',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: 'CS',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: cscumsum,
            itemStyle: {
                color: '#B76BA3',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: '메릴',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: mrcumsum,
            itemStyle: {
                color: '#CE3175',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: '맥쿼리',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: mqcumsum,
            itemStyle: {
                color: '#006E51',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: 'CLSA',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: clcumsum,
            itemStyle: {
                color: '#9E4624',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: 'UBS',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: ubcumsum,
            itemStyle: {
                color: '#B93A32',
            },
            lineStyle: {
                type:'dashed'
            }
        }    , {
            name: '노무라',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: nmcumsum,
            itemStyle: {
                color: '#034f84',
            },
            lineStyle: {
                type:'dashed'
            }
        }, {
            name: '도이치',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: dccumsum,
            itemStyle: {
                color: '#92a8d1',
            },
            lineStyle: {
                type:'dashed'
            }
        }, {
            name: '다이와',
            type: 'line',
            smooth: true,
            showSymbol: false,
            xAxisIndex: 2, // Index 를 맞춰줘야 함
            yAxisIndex: 2, // Index 를 맞춰줘야 함
            data: dwcumsum,
            itemStyle: {
                color: '#7e4a35',
            },
            lineStyle: {
                type:'dashed'
            }
        }









        // Add graph End
        ]
    });
    }

// 기관개별
else if (flag=='ins'){

myChart.clear();
myChart = echarts.init(document.getElementById('chart'));
myChart.setOption({
    animation: false,
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
            top: '40',
            height: '280',
            show: true
        },
        {
            left: '10%',
            right: '8%',
            top: '320',
            height: '50',
            show: true
        }
        // Add graph Grid 위치 조정
        , {
            left: '10%',
            right: '8%',
            top: '400',
            height: '80',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '500',
            height: '80',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '600',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '700',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '800',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '900',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1000',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1100',
            height: '80',
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
            axisLabel: {show: false},
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
            axisLabel: {show: true},
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
            position: 'right',
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
        // Add graph Start y-Grid
        , {
            scale: true,
            position: 'right',
            gridIndex: 2, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            position: 'right',
            gridIndex: 3, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            position: 'right',
            gridIndex: 4, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 5, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 6, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 7, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 8, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {

            scale: true,
            position: 'right',
            gridIndex: 9, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
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
            top: '0',
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
        showSymbol: false,
        data: dataMA5,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA20',
        type: 'line',
        showSymbol: false,
        data: dataMA20,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA60',
        type: 'line',
        showSymbol: false,
        data: dataMA60,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA120',
        type: 'line',
        showSymbol: false,
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
        showSymbol: false,
        data: inscumsum,
        lineStyle: {
            color: '#eda944',
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
        showSymbol: false,
        data: foreicumsum,
        lineStyle: {
            color: '#eda944',
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
        showSymbol: false,
        data: percumsum,
        lineStyle: {
            color: '#eda944',
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
        showSymbol: false,
        data: ygcumsum,
        lineStyle: {
            color: '#eda944',
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
        showSymbol: false,
        data: samocumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '투신',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: tusin.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '투신',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: tusin.minus,
        itemStyle: {
            color: upColor
        }
    }

    , {
        type: 'line',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: tusincumsum,
        lineStyle: {
            color: '#eda944',
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
        showSymbol: false,
        data: financumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '국가',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nation.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '국가',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nation.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: nationcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    // Add graph End
    ]
});

}

else {

myChart.clear();
myChart = echarts.init(document.getElementById('chart'));
myChart.setOption({
    animation: false,
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
            top: '40',
            height: '280',
            show: true
        },
        {
            left: '10%',
            right: '8%',
            top: '320',
            height: '50',
            show: true
        }
        // Add graph Grid 위치 조정
        , {
            left: '10%',
            right: '8%',
            top: '400',
            height: '80',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '500',
            height: '80',
            show: true
        }

        , {
            left: '10%',
            right: '8%',
            top: '600',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '700',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '800',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '900',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1000',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1100',
            height: '80',
            show: true
        }

               , {
            left: '10%',
            right: '8%',
            top: '1200',
            height: '80',
            show: true
        }


        , {
            left: '10%',
            right: '8%',
            top: '1300',
            height: '80',
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
            axisLabel: {show: false},
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
            axisLabel: {show: true},
            splitNumber: 20,
            min: 'dataMin',
            max: 'dataMax'
        }
        // Add graph Start x-Grid
        , {

            name: '모건',
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
            name: '골드만',
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
            name: 'CS',
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
            name: '메릴린치',
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
            name: '맥쿼리',
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
            name: 'CLSA',
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
            name: '유비에스',
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
            name: '노무라',
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
        }        , {
            name: '도이치',
            nameLocation:"start",
            type: 'category',
            gridIndex: 10, // Index 를 맞춰줘야 함
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
        }        , {
            name: '다이와',
            nameLocation:"start",
            type: 'category',
            gridIndex: 11, // Index 를 맞춰줘야 함
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
            position: 'right',
            gridIndex: 1,
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }
        // Add graph Start y-Grid
        , {
            scale: true,
            position: 'right',
            gridIndex: 2, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            position: 'right',
            gridIndex: 3, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }

        , {
            scale: true,
            position: 'right',
            gridIndex: 4, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 5, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 6, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 7, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {
            scale: true,
            position: 'right',
            gridIndex: 8, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {

            scale: true,
            position: 'right',
            gridIndex: 9, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {

            scale: true,
            position: 'right',
            gridIndex: 10, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
            axisLine: {show: false},
            axisTick: {show: false},
            splitLine: {show: false}
        }


        , {

            scale: true,
            position: 'right',
            gridIndex:11, // Index 를 맞춰줘야 함
            splitNumber: 2,
            axisLabel: {
                show: true,
                fontSize: 10,
            },
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
            xAxisIndex: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
            start: 66,
            end: 100
        },
        {
            show: true,
            xAxisIndex: [0, 1],
            type: 'slider',
            top: '0',
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
        showSymbol: false,
        data: dataMA5,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA20',
        type: 'line',
        showSymbol: false,
        data: dataMA20,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA60',
        type: 'line',
        showSymbol: false,
        data: dataMA60,
        smooth: true,
        lineStyle: {
            normal: {opacity: 0.5}
        }
    }, {
        name: 'MA120',
        type: 'line',
        showSymbol: false,
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
        name: '모건',
        type: 'bar',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: mg.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '모건',
        type: 'bar',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        data: mg.minus,
        itemStyle: {
            color: upColor
        }
    }
    , {
        type: 'line',
        xAxisIndex: 2, // Index 를 맞춰줘야 함
        yAxisIndex: 2, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: mgcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }




    , {
        name: '골드만',
        type: 'bar',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: gm.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '골드만',
        type: 'bar',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        data: gm.minus,
        itemStyle: {
            color: upColor
        }
    }
        , {
        type: 'line',
        xAxisIndex: 3, // Index 를 맞춰줘야 함
        yAxisIndex: 3, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: gmcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }
    , {
        name: 'CS',
        type: 'bar',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: cs.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: 'CS',
        type: 'bar',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        data: cs.minus,
        itemStyle: {
            color: upColor
        }
    }
    , {
        type: 'line',
        xAxisIndex: 4, // Index 를 맞춰줘야 함
        yAxisIndex: 4, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: cscumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '메릴린치',
        type: 'bar',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: mr.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '연기금',
        type: 'bar',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        data: mr.minus,
        itemStyle: {
            color: upColor
        }
    }

        , {
        type: 'line',
        xAxisIndex: 5, // Index 를 맞춰줘야 함
        yAxisIndex: 5, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: mrcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '맥쿼리',
        type: 'bar',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: mq.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '맥쿼리',
        type: 'bar',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        data: mq.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 6, // Index 를 맞춰줘야 함
        yAxisIndex: 6, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: mqcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: 'CLSA',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: cl.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: 'CLSA',
        type: 'bar',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        data: cl.minus,
        itemStyle: {
            color: upColor
        }
    }

    , {
        type: 'line',
        xAxisIndex: 7, // Index 를 맞춰줘야 함
        yAxisIndex: 7, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: clcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '유비에스',
        type: 'bar',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: ub.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '유비에스',
        type: 'bar',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        data: ub.minus,
        itemStyle: {
            color: upColor
        }
    }

        , {
        type: 'line',
        xAxisIndex: 8, // Index 를 맞춰줘야 함
        yAxisIndex: 8, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: ubcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '노무라',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nm.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '노무라',
        type: 'bar',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        data: nm.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 9, // Index 를 맞춰줘야 함
        yAxisIndex: 9, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: nmcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '도이치',
        type: 'bar',
        xAxisIndex: 10, // Index 를 맞춰줘야 함
        yAxisIndex: 10, // Index 를 맞춰줘야 함
        data: dc.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '도이치',
        type: 'bar',
        xAxisIndex: 10, // Index 를 맞춰줘야 함
        yAxisIndex: 10, // Index 를 맞춰줘야 함
        data: dc.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 10, // Index 를 맞춰줘야 함
        yAxisIndex: 10, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: dccumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    , {
        name: '다이와',
        type: 'bar',
        xAxisIndex: 11, // Index 를 맞춰줘야 함
        yAxisIndex: 11, // Index 를 맞춰줘야 함
        data: dw.plus,
        itemStyle: {
            color: downColor
        }
    }


    , {
        name: '다이와',
        type: 'bar',
        xAxisIndex: 11, // Index 를 맞춰줘야 함
        yAxisIndex: 11, // Index 를 맞춰줘야 함
        data: dw.minus,
        itemStyle: {
            color: upColor
        }
    }

            , {
        type: 'line',
        xAxisIndex: 11, // Index 를 맞춰줘야 함
        yAxisIndex: 11, // Index 를 맞춰줘야 함
        showSymbol: false,
        data: dwcumsum,
        lineStyle: {
            color: '#eda944',
            type:'dashed'
        }
    }

    // Add graph End
    ]
});

}
}