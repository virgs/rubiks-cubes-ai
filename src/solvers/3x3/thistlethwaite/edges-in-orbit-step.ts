import { Colors } from "@/constants/colors";
import { Sides } from "@/constants/sides";
import { type FaceRotation } from "@/engine/face-rotation";
import { RubiksCube, type Sticker, type Cubelet } from "@/engine/rubiks-cube";
import { HumanTranslator } from "@/printers/human-translator";
import { type ThistlethwaiteResult, type ThistlethwaiteStep } from "./thistlethwait-step";

type EdgeOrbit = {
    in: Sides[],
    out: Sides[]
}

export class EdgesInOrbitStep implements ThistlethwaiteStep {
    private readonly goalStateEdgeCubelets: Cubelet[];
    private readonly stepRotations: FaceRotation[][];
    private readonly orbits: EdgeOrbit[];

    public constructor(cube: RubiksCube) {
        this.orbits = [{
            in: [Sides.FRONT, Sides.BACK],
            out: [Sides.LEFT, Sides.RIGHT]
        },
        {
            in: [Sides.LEFT, Sides.RIGHT],
            out: [Sides.FRONT, Sides.BACK]
        }];

        this.goalStateEdgeCubelets = cube.getAllCubelets()
            .filter(cubelet => cubelet.stickers.length === 2);
        const translator = new HumanTranslator();
        this.stepRotations = translator.convertStringToFaceRotations("L R F B U D L' R' F' B' U' D'");
    }

    private readonly edgesIndexes: number[] = new RubiksCube({ dimension: 3 }).getAllColorlessCubelets()
        .filter(cubelet => cubelet.stickers.length === 2)
        .flatMap(cubelet => cubelet.stickers
            .map(sticker => sticker.id));

    public getAllowedMoves(): FaceRotation[][] {
        return this.stepRotations;
    }
    public iterate(cube: RubiksCube): ThistlethwaiteResult {
        const goodEdgesCounter = this.goalStateEdgeCubelets
            .filter(cubelet => cubelet.stickers
                .some(sticker => [Sides.FRONT, Sides.BACK].includes(sticker.side)))
            .filter(goalEdge => { //any cubelet inside the orbit
                const color: Colors = goalEdge.stickers
                    .find(sticker => [Sides.FRONT, Sides.BACK].includes(sticker.side)).color;

                const goalEdgeColors = goalEdge.stickers
                    .map(sticker => sticker.color);

                const currentConfigurationEdge: Cubelet = cube.getCubeletsByColors(...goalEdgeColors)
                    .filter(cubelet => cubelet.stickers.length === 2)[0];

                const sideOfColorInCurrentConfiguration: Sides = currentConfigurationEdge.stickers
                    .find(sticker => sticker.color === color)
                    .side;

                // console.log('goalEdgeColors', goalEdgeColors.map(c => Colors[c]));
                // console.log('goalInOrbitColor', Colors[colorInOrbit]);
                // console.log('currentConfigurationEdge', currentConfigurationEdge.stickers.map(s => `${Sides[s.side]}, ${Colors[s.color]}`))
                // console.log('currentConfigurationSticker', Sides[sideOfColorInCurrentConfiguration])
                if ([Sides.LEFT, Sides.RIGHT].includes(sideOfColorInCurrentConfiguration)) { //out of orbit
                    // console.log('cubelet is wrong')
                    return false;
                }
                if ([Sides.UP, Sides.DOWN].includes(sideOfColorInCurrentConfiguration)) { //neutral position
                    const otherSideOfCurrentConfigurationEdge = currentConfigurationEdge.stickers
                        .find(sticker => ![Sides.UP, Sides.DOWN].includes(sticker.side))
                        .side;
                    // console.log('otherSideOfCurrentConfigurationEdge', Sides[otherSideOfCurrentConfigurationEdge]);

                    if (![Sides.LEFT, Sides.RIGHT].includes(otherSideOfCurrentConfigurationEdge)) {
                        // console.log('cubelet is wrong')
                        return false;
                    }
                }
                return true;
            }).length


        // console.log(goodEdgesCounter)

        const transversalGoodEdges = this.goalStateEdgeCubelets
            .filter(cubelet => cubelet.stickers
                .every(sticker => ![Sides.FRONT, Sides.BACK].includes(sticker.side)))
            .filter(goalEdge => { //any cubelet inside the orbit
                // console.log(goalEdge.stickers.map(s => Sides[s.side]))
                const color: Colors = goalEdge.stickers
                    .find(sticker => [Sides.LEFT, Sides.RIGHT].includes(sticker.side)).color;

                const goalEdgeColors: Colors[] = goalEdge.stickers
                    .map(sticker => sticker.color);

                const currentConfigurationEdge: Cubelet = cube.getCubeletsByColors(...goalEdgeColors)
                    .filter(cubelet => cubelet.stickers.length === 2)[0];

                const sideOfColorInCurrentConfiguration: Sides = currentConfigurationEdge.stickers
                    .find(sticker => sticker.color === color)
                    .side;

                // console.log('goalEdgeColors', goalEdgeColors.map(c => Colors[c]));
                // console.log('goalInOrbitColor', Colors[colorInOrbit]);
                // console.log('currentConfigurationEdge', currentConfigurationEdge.stickers.map(s => `${Sides[s.side]}, ${Colors[s.color]}`))
                // console.log('currentConfigurationSticker', Sides[sideOfColorInCurrentConfiguration])
                if ([Sides.FRONT, Sides.BACK].includes(sideOfColorInCurrentConfiguration)) { //out of orbit
                    // console.log('cubelet is wrong')
                    return false;
                }
                if ([Sides.UP, Sides.DOWN].includes(sideOfColorInCurrentConfiguration)) { //neutral position
                    const otherSideOfCurrentConfigurationEdge = currentConfigurationEdge.stickers
                        .find(sticker => ![Sides.UP, Sides.DOWN].includes(sticker.side))
                        .side;
                    // console.log('otherSideOfCurrentConfigurationEdge', Sides[otherSideOfCurrentConfigurationEdge]);

                    if (![Sides.FRONT, Sides.BACK].includes(otherSideOfCurrentConfigurationEdge)) {
                        // console.log('cubelet is wrong')
                        return false;
                    }
                }
                return true;
            }).length











        // console.log(goodEdgesCounter, transversalGoodEdges, this.goalStateEdgeCubelets.length)

        if (goodEdgesCounter + transversalGoodEdges >= this.goalStateEdgeCubelets.length) {
            console.log('EDGES ARE FINE', cube.isSolved());
        }
        return {
            stepFinished: (goodEdgesCounter + transversalGoodEdges) === this.goalStateEdgeCubelets.length,
            nextStepSolver: this,
            data: {}
        }
    }

}
