import { PocketCube } from "./engine/pocket-cube";
import { HumanSolver } from "./solvers/human-solver";
import { PocketCubeAStar } from "./solvers/pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./solvers/pocket-cube-breadth-first-search";

export const Configuration = {
    world: {
        debug: false,
        scrambleMoves: 10,
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
                instantiator: (configuration: number[]) => new HumanSolver(new PocketCube({ clone: configuration })),
                checked: false,
                info: 'Use keys WASDFX combined with shift to rotate cube faces'
            }, {
                key: 'BFS',
                instantiator: (configuration: number[]) => new PocketCubeBreadthFirstSearch(new PocketCube({ clone: configuration })),
                checked: false
            },
            {
                key: 'A*',
                instantiator: (configuration: number[]) => new PocketCubeAStar(new PocketCube({ clone: configuration })),
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