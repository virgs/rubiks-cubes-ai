import type { PocketCube } from "./engine/pocket-cube";
import { HumanSolver } from "./solvers/human-solver";
import { PocketCubeAStar } from "./solvers/pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./solvers/pocket-cube-breadth-first-search";

export const Configuration = {
    world: {
        debug: false,
        scrambleMoves: 20,
        scrambleRotationDuration: 100,
        cubesCircleRay: 5
    },
    renderers: {
        translationDuration: 500,
        rotationDuration: 300,
        titleDistance: 8.5,
        cubeSize: 2.5
    },
    solvers: [
        {
            dimension: '2x2',
            methods: [{
                key: 'Human',
                instantiator: (cube: PocketCube) => new HumanSolver(cube),
                checked: false,
                info: 'Use keys WASDFX combined with shift to rotate cube faces'
            }, {
                key: 'BFS',
                instantiator: (cube: PocketCube) => new PocketCubeBreadthFirstSearch(cube),
                checked: false
            },
            {
                key: 'A*',
                instantiator: (cube: PocketCube) => new PocketCubeAStar(cube),
                checked: true
            }]
        },
        {
            dimension: '3x3',
            methods: [
            ]
        },
        {
            dimension: '4x4',
            methods: [
            ]
        },
    ]
}