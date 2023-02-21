import type { Solution } from "./solution";

export interface CubeSolver {
    iterate(): Solution | undefined;
}
