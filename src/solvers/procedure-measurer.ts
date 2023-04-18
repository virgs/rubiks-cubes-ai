import { Configuration } from "@/configuration";

type Call = {
    calls: number,
    elapsedTime: number,
    stack: string,
    stackSize: number
}

type ReportItem = {
    label: string;
    totalTime: number,
    totalRelativeTime: string,
    avgTimePerCall: number,
    numOfCalls: number
}


export class ProcedureMeasurer {
    private readonly map: Map<string, Call>;
    private readonly enabled: boolean;
    private measurerOverhead: number;
    private startTime?: number;
    private totalTime?: number;

    constructor(enabled: boolean = Configuration.metrics.enabled) {
        this.map = new Map();
        this.enabled = enabled;
        this.measurerOverhead = 0;
    }

    public add(label: string, method: () => any): any {
        const before = performance.now();
        if (!this.enabled) {
            return method();
        }
        const result = method();
        const after = performance.now();
        const call = this.map.get(label) || {
            elapsedTime: 0,
            calls: 0,
            stack: '',
            stackSize: 0,
        };
        call.elapsedTime += after - before;
        ++call.calls;
        this.map.set(label, call);
        this.measurerOverhead += (performance.now() - after);
        return result;
    }

    public start(): void {
        this.startTime = performance.now();
    }

    public finish(): void {
        if (this.startTime) {
            this.totalTime = performance.now() - this.startTime;
        }
    }

    public getTotalTime(): number | undefined {
        return this.totalTime;
    }

    public getData(extra?: { notMeasuredLabel?: string, measurementOverheadLabel?: string }): ReportItem[] {
        const result: ReportItem[] = [];
        if (this.totalTime) {
            let sumTimes: number = 0;

            Array.from(this.map.entries())
                .forEach(item => {
                    const [label, calls] = item;
                    sumTimes += calls.elapsedTime;
                    result.push(this.createSummary(calls.elapsedTime, calls.calls, label))
                });

            if (extra?.measurementOverheadLabel) {
                result.push(this.createSummary(this.measurerOverhead, 0, extra.measurementOverheadLabel))
                sumTimes += this.measurerOverhead;
            }
            if (extra?.notMeasuredLabel) {
                result.push(this.createSummary(this.totalTime - sumTimes, 0, extra.notMeasuredLabel))
            }
        }
        return result.sort((a, b) => b.totalTime - a.totalTime);
    }

    private createSummary(time: number, calls: number, label: string): ReportItem {
        const percentRelativeTime = 100 * time / this.totalTime!;
        const reportItem: ReportItem = {
            label,
            totalTime: time,
            totalRelativeTime: (Math.trunc(100 * percentRelativeTime) / 100) + '%',
            numOfCalls: calls,
            avgTimePerCall: time * 1.0 / (calls || 1)
        }
        return reportItem;
    }

}

