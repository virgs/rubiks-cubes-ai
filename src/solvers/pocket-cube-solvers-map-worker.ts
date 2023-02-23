import { Configuration } from "@/configuration";
import type { Colors } from "@/constants/colors";
import type { FaceRotation } from "@/engine/face-rotation";
import { PocketCube } from "@/engine/pocket-cube";
import type { CubeSolver, Solution } from "./cube-solver";
import { HumanSolver, type KeyboardEvent } from "./human-solver";
import { PocketCubeAStar } from "./pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./pocket-cube-breadth-first-search";

export type SolverWorkerRequest = {
    dimension: string,
    solverTag: string,
    cube?: Colors[],
    keyboardEvent?: KeyboardEvent
};

export type SolverWorkerResponse = {
    solverTag: string,
    solution?: string,
    faceRotation?: FaceRotation,
    error?: string,
};

const solverMethodFinder = (request: SolverWorkerRequest) => {
    for (let item of Configuration.solvers) {
        if (item.dimension.toLowerCase() === request.dimension.toLowerCase()) {
            for (let solver of item.methods) {
                if (solver.key.toLowerCase() === request.solverTag.toLowerCase()) {
                    return solver;
                }
            }
            return undefined;
        }
    }
}

let solver: CubeSolver;

self.onmessage = async (event: MessageEvent<SolverWorkerRequest>) => {
    const tag = event.data.solverTag.toLowerCase();
    const solverMethod = solverMethodFinder(event.data);
    if (tag && solverMethod) {
        if (event.data.cube) {
            const cube = new PocketCube({ clone: event.data.cube });
            solver = solverMethod.instantiator(cube);
            const solution: Solution = await solver.findSolution()!;
            self.postMessage({ solution: JSON.stringify(solution), solverKey: tag });
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
