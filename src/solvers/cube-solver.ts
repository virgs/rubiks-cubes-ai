import type { Solution } from "./solution";

export interface CubeSolver {
    findSolution(): Solution | undefined;
}
