import React, {Component} from 'react';
// 引入 ECharts 主模块
import echarts from 'echarts/lib/echarts';
// 引入柱状图
import 'echarts/lib/chart/gauge';


import styles from './index.less';


let option = {
    backgroundColor: '#1b1b1b',
    tooltip: {
        formatter: '{a} <br/>{c} {b}'
    },
    toolbox: {
        show: true,
        feature: {
            mark: {show: true},
            restore: {show: true},
            saveAsImage: {show: true}
        }
    },
    series: [
        {
            name: '速度',
            type: 'gauge',
            min: 0,
            max: 220,
            splitNumber: 11,
            radius: '100%',
            axisLine: {            // 坐标轴线
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: [[0.09, 'lime'], [0.82, '#1e90ff'], [1, '#ff4500']],
                    width: 3,
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            axisLabel: {            // 坐标轴小标记
                fontWeight: 'bolder',
                color: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 10
            },
            axisTick: {            // 坐标轴小标记
                length: 15,        // 属性length控制线长
                lineStyle: {       // 属性lineStyle控制线条样式
                    color: 'auto',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            splitLine: {           // 分隔线
                length: 25,         // 属性length控制线长
                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                    width: 3,
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            pointer: {           // 分隔线
                shadowColor: '#fff', //默认透明
                shadowBlur: 5
            },
            title: {
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    fontSize: 20,
                    fontStyle: 'italic',
                    color: '#fff',
                    shadowColor: '#fff', //默认透明
                    shadowBlur: 10
                }
            },
            detail: {
                backgroundColor: 'rgba(30,144,255,0.8)',
                borderWidth: 1,
                borderColor: '#fff',
                shadowColor: '#fff', //默认透明
                shadowBlur: 5,
                offsetCenter: [0, '50%'],       // x, y，单位px
                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                    fontWeight: 'bolder',
                    color: '#fff'
                }
            },
            data: [{value: 40, name: 'km/h'}]
        },
    ]
};


class EchartsTest extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('cpu'));
        // 绘制图表
        myChart.setOption(option);
    }


    render() {

        return (
            // echarts must have width and height, or nothing will happen.
            <div id="cpu" className={styles['echart-item']}/>
        );
    }
}

export default EchartsTest;
