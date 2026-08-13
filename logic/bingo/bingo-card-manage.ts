'use client';

import { zlibCompress, zlibDecompress } from "../shared/compress";
import { BingoCardData } from "@/data/bingo";
import SeededRng from "../shared/seeded-rng";

const BINGO_CARD_STORAGE = "/bingo/cards/";
const BINGO_CARD_FORMAT = "/bingo/card-data-format";
const CURRENT_FORMAT = "0";

const getCardStoragePath = (id: string) => BINGO_CARD_STORAGE+id;

const DEFAULT_NAME = "Custom Bingo Card";
const DEFAULT_ROWS = 5;
const DEFAULT_COLS = 5;
const DEFAULT_HAS_FREE_SPACE = true;
const DEFAULT_FREE_SPACE_TEXT = "Free";
const DEFAULT_THEME = "default";

//Card limits
//Rows & Cols 3-7
//Bingo cells 30-50 chars
//100 values max
const updateCardsList = (ids: string[]) => {
    localStorage.setItem(BINGO_CARD_STORAGE, JSON.stringify(ids))
}

const migrateFormat = () => {
    const clientFormat = localStorage.getItem(BINGO_CARD_FORMAT)
    if (clientFormat === null){
        localStorage.setItem(BINGO_CARD_FORMAT,CURRENT_FORMAT);
        return;
    }
    if (clientFormat === CURRENT_FORMAT){
        
    }
}

export class BingoCardManage {

    private constructor(
        private cardData: BingoCardData, 
        private temporary: boolean = false //tracks if the card was loaded in as temporary data from an import
    ) {
        //Save changes
        if (!cardData.id){
            throw new Error("Card is missing a valid ID!")
        }

        if (!cardData.lastEdited){
            cardData.lastEdited = Date.now();
        }

        if (!cardData.name){
            cardData.name = DEFAULT_NAME;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.rows){
            cardData.rows = DEFAULT_ROWS;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.cols){
            cardData.cols = DEFAULT_COLS;
            cardData.lastEdited = Date.now();
        }

        if (cardData.hasFreeSpace === undefined){
            cardData.hasFreeSpace = DEFAULT_HAS_FREE_SPACE;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.freeSpaceText){
            cardData.freeSpaceText = DEFAULT_FREE_SPACE_TEXT;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.theme){
            cardData.theme = DEFAULT_THEME;
            cardData.lastEdited = Date.now();
        }

        if (!cardData.values){
            cardData.values = [];
            cardData.lastEdited = Date.now();
        }

        if (!this.temporary){
            this.save();
        }
    }

    static listBingoCardIds(): string[] {
        const json = localStorage.getItem(BINGO_CARD_STORAGE)
        if (!json){
            return [];
        }
        return JSON.parse(json);
    }

    static createBingoCard(){
        const newId = crypto.randomUUID();

        const cards = this.listBingoCardIds();
        cards.push(newId);
        updateCardsList(cards);

        return new BingoCardManage({
            id: newId,
            name: DEFAULT_NAME,
            rows: DEFAULT_COLS,
            cols: DEFAULT_ROWS,
            hasFreeSpace: DEFAULT_HAS_FREE_SPACE,
            freeSpaceText: DEFAULT_FREE_SPACE_TEXT,
            theme: DEFAULT_THEME,
            values: [],
            lastEdited: Date.now()
        })
    }

    static loadBingoCard(id: string): BingoCardManage | null {
        const json = localStorage.getItem(getCardStoragePath(id));
        if (!json){
            return null;
        }

        const cardData = JSON.parse(json) as BingoCardData;
        return new BingoCardManage(cardData)
    }

    static importBingoCard(compressedData: string): BingoCardManage {
        const json = zlibDecompress(compressedData);
        const cardData = JSON.parse(json) as BingoCardData;

        return new BingoCardManage(cardData, true);
    }

    getData(): BingoCardData {
        return {
            ...this.cardData
        };
    }

    generateCardValues(seed: number){
        return BingoCardManage.generateCardValues(this.cardData,seed);
    }

    async getHash(): Promise<string> {
        const length = 12;

        const encoder = new TextEncoder();
        const data = encoder.encode(JSON.stringify(this.cardData.values))
        const hashBuffer = await crypto.subtle.digest('SHA-256', data);
        const hashArray = new Uint8Array(hashBuffer);
        
        // Convert to Base62
        const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let result = '';
        for (let i = 0; i < length; i++) {
            result += chars[hashArray[i] % 62];
        }
        return result;
    }

    static generateCardValues(cardData: BingoCardData, seed: number): string[] {
        const { rows, cols, hasFreeSpace, freeSpaceText } = cardData;

        const rng = new SeededRng(seed);
        
        //Copy values
        const pool = cardData.values.map(x => x)
        const vals = []
        for (let i = 0; i < rows*cols; i++){

            //Insert free space
            if (
                hasFreeSpace &&
                i % rows == Math.floor(cols / 2) &&
                Math.floor(i / rows) == Math.floor(cols / 2)
            ){
                vals.push(freeSpaceText);
                continue;
            }

            //If there is not enough values to fill the card fill the space with empty string
            if (pool.length == 0){
                vals.push("");
                continue;
            }

            //Get value for cell
            const nextIdx = rng.next(0, pool.length)
            vals.push(...pool.splice(nextIdx,1))
        }
        return vals;
    } 

    updateData(data: Partial<Omit<BingoCardData, "id" | "lastEdited">>) {
        this.cardData = {
            ...this.cardData,
            ...data
        }

        this.cardData.lastEdited = Date.now();

        this.save()
    }

    export(): string {
        const json = JSON.stringify(this.cardData);
        const compressed = zlibCompress(json);
        return compressed;
    }

    save(){
        if (this.temporary){
            //Add card to list
            const cards = BingoCardManage.listBingoCardIds()

            cards.push(this.cardData.id)

            updateCardsList(cards)

            this.temporary = false
        }
        
        localStorage.setItem(
            getCardStoragePath(this.cardData.id),
            JSON.stringify(this.cardData)
        )
    }

    delete(){
        localStorage.removeItem(getCardStoragePath(this.cardData.id))
        
        const ids = BingoCardManage.listBingoCardIds()

        const newIds = ids.filter(id => id !== this.cardData.id)

        updateCardsList(newIds);        
    }
}