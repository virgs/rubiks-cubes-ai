import { Colors } from "@/constants/colors";
import { Sides } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";
import type { RubiksCube, } from "@/engine/rubiks-cube";
import { HumanTranslator } from "@/printers/human-translator";
import type { ThistlethwaiteResult, ThistlethwaiteStep } from "./thistlethwait-step";


export class CornersInOrbitStep implements ThistlethwaiteStep {
    private readonly stepRotations: FaceRotation[][];
    private readonly goalXAxisColors: Colors[];
    private readonly goalYSliceColors: Colors[];

    public constructor(goalState: RubiksCube) {
        const translator = new HumanTranslator();
        this.stepRotations = translator.convertStringToFaceRotations("L R F B L' R' F' B' 2U 2D");

        const goalStateCubelets = goalState.getAllCubelets();
        const goalCenterCubelets = goalStateCubelets
            .filter(cubelet => cubelet.stickers.length === 1);
        this.goalXAxisColors = goalCenterCubelets
            .filter(cubelet => cubelet.stickers
                .some(sticker => [Sides.RIGHT, Sides.LEFT].includes(sticker.side)))
            .map(cubelet => cubelet.stickers[0].color)

        this.goalYSliceColors = goalCenterCubelets
            .filter(cubelet => cubelet.stickers
                .some(sticker => [Sides.FRONT, Sides.BACK].includes(sticker.side)))
            .map(cubelet => cubelet.stickers[0].color)
            .concat(this.goalXAxisColors);

        console.log(this.goalXAxisColors.map(c => Colors[c]))
        console.log(this.goalYSliceColors.map(c => Colors[c]))
    }

    public getAllowedMoves(): FaceRotation[][] {
        return this.stepRotations;
    }
    public iterate(cube: RubiksCube): ThistlethwaiteResult {
        // new HumanTranslator().printCube(cube)

        const misorientedCorners = cube.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 3)
            .filter(currentCubeCornerCubelet => {
                const stickerSide = currentCubeCornerCubelet.stickers
                    .find(sticker => this.goalXAxisColors.includes(sticker.color))!
                if ([Sides.RIGHT, Sides.LEFT].includes(stickerSide.side)) {
                    // console.log(stickerSide.id)
                    return false;
                }
                return true;
            })
            .length;

        const misplacedEdges = cube.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 2)
            .filter(cubelet => cubelet.stickers
                .every(sticker => !this.goalXAxisColors.includes(sticker.color))) //every that doesn't have neither LEFT (orange: 1) or RIGHT (red: 3) colors
            .filter(edgeWithSliceColors => {
                const misplaced = edgeWithSliceColors.stickers
                    .find(sticker => [Sides.RIGHT, Sides.LEFT].includes(sticker.side))
                if (misplaced) {
                    // console.log(misplaced)
                    return true;
                }
                return false;
            })
            .length;
        // console.log(misorientedCorners, misplacedEdges)
        if (misorientedCorners + misplacedEdges === 0) {
            console.log('Yaaay')
        }

        const numOfCornersTwistedPerMove = 4;
        const numOfEdgesTwistedPerMove = 4;
        return {
            stepFinished: misorientedCorners + misplacedEdges === 0,
            nextStepSolver: undefined,
            minMovesToFinishSteps: Math.max(misorientedCorners / numOfCornersTwistedPerMove, misplacedEdges / numOfEdgesTwistedPerMove),
            data: {} //Add metrics here
        }
    }

}
