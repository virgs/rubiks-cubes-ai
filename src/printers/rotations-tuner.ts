import { getOppositeRotation, rotationsAreEqual, rotationsCancel, type FaceRotation } from "../engine/face-rotation";

export class RotationsTuner {

    public tune(rotations: FaceRotation[]): FaceRotation[] {
        let result = [...rotations];
        while (true) {
            // console.log(new HumanTranslator().translateRotations(result))
            const afterOppositeRemovals = this.removeTwoConsecutiveOppositeRotations(result);
            result = afterOppositeRemovals.result;
            if (afterOppositeRemovals.modifiedFlag) {
                // console.log('opposite removed')
                continue;
            }
            const afterConsecuteOppositeReplacement = this.replaceThreeConsecutiveRotations(result);
            result = afterConsecuteOppositeReplacement.result;
            if (afterConsecuteOppositeReplacement.modifiedFlag) {
                // console.log('consecutives replaced')
                continue;
            }
            break;
        }
        return result;
    }


    private removeTwoConsecutiveOppositeRotations(rotations: FaceRotation[]): { modifiedFlag: boolean, result: FaceRotation[] } {
        if (rotations.length === 1) {
            return { modifiedFlag: false, result: rotations };
        }
        let modifiedFlag = false;
        const result: FaceRotation[] = [];
        for (let i = 0; i < rotations.length; ++i) {
            if (result.length > 0 && rotationsCancel(rotations[i], result[result.length - 1])) {
                modifiedFlag = true;
                result.pop();
            } else {
                result.push({ ...rotations[i] });
            }
        }
        return { modifiedFlag: modifiedFlag, result: result };
    }

    private replaceThreeConsecutiveRotations(rotations: FaceRotation[]): { modifiedFlag: boolean, result: FaceRotation[] } {
        if (rotations.length <= 2) {
            return { modifiedFlag: false, result: rotations };
        }
        let modifiedFlag = false;
        const result: FaceRotation[] = [];
        for (let i = 0; i < rotations.length; ++i) {
            if (result.length > 1 &&
                rotationsAreEqual(rotations[i], result[result.length - 1]) &&
                rotationsAreEqual(rotations[i], result[result.length - 2])) {
                modifiedFlag = true;
                result.pop();
                result.pop();
                result.push({ ...getOppositeRotation(rotations[i]) });
            } else {
                result.push({ ...rotations[i] });
            }
        }
        return { modifiedFlag: modifiedFlag, result: result };
    }
}