import { RubiksCube } from "./engine/rubiks-cube";
import type { CubeSolver } from "./solvers/cube-solver";
import { HumanSolver } from "./solvers/human-solver";
import { AStarSolver } from "./solvers/a-star-solver";
import { BreadthFirstSearchSolver } from "./solvers/breadth-first-search-solver";
import { NeuroEvolutionarySolver } from "./solvers/neuro-evolutionary/neuro-evolutionary-solver";
import { GeneticAlgorithmSolver } from "./solvers/genetic-algorithm/genetic-algorithm-solver";
import { DepthFirstSearchSolver } from "./solvers/depth-first-search-solver";

export type CubeTypes = {
    label: string,
    dimension: number,
    instantiator: () => RubiksCube,
    methods: {
        key: string,
        instantiator: (configuration: string) => CubeSolver,
        checked: boolean,
        info: string
    }[]
}

export const NeuroEvolutionaryConfig = {
    geneticData: {
        mutationRate: 0.05,
        populationPerGeneration: 100,
        armageddonThreshold: 500
    },
    neuralNetworkData: {
        hiddenNeurons: 10,
        iterations: 20
    }
}

export const GeneticAlgorithmConfig = {
    populationPerGeneration: 500,
    elitism: 20,
    armageddonThreshold: 50,
    numberOfInitialScrambleMovements: 10
}

export const Configuration = {
    metrics: {
        enabled: import.meta.env.DEV
    },
    world: {
        debug: false,
        scrambleMoves: 10,
        scrambleRotationDuration: 100,
        cubesCircleRay: 5,
        camera: {
            closeDistance: 10,
            farDistance: 50
        }
    },
    renderers: {
        translationDuration: 500,
        rotationDuration: 250,
        titleDistance: 8.5,
        cubeSize: 2.5
    },
    cubeTypes: [
        {
            label: '2x2',
            dimension: 2,
            instantiator: () => new RubiksCube({ dimension: 2 }),
            methods: [{
                key: 'Human',
                instantiator: (configuration: string) => new HumanSolver(new RubiksCube({ clone: configuration })),
                checked: false,
                info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
            },
            {
                key: 'DFS',
                instantiator: (configuration: string) => new DepthFirstSearchSolver(new RubiksCube({ clone: configuration })),
                checked: false,
                info: `Depth-first-search. Brute force`
            },
            {
                key: 'BFS',
                instantiator: (configuration: string) => new BreadthFirstSearchSolver(new RubiksCube({ clone: configuration })),
                checked: false,
                info: `Breadth-first-search. Brute force`
            },
            {
                key: 'A*',
                instantiator: (configuration: string) => new AStarSolver(new RubiksCube({ clone: configuration })),
                checked: true,
                info: `Astar. Uses number of misplaced cubies as heuristic`
            }
            ]
        },
        {
            label: '3x3',
            dimension: 3,
            instantiator: () => new RubiksCube({ dimension: 3 }),
            methods: [
                {
                    key: 'Human',
                    instantiator: (configuration: string) => new HumanSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
                },
                {
                    key: 'NE',
                    instantiator: (configuration: string) => new NeuroEvolutionarySolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: `Neuro Evolutionary. Uses number of misplaced stickers as fitness function. Internal neurons: ${NeuroEvolutionaryConfig.neuralNetworkData.hiddenNeurons}. Population: ${NeuroEvolutionaryConfig.geneticData.populationPerGeneration}. No elitism`
                },
                {
                    key: 'GA',
                    instantiator: (configuration: string) => new GeneticAlgorithmSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: `Predefined macro movements combined with genetic algorithm. Uses number of misplaced stickers as fitness function. Population: ${GeneticAlgorithmConfig.populationPerGeneration}. Elitism ${GeneticAlgorithmConfig.elitism}. Asexual reproduction`
                }
            ]
        },
        {
            label: '4x4',
            dimension: 4,
            instantiator: () => new RubiksCube({ dimension: 4 }),
            methods: [
                {
                    key: 'Human',
                    instantiator: (configuration: string) => new HumanSolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' and numbers to rotate cube faces'
                }
            ]
        },
        {
            label: '5x5',
            dimension: 5,
            instantiator: () => new RubiksCube({ dimension: 5 }),
            methods: [
                {
                    key: 'Human',
                    instantiator: (configuration: string) => new HumanSolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' and numbers to rotate cube faces'
                }
            ]
        },
    ] as CubeTypes[]
}