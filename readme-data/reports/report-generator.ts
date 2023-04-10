// npm i -g nodeplotlib    
// ./node_modules/.bin/tsc ./readme-data/reports/report-generator.ts --outDir ./readme-data/reports --target es2022 -m system; node ./readme-data/reports/report-generator.js ; open readme-data/reports/*.png
const fs = require('fs');
const ChartJSImage = require('chart.js-image');

type PerformanceChartData = {
    solutionLength: number[];
    statistics: Statistics[];
    label: string;
};

type FileReport = {
    shuffle: string;
    timestamp: string;
    solutions: AlgorithmReport[]
}
type AlgorithmReport = {
    key: string;
    label: string;
    solution: {
        rotations: any[];
        totalTime: number;
        data: {
            metrics?: any,
            iterations?: number,
            visitedNodes?: number
        };
    };
};

type AlgorithmConstantProperties = {
    name: string,
    timeComplexity: string,
    spatialComplexity: string
};

type AnalysedData = {
    id: string,
    tag: string,
    time: number,
    visitedNodes: number,
    solutionLength: number
}

type AnalysedReportFile = {
    shuffle: string,
    id: string,
    reports: AnalysedData[],
    optimalSolutionLength: number
}

type Statistics = {
    max: number,
    min: number,
    mean: number,
    stdDev: number
}

const createDistributionChart = async (distributionChart: { values: number[], labels: number[] }) => {
    const data: any = {
        "labels": Array.from(Array(godNumber))
            .map((_, index) => index + 1),
        "datasets": [
            {
                "label": "Distribution",
                "data": []
            },
        ]
    }
    data.labels
        .forEach(index => {
            const indexOf = distributionChart.labels.indexOf(index);
            if (indexOf >= 0) {
                data.datasets[0].data.push(distributionChart.values[indexOf] * 100);
            } else {
                data.datasets[0].data.push(0);
            }
        });
    const chart = ChartJSImage()
        .chart({
            "type": "bar",
            "data": data,
            "options": {
                "title": {
                    "display": true,
                    "text": "Optimal solution length distribution"
                },
                "scales": {
                    "xAxes": [
                        {
                            "scaleLabel": {
                                "display": true,
                                "labelString": "Solution length (QTM)"
                            }
                        }
                    ],
                    "yAxes": [
                        {
                            "stacked": true,
                            "scaleLabel": {
                                "display": true,
                                "labelString": "Distribution (%)"
                            }
                        }
                    ]
                }
            }
        }) // Line chart
        .backgroundColor('white')
        .width(800)
        .height(500);

    return chart.toFile('./readme-data/reports/distribution-chart.png');
}

const colors = ['red', 'purple', 'blue', 'orange', 'green', 'navy', 'gray'];
const createPerformanceChart = async (performanceChartData: PerformanceChartData[]) => {
    performanceChartData.reverse();
    const data = {
        labels: Array.from(Array(godNumber))
            .map((_, index) => index + 1),
        datasets: performanceChartData
            .map((performance, index) => ({
                label: performance.label,
                data: [] as number[],
                borderColor: colors[index],
                backgroundColor: 'transparent',
            }))
    };

    performanceChartData
        .forEach((performance, performanceIndex) => {
            data.labels
                .forEach(solutionLength => {
                    const indexOf = performance.solutionLength.indexOf(solutionLength);
                    if (indexOf >= 0) {
                        data.datasets[performanceIndex].data.push(performance.statistics[indexOf].mean);
                    } else {
                        data.datasets[performanceIndex].data.push(0);
                    }
                });
        })
    const chart = ChartJSImage()
        .chart({
            "type": "line",
            "data": data,
            "options": {
                legend: {
                    display: true,
                    position: 'bottom',
                    align: 'right'
                },
                "title": {
                    "display": true,
                    "text": "Algorithms performance by solution length"
                },
                scales: {
                    "xAxes": [
                        {
                            "scaleLabel": {
                                "display": true,
                                "labelString": "Solution length (QTM)"
                            }
                        }
                    ],
                    "yAxes": [
                        {
                            type: 'logarithmic',
                            "scaleLabel": {
                                "display": true,
                                "labelString": "Time average (s)"
                            },
                        }
                    ]
                }
            }
        })
        .backgroundColor('white')
        .width(800)
        .height(500);

    return chart.toFile('./readme-data/reports/performance-chart.png');
}


