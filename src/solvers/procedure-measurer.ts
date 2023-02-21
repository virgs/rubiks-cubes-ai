type Measurement = {
    time: number;
    calls: number
};
export class ProcedureMeasurer {
    private readonly map: Map<string, Measurement>;
    private startTime?: number;
    private totalTime?: number;

    constructor() {
        this.map = new Map();
    }

    public add(label: string, method: () => any): any {
        const before = new Date().getTime();
        const result = method();
        const after = new Date().getTime();
        const measurement = this.map.get(label) || {
            time: 0,
            calls: 0
        };
        measurement.time += after - before;
        measurement.calls++;
        this.map.set(label, measurement);
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

    public getData(notMeasuredLabel?: string): any {
        if (this.totalTime) {
            let sumTimes: number = 0;
            const result: any = {};

            Array.from(this.map.entries())
                .forEach(item => {
                    const [label, measurement] = item;
                    sumTimes += measurement.time;
                    result[label] = this.createSummary(measurement.time, measurement.calls);
                });

            if (notMeasuredLabel) {
                result[notMeasuredLabel] = this.createSummary(this.totalTime - sumTimes, 0);
            }
            return result;
        }
    }

    private createSummary(time: number, calls: number): string {
        let summary = `${time}ms (~${Math.trunc(1000 * time / this.totalTime!) / 10}%)`;
        if (calls > 0) {
            summary += `; calls: ${calls}; avg: ~${10 * Math.trunc(1000000 * time * 1.0 / calls) / 10}ns`;
        }
        return summary;
    }

}

