import type { Colors } from "@/constants/colors";
import type { FaceRotation } from "@/engine/face-rotation";
import { PocketCube } from "@/engine/pocket-cube";
import type { CubeSolver, Solution } from "./cube-solver";
import { HumanSolver, type KeyboardEvent } from "./human-solver";
import { PocketCubeAStar } from "./pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./pocket-cube-breadth-first-search";

export type SolverWorkerRequest = {
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

const solverInstantiatorMap: Map<string, (cube: PocketCube) => CubeSolver> = new Map();
solverInstantiatorMap.set(HumanSolver.getSolverTag().toLowerCase(), (cube: PocketCube) => new HumanSolver(cube));
solverInstantiatorMap.set(PocketCubeAStar.getSolverTag().toLowerCase(), (cube: PocketCube) => new PocketCubeAStar(cube));
solverInstantiatorMap.set(PocketCubeBreadthFirstSearch.getSolverTag().toLowerCase(), (cube: PocketCube) => new PocketCubeBreadthFirstSearch(cube));

const solverMap: Map<string, CubeSolver> = new Map();

self.onmessage = async (event: MessageEvent<SolverWorkerRequest>) => {
    const tag = event.data.solverTag.toLowerCase();
    if (solverInstantiatorMap.has(tag)) {
        if (event.data.cube) {
            const cube = new PocketCube({ clone: event.data.cube });
            const solver: CubeSolver = solverInstantiatorMap.get(tag)!(cube);
            solverMap.set(tag, solver);
            const solution: Solution = await solver.findSolution()!;
            self.postMessage({ solution: JSON.stringify(solution), solverKey: tag });
        } else if (event.data.keyboardEvent) {
            if (solverMap.has(HumanSolver.getSolverTag().toLowerCase())) {
                const humanSolver = solverMap.get(HumanSolver.getSolverTag().toLowerCase()) as HumanSolver
                const faceRotation = await humanSolver.readKeys(event.data.keyboardEvent);
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
