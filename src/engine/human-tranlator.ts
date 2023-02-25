import { Sides } from "@/constants/sides";
import { Colors } from "../constants/colors";
import type { FaceRotation } from "./face-rotation";
import type { Cubelet, RubiksCube, Sticker } from "./rubiks-cube";

export class HumanTranslator {
    public translateSide(side: Sides, cube: RubiksCube): string[] {
        const cubelets = cube.getAllCubelets();
        const dimension = cube.getDimension();
        const lineLength = 10;

        const stickerFinder = (side: Sides, x: number, y: number): Sticker | undefined => {
            for (const cubelet of cubelets) {
                const sticker = cubelet.stickers
                    .find(sticker => sticker.side === side
                        && sticker.x === x
                        && sticker.y === y);
                if (sticker) {
                    return sticker;
                }
            }
        }

        const text = [];
        text.push(`${(Sides[side] + Array.from(new Array(lineLength)).fill(' ').join('')).substring(0, lineLength)}`);
        for (let y = 0; y < dimension; ++y) {
            let line = '';
            for (let x = 0; x < dimension; ++x) {
                const sticker = stickerFinder(side, x, y)!;
                line += Colors[sticker.color].substring(0, 1) + HumanTranslator.mapToSubscript(`${('  ' + sticker.id).slice(-2)}  `);
            }
            text.push(line);
        }
        return text;
    }

    public translateCube(cube: RubiksCube): string {
        const dimension = cube.getDimension();

        const up = this.translateSide(Sides.UP, cube);
        const left = this.translateSide(Sides.LEFT, cube);
        const front = this.translateSide(Sides.FRONT, cube);
        const right = this.translateSide(Sides.RIGHT, cube);
        const back = this.translateSide(Sides.BACK, cube);
        const down = this.translateSide(Sides.DOWN, cube);
        let text = '';
        up
            .forEach(line => {
                text += Array.from(new Array(up[0].length)).fill(' ').join('') + line + '\n'
            });

        for (let y = 0; y < dimension + 1; ++y) {
            text += left[y]
            text += front[y]
            text += right[y]
            text += back[y] + '\n';
        }
        down
            .forEach(line => {
                text += Array.from(new Array(down[0].length)).fill(' ').join('') + line + '\n'
            });
        return text;
    }

    public translateRotations(rotationsToPrint: FaceRotation[], config?: {
        showNumberOfMoves?: boolean,
        lineBreak?: number,
        subscript?: boolean,
        showLayer?: boolean
    }): string {
        const rotations = [...rotationsToPrint];
        let index = 0;
        let text = '';
        if (config?.showNumberOfMoves) {
            index++;
            text += (`     ${rotationsToPrint.length}: `).slice(-4);
        }
        let rotation = rotations.shift();
        while (rotation) {
            const nextRotation = rotations[0];
            let prefix = ' ';
            if (nextRotation) {
                if (nextRotation.layer === rotation.layer &&
                    nextRotation.side === rotation.side &&
                    nextRotation.counterClockwiseDirection === rotation.counterClockwiseDirection) {
                    rotations.shift();
                    prefix = '2';
                }
            }
            let layerText = '';
            if (config) {
                if (config.showLayer) {
                    let layerValue = 1;
                    if (rotation.layer !== undefined) {
                        layerValue = rotation.layer + 1;
                    }
                    layerText = layerValue.toString();
                    if (config.subscript) {
                        layerText = HumanTranslator.mapToSubscript(layerValue.toString());
                    }
                }
            }

            text += `${prefix}${Sides[rotation.side].substring(0, 1)}${rotation.counterClockwiseDirection ? '\'' : ' '}${layerText}  `;
            if (config?.lineBreak !== undefined && index % config?.lineBreak === config?.lineBreak - 1) {
                text += '\n'
            }
            ++index;
            rotation = rotations.shift();
        }
        return text;
    }

    public translateCubelets(cubelets: Cubelet[]): string {
        let text = ''
        cubelets
            .map(cubelet => {
                let text = ' ';
                cubelet
                    .stickers
                    .map(sticker => {
                        const color = Colors[sticker.color!];
                        const side = Sides[sticker.side].substring(0, 1);
                        const id = HumanTranslator.mapToSmallTopLetters(sticker.id.toString());
                        const position = `${HumanTranslator.mapToSubscript('(' + sticker.x + ',' + sticker.y + ')')}`;
                        text += `${color} ${side}${id}${position};  `;
                    })
                text += '\n';
            })
        return text;
    }

    public static mapToSmallTopLetters(text: string): string {
        const lettersMap = new Map<string, string>();
        lettersMap.set('0', '⁰');
        lettersMap.set('1', '¹');
        lettersMap.set('2', '²');
        lettersMap.set('3', '³');
        lettersMap.set('4', '⁴');
        lettersMap.set('5', '⁵');
        lettersMap.set('6', '⁶');
        lettersMap.set('7', '⁷');
        lettersMap.set('8', '⁸');
        lettersMap.set('9', '⁹');
        lettersMap.set(',', '﹐');
        return text
            .split('')
            .map(char => {
                if (lettersMap.has(char)) {
                    return lettersMap.get(char);
                }
                return char;
            })
            .join('');
    }

    public static mapToSubscript(text: string): string {
        const lettersMap = new Map<string, string>();
        lettersMap.set('0', '₀');
        lettersMap.set('1', '₁');
        lettersMap.set('2', '₂');
        lettersMap.set('3', '₃');
        lettersMap.set('4', '₄');
        lettersMap.set('5', '₅');
        lettersMap.set('6', '₆');
        lettersMap.set('7', '₇');
        lettersMap.set('8', '₈');
        lettersMap.set('9', '₉');
        lettersMap.set('0', '₀');
        lettersMap.set('(', '₍');
        lettersMap.set(')', '₎');

        return text
            .split('')
            .map(char => {
                if (lettersMap.has(char)) {
                    return lettersMap.get(char);
                }
                return char;
            })
            .join('');
    }
}