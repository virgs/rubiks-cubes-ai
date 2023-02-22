import type { Colors } from "@/constants/colors";
import { PocketCube } from "@/engine/pocket-cube";
import type { CubeSolver } from "./cube-solver";
import { PocketCubeAStar } from "./pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./pocket-cube-breadth-first-search";
import type { Solution } from "./solution";

const solverMap: Map<string, (cube: PocketCube) => CubeSolver> = new Map();
solverMap.set("a*".toLowerCase(), (cube: PocketCube) => new PocketCubeAStar(cube));
solverMap.set("bfs".toLowerCase(), (cube: PocketCube) => new PocketCubeBreadthFirstSearch(cube));

export type WorkerRequest = {
    cube: Colors[],
    solverKey: string,
    id: string
}

export type WorkerResponse = {
    solution: string,
    solverKey: string,
    id: string;
}

self.onmessage = (event: MessageEvent<WorkerRequest>) => {
    if (solverMap.has(event.data.solverKey.toLowerCase())) {
        console.log(`Running solution for ${event.data.solverKey}`)
        const cube = new PocketCube({ clone: event.data.cube });
        const solver: CubeSolver = solverMap.get(event.data.solverKey.toLowerCase())!(cube);
        const solution: Solution = solver.findSolution()!;
        console.log(`Solution for ${event.data.solverKey} found`)
        self.postMessage({ solution: JSON.stringify(solution), solverKey: event.data.solverKey, id: event.data.id });
    }
}
