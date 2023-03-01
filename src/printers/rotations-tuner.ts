import { getOppositeRotation, rotationsAreEqual, rotationsCancel, type FaceRotation } from "../engine/face-rotation";

export class RotationsTuner {

    public tune(rotations: FaceRotation[]): FaceRotation[] {
        const result: FaceRotation[] = [];
        let lastRotation: FaceRotation | undefined;
        let modifiedFlag = false;
        let consecutiveEqualsRotations: number = 0;
        for (let rotation of rotations) {
            if (lastRotation &&
                rotationsCancel(rotation, lastRotation)) {
                result.pop();
                modifiedFlag = true;
                consecutiveEqualsRotations = 0;
            } else {
                if (lastRotation && rotationsAreEqual(lastRotation, rotation)) {
                    ++consecutiveEqualsRotations;
                    if (consecutiveEqualsRotations === 3) {
                        result.pop();
                        result.pop();
                        result.push(getOppositeRotation(rotation));
                        consecutiveEqualsRotations = 0;
                        modifiedFlag = true;
                        continue;
                    }
                }
                if (!lastRotation) {
                    ++consecutiveEqualsRotations;
                }
                result.push(rotation);
            }
            lastRotation = rotation;
        }
        if (modifiedFlag) {
            return this.tune(result);
        }
        return result;
    }
}