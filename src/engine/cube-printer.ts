import type { FaceRotation } from "@/engine/face-rotation";
import { Sides } from "@/engine/sides";
import { Colors } from "./colors";
import type { Cubelet, PocketCube, Sticker } from "./pocket-cube";

export class CubePrinter {
    public printCube(cube: PocketCube): void {
        const stickers = cube.getConfiguration();
        const text = (sticker: Sticker, positionId: number): string => {
            return CubePrinter.mapToSmallLetters(`${String(sticker.originalPosition).padStart(2, ' ')}`)
                + Colors[sticker.color].substring(0, 1)
                + CubePrinter.mapToSmallLetters(`${String(positionId).padStart(2, ' ')}`);
        }
        console.log('' +
            `               UP
               ${text(stickers[0], 0)}  ${text(stickers[1], 1)}
               ${text(stickers[3], 3)}  ${text(stickers[2], 2)}

LEFT           FRONT          RIGHT          BACK
${text(stickers[4], 4)}  ${text(stickers[5], 5)}   ${text(stickers[8], 8)}  ${text(stickers[9], 9)}   ${text(stickers[12], 12)}  ${text(stickers[13], 13)}   ${text(stickers[16], 16)}  ${text(stickers[17], 17)}
${text(stickers[7], 7)}  ${text(stickers[6], 6)}   ${text(stickers[11], 11)}  ${text(stickers[10], 10)}   ${text(stickers[15], 15)}  ${text(stickers[14], 14)}   ${text(stickers[19], 19)}  ${text(stickers[18], 18)}

               DOWN
               ${text(stickers[20], 20)}  ${text(stickers[21], 21)}
               ${text(stickers[23], 23)}  ${text(stickers[22], 22)}
`);
    };

    public printRotations(rotations: FaceRotation[], lineBreak: number = 5): void {
        let text = '';
        rotations
            .forEach((rotation: FaceRotation, index: number) => {
                text += `| ${Sides[rotation.side].substring(0, 1)}${rotation.counterClockwiseDirection ? '\'' : ' '}${this.getLayer(rotation.layer)}  `;
                if (index % lineBreak === lineBreak - 1) {
                    text += '\n'
                }
            });
        console.log(text);
    }

    public printCubelets(cubelets: Cubelet[]): void {
        cubelets
            .map(cubelet => {
                let text = ' '
                cubelet
                    .map(sticker => {
                        text += `${Colors[sticker.color!]} ${Sides[sticker.side].substring(0, 1)}${CubePrinter.mapToSmallLetters(sticker.position!.toString())};  `;
                    })
                console.log(text)
            })
    }

    private getLayer(layer?: number): string {
        return CubePrinter.mapToSmallLetters((layer || 0).toString());
    }

    private static mapToSmallLetters(text: string): string {
        const smallLettersMap = new Map<string, string>();
        smallLettersMap.set('0', '₀')
        smallLettersMap.set('1', '₁')
        smallLettersMap.set('2', '₂')
        smallLettersMap.set('3', '₃')
        smallLettersMap.set('4', '₄')
        smallLettersMap.set('5', '₅')
        smallLettersMap.set('6', '₆')
        smallLettersMap.set('7', '₇')
        smallLettersMap.set('8', '₈')
        smallLettersMap.set('9', '₉')
        smallLettersMap.set('0', '₀')
        smallLettersMap.set('(', '₍')
        smallLettersMap.set(')', '₎')

        return text
            .split('')
            .map(char => {
                if (smallLettersMap.has(char)) {
                    return smallLettersMap.get(char);
                }
                return char;
            })
            .join('')
    }
}