import { Sides } from "@/constants/sides";
import { Colors } from "../constants/colors";
import type { FaceRotation } from "./face-rotation";
import type { Cubelet, RubiksCube } from "./rubiks-cube";

export class Printer {
    public printCube(cube: RubiksCube): void {
        const stickers = cube.getStickers();
        const text = (sticker: Colors, positionId: number): string => {
            return Colors[sticker].substring(0, 1)
                + Printer.mapToSmallBottomLetters(`${('  ' + positionId).slice(-2)}`);
        };
        console.log('' +
            `           UP
           ${text(stickers[0], 0)}  ${text(stickers[1], 1)}
           ${text(stickers[3], 3)}  ${text(stickers[2], 2)}

LEFT       FRONT      RIGHT      BACK
${text(stickers[4], 4)}  ${text(stickers[5], 5)}   ${text(stickers[8], 8)}  ${text(stickers[9], 9)}   ${text(stickers[12], 12)}  ${text(stickers[13], 13)}   ${text(stickers[16], 16)}  ${text(stickers[17], 17)}
${text(stickers[7], 7)}  ${text(stickers[6], 6)}   ${text(stickers[11], 11)}  ${text(stickers[10], 10)}   ${text(stickers[15], 15)}  ${text(stickers[14], 14)}   ${text(stickers[19], 19)}  ${text(stickers[18], 18)}

           DOWN
           ${text(stickers[20], 20)}  ${text(stickers[21], 21)}
           ${text(stickers[23], 23)}  ${text(stickers[22], 22)}
`);
    };

    public printRotations(rotationsToPrint: FaceRotation[], lineBreak: number = 5): void {
        const rotations = [...rotationsToPrint];
        console.log(`Printing ${rotations.length} rotations`);
        let text = '';
        let index = 0;
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
            text += `| ${prefix}${Sides[rotation.side].substring(0, 1)}${rotation.counterClockwiseDirection ? '\'' : ' '}${this.getLayer(rotation.layer)}  `;
            if (index % lineBreak === lineBreak - 1) {
                text += '\n'
            }
            ++index;
            rotation = rotations.shift();
        }
        console.log(text);
    }

    public printCubelets(cubelets: Cubelet[]): void {
        cubelets
            .map(cubelet => {
                let text = ' ';
                cubelet
                    .stickers
                    .map(sticker => {
                        const color = Colors[sticker.color!];
                        const side = Sides[sticker.side].substring(0, 1);
                        const id = Printer.mapToSmallTopLetters(sticker.id.toString());
                        const position = `${Printer.mapToSmallBottomLetters('(' + sticker.x + ',' + sticker.y + ')')}`;
                        text += `${color} ${side}${id}${position};  `;
                    })
                console.log(text);
            })
    }

    private getLayer(layer?: number): string {
        return Printer.mapToSmallBottomLetters((layer || 0).toString());
    }

    private static mapToSmallTopLetters(text: string): string {
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

    private static mapToSmallBottomLetters(text: string): string {
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