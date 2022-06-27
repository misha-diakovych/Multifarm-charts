import React, { useMemo } from "react";
import './chart.scss'
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts'
import {EChartsOption} from "echarts";
import { generateRandomData } from "../../utils/getRandomChartData";
import { compactNumber } from "../../utils/compactNumber";

interface Props {
    data: any,
    field: string,
    titleText: string
}

const Chart = (props: Props) => {

    const chartData = useMemo(() => {
        if(props.data[props.field]) {
            return props.data[props.field]
                .filter((el: object) => el)
                .map((el: any) => compactNumber(+el.value))
        } else return generateRandomData(1, 300).map((el: any) => +el.value)
    }, [props.data])

    const getXAxis = useMemo(()=> {
        const dateOptions: Record<string, string> = { month: 'long', day: 'numeric' }
        if(props.data[props.field]) {
            return props.data[props.field]
                .map((el: any) => new Date(el.date).toLocaleDateString("en-US", dateOptions))
                .filter((el: object) => el)
        } else return generateRandomData(10, 300).map((el: any) => new Date(el.date).toLocaleDateString("en-US", dateOptions))
            .filter((el: any) => el)
    }, [props.data])

    const chart = useMemo<EChartsOption>(() => ({
        title: {
            text: props.titleText,
            left: "center",
            textStyle: {
                color: "white",
            }
        },
        tooltip: {
            trigger: "axis",
            backgroundColor: "#292E4E",
            textStyle: {
                color: "white",
            },
            formatter: (params:any) => {
                return `Value: ${params[0].data} <br />  Date: ${params[0].axisValue}`
            }
        },
        xAxis: {
            type: "category",
            data: getXAxis
        },
        yAxis: {
            type: "category",
            data: chartData.length
                ? chartData
                : [...generateRandomData(1, 300)].sort((a:any,b:any) => +a.value - +b.value),
            axisLabel: {
                formatter: props.field === 'aprHistory' ? '{value} %' : '{value}'
            }
        },
        series: [
            {
                data: chartData,
                type: 'line',
                smooth: true,
                lineStyle: {
                    color: "#fb4cff",
                },
                areaStyle: {
                    opacity: 0.5,
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                        {
                            offset: 0,
                            color: 'rgb(240,66,255)'
                        },
                        {
                            offset: 1,
                            color: 'rgb(42,141,150)'
                        }
                    ])
                },
            }
        ]
    }), [chartData])
    return (
        <div className="chart">
            <ReactECharts
                option={chart}
            />
        </div>
    )
}
export default Chart
