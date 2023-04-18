import { SimulatedAnnealingConfig } from "@/configuration";

export type Candidate = {
    actions: number[];
    score: number;
}

export class SimulatedAnnealing {
    private readonly temperatureDecreaseRate: number = .5;

    private readonly numOfActions: number;
    private temperature: number = 10000;
    private currentBest: Candidate;
    private iterationCounter: number = 0;

    public constructor(numOfActions: number) {
        this.numOfActions = numOfActions;
        this.currentBest = {
            actions: [],
            score: NaN,
        };
    }

    public iterate(previousIterationResult?: Candidate): Candidate {
        ++this.iterationCounter;
        if (!previousIterationResult) {
            previousIterationResult = this.currentBest;
        }

        if (this.iterationCounter % 50000 === 0) {
            this.adjustTemperature();
        }

        const deltaResult = previousIterationResult.score - this.currentBest!.score;
        if (deltaResult > 0) {
            this.updateTheBest(previousIterationResult)
        } else if (deltaResult < 0) {
            const chance = Number(Math.exp(deltaResult / (this.temperature)).toPrecision(5));
            if (Math.random() < chance) {
                this.updateTheBest(previousIterationResult)
                // this.adjustTemperature();
            }
        }
        return this.disturbCandidate();
    }

    public getIterationCounter(): number {
        return this.iterationCounter;
    }
    private updateTheBest(previousIterationResult: Candidate) {
        this.currentBest = previousIterationResult;
        console.log(this.currentBest);
    }

    private disturbCandidate(): Candidate {
        return {
            actions: [...this.currentBest.actions].concat(this.createAction(this.currentBest.actions[this.currentBest.actions.length - 1])),
            score: NaN
        };
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
        console.log(this.currentBest, this.temperature.toFixed(3), Number(Math.exp(-1 / (this.temperature)).toPrecision(5)));
    }
}
