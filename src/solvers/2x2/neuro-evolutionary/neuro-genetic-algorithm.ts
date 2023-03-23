
interface Chromosome {
    genes: number[];
    score: number
}

export class NeuroGeneticAlgorithm {
    private readonly mutationRate: number;
    private readonly populationPerGeneration: number;
    private generationsCounter: number;

    constructor(mutationRate: number, populationPerGeneration: number) {
        this.generationsCounter = 0;
        this.mutationRate = mutationRate;
        this.populationPerGeneration = populationPerGeneration;
    }

    public createNextGeneration(oldGenerationResults: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        const generationResult = oldGenerationResults
            .reduce((acc, citizen) => ({
                bestScore: Math.max(acc.bestScore, citizen.score),
                score: acc.score + citizen.score,
                movesLength: acc.movesLength + citizen.genes.length
            }), { score: 0.0, movesLength: 0, bestScore: 0 });
        if (this.generationsCounter % 10 === 0) {
            console.log(`${this.generationsCounter} >. score sum: ${generationResult.score}. best: ${generationResult.bestScore}. moves length: ${generationResult.movesLength / oldGenerationResults.length}`)
        }
        const scoreNormalizedCitizen = oldGenerationResults
            .map(citizen => ({
                genes: citizen.genes,
                score: parseFloat(citizen.score.toString()) / generationResult.score
            }));
        return Array.from(Array(this.populationPerGeneration))
            .map(() => this.createNewCitizen(this.pickOne(scoreNormalizedCitizen), this.pickOne(scoreNormalizedCitizen)));
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private createNewCitizen(first: Chromosome, second: Chromosome): Chromosome {
        const crossOverCutIndex = Math.floor(Math.random() * first.genes.length);
        const genes = first.genes
            .map((_, index) => {
                let geneValue = first.genes[index];
                if (index > crossOverCutIndex) {
                    geneValue = second.genes[index];
                }
                if (Math.random() < this.mutationRate) {
                    geneValue *= Math.random() * 2 - 1;
                }
                return geneValue;
            });
        return { genes: genes, score: NaN }; //new borns don't have score yet
    }

    //No elitism. Everyone is valid <3. The ones that have best fitness value (normalized) have more probability to be chosen
    private pickOne(citizens: Chromosome[]): Chromosome {
        let index = 0;
        let controller = Math.random();
        while (controller > 0) {
            controller -= citizens[index].score;
            ++index;
        }
        --index;
        return citizens[index];
    }
}