const readReports = (): FileReport[] => {
    const filenames = fs.readdirSync(dirName)
    return filenames
        .filter(fileName => fileName.indexOf('.json') >= 0)
        .map(fileName => JSON.parse(fs.readFileSync(dirName + fileName, 'utf-8')));
}

const analyseSingleFileReport = (report: FileReport): AnalysedReportFile => {
    const shuffleText = report.shuffle.split(':')[1].replace(/\s+/g, ' ').trim();
    const result = algorithmsConstantProperties
        .reduce((acc: AnalysedReportFile, algorithmProperty: AlgorithmConstantProperties) => {
            const algorithmResult = report
                .solutions
                .find(item => item.key.toLowerCase() === algorithmProperty.name.toLowerCase())!;
            const analysedData: AnalysedData = {
                id: report.timestamp,
                tag: algorithmProperty.name,
                time: algorithmResult.solution.totalTime,
                visitedNodes: algorithmResult.solution.data.visitedNodes || 0,
                solutionLength: algorithmResult.solution.rotations.length
            };
            acc.reports.push(analysedData);
            if (algorithmProperty.name.toLowerCase() === 'BiBFS'.toLowerCase()) {
                acc.optimalSolutionLength = analysedData.solutionLength;
                bestResults[report.timestamp] = {
                    ...analysedData,
                    shuffleText: shuffleText
                };
            }
            return acc;
        }, { shuffle: shuffleText, id: report.timestamp, reports: [], optimalSolutionLength: -1 });

    // const table =
    //     `#### Shuffle: \`${result.shuffle}\`\n` +
    //     `| Algorithm | Time | Nodes visited | Solution length |\n` +
    //     `| ----- | ----- | ----- | ----- |\n` +
    //     result.reports
    //         .map(result => `| ${result.tag} | ${result.time.toLocaleString()} | ${result.visitedNodes.toLocaleString()} | ${result.solutionLength.toLocaleString()} |`)
    //         .join('\n');


    return result;
}

const analyseSolutionsDistribution = async (analysedReportFiles: AnalysedReportFile[]) => {
    const distributionChart = {
        values: [] as number[],
        labels: [] as number[]
    }

    const solutionLengths = Object.values(bestResults)
        .map(result => result.solutionLength)
        .sort((a, b) => a - b);

    const performanceSeries: {
        [algorithm: string]: PerformanceChartData
    } = {};
    const uniqueSolutionLengths = [...new Set(solutionLengths)];
    const table =
        `| Optimal solution length | Distribution | ${algorithmsConstantProperties.map(item => `${item.name} times avg (std. dev.) `).join(' | ')} | \n` +
        `|  ----- | ----- | ${algorithmsConstantProperties.map(() => ' ----- |').join('')}\n` +
        uniqueSolutionLengths
            .map(length => {
                const appearences = solutionLengths
                    .filter(value => value === length).length;
                const distribution = (appearences / solutionLengths.length).toFixed(2);
                distributionChart.labels!.push(length);
                distributionChart.values!.push(appearences / solutionLengths.length);
                return `| ${length} | ${distribution} | ${algorithmsConstantProperties
                    .map(algorithm => {
                        const algorithmResults = analysedReportFiles
                            .filter(file => file.optimalSolutionLength === length)
                            .map(file => file.reports
                                .find(report => report.tag.toLowerCase() === algorithm.name.toLowerCase())!);
                        const timesStatistics = getNumbersStatistics(algorithmResults.map(item => item.time));
                        if (!performanceSeries[algorithm.name]) {
                            performanceSeries[algorithm.name] = {
                                label: algorithm.name,
                                statistics: [timesStatistics],
                                solutionLength: [length],
                            }
                        } else {
                            performanceSeries[algorithm.name].solutionLength!.push(length);
                            performanceSeries[algorithm.name].statistics!.push(timesStatistics);
                        }
                        return `${(timesStatistics.mean / 1000).toLocaleString()}s (σ: ${(timesStatistics.stdDev / 1000).toLocaleString()}s) `
                    })
                    .join(' | ')
                    }`;
            })
            .join('\n');
    // await createDistributionChart(distributionChart);
    // await createPerformanceChart(Object.values(performanceSeries));

    console.log(table)
    return table;
}

