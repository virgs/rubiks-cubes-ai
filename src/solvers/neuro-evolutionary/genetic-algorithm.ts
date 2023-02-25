
interface Chromosome {
    genes: number[];
    score: number
}

export class GeneticAlgorithm {
    private readonly mutationRate: number;
    private readonly populationPerGeneration: number;
    private readonly selectedPopulationPerGeneration: number;
    private lastGenerationsBestCitizenScore?: number;
    private generationsCounter: number;

    constructor(mutationRate: number, populationPerGeneration: number, selectedPopulationPerGeneration: number) {
        this.generationsCounter = 0;
        this.mutationRate = mutationRate;
        this.populationPerGeneration = populationPerGeneration;
        this.selectedPopulationPerGeneration = selectedPopulationPerGeneration;
    }

    public createNextGeneration(oldGenerationResults: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        const sorted = oldGenerationResults
            .sort((a, b) => b.score - a.score);
        const bestCitizens = sorted
            .filter((_, index) => index <= this.selectedPopulationPerGeneration);
        this.lastGenerationsBestCitizenScore = bestCitizens[0].score;
        return Array.from(Array(this.populationPerGeneration))
            .map(() => this.createNewCitizen(bestCitizens));
    }

    public getLastGenerationsBestCitizen(): number | undefined {
        return this.lastGenerationsBestCitizenScore;
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private createNewCitizen(parents: Chromosome[]): Chromosome {
        const firstParentIndex = Math.floor(Math.random() * parents.length);
        const secondParentIndex = Math.floor(Math.random() * parents.length);
        const firstParent = parents[firstParentIndex];
        const secondParent = parents[secondParentIndex];
        const crossOverCutIndex = Math.floor(Math.random() * firstParent.genes.length);
        const genes = firstParent.genes
            .map((_, index) => {
                let geneValue = firstParent.genes[index];
                if (index > crossOverCutIndex) {
                    geneValue = secondParent.genes[index];
                }
                if (Math.random() < this.mutationRate) {
                    geneValue *= Math.random() * 2 - 1;
                }
                return geneValue;
            });
        return { genes: genes, score: NaN }; //new borns don't have score yet
    }

    //Every bird is a candidate. The ones that have best fitness value (normalized) have more probability to be chosen

    //function pickOne() {
    //   let index = 0;
    //   let r = random(1);
    //   while (r > 0) {
    //     r = r - savedBirds[index].fitness;
    //     index++;
    //   }
    //   index--;
    //   let bird = savedBirds[index];
    //   let child = new Bird(bird.brain);
    //   child.mutate();
    //   return child;
    // }
}