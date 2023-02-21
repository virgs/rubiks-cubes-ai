export enum Colors {
    YELLOW,
    ORANGE,
    BLUE,
    RED,
    GREEN,
    WHITE
}

export const getAllColors = () => Object.keys(Colors)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key) as Colors);


export const mapColorsToHex = (color: Colors): number => {
    switch (color) {
        case Colors.YELLOW: return 0xc1bb00;
        case Colors.ORANGE: return 0xaf4b00;
        case Colors.BLUE: return 0x17207f;
        case Colors.RED: return 0x831212;
        case Colors.GREEN: return 0x00790f;
        case Colors.WHITE: return 0xc4c4c4;
    }
}

export const getOppositeColor = (color: Colors): Colors => {
    switch (color) {
        case Colors.BLUE: return Colors.GREEN;
        case Colors.GREEN: return Colors.BLUE;
        case Colors.RED: return Colors.ORANGE;
        case Colors.ORANGE: return Colors.RED;
        case Colors.YELLOW: return Colors.WHITE;
        case Colors.WHITE: return Colors.YELLOW;
    }
}