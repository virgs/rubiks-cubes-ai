import { getAllSides, Sides, } from "@/constants/sides";
import type { ColorlessCubelet, ColorlessSticker } from "./rubiks-cube";

export class CubeletsCreator {
    private static readonly cubeletsCreatorMap: Map<number, ColorlessCubelet[]> = new Map();

    private readonly dimension: number;
    private readonly stickers: ColorlessSticker[];
    private cubeletCounter: number;

    public constructor(dimension: number) {
        this.dimension = dimension;
        this.stickers = [];
        this.cubeletCounter = 0;
    }

    public create(): ColorlessCubelet[] {
        if (CubeletsCreator.cubeletsCreatorMap.has(this.dimension)) {
            return CubeletsCreator.cubeletsCreatorMap.get(this.dimension)!;
        } else {
            let id = 0;
            getAllSides()
                .map(side => {
                    for (let y = 0; y < this.dimension; ++y) {
                        for (let x = 0; x < this.dimension; ++x) {
                            this.stickers.push({ side: side, x: x, y: y, id: id++ });
                        }
                    }
                });

            const centers: ColorlessCubelet[] = this.extractCenters();
            const corners: ColorlessCubelet[] = this.extractCorners();
            const edges: ColorlessCubelet[] = this.extractEdges();
            const cubelets = [...corners, ...edges, ...centers];
            CubeletsCreator.cubeletsCreatorMap.set(this.dimension, cubelets);
            return cubelets;
        }
    }

    private cubeletsMerger(cubelets: { side: Sides, x: number, y: number }[]): ColorlessCubelet {
        const result: ColorlessCubelet = { stickers: [], id: ++this.cubeletCounter };
        cubelets
            .forEach(cubelet => {
                this.stickers
                    .forEach((item, index, original) => {
                        if (item.side === cubelet.side && cubelet.x === item.x && cubelet.y === item.y) {
                            result.stickers.push(...original.splice(index, 1));
                        }
                    });
            })

        return result;
    }

    private extractEdges(): ColorlessCubelet[] {
        const end = this.dimension - 1;
        const edges: ColorlessCubelet[] = [];

        for (let i = 1; i < this.dimension - 1; ++i) {
            edges.push(this.cubeletsMerger([
                { side: Sides.FRONT, x: 0, y: i },
                { side: Sides.LEFT, x: end, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.FRONT, x: end, y: i },
                { side: Sides.RIGHT, x: 0, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.FRONT, x: i, y: 0 },
                { side: Sides.UP, x: i, y: end }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.FRONT, x: i, y: end },
                { side: Sides.DOWN, x: i, y: 0 }]))

            edges.push(this.cubeletsMerger([
                { side: Sides.BACK, x: end, y: i },
                { side: Sides.LEFT, x: 0, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.BACK, x: 0, y: i },
                { side: Sides.RIGHT, x: end, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.BACK, x: i, y: 0 },
                { side: Sides.UP, x: end - i, y: 0 }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.BACK, x: i, y: end },
                { side: Sides.DOWN, x: end - i, y: end }]))

            edges.push(this.cubeletsMerger([
                { side: Sides.RIGHT, x: i, y: 0 },
                { side: Sides.UP, x: end, y: end - i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.RIGHT, x: i, y: end },
                { side: Sides.DOWN, x: end, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.LEFT, x: i, y: 0 },
                { side: Sides.UP, x: 0, y: i }]))
            edges.push(this.cubeletsMerger([
                { side: Sides.LEFT, x: i, y: end },
                { side: Sides.DOWN, x: 0, y: end - i }]))

        }

        return edges;
    }

    private extractCenters(): ColorlessCubelet[] {
        const end = this.dimension - 1;
        const centers: ColorlessCubelet[] = [];
        this.stickers
            .filter(item => item.x !== 0 && item.x !== end && item.y !== 0 && item.y !== end)
            .forEach(item => {
                centers.push({ stickers: [item], id: ++this.cubeletCounter });
            });

        return centers;
    }

    private extractCorners(): ColorlessCubelet[] {
        const corners: ColorlessCubelet[] = [];
        const end = this.dimension - 1;
        corners.push(this.cubeletsMerger([
            { side: Sides.FRONT, x: 0, y: 0 },
            { side: Sides.UP, x: 0, y: end },
            { side: Sides.LEFT, x: end, y: 0 }]))
        corners.push(this.cubeletsMerger([
            { side: Sides.FRONT, x: end, y: 0 },
            { side: Sides.UP, x: end, y: end },
            { side: Sides.RIGHT, x: 0, y: 0 }]))

        corners.push(this.cubeletsMerger([
            { side: Sides.FRONT, x: 0, y: end },
            { side: Sides.DOWN, x: 0, y: 0 },
            { side: Sides.LEFT, x: end, y: end }]))
        corners.push(this.cubeletsMerger([
            { side: Sides.FRONT, x: end, y: end },
            { side: Sides.DOWN, x: end, y: 0 },
            { side: Sides.RIGHT, x: 0, y: end }]))

        corners.push(this.cubeletsMerger([
            { side: Sides.BACK, x: 0, y: 0 },
            { side: Sides.UP, x: end, y: 0 },
            { side: Sides.RIGHT, x: end, y: 0 }]))
        corners.push(this.cubeletsMerger([
            { side: Sides.BACK, x: end, y: 0 },
            { side: Sides.UP, x: 0, y: 0 },
            { side: Sides.LEFT, x: 0, y: 0 }]))

        corners.push(this.cubeletsMerger([
            { side: Sides.BACK, x: 0, y: end },
            { side: Sides.DOWN, x: end, y: end },
            { side: Sides.RIGHT, x: end, y: end }]))
        corners.push(this.cubeletsMerger([
            { side: Sides.BACK, x: end, y: end },
            { side: Sides.DOWN, x: 0, y: end },
            { side: Sides.LEFT, x: 0, y: end }]))
        return corners;
    }
}