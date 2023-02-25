import { getOppositeRotation, rotationsAreEqual, rotationsCancel, type FaceRotation } from "./face-rotation";

export class RotationsTuner {

    public tune(rotations: FaceRotation[]): FaceRotation[] {
        const result: FaceRotation[] = [];
        let lastRotation: FaceRotation | undefined;
        let modifiedFlag = false;
        let consecutiveEqualsRotations: number = 0;
        console.log(rotations)
        for (let rotation of rotations) {
            if (lastRotation && //avoids most of the unnecessary rotations
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
                result.push(rotation);
            }
            lastRotation = rotation;
        }
        if (modifiedFlag) {
            return this.tune(result);
        }
        console.log(result)
        return result;
    }
}