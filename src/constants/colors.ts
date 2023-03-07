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
        case Colors.BLUE: return 0x244670;
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


const colorToStringMap = new Map<Colors, string>();
colorToStringMap.set(Colors.YELLOW, 'y')
colorToStringMap.set(Colors.ORANGE, 'o')
colorToStringMap.set(Colors.BLUE, 'b')
colorToStringMap.set(Colors.RED, 'r')
colorToStringMap.set(Colors.GREEN, 'g')
colorToStringMap.set(Colors.WHITE, 'w')

export const mapColorInitialsToString = (color: Colors): string => {
    return colorToStringMap.get(color)!
}

const stringToColorMap = new Map<string, Colors>();
stringToColorMap.set('y', Colors.YELLOW)
stringToColorMap.set('o', Colors.ORANGE)
stringToColorMap.set('b', Colors.BLUE)
stringToColorMap.set('r', Colors.RED)
stringToColorMap.set('g', Colors.GREEN)
stringToColorMap.set('w', Colors.WHITE)

export const mapStringInitialToColor = (initial: string): Colors => {
    return stringToColorMap.get(initial)!
}