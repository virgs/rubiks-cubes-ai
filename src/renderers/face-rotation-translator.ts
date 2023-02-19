import type { FaceRotation } from "@/engine/face-rotation";
import { Sides } from "@/engine/sides";

export class FaceRotationTranslator {

    public translate(rotations: FaceRotation[], lineBreak: number = 5): string {
        let text = '';
        rotations
            .forEach((rotation: FaceRotation, index: number) => {
                text += `| ${Sides[rotation.side].substring(0, 1)}${rotation.counterClockwiseDirection ? '\'' : ' '}${this.getLayer(rotation.layer)}  `;
                if (index % lineBreak === lineBreak - 1) {
                    text += '\n'
                }
            });
        return text
    }

    private getLayer(layer?: number): string {
        const smallNumbers = '₀₁₂₃₄₅₆₇₈₉';

        return (layer || 0).toString()
            .split('')
            .map(value => {
                return smallNumbers.charAt(parseInt(value + 1));
            })
            .join('');
    }
}