import { rotationsCancel, type FaceRotation } from "@/engine/face-rotation";
import { RubiksCube } from "@/engine/rubiks-cube";
import { HumanTranslator } from "@/printers/human-translator";
import { type ThistlethwaiteStep } from "./thistlethwait-step";

export class GoodEdgesStep implements ThistlethwaiteStep {
    private readonly goalState: RubiksCube;

    public constructor(goalState: RubiksCube) {
        this.goalState = goalState;
    }

    private readonly edgesIndexes: number[] = new RubiksCube({ dimension: 3 }).getAllColorlessCubelets()
        .filter(cubelet => cubelet.stickers.length === 2)
        .flatMap(cubelet => cubelet.stickers
            .map(sticker => sticker.id));

    public getAllowedMoves(parentRotations: FaceRotation[]): FaceRotation[][] {
        const translator = new HumanTranslator();
        return translator.convertStringToFaceRotations("L R F B U D L' R' F' B' U' D'")
            .filter(move => parentRotations.length > 0 ? !rotationsCancel(move[0], parentRotations[0]) : true);
    }
    public calculateDistanceToGoal(cube: RubiksCube): boolean {
        [
            [{ "side": "FRONT", "id": 21, "color": "BLUE" }, { "side": "LEFT", "id": 14, "color": "ORANGE" }],
            [{ "side": "FRONT", "id": 23, "color": "BLUE" }, { "side": "RIGHT", "id": 30, "color": "RED" }],
            [{ "side": "FRONT", "id": 19, "color": "BLUE" }, { "side": "UP", "id": 7, "color": "YELLOW" }],
            [{ "side": "FRONT", "id": 25, "color": "BLUE" }, { "side": "DOWN", "id": 46, "color": "WHITE" }],
            [{ "side": "BACK", "id": 41, "color": "GREEN" }, { "side": "LEFT", "id": 12, "color": "ORANGE" }],
            [{ "side": "BACK", "id": 39, "color": "GREEN" }, { "side": "RIGHT", "id": 32, "color": "RED" }],
            [{ "side": "BACK", "id": 37, "color": "GREEN" }, { "side": "UP", "id": 1, "color": "YELLOW" }],
            [{ "side": "BACK", "id": 43, "color": "GREEN" }, { "side": "DOWN", "id": 52, "color": "WHITE" }],
            [{ "side": "RIGHT", "id": 28, "color": "RED" }, { "side": "UP", "id": 5, "color": "YELLOW" }],
            [{ "side": "RIGHT", "id": 34, "color": "RED" }, { "side": "DOWN", "id": 50, "color": "WHITE" }],
            [{ "side": "LEFT", "id": 10, "color": "ORANGE" }, { "side": "UP", "id": 3, "color": "YELLOW" }],
            [{ "side": "LEFT", "id": 16, "color": "ORANGE" }, { "side": "DOWN", "id": 48, "color": "WHITE" }]
        ]



        const configuration = cube.getConfiguration();
        return this.edgesIndexes
            .filter(index => configuration[index] !== this.goalState.getConfiguration()[index])
            .length === 0;
    }
}
