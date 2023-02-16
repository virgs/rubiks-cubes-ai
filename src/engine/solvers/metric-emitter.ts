export enum Metrics {
    ADD_CANDIDATE,
    POP_CANDIDATE,
    CHECK_SOLUTION,
    BREATHING_TIME,
    HASH_CALCULATION,
    VISISTED_LIST_CHECK
}

export class MetricEmitter {
    private readonly metricMap: Map<Metrics, number>;
    private readonly startTime: number;

    constructor() {
        this.startTime = new Date().getTime()
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

    public data(): any {
        const totalTime = Date.now() - this.startTime;
        const result: any = {
            totalTime: totalTime
        };
        for (let [key, value] of this.metricMap.entries()) {
            const metricTime = Math.trunc(1000 * value / totalTime) / 10;
            result[Metrics[key]] = `${value}ms (${metricTime}%)`
        }
        return result;
    }
}