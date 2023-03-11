import { Sides } from "@/constants/sides";
import { Colors } from "../constants/colors";
import { color } from 'console-log-colors';

import { rotationsAreEqual, type FaceRotation } from "../engine/face-rotation";
import type { Cubelet, RubiksCube, Sticker } from "@/engine/rubiks-cube";

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
            console.log(`Sticker not found: ${Sides[side]}, ${x}, ${y}`);
        }

        const text = [];
        text.push(`${(Sides[side] + Array.from(new Array(lineLength)).fill(' ').join('')).substring(0, lineLength)}`);
        for (let y = 0; y < dimension; ++y) {
            let line = '';
            for (let x = 0; x < dimension; ++x) {
                const sticker = stickerFinder(side, x, y)!;
                const element = Colors[sticker.color].substring(0, 1) + HumanTranslator.mapToSubscript(`${('  ' + sticker.id).slice(-2)}  `);
                let colorNameMethod = Colors[sticker.color].toLowerCase();
                if (colorNameMethod === 'white') {
                    colorNameMethod = 'gray'
                }
                if (colorNameMethod === 'orange') {
                    colorNameMethod = 'redBright'
                }
                const colored = color[colorNameMethod](element)

                line += colored;
            }
            text.push(line);
        }
        return text;
    }

    public printCube(cube: RubiksCube): void {
        const dimension = cube.getDimension();

        const up = this.translateSide(Sides.UP, cube);
        const left = this.translateSide(Sides.LEFT, cube);
        const front = this.translateSide(Sides.FRONT, cube);
        const right = this.translateSide(Sides.RIGHT, cube);
        const back = this.translateSide(Sides.BACK, cube);
        const down = this.translateSide(Sides.DOWN, cube);
        let text = '';
        const titleEmptySpace = Array.from(new Array(up[1].length / 3)).fill(' ').join('');
        up
            .forEach(line => {
                text += titleEmptySpace + line + '\n'
            });

        text += left[0]
        text += (titleEmptySpace + front[0]).slice(-titleEmptySpace.length)
        text += (titleEmptySpace + right[0]).slice(-titleEmptySpace.length)
        text += (titleEmptySpace + back[0]).slice(-titleEmptySpace.length) + '\n';
        for (let y = 1; y < dimension + 1; ++y) {
            text += left[y]
            text += front[y]
            text += right[y]
            text += back[y] + '\n';
        }
        down
            .forEach(line => {
                text += titleEmptySpace + line + '\n'
            });
        console.log(text);
    }

    public convertStringToFaceRotations(humanString: String): FaceRotation[][] {
        if (humanString.length === 0) {
            return [];
        }
        return humanString
            .match(/((\d?)(\w)(\d?)('?))\s*/g)!
            .reduce((acc, current) => {
                const [_, duplicated, side, layer, prime] = current.match(/(\d?)(\w)(\d?)('?)\s*/)!;
                const rotation: FaceRotation = {
                    side: Sides.UP,
                    counterClockwiseDirection: prime?.length > 0,
                    layer: Number(layer?.length > 0)
                };
                switch (side.toLowerCase()) {
                    case 'u': rotation.side = Sides.UP;
                        break;
                    case 'l': rotation.side = Sides.LEFT;
                        break;
                    case 'f': rotation.side = Sides.FRONT;
                        break;
                    case 'r': rotation.side = Sides.RIGHT;
                        break;
                    case 'b': rotation.side = Sides.BACK;
                        break;
                    case 'd': rotation.side = Sides.DOWN;
                        break;
                    default:
                        return acc;
                }
                if (duplicated?.length > 0) {
                    acc.push([rotation, rotation]);
                } else {
                    acc.push([rotation]);
                }
                return acc;
            }, [] as FaceRotation[][]);
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
            text += (`${rotationsToPrint.length}:      `).substring(0, 4);
        }
        let rotation = rotations.shift();
        while (rotation) {
            const nextRotation = rotations[0];
            let prefix = ' ';
            if (nextRotation) {
                if (rotationsAreEqual(nextRotation, rotation)) {
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
            const direction = rotation.counterClockwiseDirection;
            text += `${prefix}${Sides[rotation.side].substring(0, 1)}${direction ? '\'' : ' '}${layerText}  `;
            if (config?.lineBreak !== undefined && index % config?.lineBreak === config?.lineBreak - 1) {
                text += '\n'
            }
            ++index;
            rotation = rotations.shift();
        }
        return text;
    }

    public translateCubelets(cubelets: Cubelet[]): string {
        let result = ''
        cubelets
            .map(cubelet => {
                cubelet
                    .stickers
                    .map(sticker => {
                        const color = Colors[sticker.color!];
                        const side = Sides[sticker.side];
                        const id = HumanTranslator.mapToSmallTopLetters(sticker.id.toString());
                        const position = `${HumanTranslator.mapToSubscript('(' + sticker.x + ',' + sticker.y + ')')}`;
                        result += `${color.substring(0, 1).toUpperCase()
                            .concat(color.substring(1).toLowerCase())}: ${side}${id}${position};  `;
                    })
                result += '\n';
            });
        return result;
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