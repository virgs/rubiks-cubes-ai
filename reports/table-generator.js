const fs = require('fs');

const dirName = './reports/';
const readReports = () => {
    const filenames = fs.readdirSync(dirName)
    return filenames
        .filter(fileName => fileName.indexOf('.json') >= 0)
        .map(fileName => JSON.parse(fs.readFileSync(dirName + fileName, 'utf-8')));
}

let bestResults = {};
const algorithms = ['IDDFS', 'IDA*', 'GA', 'SA', 'WA*', 'BiBFS'];
const analyseSingleRun = report => {
    const shuffleText = report.shuffle.split(':')[1].replace(/\s+/g, ' ').trim();
    const result = algorithms
        .reduce((acc, tag) => {
            const data = report.solutions
                .find(solution => solution.key.toLowerCase() === tag.toLowerCase());
            const analysedData = {
                tag: tag,
                time: Math.trunc(data.solution.totalTime),
                visitedNodes: data.solution.data.visitedNodes || '-',
                solutionLength: data.solution.rotations.length
            };
            acc.reports.push(analysedData);
            if (tag.toLowerCase() === 'BiBFS'.toLowerCase()) {
                bestResults[report.timestamp] = analysedData;
            }
            return acc;
        }, { shuffle: shuffleText, id: report.timestamp, reports: [] });

    // const table =
    //     `#### Shuffle: \`${result.shuffle}\`\n` +
    //     `| Algorithm | Time | Nodes visited | Solution length |\n` +
    //     `| ----- | ----- | ----- | ----- |\n` +
    //     result.reports
    //         .map(result => `| ${result.tag} | ${result.time} | ${result.visitedNodes} | ${result.solutionLength} |`)
    //         .join('\n');

    // fs.writeFileSync(dirName + report.timestamp + '-table.md', table);
    return result;
}

const reports = readReports();
const analysedReports = reports
    .map(report => analyseSingleRun(report));

const aggregateResults = () => {
    const table =
        `| Algorithm | Time average (max, min, std. dev.) | Visited nodes (max, min, std. dev.) | Optimal solution length ratio average |\n` +
        `| ----- | ----- | ----- | ----- |\n` +
        algorithms
            .map(algorithm => {
                const algorithmResults = analysedReports.reports
                    .filter(report => report.tag.toLowerCase() === algorithm.toLowerCase());
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
                        acc.sum += item.solutionLength / bestResults.solutionLength;
                        return acc;
                    }, { sum: 0 }) / algorithmResultsLength;
                return `| ${algorithm} | ${(time / algorithmResultsLength).toFixed(2)} (${time.max.toFixed(2)}, ${time.min.toFixed(2)} -) | ${(nodes.sum / algorithmResultsLength).toFixed(2)} (${nodes.max}, ${nodes.min} -) | ${lengthRatio.toFixed(2)} |`;
            })
            .join('\n');
    console.log(table);
};

// console.log(analysedReports[0])
aggregateResults()
