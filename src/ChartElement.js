import React, { memo, useEffect, useState } from 'react';
import Chart from 'chart.js/auto';
import { CategoryScale } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from 'styled-components';

import * as CheckupAPI from './api/CheckupAPI';
import { getRandomRGB } from './utils';

const ChartElement = ({ date }) => {
    const mockData = [
        {
            type: 'line',
            label: 'WBC',
            borderColor: 'rgb(54, 162, 235)',
            borderWidth: 2,
            data: [
                { x: '2022-01-02', y: 15 },
                { x: '2022-09-02', y: 8 },
                { x: '2022-10-02', y: 20 },
                { x: '2022-11-02', y: 10 },
            ],
        },
        {
            type: 'line',
            label: 'RBC',
            borderColor: 'rgb(75, 192, 192)',
            borderWidth: 2,
            data: [
                { x: '2022-01-02', y: 20 },
                { x: '2022-09-02', y: 5 },
                { x: '2022-10-02', y: 30 },
                { x: '2022-11-02', y: 5 },
            ],
        },
        /* {
                type: 'bar',
                label: 'Dataset 2',
                backgroundColor: 'rgb(255, 99, 132)',
                data: [
                    { x: 'January', y: 14 },
                    { x: 'February', y: 20 },
                    { x: 'March', y: 32 },
                    { x: 'April', y: 41 },
                    { x: 'May', y: 15 },
                    { x: 'June', y: 26 },
                ],
                borderColor: 'red',
                borderWidth: 2,
            },
            {
                type: 'bar',
                label: 'Dataset 3',
                backgroundColor: 'rgb(75, 192, 192)',
                data: [
                    { x: 'January', y: 1 },
                    { x: 'February', y: 2 },
                    { x: 'March', y: 3 },
                    { x: 'April', y: 4 },
                    { x: 'May', y: 5 },
                    { x: 'June', y: 6 },
                ],
                yAxisID: 'y_sub',
            }, */
    ];

    const [chartData, setChartData] = useState();

    useEffect(() => {
        Initialize();
    }, []);

    useEffect(() => {
        console.log('====================================');
        console.log(
            `Start Date: ${date?.startDate?.toISOString().split(/[!T,?]/)[0]}`,
        );
        console.log(
            `End Date: ${date?.endDate?.toISOString().split(/[!T,?]/)[0]}`,
        );
        console.log('====================================');

        CheckupAPI.getCheckupResult().then((result) => {
            const sorted = result.sort((a, b) => {
                return a.registrationDate - b.registrationDate;
            });

            setChartData(createChartDatasets(sorted));
        });
    }, [date, setChartData]);

    const Initialize = () => {
        Chart.register(CategoryScale);
    };

    const createChartDatasets = (data) => {
        let checkupNames = [];
        let uniqueCheckupNames = [];
        let chartDatasets = [];

        for (const value of data) {
            checkupNames.push(value.checkupName);

            /* const uniqueCheckupNames = checkupNames.filter(
                (value, index, array) => {
                    return checkupNames.indexOf(value) === index;
                },
            ); */

            uniqueCheckupNames = [...new Set(checkupNames)].sort();
        }

        // data.reduce((acc, cur, index) => {}, 0);

        for (const checkupName of uniqueCheckupNames) {
            chartDatasets = [
                ...chartDatasets,
                {
                    type: 'line',
                    label: checkupName,
                    borderColor: getRandomRGB(),
                    borderWidth: 2,
                    data: [],
                },
            ];
        }

        let labelTable = {};

        for (const index in chartDatasets) {
            labelTable = {
                [index]: {
                    label: chartDatasets[index].label,
                },
            };
        }

        console.log(labelTable);

        data.reduce((acc, cur, index) => {
            console.log(acc);
            console.log(chartDatasets[acc]);
            if (cur.checkupName === chartDatasets[acc].label) {
                console.log(cur.checkupName);
            }

            acc++;

            return;
        }, 0);

        for (const checkupResult of data) {
            // chartDatasets[0].type = 'bar';

            data.findIndex();
        }

        /* for (let i = 0; i < data.length; i++) {
            for (let j = 0; j < uniqueCheckupNames.length; j++) {
                if (uniqueCheckupNames[j] === data[i].checkupName) {
                    chartDatasets.data = {
                        ...chartDatasets.data,
                        x: data[i].registrationDate,
                        y: data[i].resultValue,
                    };
                } else {
                    chartDatasets = [
                        ...chartDatasets,
                        {
                            type: 'line',
                            label: data[i].checkupName,
                            borderColor: getRandomRGB(),
                            borderWidth: 2,
                            data: [],
                        },
                    ];
                }
            }
        } */

        console.log(chartDatasets);

        return chartDatasets;
    };

    const data = {
        datasets: chartData ? chartData : [],
    };

    const options = {
        spanGaps: true,
        maxBarThickness: 30,
        grouped: true,
        interaction: {
            mode: 'index',
        },
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    usePointStyle: false,
                    padding: 10,
                    font: {
                        family: "'Noto Sans KR', 'serif'",
                        lineHeight: 1,
                    },
                },
            },
            tooltip: {
                backgroundColor: 'rgba(124, 35, 35, 0.4)',
                padding: 10,
                bodySpacing: 5,
                bodyFont: {
                    font: {
                        family: "'Noto Sans KR', sans-serif",
                    },
                },
                usePointStyle: true,
                filter: (item) => item.parsed.y !== null,
                callbacks: {
                    title: (context) => context[0].label + '💙',
                    label: (context) => {
                        let label = context.dataset.label + '' || '';

                        return context.parsed.y !== null
                            ? `${label}: ${context.parsed.y} [${'10 / -'}]`
                            : null;
                    },
                },
            },
        },
        maintainAspectRatio: false,
        responsive: true,
        onClick: (event, element) => {
            console.log(element);
        },
        scales: {
            x: {
                afterTickToLabelConversion: (scaleInstance) => {
                    const ticks = scaleInstance.ticks;

                    const newTicks = ticks.map((tick) => {
                        return {
                            ...tick,
                            label: tick.label + '🎵',
                        };
                    });

                    scaleInstance.ticks = newTicks;
                },
                grid: {
                    display: false,
                    drawTicks: true,
                    tickLength: 4,
                    color: '#E2E2E230',
                },
                axis: 'x',
                position: 'bottom',
                ticks: {
                    minRotation: 0,
                    padding: 10,
                },
            },
            y: {
                type: 'linear',
                grid: {
                    color: '#E2E2E230',
                },
                axis: 'y',
                display: true,
                position: 'left',
                title: {
                    display: false,
                    align: 'end',
                    color: '#808080',
                    font: {
                        size: 12,
                        family: "'Noto Sans KR', sans-serif",
                        weight: 300,
                    },
                    text: '단위: 배',
                },
                afterDataLimits: (scale) => {
                    scale.max = scale.max * 1.2;
                },
            },
            y_sub: {
                display: false,
                position: 'right',
                title: {
                    display: false,
                    align: 'end',
                    color: '#808080',
                    font: {
                        size: 12,
                        family: "'Noto Sans KR', sans-serif",
                        weight: 300,
                    },
                    text: '단위: 배',
                },
                afterDataLimits: (scale) => {
                    scale.max = scale.max * 1.2;
                },
            },
        },
    };

    return (
        <Container>
            <Line type='line' data={data} options={options} />
        </Container>
    );
};

const Container = styled.div`
    width: 90vw;
    max-width: 900px;
`;

export default memo(ChartElement);
