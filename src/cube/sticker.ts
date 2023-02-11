import {Colors} from '@/cube/Colors';

export class Sticker {
    private static stickerCounter: number = 0;
    private readonly id: number;
    private readonly color: Colors

    constructor(color: Colors) {
        this.color = color;
        this.id = Sticker.stickerCounter++;
    }

    public getColor(): Colors {
        return this.color;
    }

    public print(): void {
        console.log(`${this.id}: ${Colors[this.color]}`)
    }
}