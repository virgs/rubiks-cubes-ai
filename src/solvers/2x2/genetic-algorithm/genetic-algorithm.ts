import { GeneticAlgorithmConfig } from "@/configuration";

export type Chromosome = {
    genes: number[],
    score: number,
}

export class GeneticAlgorithm {
    private readonly numberOfActions: number;
    private readonly numOfGenes: number;
    private generationsCounter: number;
    private armageddonCounter: number;

    constructor(actions: number, length: number) {
        this.numberOfActions = actions;
        this.numOfGenes = length;
        this.generationsCounter = 0;
        this.armageddonCounter = 0;
    }

    public createNextGeneration(oldGenerationResults?: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        if (!oldGenerationResults) {
            return this.createNewPopulationFromScratch();
        }
        if (this.generationsCounter % GeneticAlgorithmConfig.armageddonThreshold === 0) {
            console.log('Armageddon: ' + ++this.armageddonCounter);
            return this.createNextGeneration();
        }
        //greater first
        const elite = oldGenerationResults
        .sort((first, second) => second.score - first.score)
        .filter((_, index) => index < GeneticAlgorithmConfig.elitism);
        
        // const scoreSum = elite
        //     .reduce((acc, item) => acc + item.score, 0);

        // const normalizedElite = elite
        //     .map(item => ({
        //         ...item,
        //         score: (item.score) / scoreSum,
        //     }));
        return Array.from(new Array(GeneticAlgorithmConfig.populationPerGeneration))
            .map(() => this.reproduceCitizens(elite));
    }

    public getArmageddonCounter(): number {
        return this.armageddonCounter;
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private pickOne(citizens: Chromosome[], except: number[]): { chromosome: Chromosome, index: number } {
        let index;
        do {
            index = Math.floor(Math.random() * citizens.length);
        }
        while (except.includes(index))
        return { chromosome: citizens[index], index };

        // let index = 0;
        // let controller = Math.random();
        // while (controller > 0) {
        //     controller -= citizens[index].score;
        //     ++index;
        // }
        // return citizens[index - 1];
    }

    private createNewPopulationFromScratch(): Chromosome[] {
        return Array.from(new Array(GeneticAlgorithmConfig.populationPerGeneration!))
            .map(() => ({
                genes: Array.from(new Array(this.numOfGenes))
                    .map(() => Math.floor(Math.random() * this.numberOfActions)),
                score: NaN,
            }));
    }

    private reproduceCitizens(elite: Chromosome[]): Chromosome {
        const first = this.pickOne(elite, []);
        const second = this.pickOne(elite, [first.index]);
        const crossOverCutIndex = Math.floor(first.chromosome.genes.length * .25 + Math.random() * first.chromosome.genes.length * .5);
        // console.log(crossOverCutIndex, first.chromosome.genes.join(''), second.chromosome.genes.join(''))

        const newGenes = first.chromosome.genes
            .map((gene, index) => {
                let geneValue = gene;
                if (index > crossOverCutIndex) {
                    geneValue = second.chromosome.genes[index];
                }
                if (Math.random() < GeneticAlgorithmConfig.mutationRate) {
                    geneValue = Math.floor(Math.random() * this.numberOfActions);
                }
                return geneValue;
            });
        return {
            genes: newGenes,
            score: NaN //new borns don't have score yet
        };
    }


}