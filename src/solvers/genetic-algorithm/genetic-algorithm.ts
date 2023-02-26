import { GeneticAlgorithmConfig } from "@/configuration";
import type { FaceRotation } from "@/engine/face-rotation";
import type { PocketCube } from "@/engine/pocket-cube";

export type Chromosome = {
    genes: FaceRotation[],
    cube: PocketCube,
    score: number,
    newGenes: FaceRotation[],
    goalState: number[];
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
        const sorted = oldGenerationResults
            .sort((first, second) => second.score - first.score)
        const elite = sorted
            .filter((_, index) => index < GeneticAlgorithmConfig.elitism);
        return Array.from(Array(GeneticAlgorithmConfig.populationPerGeneration))
            .map(() => this.createNewCitizen(elite));
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private createNewCitizen(elite: Chromosome[]): Chromosome {
        const singleParent = elite[Math.floor(Math.random() * elite.length)];
        const pickNewMutation = () => this.mutationList[Math.floor(Math.random() * this.mutationList.length)]
        return {
            cube: singleParent.cube.clone(),
            genes: singleParent.genes,
            goalState: [...singleParent.goalState],
            newGenes: pickNewMutation().concat(pickNewMutation().concat(pickNewMutation())),
            score: NaN //new borns don't have score yet
        };
    }


}