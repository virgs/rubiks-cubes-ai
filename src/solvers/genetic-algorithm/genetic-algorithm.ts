import { GeneticAlgorithmConfig } from "@/configuration";
import type { FaceRotation } from "@/engine/face-rotation";
import type { PocketCube } from "@/engine/pocket-cube";

export type Chromosome = {
    genes: FaceRotation[],
    cube: PocketCube,
    score: number
}

export class GeneticAlgorithm {
    private readonly mutationList: FaceRotation[][];
    private generationsCounter: number;

    constructor(mutationList: FaceRotation[][]) {
        this.generationsCounter = 0;
        this.mutationList = mutationList;
    }

    public createNextGeneration(oldGenerationResults: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        const elite = oldGenerationResults
            .sort((first, second) => first.score - second.score)
            .filter((_, index) => index < GeneticAlgorithmConfig.elitism);
        return Array.from(Array(GeneticAlgorithmConfig.populationPerGeneration))
            .map(() => {
                return this.createNewCitizen(elite);
            });
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private createNewCitizen(elite: Chromosome[]): Chromosome {
        // const crossOverCutIndex = Math.floor(Math.random() * first.genes.length); // No crossovers
        const citizen = elite[Math.floor(Math.random() * elite.length)];
        return {
            cube: citizen.cube.clone(),
            genes: citizen.genes.concat(this.mutationList[Math.floor(Math.random() * this.mutationList.length)]),
            score: NaN //new borns don't have score yet
        };
    }


}