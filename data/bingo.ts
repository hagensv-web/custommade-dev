export interface BingoCardData {
    id: string;
    name: string;
    rows: number;
    cols: number;
    hasFreeSpace: boolean;
    freeSpaceText: string;
    values: string[];
    theme: string;
    lastEdited: number;
}

export interface BingoGameData {
    id: string;
    card: BingoCardData;
    highlightedSpaces: number;
    seed: number;
}