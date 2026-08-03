interface SlidePuzzleData {
    imageData: string,
    removedCell: number;
    rows: number;
    cols: number;
}

interface SlidePuzzleGameData {
    puzzle: SlidePuzzleData,
    cells: number[][]
}