export enum Metrics {
    ADD_CANDIDATE,
    POP_CANDIDATE,
    CHECK_SOLUTION,
    BREATHING_TIME,
    HASH_CALCULATION,
    VISISTED_LIST_CHECK,
    ADD_TO_VISISTED_LIST_CHECK,
    PERFORM_ROTATION
}

export class MetricEmitter {
    private readonly metricMap: Map<Metrics, number>;
    private startTime?: number;
    private totalTime?: number;

    constructor() {
        this.metricMap = new Map();
    }

    public add(metric: Metrics, method: () => any): any {
        const before = new Date().getTime();
        const result = method();
        const after = new Date().getTime();
        const currentValue = this.metricMap.get(metric) || 0;
        this.metricMap.set(metric, after - before + currentValue);
        return result;
    }

    public start(): void {
        this.startTime = Date.now();
    }

    public finish(): void {
        if (this.startTime) {
            this.totalTime = Date.now() - this.startTime;
        }
    }

    public getTotalTime(): number | undefined {
        return this.totalTime;
    }

    public getData(): any {
        if (this.totalTime) {
            let sumTimes: number = 0;
            const result: any = {
                totalTime: this.totalTime
            };
            for (let [metricName, time] of this.metricMap.entries()) {
                sumTimes += time;
                result[Metrics[metricName]] = this.createSummary(time);
            }
            result.NOT_MEASURED = this.createSummary(this.totalTime - sumTimes);
            return result;
        }
    }

    private createSummary(value: number): string {
        return `${value}ms (~${Math.trunc(1000 * value / this.totalTime!) / 10}%)`
    }

}

