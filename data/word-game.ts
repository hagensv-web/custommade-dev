export interface WordGuessData {
    concurrentGames: number,
    maxGuesses: number,
    wordLength: number,
    answerPool: string[],
    startingGuesses: string[]
    validAnswers: string[]
    validGuesses: string[]
}

export interface WordGuessGameData {
    config: WordGuessData,
    guesses: string[]
}