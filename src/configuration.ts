import { PocketCube } from "./engine/pocket-cube";
import { HumanSolver } from "./solvers/human-solver";
import { NeuroEvolutionary } from "./solvers/neuro-evolutionary/pocket-cube-neuro-evolutionary";
import { PocketCubeAStar } from "./solvers/pocket-cube-a-star";
import { PocketCubeBreadthFirstSearch } from "./solvers/pocket-cube-breadth-first-search";

export const NeuroEvolutionaryConfig = {
    geneticData: {
        mutationRate: 0.05,
        populationPerGeneration: 100,
        survivalPerGeneration: 0.05
    },
    neuralNetworkData: {
        hiddenNeurons: 10,
        iterations: 20
    }
}

export const Configuration = {
    world: {
        debug: false,
        scrambleMoves: 10,
        scrambleRotationDuration: 50,
        cubesCircleRay: 5
    },
    renderers: {
        translationDuration: 500,
        rotationDuration: 250,
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
                info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
            }, {
                key: 'BFS',
                instantiator: (configuration: number[]) => new PocketCubeBreadthFirstSearch(new PocketCube({ clone: configuration })),
                checked: false
            },
            {
                key: 'A*',
                instantiator: (configuration: number[]) => new PocketCubeAStar(new PocketCube({ clone: configuration })),
                checked: false
            },
            {
                key: 'NeuroEvolutionary',
                instantiator: (configuration: number[]) => new NeuroEvolutionary(new PocketCube({ clone: configuration })),
                checked: true,
                info: `Hidden neurons: ${NeuroEvolutionaryConfig.neuralNetworkData.hiddenNeurons}. Population: ${NeuroEvolutionaryConfig.geneticData.populationPerGeneration}`
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