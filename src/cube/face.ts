import type {Sticker} from '@/cube/sticker';

export class Face {
    private stickers: Sticker[];

    public constructor(stickers: Sticker[]) {
        this.stickers = stickers;
    }

    public removeStickersFromIndexes(...indexes: number[]): Sticker[] {
        const reduce = this.stickers
            .reduce((acc, item, index) => {
                if (indexes.includes(index)) {
                    acc.remove.push(item);
                } else {
                    acc.keep.push(item);
                }
                return acc;
            }, {keep: [] as Sticker[], remove: [] as Sticker[]});
        this.stickers = reduce.keep;
        return reduce.remove;
    }

    public addStickersAtIndexes(...data: { index: number, sticker: Sticker }[]): void {
        data
            .sort((a, b) => a.index - b.index)
            .forEach((item) => this.stickers.splice(item.index, 0, item.sticker))
    }

    public print(): void {
        this.stickers
            .forEach(sticker => sticker.print())
    }
}