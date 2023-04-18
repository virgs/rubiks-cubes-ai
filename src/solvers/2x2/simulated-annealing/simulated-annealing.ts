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
    private iterationCounter: number = 0;

    public constructor(numOfActions: number) {
        this.numOfActions = numOfActions;
    }

    public iterate(results?: Candidate[]): Candidate[] {
        ++this.iterationCounter;
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

    public getIterationCounter(): number {
        return this.iterationCounter;
    }

    private createNewPopulationFromScratch(): Candidate[] {
        return Array.from(new Array(this.population))
            .map(() => ({
                actions: Array.from(new Array(this.numOfRotations))
                    .map((_, index, array) => this.createAction(array[index - 1])),
                score: NaN,
            }));
    }

    private disturbCandidate(candidate: Candidate): Candidate[] {
        this.lastResult = candidate;
        return Array.from(Array(this.population - 1))
            .map(() => {
                const newAction = candidate.actions
                    .map((action, index, array) => {
                        if (Math.random() < this.temperature) {
                            return this.createAction(array[index - 1]);
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

    private createAction(previousActionIndex: number): number {
        let nextActionIndex;
        let cancelsPreviousAction;
        do {
            nextActionIndex = Math.floor(Math.random() * this.numOfActions);
            const indexesDifference = nextActionIndex - previousActionIndex;
            
            cancelsPreviousAction = nextActionIndex % 2 === 0 ? indexesDifference === 1 : indexesDifference === -1; // avoid cancelling consecutive actions such as FF' or R'R
        } while (cancelsPreviousAction);
        return nextActionIndex;
    }

    private adjustTemperature() {
        this.temperature *= this.temperatureDecreaseRate;
        this.successCounter = 0;
    }
}