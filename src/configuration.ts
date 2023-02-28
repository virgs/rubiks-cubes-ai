import type { Cube } from "./engine/cube";
import { RubiksCube } from "./engine/rubiks-cube";
import type { CubeSolver } from "./solvers/cube-solver";
import { HumanSolver } from "./solvers/human-solver";
import { AStarSolver } from "./solvers/a-star-solver";
import { BreadthFirstSearchSolver } from "./solvers/breadth-first-search-solver";
import { NeuroEvolutionarySolver } from "./solvers/neuro-evolutionary/neuro-evolutionary-solver";
import { GeneticAlgorithmSolver } from "./solvers/genetic-algorithm/genetic-algorithm-solver";

export type CubeTypes = {
    label: string,
    dimension: number,
    instantiator: () => Cube,
    methods: {
        key: string,
        instantiator: (configuration: bigint[]) => CubeSolver,
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
    populationPerGeneration: 100,
    elitism: 10,
    armageddonThreshold: 10
}

export const Configuration = {
    world: {
        debug: false,
        scrambleMoves: 10,
        scrambleRotationDuration: 100,
        cubesCircleRay: 5
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
            instantiator: () => new RubiksCube(2),
            methods: [{
                key: 'Human',
                instantiator: (configuration: bigint[]) => new HumanSolver(new RubiksCube(2, { clone: configuration })),
                checked: false,
                info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
            },
            {
                key: 'BFS',
                instantiator: (configuration: bigint[]) => new BreadthFirstSearchSolver(new RubiksCube(2, { clone: configuration })),
                checked: false,
                info: `Breadth-first-search. Brute force`
            },
            {
                key: 'A*',
                instantiator: (configuration: bigint[]) => new AStarSolver(new RubiksCube(2, { clone: configuration })),
                checked: true,
                info: `Astar. Uses number of misplaced cubies as heuristic`
            }
            ]
        },
        {
            label: '3x3',
            dimension: 3,
            instantiator: () => new RubiksCube(3),
            methods: [
                {
                    key: 'Human',
                    instantiator: (configuration: bigint[]) => new HumanSolver(new RubiksCube(3, { clone: configuration })),
                    checked: false,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
                },
                {
                    key: 'NE',
                    instantiator: (configuration: bigint[]) => new NeuroEvolutionarySolver(new RubiksCube(3, { clone: configuration })),
                    checked: false,
                    info: `Neuro Evolutionary. Uses number of misplaced stickers as fitness function. Internal neurons: ${NeuroEvolutionaryConfig.neuralNetworkData.hiddenNeurons}. Population: ${NeuroEvolutionaryConfig.geneticData.populationPerGeneration}. No elitism`
                },
                {
                    key: 'GA',
                    instantiator: (configuration: bigint[]) => new GeneticAlgorithmSolver(new RubiksCube(3, { clone: configuration })),
                    checked: true,
                    info: `Predefined macro movements combined with genetic algorithm. Uses number of misplaced stickers as fitness function. Population: ${GeneticAlgorithmConfig.populationPerGeneration}. Elitism ${GeneticAlgorithmConfig.elitism}. Asexual reproduction`
                }
            ]
        },
    ] as CubeTypes[]
}