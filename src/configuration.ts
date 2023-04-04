import { RubiksCube } from "./engine/rubiks-cube";
import { BidirectionalBreadthFirstSearchSolver } from "./solvers/2x2/bidirectional-breadth-first-search-solver";
import { GeneticAlgorithmSolver } from "./solvers/2x2/genetic-algorithm/genetic-algorithm-solver";
import { InterativeDeepeningAStarSolver } from "./solvers/2x2/iterative-deepening-a-star-solver";
import { InterativeDeepeningDepthFirstSearchSolver } from "./solvers/2x2/iterative-deepening-depth-first-search-solver";
import { SimulatedAnnealingSolver } from "./solvers/2x2/simulated-annealing/simulated-annealing-solver";
import { WeightedAStarSolver } from "./solvers/2x2/weighted-a-star-solver";
import type { CubeSolver } from "./solvers/cube-solver";
import { HumanSolver } from "./solvers/human-solver";

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

export const WeightedAStarAlgorithmConfig = {
    heuristicWeight: 50,
}

export const GeneticAlgorithmConfig = {
    mutationRate: 0.1,
    populationPerGeneration: 100,
    maxNumOfRotations: 30,
    elitism: 15,
    armageddonThreshold: 5000
}

export const SimulatedAnnealingConfig = {
    population: 100,
    initialTemperature: .2,
    temperatureDecreaseRate: .75,
    numOfRotations: 30,
    maxSuccessPerIteration: 10,
    restartThreshold: 1000 * 1000 * 1000
}

export const Configuration = {
    metrics: {
        enabled: !import.meta.env.DEV,
        generateReport: false
    },
    world: {
        debug: false,
        scrambleMoves: 30,
        scrambleRotationDuration: 100,
        cubesCircleRay: 4.5,
        camera: {
            closeDistance: 20,
            farDistance: 55
        }
    },
    renderers: {
        translationDuration: 500,
        rotationDuration: 250,
        titleDistance: 8.5,
        cubeSize: 2.5
    },
    initiallySelectedCubeTypeIndex: 0,
    cubeTypes: [
        {
            label: '2x2',
            dimension: 2,
            instantiator: () => new RubiksCube({ dimension: 2 }),
            methods: [
                {
                    key: 'Human',
                    instantiator: (configuration: string) => new HumanSolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
                },
                {
                    key: 'IDDFS',
                    instantiator: (configuration: string) => new InterativeDeepeningDepthFirstSearchSolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: `Interative-deepening depth-first-search. Brute force`
                },
                {
                    key: 'IDA*',
                    instantiator: (configuration: string) => new InterativeDeepeningAStarSolver(new RubiksCube({ clone: configuration })),
                    checked: false,
                    info: `Interative-deepening A star. Uses number of misplaced stickers as heuristic.`
                },
                {
                    key: 'GA',
                    instantiator: (configuration: string) => new GeneticAlgorithmSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: `Random movements improved by genetic algorithm. Uses number of misplaced stickers as fitness function. Population: ${GeneticAlgorithmConfig.populationPerGeneration}. Elitism ${GeneticAlgorithmConfig.elitism}.  Mutation rate ${GeneticAlgorithmConfig.mutationRate}. `
                },
                {
                    key: 'SA',
                    instantiator: (configuration: string) => new SimulatedAnnealingSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: `Random movements improved by simulated annealing algorithm. Uses number of misplaced stickers as a measure of a solution candidate result. Population: ${SimulatedAnnealingConfig.population}. Initial temperature: ${SimulatedAnnealingConfig.initialTemperature}. Temperature decrease rate: ${SimulatedAnnealingConfig.temperatureDecreaseRate}`
                },
                {
                    key: 'WA*',
                    instantiator: (configuration: string) => new WeightedAStarSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: `Weighted A star. No re-expansions. Uses number of misplaced stickers as heuristic and weights the heuristic (${WeightedAStarAlgorithmConfig.heuristicWeight} * h(x)) value.`
                },
                {
                    key: 'BiBFS',
                    instantiator: (configuration: string) => new BidirectionalBreadthFirstSearchSolver(new RubiksCube({ clone: configuration })),
                    checked: true,
                    info: `Bidirectional breadth-first-search. Brute force.`
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
                    checked: false,
                    info: 'Use keys \'WASDFX\' combined with \'shift\' to rotate cube faces'
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
        {
            label: '6x6',
            dimension: 6,
            instantiator: () => new RubiksCube({ dimension: 6 }),
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
            label: '7x7',
            dimension: 7,
            instantiator: () => new RubiksCube({ dimension: 7 }),
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