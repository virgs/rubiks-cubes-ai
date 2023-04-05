const fs = require('fs');

const dirName = './readme-data/reports/';
const readReports = () => {
    const filenames = fs.readdirSync(dirName)
    return filenames
        .filter(fileName => fileName.indexOf('.json') >= 0)
        .map(fileName => JSON.parse(fs.readFileSync(dirName + fileName, 'utf-8')));
}

const analyseSingleRun = report => {
    const shuffleText = report.shuffle.split(':')[1].replace(/\s+/g, ' ').trim();
    const result = algorithms
        .reduce((acc, tag) => {
            const data = report.solutions
                .find(solution => solution.key.toLowerCase() === tag.toLowerCase());
            const analysedData = {
                id: report.timestamp,
                tag: tag,
                time: data.solution.totalTime,
                visitedNodes: data.solution.data.visitedNodes || '-',
                solutionLength: data.solution.rotations.length
            };
            acc.reports.push(analysedData);
            if (tag.toLowerCase() === 'BiBFS'.toLowerCase()) {
                bestResults[report.timestamp] = {
                    ...analysedData,
                    shuffleText: shuffleText
                };
            }
            return acc;
        }, { shuffle: shuffleText, id: report.timestamp, reports: [] });

    const table =
        `#### Shuffle: \`${result.shuffle}\`\n` +
        `| Algorithm | Time | Nodes visited | Solution length |\n` +
        `| ----- | ----- | ----- | ----- |\n` +
        result.reports
            .map(result => `| ${result.tag} | ${result.time.toLocaleString()} | ${result.visitedNodes.toLocaleString()} | ${result.solutionLength.toLocaleString()} |`)
            .join('\n');

    fs.writeFileSync(dirName + 'table-' + report.timestamp + '.md', table);
    return result;
}

let bestResults = {};
const algorithms = ['IDDFS', 'IDA*', 'GA', 'SA', 'WA*', 'BiBFS'];
const reports = readReports();
const analysedExecution = reports
    .map(report => analyseSingleRun(report));
const analyseSolutionsDistribution = () => {
    const solutionLengths = Object.values(bestResults)
        .map(result => result.solutionLength)
        .sort((a, b) => a - b);
    const uniqueSolutionLengths = [...new Set(solutionLengths)];
    const table =
        `| Optimal solution moves | Appearances | Distribution |\n` +
        `| ----- | ----- | ----- | \n` +
        uniqueSolutionLengths
            .map(length => {
                const appearences = solutionLengths
                    .filter(value => value === length).length;
                return `| ${length} | ${appearences} | ${(appearences / solutionLengths.length).toFixed(2)} |`;
            })
            .join('\n')
    console.log(table)
    return table;
}

const aggregateResults = () => {
    const table =
        `| Algorithm | Time average - seconds (max, min, std. dev.) | Average time worse than the best | Visited nodes (max, min, std. dev.) | Optimal solution length ratio average | Time complexity | Spacial complexity |\n` +
        `| ----- | ----- | ----- | ----- | ----- | ----- | ----- |\n` +
        algorithms
            .map(algorithm => {
                const algorithmResults = analysedExecution
                    .map(execution => execution.reports
                        .find(report => report.tag.toLowerCase() === algorithm.toLowerCase()));
                const algorithmResultsLength = algorithmResults.length;
                const time = algorithmResults
                    .reduce((acc, item) => {
                        if (item.time > acc.max) {
                            acc.max = item.time;
                        }
                        if (item.time < acc.min) {
                            acc.min = item.time;
                        }
                        acc.sum += item.time;
                        return acc;
                    }, { max: -Infinity, min: Infinity, sum: 0 });
                const nodes = algorithmResults
                    .reduce((acc, item) => {
                        if (item.visitedNodes > acc.max) {
                            acc.max = item.visitedNodes;
                        }
                        if (item.visitedNodes < acc.min) {
                            acc.min = item.visitedNodes;
                        }
                        acc.sum += item.visitedNodes;
                        return acc;
                    }, { max: -Infinity, min: Infinity, sum: 0 });
                const lengthRatio = algorithmResults
                    .reduce((acc, item) => {
                        acc.sum += item.solutionLength;
                        acc.bestSum += bestResults[item.id].solutionLength;
                        return acc;
                    }, { sum: 0, bestSum: 0 });
                const timeRatio = algorithmResults
                    .reduce((acc, item) => {
                        acc.sum += item.time;
                        acc.bestSum += bestResults[item.id].time;
                        return acc;
                    }, { sum: 0, bestSum: 0 });

                const timeMean = time.sum / algorithmResultsLength;
                const timeStdDev = Math.sqrt(algorithmResults
                    .reduce((acc, item) => acc + Math.pow(item.time - timeMean, 2), 0) / algorithmResultsLength);
                const nodesMean = nodes.sum / algorithmResultsLength;
                const nodesStdDev = Math.sqrt(algorithmResults
                    .reduce((acc, item) => acc + Math.pow(item.visitedNodes - nodesMean, 2), 0) / algorithmResultsLength);
                return `| ${algorithm} | ${(timeMean / 1000).toLocaleString()} (${(time.max / 1000).toLocaleString()}, ${(time.min / 1000).toLocaleString()}, σ: ${(timeStdDev / 1000).toLocaleString()}) ` +
                    `| ${(timeRatio.sum / timeRatio.bestSum).toLocaleString()} ` +
                    `| ${nodesMean.toLocaleString()} (${nodes.max.toLocaleString()}, ${nodes.min.toLocaleString()}, σ: ${nodesStdDev.toLocaleString()}) ` +
                    `| ${(lengthRatio.sum / lengthRatio.bestSum).toLocaleString()} | O(branch ^ depth) | O(branch ^ depth) |`;
            })
            .join('\n');
    console.log(table);
};

analyseSolutionsDistribution();
aggregateResults()
