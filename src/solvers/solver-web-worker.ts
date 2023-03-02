import { Configuration } from "@/configuration";
import type { FaceRotation } from "@/engine/face-rotation";
import type { CubeSolver, Solution } from "./cube-solver";
import { HumanSolver, type KeyboardEvent } from "./human-solver";

export type SolverWorkerRequest = {
    abort?: true,
    label?: string,
    solverTag?: string,
    cube?: ArrayBuffer[],
    keyboardEvent?: KeyboardEvent
};

export type SolverWorkerResponse = {
    solverTag: string,
    solution?: string,
    faceRotation?: FaceRotation,
    error?: string,
};

const solverMethodFinder = (request: SolverWorkerRequest) => {
    for (let item of Configuration.cubeTypes) {
        if (item.label.toLowerCase() === request.label!.toLowerCase()) {
            for (let solver of item.methods) {
                if (solver.key.toLowerCase() === request.solverTag!.toLowerCase()) {
                    return solver;
                }
            }
            return undefined;
        }
    }
}

let solver: CubeSolver;

self.onmessage = async (event: MessageEvent<SolverWorkerRequest>) => {
    if (event.data.abort) {
        solver.abort();
    } else {
        const tag = event.data.solverTag!.toLowerCase();
        const solverMethod = solverMethodFinder(event.data);
        if (tag && solverMethod) {
            if (event.data.cube) {
                try {
                    solver = solverMethod.instantiator(event.data.cube);
                    const solution: Solution = await solver.findSolution()!;
                    self.postMessage({ solution: JSON.stringify(solution), solverKey: tag });
                } catch (e) {
                    console.log(`Solver '${event.data.label}.${tag}' aborted`, e)
                }
            } else if (event.data.keyboardEvent) {
                if (solver instanceof HumanSolver) {
                    const faceRotation = await (solver as HumanSolver).readKeys(event.data.keyboardEvent!);
                    if (faceRotation !== undefined) {
                        self.postMessage({ faceRotation: faceRotation, solverKey: tag });
                    }
                }
            } else {
                self.postMessage({ error: `Command for '${event.data}' not found`, solverTag: event.data.solverTag } as SolverWorkerResponse);
            }
        } else {
            self.postMessage({ error: `Solver '${event.data.solverTag}' not found`, solverTag: event.data.solverTag } as SolverWorkerResponse);
        }
    }
}
