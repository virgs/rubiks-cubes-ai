import type { Colors } from "@/constants/colors";
import { PocketCube } from "@/engine/pocket-cube";
import type { CubeSolver, Solution } from "./cube-solver";
import { HumanSolver } from "./human-solver";
import { PocketCubeAStar } from "./pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./pocket-cube-breadth-first-search";

export type SolverWorkerRequest = {
    cube: Colors[],
    solverKey: string
};

export type SolverWorkerResponse = {
    solution?: string,
    solverKey: string,
    error?: string,
};

const solverMap: Map<string, (cube: PocketCube) => CubeSolver> = new Map();
solverMap.set("human".toLowerCase(), (cube: PocketCube) => new HumanSolver(cube));
solverMap.set("a*".toLowerCase(), (cube: PocketCube) => new PocketCubeAStar(cube));
solverMap.set("bfs".toLowerCase(), (cube: PocketCube) => new PocketCubeBreadthFirstSearch(cube));

self.onmessage = async (event: MessageEvent<SolverWorkerRequest>) => {
    if (solverMap.has(event.data.solverKey.toLowerCase())) {
        const cube = new PocketCube({ clone: event.data.cube });
        const solver: CubeSolver = solverMap.get(event.data.solverKey.toLowerCase())!(cube);
        const solution: Solution = await solver.findSolution()!;
        self.postMessage({ solution: JSON.stringify(solution), solverKey: event.data.solverKey, id: event.data.id });
    } else {
        self.postMessage({ error: `Solution for ${event.data.solverKey} found`, solverKey: event.data.solverKey, id: event.data.id });
    }
}
