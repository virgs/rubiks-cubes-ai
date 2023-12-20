
export type Candidate = {
    actions: number[];
    score: number;
}

export class SimulatedAnnealing {
    private readonly temperatureDecreaseRate: number = .85;

    private readonly numOfActions: number;
    private temperature: number = .3450;
    private currentBest: Candidate;
    private iterationCounter: number = 0;

    public constructor(numOfActions: number) {
        this.numOfActions = numOfActions;
        this.currentBest = {
            actions: [],
            score: -Infinity,
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
            // this.adjustTemperature();
        } else if (deltaResult < 0) {
            const dieRoll = Number(Math.random().toFixed(5)) * Math.abs((deltaResult * deltaResult * deltaResult));
            if (dieRoll < this.temperature) {
                console.log(this.iterationCounter, this.temperature, deltaResult, dieRoll);
                this.updateTheBest(previousIterationResult)
                this.adjustTemperature();
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
            actions: this.currentBest.actions.concat(this.createAction(this.currentBest.actions[this.currentBest.actions.length - 1])),
            score: NaN
        };
    };

    private createAction(previousActionIndex: number): number {
        let nextActionIndex;
        let cancelsPreviousAction;
        do {
            nextActionIndex = Math.floor(Math.random() * this.numOfActions);
            const indexesDifference = Math.abs(nextActionIndex - previousActionIndex);

            cancelsPreviousAction = indexesDifference < 2; // avoid cancelling consecutive actions such as FF', R'R or 2R2R
        } while (cancelsPreviousAction);
        return nextActionIndex;
    }

    private adjustTemperature() {
        this.temperature = Number((this.temperature * this.temperatureDecreaseRate).toFixed(5));
        // console.log(this.currentBest, this.temperature.toFixed(3), Number(Math.exp(-1 / (this.temperature)).toPrecision(5)));
    }
}
