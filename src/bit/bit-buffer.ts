
export class BitBuffer {
    private static readonly BYTE_LENGTH = 8;
    private byteArray: Uint8Array;
    readonly buffer: ArrayBuffer;
    readonly length: number;

    public constructor(bitLength: number) {
        this.length = bitLength;
        try {
            this.buffer = new ArrayBuffer(Math.ceil(bitLength / BitBuffer.BYTE_LENGTH));
        } catch (e) {
            throw new Error("malloc buffer fail.");
        }

        try {
            this.byteArray = new Uint8Array(this.buffer)
        } catch (e) {
            throw new Error("convert buffer to unit8array fail. May be an array too large, or it may be out of memory.");
        }
    }

    public getBit(index: number): number {
        this.validateIndex(index);

        const offset = Math.floor(index / BitBuffer.BYTE_LENGTH);
        const byteIndex = index % BitBuffer.BYTE_LENGTH;

        return (this.byteArray[offset] >> byteIndex) & 0b1;
    }

    public setBit(index: number) {
        this.validateIndex(index);

        const offset = Math.floor(index / BitBuffer.BYTE_LENGTH);
        const byteIndex = index % BitBuffer.BYTE_LENGTH;

        this.byteArray[offset] |= (0b1 << byteIndex);
    }

    public clearBit(index: number) {
        this.validateIndex(index);

        const offset = Math.floor(index / BitBuffer.BYTE_LENGTH);
        const byteIndex = index % BitBuffer.BYTE_LENGTH;

        this.byteArray[offset] &= (~(0b1 << byteIndex));
    }

    public setRange(begin: number, size: number) {
        this.validateIndex(begin);
        this.validateIndex(begin + size - 1);
        if (size < 0) {
            throw new RangeError('size has to be a positive number')
        }

        const beginOffset = Math.floor(begin / BitBuffer.BYTE_LENGTH);
        const beginByteIndex = begin % BitBuffer.BYTE_LENGTH;

        const end = begin + size;
        const endOffset = Math.floor(end / BitBuffer.BYTE_LENGTH);
        const endByteIndex = end % BitBuffer.BYTE_LENGTH;

        this.byteArray[beginOffset] |= ((255 >> beginByteIndex) << beginByteIndex);
        for (let i = beginOffset + 1; i < endOffset; ++i) {
            this.byteArray[i] |= 255;
        }
        this.byteArray[endOffset] |= (255 >> (BitBuffer.BYTE_LENGTH - endByteIndex));
    }

    private validateIndex(index: number) {
        if (!Number.isInteger(index)) {
            throw new TypeError("bit array index must be integer");
        } else if (index < 0) {
            throw new RangeError("bit array index must >= 0");
        } else if (index >= this.length) {
            throw new RangeError("bit array index out of length range");
        }
    }

}
