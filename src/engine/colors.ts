import { Color } from "three";

export enum Colors {
    YELLOW,
    ORANGE,
    BLUE,
    RED,
    GREEN,
    WHITE
}

export const getAllColors = ()=> Object.keys(Colors)
    .filter(key => !isNaN(Number(key)))
    .map(key => Number(key) as Colors);


export const mapColorsToHex = (color: Colors): number => {
    switch (color) {
        case Colors.YELLOW: return 0xFF5800;
        case Colors.ORANGE: return 0x009E60;
        case Colors.BLUE: return 0xC41E3A;
        case Colors.RED: return 0x0051BA;
        case Colors.GREEN: return 0xFFD500;
        case Colors.WHITE: return 0xFFFFFF;        
    }
}