const aggregateResults = (analysedReportFiles: AnalysedReportFile[]) => {
    const table =
        `| Algorithm | Time average - (std. dev.) | Average times worse than the best | Visited nodes (std. dev.) | Optimal solution length ratio average | Time complexity | Spacial complexity |\n` +
        `| ----- | ----- | ----- | ----- | ----- | ----- | ----- |\n` +
        algorithmsConstantProperties
            .map(algorithm => {
                const algorithmResults = analysedReportFiles
                    .map(file => file.reports
                        .find(report => report.tag.toLowerCase() === algorithm.name.toLowerCase())!);
                const timesStatistics = getNumbersStatistics(algorithmResults.map(item => item.time));
                const nodesStatistics = getNumbersStatistics(algorithmResults.map(item => item.visitedNodes));
                const lengthRatio = algorithmResults
                    .reduce((acc, item) => acc + item.solutionLength / bestResults[item.id].solutionLength, 0)
                const timeRatio = algorithmResults
                    .reduce((acc, item) => acc + item.time / bestResults[item.id].time, 0)
                return `| ${algorithm.name} | ${(timesStatistics.mean / 1000).toLocaleString()}s (σ: ${(timesStatistics.stdDev / 1000).toLocaleString()}s) ` +
                    `| ${(timeRatio / algorithmResults.length).toLocaleString()} ` +
                    `| ${nodesStatistics.mean.toLocaleString()} (σ: ${nodesStatistics.stdDev.toLocaleString()}) ` +
                    `| ${(lengthRatio / algorithmResults.length).toLocaleString()} | ${algorithm.timeComplexity} | ${algorithm.spatialComplexity} |`;
            })
            .join('\n');
    console.log(table);
};

const getNumbersStatistics = (values: number[]): Statistics => {
    const result = values
        .reduce((acc, item) => {
            if (item > acc.max) {
                acc.max = item;
            }
            if (item < acc.min) {
                acc.min = item;
            }
            acc.sum += item;
            return acc;
        }, { max: -Infinity, min: Infinity, sum: 0 });
    const mean = result.sum / values.length;
    const stdDev = Math.sqrt(values
        .reduce((acc, item) => acc + Math.pow(item - mean, 2), 0) / values.length);
    return {
        max: result.max,
        min: result.min,
        mean: mean,
        stdDev: stdDev,
    }
}

const godNumber = 14;
const dirName = './readme-data/reports/';
const bestResults: { [propname: string]: AnalysedData & { shuffleText: string } } = {};

const algorithmsConstantProperties: AlgorithmConstantProperties[] = [
    {
        name: 'IDDFS',
        timeComplexity: 'O(branch ^ depth)',
        spatialComplexity: 'O(depth)'
    },
    {
        name: 'IDA*',
        timeComplexity: 'O(branch ^ depth)',
        spatialComplexity: 'O(depth)'
    },
    {
        name: 'SA',
        timeComplexity: 'Constant - pre-defined',
        spatialComplexity: 'Constant - pre-defined'
    },
    {
        name: 'GA',
        timeComplexity: 'Constant - pre-defined',
        spatialComplexity: 'Constant - pre-defined'
    },
    {
        name: 'WA*',
        timeComplexity: 'O(branch ^ depth)',
        spatialComplexity: 'O(branch ^ depth)'
    },
    {
        name: 'BiBFS',
        timeComplexity: 'O(2 * branch ^ (depth / 2))',
        spatialComplexity: 'O(2 * branch ^ (depth / 2))'
    },
];

const execute = async () => {
    const reports = readReports();
    const analysedReportFiles = await reports
        .map(report => analyseSingleFileReport(report));
    console.log('\n\n### Report per solution length')
    await analyseSolutionsDistribution(analysedReportFiles);
    console.log('\n\n### Report per algorithm')
    await aggregateResults(analysedReportFiles)
};

execute()
    .then(() => console.log('done'));