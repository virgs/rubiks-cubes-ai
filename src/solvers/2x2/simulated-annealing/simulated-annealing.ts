import { SimulatedAnnealingConfig } from "@/configuration";

export type Candidate = {
    actions: number[];
    score: number;
}

export class SimulatedAnnealing {
    private readonly maxSuccessPerIteration: number = SimulatedAnnealingConfig.maxSuccessPerIteration;
    private readonly temperatureDecreaseRate: number = SimulatedAnnealingConfig.temperatureDecreaseRate;
    private readonly numOfRotations: number = SimulatedAnnealingConfig.numOfRotations;
    private readonly population: number = SimulatedAnnealingConfig.population;

    private readonly numOfActions: number;
    private temperature: number = SimulatedAnnealingConfig.initialTemperature;
    private lastResult?: Candidate;
    private successCounter: number = 0;
    private generationCounter: number = 0;

    public constructor(numOfActions: number) {
        this.numOfActions = numOfActions;
    }

    public createNextGeneration(results?: Candidate[]): Candidate[] {
        ++this.generationCounter;
        if (!results) {
            return this.createNewPopulationFromScratch();
        }
        const bestResult = results.sort((a, b) => b.score - a.score)[0];
        if (!this.lastResult) {
            return this.disturbCandidate(bestResult);
        }

        const deltaResult = bestResult.score - this.lastResult.score;
        if (deltaResult > 0) {
            ++this.successCounter;
            if (this.successCounter > this.maxSuccessPerIteration) {
                this.adjustTemperature();
            }

            return this.disturbCandidate(bestResult);
        }
        return this.disturbCandidate(this.lastResult);
    }

    public getGenerationCounter(): number {
        return this.generationCounter;
    }

    private createNewPopulationFromScratch(): Candidate[] {
        return Array.from(new Array(this.population))
            .map(() => ({
                actions: Array.from(new Array(this.numOfRotations))
                    .map(() => this.createAction()),
                score: NaN,
            }));
    }

    private disturbCandidate(candidate: Candidate): Candidate[] {
        this.lastResult = candidate;
        return Array.from(Array(this.population - 1))
            .map(() => {
                const newAction = candidate.actions
                    .map((action) => {
                        if (Math.random() < this.temperature) {
                            return this.createAction();
                        }
                        return action;
                    });
                return {
                    actions: newAction,
                    score: NaN
                };
            })
            .concat(candidate);
    };

    private createAction(): number {
        return Math.floor(Math.random() * this.numOfActions);
    }

    private adjustTemperature() {
        this.temperature *= this.temperatureDecreaseRate;
        this.successCounter = 0;
    }
}