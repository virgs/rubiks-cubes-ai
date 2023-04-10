//❯ ./node_modules/.bin/tsc ./readme-data/reports/table-generator.ts --outDir ./readme-data/reports --target es2022 -m system; node ./readme-data/reports/table-generator.js                                         ─╯
// http://localhost:5175/rubiks-cubes-ai?cube=0&methods=IDDFS,IDA*,GA,SA,WA*,BiBFS&moves=R%27,B,U%27,D%27,B%27,U%27,2B,2D,U,R,B%27,R%27,L,F,2R,L,D,B,L%27,B%27,L%27,R,2F,R,L,B,2L,R%27,U%27,D%27,B,F%27,U,R%27,
const fs = require('fs');
const readReports = () => {
    const filenames = fs.readdirSync(dirName);
    return filenames
        .filter(fileName => fileName.indexOf('.json') >= 0)
        .map(fileName => JSON.parse(fs.readFileSync(dirName + fileName, 'utf-8')));
};
const analyseSingleFileReport = (report) => {
    const shuffleText = report.shuffle.split(':')[1].replace(/\s+/g, ' ').trim();
    const result = algorithmsConstantProperties
        .reduce((acc, algorithmProperty) => {
        const algorithmResult = report
            .solutions
            .find(solution => solution.key.toLowerCase() === algorithmProperty.name.toLowerCase());
        console.log(report.solutions);
        console.log(algorithmsConstantProperties);
        console.log(algorithmResult);
        const analysedData = {
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
    const table = `#### Shuffle: \`${result.shuffle}\`\n` +
        `| Algorithm | Time | Nodes visited | Solution length |\n` +
        `| ----- | ----- | ----- | ----- |\n` +
        result.reports
            .map(result => `| ${result.tag} | ${result.time.toLocaleString()} | ${result.visitedNodes.toLocaleString()} | ${result.solutionLength.toLocaleString()} |`)
            .join('\n');
    fs.writeFileSync(dirName + 'table-' + report.timestamp + '.md', table);
    return result;
};
const analyseSolutionsDistribution = () => {
    const solutionLengths = Object.values(bestResults)
        .map(result => result.solutionLength)
        .sort((a, b) => a - b);
    const uniqueSolutionLengths = [...new Set(solutionLengths)];
    const table = `| Optimal solution size | Appearances | Distribution | ${algorithmsConstantProperties.map(name => `${name} avg times (std. dev.) `).join(' | ')} | \n` +
        `| ----- | ----- | ----- | ${algorithmsConstantProperties.map(() => ' ----- |').join('')}\n` +
        uniqueSolutionLengths
            .map(length => {
            const appearences = solutionLengths
                .filter(value => value === length).length;
            return `| ${length} | ${appearences} | ${(appearences / solutionLengths.length).toFixed(2)} | ${algorithmsConstantProperties
                .map(algorithm => {
                const algorithmResults = analysedReportFiles
                    .filter(file => file.optimalSolutionLength === length)
                    .map(file => file.reports
                    .find(report => report.tag.toLowerCase() === algorithm.name.toLowerCase()));
                const timesStatistics = getNumbersStatistics(algorithmResults.map(item => item.time));
                return `${(timesStatistics.mean / 1000).toLocaleString()}s (σ: ${(timesStatistics.stdDev / 1000).toLocaleString()}s) `;
            })
                .join(' | ')}`;
        })
            .join('\n');
    console.log(table);
    return table;
};
const aggregateResults = () => {
    const table = `| Algorithm | Time average - (std. dev.) | Average time worse than the best | Visited nodes (std. dev.) | Optimal solution length ratio average | Time complexity | Spacial complexity |\n` +
        `| ----- | ----- | ----- | ----- | ----- | ----- | ----- |\n` +
        algorithmsConstantProperties
            .map(algorithm => {
            const algorithmResults = analysedReportFiles
                .map(file => file.reports
                .find(report => report.tag.toLowerCase() === algorithm.name.toLowerCase()));
            const timesStatistics = getNumbersStatistics(algorithmResults.map(item => item.time));
            const nodesStatistics = getNumbersStatistics(algorithmResults.map(item => item.visitedNodes));
            const lengthRatio = algorithmResults
                .reduce((acc, item) => acc + item.solutionLength / bestResults[item.id].solutionLength, 0);
            const timeRatio = algorithmResults
                .reduce((acc, item) => acc + item.time / bestResults[item.id].time, 0);
            return `| ${algorithm} | ${(timesStatistics.mean / 1000).toLocaleString()}s (σ: ${(timesStatistics.stdDev / 1000).toLocaleString()}s) ` +
                `| ${(timeRatio / algorithmResults.length).toLocaleString()} ` +
                `| ${nodesStatistics.mean.toLocaleString()} (σ: ${nodesStatistics.stdDev.toLocaleString()}) ` +
                `| ${(lengthRatio / algorithmResults.length).toLocaleString()} | ${algorithm.timeComplexity} | ${algorithm.spatialComplexity} |`;
        })
            .join('\n');
    console.log(table);
};
const getNumbersStatistics = (values) => {
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
    };
};
const dirName = './readme-data/reports/';
const bestResults = {};
const algorithmsConstantProperties = [
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
        name: 'GA',
        timeComplexity: 'Constant - pre-defined',
        spatialComplexity: 'Constant - pre-defined'
    },
    {
        name: 'SA',
        timeComplexity: 'Constant - pre-defined',
        spatialComplexity: 'Constant - pre-defined'
    },
    {
        name: 'WA',
        timeComplexity: 'O(branch ^ depth)',
        spatialComplexity: 'O(branch ^ depth)'
    },
    {
        name: 'BiBFS',
        timeComplexity: 'O(2 * branch ^ (depth / 2))',
        spatialComplexity: 'O(2 * branch ^ (depth / 2))'
    },
];
const reports = readReports();
const analysedReportFiles = reports
    .map(report => analyseSingleFileReport(report));
console.log('\n\n### Report per solution length');
analyseSolutionsDistribution();
console.log('\n\n### Report per algorithm');
aggregateResults();
