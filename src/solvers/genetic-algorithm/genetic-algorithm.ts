import { GeneticAlgorithmConfig } from "@/configuration";
import { CubeScrambler } from "@/engine/cube-scrambler";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube } from "@/engine/rubiks-cube";

export type Chromosome = {
    genes: FaceRotation[],
    cube: RubiksCube,
    score: number,
    newGenes: FaceRotation[],
}

export class GeneticAlgorithm {
    private readonly mutationList: FaceRotation[][];
    private readonly original: RubiksCube;
    private generationsCounter: number;
    private armageddonCounter: number;

    constructor(original: RubiksCube, mutationList: FaceRotation[][]) {
        this.original = original;
        this.mutationList = mutationList;
        this.generationsCounter = 0;
        this.armageddonCounter = 0;
    }

    public createNextGeneration(oldGenerationResults?: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        if (!oldGenerationResults) {
            return this.createNewPopulationFromScratch();
        }
        //less first
        const sorted = oldGenerationResults
            .sort((first, second) => {
                const diff = first.score - second.score;
                if (diff === 0) {
                    return first.genes.length - second.genes.length;
                }
                return diff;
            });
        // console.log(this.generationsCounter, sorted[0], sorted[oldGenerationResults!.length - 1])

        if (this.generationsCounter % GeneticAlgorithmConfig.armageddonThreshold === 0) {
            console.log(`armageddon. best: ${sorted[0].score}/${sorted[sorted.length - 1].score}, moves list: ${sorted[0].genes.length}, ${sorted[sorted.length - 1]}`)
            ++this.armageddonCounter;

            return this.createNewPopulationFromScratch();
        }

        const elite = sorted
            .filter((_, index) => index < GeneticAlgorithmConfig.elitism);

        return Array.from(Array(GeneticAlgorithmConfig.populationPerGeneration))
            .map(() => this.reproduceCitizens(elite));
    }

    public getGenerationsCounter(): number {
        return this.generationsCounter;
    }

    private createNewPopulationFromScratch(): Chromosome[] {
        return Array.from(new Array(GeneticAlgorithmConfig.populationPerGeneration!))
            .map(() => ({
                cube: this.original.clone(),
                genes: new CubeScrambler(5).scramble(this.original),
                score: NaN,
                newGenes: []
            }));
    }

    private reproduceCitizens(elite: Chromosome[]): Chromosome {
        const singleParent = elite[Math.floor(Math.random() * elite.length)];
        const addNewMutation = (original: FaceRotation[]) => {
            if (Math.random() < .25) {
                return original;
            }
            return original.concat(this.mutationList[Math.floor(Math.random() * this.mutationList.length)]);
        }
        return {
            cube: singleParent.cube.clone(),
            genes: [...singleParent.genes.slice(0)],
            newGenes: addNewMutation(addNewMutation(addNewMutation([]))),
            score: 999 //new borns don't have score yet
        };
    }


}