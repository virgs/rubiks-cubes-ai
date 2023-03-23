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
    private readonly orientationList: FaceRotation[][];
    private readonly mutationList: FaceRotation[][];
    private readonly original: RubiksCube;
    private generationsCounter: number;

    constructor(original: RubiksCube, mutationList: FaceRotation[][], orientationList: FaceRotation[][]) {
        this.original = original;
        this.mutationList = mutationList;
        this.orientationList = orientationList;
        this.generationsCounter = 0;
    }

    public createNextGeneration(oldGenerationResults?: Chromosome[]): Chromosome[] {
        ++this.generationsCounter;
        if (!oldGenerationResults) {
            return this.createNewPopulationFromScratch();
        }
        //less first
        const sorted = oldGenerationResults
            .sort((first, second) => {
                const diff: number = first.score - second.score;
                if (diff === 0) {
                    return first.genes.length - second.genes.length;
                }
                return diff;
            });

        if (this.generationsCounter % GeneticAlgorithmConfig.armageddonThreshold === 0) {
            console.log(`armageddon. best: ${sorted[0].score}/${sorted[sorted.length - 1].score}, moves list: ${sorted[0].genes.length}`)
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
                genes: [],
                score: NaN,
                newGenes: new CubeScrambler(GeneticAlgorithmConfig.numberOfInitialScrambleMovements).scramble(this.original)
            }));
    }

    private reproduceCitizens(elite: Chromosome[]): Chromosome {
        const singleParent = elite[Math.floor(Math.random() * elite.length)];
        const newMutations: FaceRotation[] = [];
        const pickNewMutation = () => {
            return this.mutationList[Math.floor(Math.random() * this.mutationList.length)];
        }
        const pickNewOrientation = () => {
            return this.orientationList[Math.floor(Math.random() * this.orientationList.length)];
        }
        switch (Math.floor(Math.random() * 5)) {
            case 0:
                newMutations.push(...pickNewMutation())
                break;
            case 1:
                newMutations.push(...pickNewMutation())
                newMutations.push(...pickNewMutation())
                break;
            case 2:
                newMutations.push(...pickNewOrientation())
                newMutations.push(...pickNewMutation())
                break;
            case 3:
                newMutations.push(...pickNewOrientation())
                newMutations.push(...pickNewOrientation())
                newMutations.push(...pickNewMutation())
                break;
            case 4:
                newMutations.push(...pickNewMutation())
                break;
        }
        return {
            cube: singleParent.cube.clone(),
            genes: [...singleParent.genes.slice(0)],
            newGenes: newMutations,
            score: NaN //new borns don't have score yet
        };
    }


}