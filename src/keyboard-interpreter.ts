import { Sides } from "@/constants/sides";
import type { FaceRotation } from "@/engine/face-rotation";

export type KeyboardEvent = {
    key: string,
    shiftKey: boolean
}

export class KeyboardInterpreter {
    public readKeys(event: KeyboardEvent): FaceRotation | undefined {
        let side: Sides | undefined;
        switch (event.key.toLowerCase()) {
            case 'w':
                side = Sides.UP;
                break;
            case 'a':
                side = Sides.LEFT;
                break;
            case 's':
                side = Sides.FRONT;
                break;
            case 'd':
                side = Sides.RIGHT;
                break;
            case 'f':
                side = Sides.BACK;
                break;
            case 'x':
                side = Sides.DOWN;
                break;
        }
        if (side !== undefined) {
            return { side: side, counterClockwiseDirection: event.shiftKey, layer: 0 };
        }
    }
}