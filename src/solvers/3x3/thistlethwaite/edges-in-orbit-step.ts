import { Colors } from "@/constants/colors";
import { Sides } from "@/constants/sides";
import { type FaceRotation } from "@/engine/face-rotation";
import { RubiksCube, type Cubelet } from "@/engine/rubiks-cube";
import { HumanTranslator } from "@/printers/human-translator";
import { CornersInOrbitStep } from "./corners-in-orbit-step";
import { type ThistlethwaiteResult, type ThistlethwaiteStep } from "./thistlethwait-step";


export class EdgesInOrbitStep implements ThistlethwaiteStep {
    private readonly goalStateEdgeCubelets: Cubelet[];
    private readonly stepRotations: FaceRotation[][];
    private readonly goalState: RubiksCube;

    public constructor(goalState: RubiksCube) {
        this.goalState = goalState.clone();
        this.goalStateEdgeCubelets = this.goalState.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 2);
        const translator = new HumanTranslator();
        this.stepRotations = translator.convertStringToFaceRotations("L R F B U D L' R' F' B' U' D'");
    }

    public getAllowedMoves(): FaceRotation[][] {
        return this.stepRotations;
    }
    public iterate(cube: RubiksCube): ThistlethwaiteResult {
        const numOfEdgesTwistedPerMove = 4.0;
        const goodEdgesCounter = this.countFrontAndBackEdgesInOrbit(cube)
        const transversalGoodEdges = this.countLeftAndRightEdgesInOrbit(cube)
        let nextStepSolver = undefined;
        const distanceToStepGoal = this.goalStateEdgeCubelets.length - (goodEdgesCounter + transversalGoodEdges);
        const stepFinished = distanceToStepGoal === 0;
        if (stepFinished) {
            nextStepSolver = new CornersInOrbitStep(this.goalState);
        }
        return {
            stepFinished: stepFinished,
            nextStepSolver: nextStepSolver,
            minMovesToFinishSteps: distanceToStepGoal / numOfEdgesTwistedPerMove,
            data: {} //Add metrics here
        }
    }

    private countLeftAndRightEdgesInOrbit(cube: RubiksCube) {
        return this.goalStateEdgeCubelets
            .filter(cubelet => cubelet.stickers
                .every(sticker => ![Sides.FRONT, Sides.BACK].includes(sticker.side)))
            .filter(goalEdge => {
                const color: Colors = goalEdge.stickers
                    .find(sticker => [Sides.LEFT, Sides.RIGHT].includes(sticker.side))!.color;

                const goalEdgeColors: Colors[] = goalEdge.stickers
                    .map(sticker => sticker.color);

                const currentConfigurationEdge: Cubelet = cube.getCubeletsByColors(...goalEdgeColors)
                    .filter(cubelet => cubelet.stickers.length === 2)[0];

                const sideOfColorInCurrentConfiguration: Sides = currentConfigurationEdge.stickers
                    .find(sticker => sticker.color === color)!
                    .side;

                //stickers that face LEFT or RIGHT in goal state should never face FRONT or BACK
                if ([Sides.FRONT, Sides.BACK].includes(sideOfColorInCurrentConfiguration)) { //out of orbit
                    return false;
                }
                //stickers that face LEFT or RIGHT in goal state may face UP or DOWN
                if ([Sides.UP, Sides.DOWN].includes(sideOfColorInCurrentConfiguration)) { //neutral position
                    const otherSideOfCurrentConfigurationEdge = currentConfigurationEdge.stickers
                        .find(sticker => ![Sides.UP, Sides.DOWN].includes(sticker.side))!
                        .side;
                    //provided that they share the cubelet with a sticker facing FRONT or DOWN
                    if (![Sides.FRONT, Sides.BACK].includes(otherSideOfCurrentConfigurationEdge)) {
                        return false;
                    }
                }
                return true;
            }).length;
    }

    private countFrontAndBackEdgesInOrbit(cube: RubiksCube) {
        return this.goalStateEdgeCubelets
            .filter(cubelet => cubelet.stickers
                .some(sticker => [Sides.FRONT, Sides.BACK].includes(sticker.side)))
            .filter(goalEdge => {
                const color: Colors = goalEdge.stickers
                    .find(sticker => [Sides.FRONT, Sides.BACK].includes(sticker.side))!.color;

                const goalEdgeColors = goalEdge.stickers
                    .map(sticker => sticker.color);

                const currentConfigurationEdge: Cubelet = cube.getCubeletsByColors(...goalEdgeColors)
                    .filter(cubelet => cubelet.stickers.length === 2)[0];

                const sideOfColorInCurrentConfiguration: Sides = currentConfigurationEdge.stickers
                    .find(sticker => sticker.color === color)!
                    .side;

                //stickers that face FRONT or BACK in goal state should never face LEFT or RIGHT
                if ([Sides.LEFT, Sides.RIGHT].includes(sideOfColorInCurrentConfiguration)) { //out of orbit
                    return false;
                }
                //stickers that face FRONT or BACK in goal state may face UP or DOWN
                if ([Sides.UP, Sides.DOWN].includes(sideOfColorInCurrentConfiguration)) { //neutral position
                    const otherSideOfCurrentConfigurationEdge = currentConfigurationEdge.stickers
                        .find(sticker => ![Sides.UP, Sides.DOWN].includes(sticker.side))!
                        .side;
                    //provided that they share the cubelet with a sticker facing LEFT or RIGHT
                    if (![Sides.LEFT, Sides.RIGHT].includes(otherSideOfCurrentConfigurationEdge)) {
                        return false;
                    }
                }
                return true;
            }).length;
    }
}
