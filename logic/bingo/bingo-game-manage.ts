'use client';

import { zlibCompress, zlibDecompress } from "../shared/compress";
import { BingoGameData } from "@/data/bingo";
import { BingoCardManage } from "./bingo-card-manage";

const BINGO_GAME_STORAGE = "/bingo/games/";
const BINGO_GAME_FORMAT = "/bingo/game-data-format";
const CURRENT_FORMAT = "0";

const getGameStoragePath = (id: string) => BINGO_GAME_STORAGE+id;

const updateCardsList = (ids: string[]) => {
    localStorage.setItem(BINGO_GAME_STORAGE, JSON.stringify(ids))
}

const migrateFormat = () => {
    const clientFormat = localStorage.getItem(BINGO_GAME_FORMAT)
    if (clientFormat === null){
        localStorage.setItem(BINGO_GAME_FORMAT,CURRENT_FORMAT);
        return;
    }
    if (clientFormat === CURRENT_FORMAT){
        
    }
}

export class BingoGameManage {

    private constructor(
        private gameData: BingoGameData, 
    ) {
        //Save changes
        if (!gameData.id){
            throw new Error("Card is missing a valid ID!")
        }

        if (!gameData.highlightedSpaces){
            gameData.highlightedSpaces = 0;
        }

        this.save();
    }

    static listBingoGameIds(): string[] {
        const json = localStorage.getItem(BINGO_GAME_STORAGE)
        if (!json){
            return [];
        }
        return JSON.parse(json);
    }

    static createBingoGame(card: BingoCardManage, seed: number){
        const newId = crypto.randomUUID();

        const cards = this.listBingoGameIds();
        cards.push(newId);
        updateCardsList(cards);

        return new BingoGameManage({
            id: newId,
            name: card.getData().name,
            card: card.getData(),
            highlightedSpaces: 0,
            seed,
            lastPlayed: Date.now()
        })
    }

    static loadBingoGame(id: string): BingoGameManage | null {
        const json = localStorage.getItem(getGameStoragePath(id));
        if (!json){
            return null;
        }

        const gameData = JSON.parse(json) as BingoGameData;
        return new BingoGameManage(gameData)
    }

    static importBingoGame(compressedData: string): BingoGameManage {
        const json = zlibDecompress(compressedData);
        const gameData = JSON.parse(json) as BingoGameData;

        return new BingoGameManage(gameData);
    }

    getData(): BingoGameData {
        return {
            ...this.gameData
        };
    }

    isHighlighed(row: number, col: number){
        const cellId = row*this.gameData.card.cols + col;

        return (this.gameData.highlightedSpaces % (2**(cellId+1))) >= 2**(cellId)
    }

    clearHighlights(){
        this.gameData.highlightedSpaces = 0
    }

    toggleCell(row: number, col: number){
        const cellId = row*this.gameData.card.cols + col;

        const cell = (2**cellId) * (this.isHighlighed(row, col) ? -1 : 1)
        this.gameData.highlightedSpaces += cell
    }

    export(): string {
        const json = JSON.stringify(this.gameData);
        const compressed = zlibCompress(json);
        return compressed;
    }

    save(){
        this.gameData.lastPlayed = Date.now();
        
        localStorage.setItem(
            getGameStoragePath(this.gameData.id),
            JSON.stringify(this.gameData)
        )
    }

    delete(){
        localStorage.removeItem(getGameStoragePath(this.gameData.id))
        
        const ids = BingoGameManage.listBingoGameIds()

        const newIds = ids.filter(id => id !== this.gameData.id)

        updateCardsList(newIds);        
    }
}